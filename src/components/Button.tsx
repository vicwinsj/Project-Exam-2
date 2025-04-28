type ButtonProps = {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const variantClasses = {
  primary: "bg-sunset-800 text-white hover:bg-sunset-900",
  secondary: "bg-white hover:bg-turquoise-500 text-ocean-700",
  outline:
    "border-1 border-neutral-500 text-neutral-500 hover:border-neutral-700 hover:text-neutral-700 hover:bg-air-100",
};

const sizeClasses = {
  sm: "px-2 py-1 text-sm",
  md: "px-4 py-1 text- ",
  lg: "px-6 py-3 text-lg",
};

export const Button = ({
  variant = "primary",
  size = "md",
  children,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`h-full rounded-lg font-semibold transition-colors duration-300 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
