type ButtonProps = {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const variantClasses = {
  primary:
    "border-sunset-800 border-1 bg-white text-sunset-800 hover:text-sunset-900 hover:border-sunset-900",
  secondary:
    "bg-ocean-700 border-white border-1 text-white hover:text-turquoise-500 hover:border-turquoise-500",
  outline:
    "border-1 font-normal! border-neutral-500 text-neutral-600 hover:border-black hover:bg-air-100 rounded-sm",
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
      className={`h-fit whitespace-nowrap rounded-sm font-semibold transition-colors duration-300 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
