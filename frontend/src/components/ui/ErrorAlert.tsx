import React from "react";
import { Alert, AlertTitle, Button } from "@mui/material";

interface ErrorAlertProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({
  title = "Error Encountered",
  message,
  onRetry,
}) => {
  return (
    <div style={{ padding: 16, maxWidth: 600, margin: "0 auto" }}>
      <Alert
        severity="error"
        action={
          onRetry && (
            <Button color="inherit" size="small" onClick={onRetry}>
              Retry
            </Button>
          )
        }
      >
        <AlertTitle>{title}</AlertTitle>
        {message}
      </Alert>
    </div>
  );
};
