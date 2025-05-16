export const Toast = ({ message }: { message: string }) => {
  return (
    <div className="bg-green-100 font-rubik font-semibold text-green-700 shadow-lg rounded-xl px-10 py-3">
      <p>{message}</p>
    </div>
  );
};
