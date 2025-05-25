import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateRight } from "@fortawesome/free-solid-svg-icons";
import { Button } from "./form/Button";
import { Link } from "react-router-dom";
import { ErrorMessageProps } from "../types/error";

export const ErrorMessage = ({ error, refetch }: ErrorMessageProps) => {
  const handleRetry = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (refetch) {
      await refetch();
    }
    window.location.reload();
  };

  return (
    <div className="p-3 lg:p-10 gap-10 flex flex-col justify-center items-center">
      <h1 className="text-3xl lg:text-5xl">Well, this is embarrassing!</h1>
      <div className="flex flex-col justify-center items-center gap-1">
        <p>An error occurred while trying to load page content:</p>
        <p className="font-xs font-semibold">"{error}"</p>
      </div>
      <div className="flex items-center justify-center gap-3">
        <Button
          onClick={handleRetry}
          variant="primary"
          className="flex gap-1 items-center"
        >
          <FontAwesomeIcon icon={faArrowRotateRight}></FontAwesomeIcon>Try Again
        </Button>
        <Button variant="outline">
          <Link to={`mailto:${"manager@holidaze.com"}`}>Report Issue</Link>
        </Button>
      </div>
    </div>
  );
};
