'use client';

import React from "react";
import { Button as HeroUIButton, ButtonProps as HeroUIButtonProps } from "@heroui/react";

interface ButtonProps extends Omit<HeroUIButtonProps, 'ref'> {
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  ...props
}) => {
  return (
    <HeroUIButton {...props}>
      {children}
    </HeroUIButton>
  );
};
