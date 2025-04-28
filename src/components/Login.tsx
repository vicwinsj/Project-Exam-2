import { useState } from "react";
import { useAuth } from "../contexts/AuthContext.tsx";
import { Button } from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

type LoginProps = {
  onClose: () => void;
};

export const loginUser = async (userData: {
  email: string;
  password: string;
}) => {
  try {
    const response = await fetch("https://v2.api.noroff.dev/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.errors?.[0]?.message || "Failed to login");
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

const Login = ({ onClose }: LoginProps) => {
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
      //   if (result) SUCCESS MESSAGE
      if (result && result.data && result.data.accessToken) {
        login(result.data.accessToken);
        window.location.href = "/";
      }
    } catch (error) {
      if (error instanceof Error) {
        setServerError(error.message);
      }
    }
  };

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
        onSubmit={handleSubmit}
        className="flex flex-col gap-10 w-1/3 bg-white p-10 border-1 border-neutral-500 rounded-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="transition-colors duration-300 text-xl flex items-center justify-end text-neutral-500 hover:text-neutral-700">
          <FontAwesomeIcon
            className="cursor-pointer "
            icon={faXmark}
            onClick={onClose}
          ></FontAwesomeIcon>
        </div>
        <h1 className="text-xl text-black w-full text-center">
          Login to account
        </h1>
        <fieldset className="flex flex-col gap-3">
          <div className="flex flex-col gap-1 ">
            <label htmlFor="email">Email</label>
            <input
              className={`transition-colors duration-300 px-3 py-1 border-1 rounded-lg hover:bg-air-100 outline-sunset-800 border-neutral-300 ${
                serverError && "border-red-500"
              }`}
              type="text"
              name="email"
              required
            />
          </div>
          <div className="flex flex-col gap-1 ">
            <label htmlFor="password">Password</label>
            <input
              className={`transition-colors duration-300 px-3 py-1 border-1 rounded-lg hover:bg-air-100 outline-sunset-800 border-neutral-300 ${
                serverError && "border-red-500"
              }`}
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
        <Button type="submit">Login</Button>
        {serverError && <p className="text-red-600">{serverError}!</p>}
        <div className="flex gap-1">
          <p>Don't got an account?</p>{" "}
          <a href="/register" className="font-semibold">
            Register here.
          </a>
        </div>
      </form>
    </div>
  );
};

export default Login;
