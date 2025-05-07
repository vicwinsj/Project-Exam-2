type ButtonProps = {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const variantClasses = {
  primary:
    "bg-sunset-800 text-white border-sunset-800 border-[.1px] hover:bg-sunset-900",
  secondary: "bg-turquoise-500 hover:bg-air-100 text-ocean-700",
  outline:
    "border-[.1px] font-normal! border-ocean-700 text-neutral-600 hover:border-black hover:bg-air-100 rounded-sm",
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
