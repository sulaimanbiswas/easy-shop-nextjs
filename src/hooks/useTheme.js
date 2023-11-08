import ThemeContext from "@/contexts/ThemeContext";
import { useContext } from "react";

const useTheme = () => {
  const theme = useContext(ThemeContext);
  const isClient = typeof window !== "undefined";

  if (!isClient && !theme) return {};

  if (!theme) {
    throw new Error(
      "useTheme must be used within a ThemeProvider. Wrap a parent component in <ThemeProvider /> to fix this error."
    );
  }
  return theme;
};

export default useTheme;
