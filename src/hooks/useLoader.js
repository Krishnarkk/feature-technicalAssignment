import { useState } from "react";

const useLoader = () => {
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");

  const startLoading = (text = "Loading...") => {
    setLoading(true);
    setLoadingText(text);
  };

  const stopLoading = () => {
    setLoading(false);
    setLoadingText("");
  };

  return {
    loading,
    loadingText,
    startLoading,
    stopLoading,
  };
};

export default useLoader;
