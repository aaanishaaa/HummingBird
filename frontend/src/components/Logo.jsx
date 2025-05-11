import React from "react";
import logoDark from "@/assets/logo-dark.png";
import logoLight from "@/assets/logo-light.png";
import { useTheme } from "@/hooks/useTheme";

const Logo = () => {
  const { theme } = useTheme();

  return (
    <div className="logo-container">
      <img
        src={theme === "dark" ? logoDark : logoLight}
        alt="HummingBird Logo"
        className="w-[180px]"
      />
    </div>
  );
};

export default Logo;
