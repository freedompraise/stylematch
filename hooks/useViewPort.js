import { useState, useEffect } from "react";

export const useViewPort = () => {
  const [width, setWidth] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => setWidth(window.innerWidth);
      setWidth(window.innerWidth); // Set initial width

      // Add event listener for resizing
      window.addEventListener("resize", handleResize);

      // Cleanup the event listener on component unmount
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  return { width };
};
