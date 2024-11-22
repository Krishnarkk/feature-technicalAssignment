import React from "react";
import "./ErrorBoundaryPage.css";
const ErrorBoundaryPage = () => {
  return (
    <div className="errorPage_container">
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for doesn't exist.</p>
    </div>
  );
};

export default ErrorBoundaryPage;
