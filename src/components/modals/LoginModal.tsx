import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext.tsx";
import { Button } from "../form/Button.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { loginUser } from "../../api/auth.ts";
import ModalWrapper from "./ModalWrapper.tsx";
import toast from "react-hot-toast";
import { Toast } from "../toast/toast.tsx";

type LoginProps = {
  onClose: () => void;
};

const LoginModal = ({ onClose }: LoginProps) => {
  const { login } = useAuth();

  const [serverError, setServerError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;

    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;

    const userData = {
      email,
      password,
    };

    try {
      const result = await loginUser(userData);
      if (result && result.data && result.data.accessToken) {
        toast.custom(<Toast message="Successfully logged in!" />);
        login(result.data.accessToken, result.data.name);
        onClose();
      }
    } catch (error) {
      if (error instanceof Error) {
        setServerError(error.message);
      }
    }
  };

  return (
    <ModalWrapper onClose={onClose}>
      <form
        onSubmit={handleSubmit}
        className="z-10 flex flex-col gap-10 w-1/3 bg-white p-10 border-1 border-neutral-500 rounded-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="transition-colors duration-300 text-xl flex items-center justify-end text-neutral-500 hover:text-neutral-700">
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
          <div className="flex flex-col gap-1">
            <label htmlFor="email">Email</label>
            <input
              className={serverError && "border-red-500"}
              type="text"
              name="email"
              required
            />
          </div>
          <div className="flex flex-col gap-1 ">
            <label htmlFor="password">Password</label>
            <input
              className={serverError && "border-red-500"}
              type="password"
              name="password"
              required
            />
          </div>
        </fieldset>
        <div className="flex justify-between items-center">
          <div className="flex gap-1 h-fit">
            <input
              className="cursor-pointer"
              type="checkbox"
              id="remember"
              name="remember"
            />
            <label htmlFor="remember" className="cursor-pointer">
              Remember me
            </label>
          </div>
          <a className="font-semibold text-sm" href="">
            Forgot password?
          </a>
        </div>
        <Button type="submit">Login</Button>
        {serverError && <p className="text-red-600">{serverError}!</p>}
        <div className="flex gap-1">
          <p>Don't got an account?</p>{" "}
          <a href="/register" className="font-semibold">
            Register here.
          </a>
        </div>
      </form>
    </ModalWrapper>
  );
};

export default LoginModal;
