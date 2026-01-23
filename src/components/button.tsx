"use client";

import React from "react";
import { Button as HeroUIButton } from "@heroui/react";

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?:
    | "solid"
    | "bordered"
    | "flat"
    | "faded"
    | "shadow"
    | "light"
    | "dot";
  size?: "sm" | "md" | "lg";
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
  isDisabled?: boolean;
  isLoading?: boolean;
  fullWidth?: boolean;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "solid",
  size = "md",
  color = "primary",
  isDisabled = false,
  isLoading = false,
  fullWidth = false,
  className = "",
  ...props
}) => {
  return (
    <HeroUIButton
      variant={variant}
      size={size}
      color={color}
      isDisabled={isDisabled}
      isLoading={isLoading}
      fullWidth={fullWidth}
      className={className}
      {...props}
    >
      {children}
    </HeroUIButton>
  );
};
