type ButtonProps = {
  variant?: "primary" | "secondary" | "outline" | "delete";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const variantClasses = {
  primary: "bg-sunset-800 text-white hover:bg-sunset-900",
  secondary:
    "bg-ocean-700 border-white border-1 text-white hover:text-turquoise-500 hover:border-turquoise-500",
  outline:
    "border-1 font-normal! border-neutral-300 text-black hover:border-black hover:bg-neutral-50",
  delete: "bg-red-500 hover:bg-red-700 text-white",
};

const sizeClasses = {
  sm: "px-2 py-1 text-sm",
  md: "px-4 py-1 text-md",
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
      className={`h-fit whitespace-nowrap rounded-lg font-semibold transition-colors duration-300 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
