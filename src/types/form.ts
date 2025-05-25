export type ButtonProps = {
  variant?: "primary" | "secondary" | "outline" | "delete";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
