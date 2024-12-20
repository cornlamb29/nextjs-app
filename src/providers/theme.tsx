'use client';

import { ReactNode } from "react";
import useTheme from "../hooks/useTheme";

export default function ThemeProvider({ children }: { children: ReactNode }) {
  useTheme();
  return <>{ children }</>;
}
