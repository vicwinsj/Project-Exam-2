import { Button } from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

type LoginProps = {
  onClose: () => void;
};

const Login = ({ onClose }: LoginProps) => {
  const handleBackgroundClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-black/50"
      onClick={handleBackgroundClick}
    >
      <form
        className="flex flex-col gap-10 w-1/3 bg-white p-10 border-1 border-neutral-500 rounded-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-xl flex items-center justify-end">
          <FontAwesomeIcon
            className="cursor-pointer"
            icon={faXmark}
            onClick={onClose}
          ></FontAwesomeIcon>
        </div>
        <h1 className="text-xl text-black w-full text-center">
          Login to account
        </h1>
        <fieldset className="flex flex-col gap-3">
          <div className="flex flex-col gap-1 ">
            <label htmlFor="name">Name</label>
            <input
              className={
                "transition-colors duration-300 px-3 py-1 border-1 rounded-lg hover:bg-air-100 outline-sunset-800 border-neutral-300 "
              }
              type="name"
              name="name"
              required
            />
          </div>
          <div className="flex flex-col gap-1 ">
            <label htmlFor="password">Password</label>
            <input
              className={
                "transition-colors duration-300 px-3 py-1 border-1 rounded-lg hover:bg-air-100 outline-sunset-800 border-neutral-300 "
              }
              type="password"
              name="password"
              required
            />
          </div>
        </fieldset>
        <div className="flex justify-between">
          <div className="flex gap-1">
            <input
              className="cursor-pointer"
              type="checkbox"
              id="scales"
              name="remember"
            />
            <label htmlFor="remember">Remember me</label>
          </div>
          <a className="font-semibold" href="">
            Forgot password?
          </a>
        </div>
        <Button>Login</Button>
        <div className="flex gap-1">
          <p>Dont got an account?</p>{" "}
          <a href="/register" className="font-semibold">
            Register here.
          </a>
        </div>
      </form>
    </div>
  );
};

export default Login;
