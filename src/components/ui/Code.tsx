"use client";

import React from "react";
import { Code as HeroUICode } from "@heroui/react";

interface CodeProps {
  children: React.ReactNode;
  color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const Code: React.FC<CodeProps> = ({
  children,
  color = "default",
  size = "md",
  className = "",
}) => {
  return (
    <HeroUICode color={color} size={size} className={`font-mono ${className}`}>
      {children}
    </HeroUICode>
  );
};
