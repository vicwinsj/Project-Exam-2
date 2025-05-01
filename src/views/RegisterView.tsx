import { useState } from "react";
import { Button } from "../components/form/Button";
import { registerUser, loginUser } from "../api/auth";

const RegisterView = () => {
  const [accountType, setAccountType] = useState("customer");

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
        const result = await registerUser(userData);
        console.log(result);
        // Success message pops up
        loginUser({ email, password });
      } catch (error) {
        if (error instanceof Error) {
          setServerError(error.message);
        }
      }
    }
  };

  return (
    <section className="flex flex-col items-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-10 w-1/3 p-10 border-1 border-neutral-500 rounded-xl"
      >
        <h1 className="text-xl text-black w-full text-center">
          Create account
        </h1>
        <div className="flex flex-col gap-10">
          <fieldset className="flex gap-3">
            <legend className="font-semibold">Select account type</legend>
            <label className="cursor-pointer">
              <input
                type="radio"
                name="radio"
                value="customer"
                checked={accountType === "customer"}
                onChange={() => setAccountType("customer")}
              />{" "}
              Customer
            </label>
            <label className="cursor-pointer">
              <input
                type="radio"
                name="radio"
                value="manager"
                checked={accountType === "manager"}
                onChange={() => setAccountType("manager")}
              />{" "}
              Manager
            </label>
          </fieldset>
          <fieldset className="flex flex-col gap-3">
            <div className="flex flex-col gap-1 ">
              <label htmlFor="name">Name</label>
              <input
                className={`transition-colors duration-300 px-3 py-1 border-1 rounded-lg hover:bg-air-100 outline-sunset-800 border-neutral-300 ${
                  errors.name && "border-red-500"
                }`}
                type="text"
                name="name"
                required
              />
              {errors.name && <p className="text-red-500">{errors.name}.</p>}
            </div>
            <div className="flex flex-col gap-1 ">
              <label htmlFor="email">Email</label>
              <input
                className={`transition-colors duration-300 px-3 py-1 border-1 rounded-lg hover:bg-air-100 outline-sunset-800 border-neutral-300 ${
                  errors.email && "border-red-500"
                }`}
                type="email"
                name="email"
                required
              />
              {errors.email && <p className="text-red-500">{errors.email}.</p>}
            </div>
            <div className="flex flex-col gap-1 ">
              <label htmlFor="password">Password</label>
              <input
                className={`transition-colors duration-300 px-3 py-1 border-1 rounded-lg hover:bg-air-100 outline-sunset-800 border-neutral-300 ${
                  errors.password && "border-red-500"
                } ${errors.confirmPassword && "border-red-500"}`}
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
                className={`transition-colors duration-300 px-3 py-1 border-1 rounded-lg hover:bg-air-100 outline-sunset-800 border-neutral-300 ${
                  errors.confirmPassword && "border-red-500"
                }`}
                type="password"
                name="confirm-password"
                required
              />
              {errors.confirmPassword && (
                <p className="text-red-500">{errors.confirmPassword}.</p>
              )}
            </div>
          </fieldset>
          <Button type="submit" variant="primary">
            Register
          </Button>
          {serverError && <p className="text-red-600">{serverError}!</p>}
          <div className="flex gap-1">
            <p>Already got an account?</p>
            <p className="font-semibold">Sign in here.</p>
          </div>
        </div>
      </form>
    </section>
  );
};

export default RegisterView;
