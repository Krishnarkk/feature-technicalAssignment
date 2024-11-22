import React, { useState } from "react";

const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Function to catch errors
  const catchError = (error) => {
    setHasError(true);
    setErrorMessage(error.message);
  };

  // To catch errors globally
  React.useEffect(() => {
    const errorHandler = (event) => {
      catchError(new Error("Global error detected"));
      event.preventDefault();
    };

    window.addEventListener("error", errorHandler);
    return () => {
      window.removeEventListener("error", errorHandler);
    };
  }, []);

  if (hasError) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h1>Something went wrong.</h1>
        <p>{errorMessage}</p>
      </div>
    );
  }

  return children;
};

export default ErrorBoundary;
