/**
 * Centralized API Client
 * Supports CSRF token validation, session credentials, and error normalization.
 */

const API_BASE = (import.meta.env.VITE_API_URL as string) || "http://localhost:8000";

interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean>;
}

class ApiError extends Error {
  status: number;
  data: unknown;

  constructor(message: string, status: number, data?: unknown) {
    super(message);
    this.status = status;
    this.data = data;
    this.name = "ApiError";
  }
}

// Extract CSRF cookie
function getCsrfTokenFromCookie(): string {
  const match = document.cookie.match(/csrftoken=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : "";
}

let cachedCsrfToken: string | null = null;

export async function fetchCsrfToken(): Promise<string> {
  const fromCookie = getCsrfTokenFromCookie();
  if (fromCookie) {
    cachedCsrfToken = fromCookie;
    return fromCookie;
  }
  try {
    const res = await fetch(`${API_BASE}/api/auth/csrf/`, {
      credentials: "include",
    });
    if (res.ok) {
      const data = (await res.json()) as { csrfToken?: string };
      cachedCsrfToken = data.csrfToken || getCsrfTokenFromCookie() || "";
      return cachedCsrfToken;
    }
  } catch {
    // If backend is currently offline, return empty
  }
  return "";
}

export async function apiClient<T = unknown>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { params, headers = {}, ...customConfig } = options;

  let url = `${API_BASE}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;
  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      searchParams.append(key, String(value));
    });
    url += `?${searchParams.toString()}`;
  }

  const csrfToken = cachedCsrfToken || getCsrfTokenFromCookie();

  const reqHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...(csrfToken ? { "X-CSRFToken": csrfToken } : {}),
    ...(headers as Record<string, string>),
  };

  const config: RequestInit = {
    credentials: "include", // Session cookie authentication
    ...customConfig,
    headers: reqHeaders,
  };

  const response = await fetch(url, config);

  if (!response.ok) {
    let errBody: unknown;
    try {
      errBody = await response.json();
    } catch {
      errBody = await response.text();
    }
    throw new ApiError(
      (errBody as { detail?: string })?.detail || `API request failed with status ${response.status}`,
      response.status,
      errBody
    );
  }

  if (response.status === 204) {
    return {} as T;
  }

  return response.json();
}

export const api = {
  get: <T>(endpoint: string, options?: RequestOptions) =>
    apiClient<T>(endpoint, { ...options, method: "GET" }),
  post: <T>(endpoint: string, body?: unknown, options?: RequestOptions) =>
    apiClient<T>(endpoint, {
      ...options,
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
    }),
  put: <T>(endpoint: string, body?: unknown, options?: RequestOptions) =>
    apiClient<T>(endpoint, {
      ...options,
      method: "PUT",
      body: body ? JSON.stringify(body) : undefined,
    }),
  delete: <T>(endpoint: string, options?: RequestOptions) =>
    apiClient<T>(endpoint, { ...options, method: "DELETE" }),
};
