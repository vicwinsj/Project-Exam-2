import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext.tsx";
import { Button } from "../form/Button.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { loginUser } from "../../api/auth.ts";
import ModalWrapper from "./ModalWrapper.tsx";
import toast from "react-hot-toast";
import { Toast } from "../toast/toast.tsx";
import { ButtonLoader } from "../loaders/ButtonLoader.tsx";
import { useLocation, useNavigate } from "react-router-dom";
import { ErrorState } from "../../types/auth.ts";

type LoginProps = {
  onClose: () => void;
};

const LoginModal = ({ onClose }: LoginProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const { login, savedUsername, savedPassword } = useAuth();

  const handleRegisterClick = () => {
    if (location.pathname === "/register") {
      onClose();
    } else {
      navigate("/register");
    }
  };

  const [serverError, setServerError] = useState("");
  const [errors, setErrors] = useState<ErrorState>({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const form = event.currentTarget;

    const remember = (form.elements.namedItem("remember") as HTMLInputElement)
      .checked;

    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;

    const validateForm = () => {
      const newErrors: ErrorState = {};

      if (!/^[\w.-]+@stud\.noroff\.no$/.test(email)) {
        newErrors.email = "Has to be a @stud.noroff.no email";
      }

      if (password.trim().length < 8) {
        newErrors.password = "Password got to contain at least 8 characters";
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    if (validateForm()) {
      setServerError("");
      setErrors({});

      const userData = {
        email,
        password,
      };

      try {
        const result = await loginUser(userData);
        if (result && result.data && result.data.accessToken) {
          toast.custom(<Toast message="Successfully logged in!" />);
          login(
            result.data.accessToken,
            result.data.name,
            email,
            password,
            remember
          );
          onClose();
          if (location.pathname === "/register") {
            navigate("/");
          }
        }
      } catch (error) {
        if (error instanceof Error) {
          setServerError(error.message);
        }
      }
    }
    setLoading(false);
  };

  return (
    <ModalWrapper onClose={onClose}>
      <form
        onSubmit={handleSubmit}
        className="z-10 flex flex-col gap-10 mx-1 w-11/12 sm:w-1/2 lg:w-1/3 p-6 sm:p-10 bg-white rounded-xl"
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
              className={(errors.email || serverError) && "border-red-500"}
              type="text"
              name="email"
              required
              placeholder="mail@stud.noroff.no"
              defaultValue={savedUsername ?? ""}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
            )}
          </div>
          <div className="flex flex-col gap-1 ">
            <label htmlFor="password">Password</label>
            <input
              className={(errors.password || serverError) && "border-red-500"}
              type="password"
              name="password"
              required
              defaultValue={savedPassword ?? ""}
            />
          </div>
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password}</p>
          )}
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
          <button type="button" className="font-semibold text-sm">
            Forgot password?
          </button>
        </div>
        <Button
          className={`${loading && "cursor-not-allowed bg-sunset-800/50 hover:bg-sunset-900/50"}`}
          type="submit"
        >
          {loading ? <ButtonLoader buttonText="Logging in ..." /> : "Login"}
        </Button>
        {serverError && <p className="text-sm text-red-600">{serverError}!</p>}
        <div className="text-sm flex gap-1">
          <p>Don't got an account?</p>{" "}
          <button
            className="font-semibold"
            type="button"
            onClick={() => {
              handleRegisterClick();
              onClose();
            }}
          >
            Register here.
          </button>
        </div>
      </form>
    </ModalWrapper>
  );
};

export default LoginModal;
