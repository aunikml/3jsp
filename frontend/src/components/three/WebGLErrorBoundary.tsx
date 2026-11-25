import React, { Component, ReactNode } from "react";
import { Typography, Button } from "@mui/material";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  errorMessage: string;
}

export class WebGLErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, errorMessage: "" };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, errorMessage: error.message };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("WebGL 3D Scene Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            width: "100%",
            backgroundColor: "#0d1117",
            color: "#f85149",
            padding: 32,
            textAlign: "center",
          }}
        >
          <Typography variant="h6" gutterBottom>
            3D Graphics Initialisation Error
          </Typography>
          <Typography variant="body2" sx={{ color: "#8b949e", mb: 2, maxWidth: 480 }}>
            WebGL could not be initialized or encountered an error: {this.state.errorMessage}
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => this.setState({ hasError: false, errorMessage: "" })}
          >
            Retry WebGL Context
          </Button>
        </div>
      );
    }
    return this.props.children;
  }
}
