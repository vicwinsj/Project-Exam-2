export const Toast = ({
  message,
  error,
}: {
  message: string;
  error?: boolean;
}) => {
  return (
    <div
      className={`${error ? "bg-red-100 text-red-500" : "bg-green-100  text-green-700"} font-rubik font-semibold shadow-lg rounded-xl px-10 py-3`}
    >
      <p>{message}</p>
    </div>
  );
};
