import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/form/Button";
import { registerUser, loginUser } from "../api/auth";
import toast from "react-hot-toast";
import { Toast } from "../components/toast/toast";
import LoginModal from "../components/modals/LoginModal";
import { ButtonLoader } from "../components/loaders/ButtonLoader";
import { useAuth } from "../contexts/AuthContext";

const RegisterView = () => {
  const { login } = useAuth();

  const navigate = useNavigate();
  const [accountType, setAccountType] = useState("customer");
  const [showLogin, setShowLogin] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  const handleCloseLogin = () => {
    setShowLogin(false);
  };

  type ErrorState = {
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  };

  const [serverError, setServerError] = useState("");
  const [errors, setErrors] = useState<ErrorState>({});

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const form = event.currentTarget;

    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;
    const confirmPassword = (
      form.elements.namedItem("confirm-password") as HTMLInputElement
    ).value;

    const validateForm = () => {
      const newErrors: ErrorState = {};

      if (name.trim().length < 3) {
        newErrors.name = "Name must contain at least 3 characters";
      }

      if (!/^[\w.-]+@stud\.noroff\.no$/.test(email)) {
        newErrors.email = "Must be a @stud.noroff.no email";
      }

      if (password.trim().length < 8) {
        newErrors.password = "Password must contain at least 8 characters";
      }

      if (confirmPassword !== password) {
        newErrors.confirmPassword = "Passwords don't match";
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    if (validateForm()) {
      setServerError("");

      const userData = {
        name,
        email,
        password,
        confirmPassword,
        venueManager: accountType === "manager",
      };

      try {
        const registerSuccess = await registerUser(userData);
        if (registerSuccess) {
          toast.custom(<Toast message="Profile successfully registered!" />);
          const loginSuccess = await loginUser({ email, password });
          if (loginSuccess) {
            login(loginSuccess.data.accessToken, loginSuccess.data.name);
          }
          navigate("/");
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
    <>
      <section className="flex flex-col items-center bg-ocean-700">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-10 w-11/12 sm:w-1/2 lg:w-1/3 px-6 py-10 sm:p-10 rounded-xl bg-white"
        >
          <h1 className="text-xl text-black w-full text-center">
            Create account
          </h1>
          <div className="flex flex-col gap-10">
            <fieldset className="flex gap-3">
              <legend className="font-semibold">Select account type</legend>
              <div className="flex gap-3">
                <input
                  className="cursor-pointer"
                  type="radio"
                  name="customer"
                  id="customer"
                  value="customer"
                  defaultChecked
                  checked={accountType === "customer"}
                  onChange={() => setAccountType("customer")}
                />{" "}
                <label htmlFor="customer" className="cursor-pointer">
                  Customer
                </label>
              </div>
              <div className="flex gap-3">
                <input
                  className="cursor-pointer"
                  type="radio"
                  name="manager"
                  id="manager"
                  value="manager"
                  checked={accountType === "manager"}
                  onChange={() => setAccountType("manager")}
                />{" "}
                <label htmlFor="manager" className="cursor-pointer">
                  Manager
                </label>
              </div>
            </fieldset>
            <fieldset className="flex flex-col gap-3">
              <div className="flex flex-col gap-1 ">
                <label htmlFor="name">Username</label>
                <input
                  className={errors.name && "border-red-500"}
                  type="text"
                  name="name"
                  required
                />
                {errors.name && <p className="text-red-500">{errors.name}.</p>}
              </div>
              <div className="flex flex-col gap-1 ">
                <label htmlFor="email">Email</label>
                <input
                  className={errors.email && "border-red-500"}
                  type="email"
                  name="email"
                  placeholder="youremail@stud.noroff.no"
                  required
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email}.</p>
                )}
              </div>
              <div className="flex flex-col gap-1 ">
                <label htmlFor="password">Password</label>
                <input
                  className={
                    (errors.password || errors.confirmPassword) &&
                    "border-red-500"
                  }
                  type="password"
                  name="password"
                  required
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password}.</p>
                )}
              </div>
              <div className="flex flex-col gap-1 ">
                <label htmlFor="confirm-password">Confirm password</label>
                <input
                  className={errors.confirmPassword && "border-red-500"}
                  type="password"
                  name="confirm-password"
                  required
                />
                {errors.confirmPassword && (
                  <p className="text-red-500">{errors.confirmPassword}.</p>
                )}
              </div>
            </fieldset>
            <Button
              className={`${loading && "cursor-not-allowed bg-sunset-800/50 hover:bg-sunset-900/50"}`}
              type="submit"
              variant="primary"
            >
              {loading ? (
                <ButtonLoader buttonText="Registering account ..." />
              ) : (
                "Register"
              )}
            </Button>
            {serverError && <p className="text-red-600">{serverError}!</p>}
            <div className="text-sm flex gap-1">
              <p>Already got an account?</p>
              <button
                type="button"
                onClick={handleLoginClick}
                className="font-semibold"
              >
                Sign in here.
              </button>
            </div>
          </div>
        </form>
      </section>
      {showLogin && <LoginModal onClose={handleCloseLogin} />}
    </>
  );
};

export default RegisterView;
