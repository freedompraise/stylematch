import { useState } from "react";
import { Button, CircularProgress, Box } from "@mui/material";

const LoadingButton = ({
  onClick,
  label = "Submit",
  isLoading: initialLoading = false,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(initialLoading);

  const handleClick = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      await onClick();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="contained"
      color="primary"
      disabled={isLoading}
      onClick={handleClick}
      {...props}
    >
      {isLoading ? (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <CircularProgress size={24} color="inherit" sx={{ marginRight: 1 }} />
          Loading...
        </Box>
      ) : (
        label
      )}
    </Button>
  );
};

export default LoadingButton;
