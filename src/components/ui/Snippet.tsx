"use client";

import React from "react";
import { Snippet as HeroUISnippet } from "@heroui/react";

interface SnippetProps {
  children: string;
  symbol?: string;
  hideSymbol?: boolean;
  variant?: "solid" | "bordered" | "flat" | "shadow";
  color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
  className?: string;
}

export const Snippet: React.FC<SnippetProps> = ({
  children,
  symbol = "$",
  hideSymbol = false,
  variant = "flat",
  color = "default",
  className = "",
}) => {
  return (
    <HeroUISnippet
      symbol={symbol}
      hideSymbol={hideSymbol}
      variant={variant}
      color={color}
      className={`my-4 ${className}`}
      codeString={children}
    >
      {children}
    </HeroUISnippet>
  );
};
