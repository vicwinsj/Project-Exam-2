import { Button } from "../components/form/Button";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logos/holidaze_small.svg";

const NotFoundView = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = `holidaze | Not Found}`;
  });

  return (
    <div className="p-3 lg:p-10 gap-10 flex flex-col justify-center items-center">
      <h1 className="text-3xl lg:text-5xl">Nothing to see here!</h1>
      <div className="flex flex-col justify-center items-center gap-1">
        <p>This page doesn't exist – yet.</p>
      </div>
      <div className="flex items-center justify-center gap-3">
        <Button
          onClick={() => navigate("/")}
          variant="secondary"
          className="flex gap-1 items-center"
        >
          <div className="size-7">
            <img src={logo} className="size-full object-cover" />
          </div>
          Home
        </Button>
      </div>
    </div>
  );
};

export default NotFoundView;
