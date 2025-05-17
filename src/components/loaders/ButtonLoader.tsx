interface ButtonLoaderProp {
  buttonText: string;
}

export const ButtonLoader = ({ buttonText }: ButtonLoaderProp) => {
  return (
    <div className="flex justify-center items-center gap-3">
      <span>{buttonText}</span>
      <span className="size-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
    </div>
  );
};
