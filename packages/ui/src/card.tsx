import { type HTMLAttributes, type JSX } from "react";
import { jsx } from "react/jsx-runtime";

export function Card({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>): JSX.Element {
  return (
    <div
      className={`rounded-lg bg-card text-card-foreground shadow-sm ${className ?? ""}`}
      {...props}
    >
      {children}
    </div>
  );
}




