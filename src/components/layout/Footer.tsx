import logo from "../../assets/holidaze_small_orange.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <footer className="w-full text-white h-full flex flex-col gap-10 md:gap-20 p-3 md:p-10 bg-ocean-700 rounded-t-[20px]">
      <div className="flex flex-col md:flex-row justify-between">
        {/* Help */}
        <details className="group flex-1 md:hidden relative">
          <summary className="text-turquoise-500 font-rubik font-semibold">
            <span className="group-open:hidden absolute right-2">
              <FontAwesomeIcon icon={faAngleDown}></FontAwesomeIcon>
            </span>
            <span className="hidden group-open:inline absolute right-2">
              <FontAwesomeIcon icon={faAngleUp}></FontAwesomeIcon>
            </span>
            Help
          </summary>
          <ul className="flex flex-col gap-1">
            <li>Support Center</li>
            <li>Cancel booking</li>
            <li>Contact us</li>
          </ul>
        </details>

        <div className="hidden md:flex flex-col gap-1 flex-1">
          <h3 className="text-turquoise-500">Help</h3>
          <ul className="flex flex-col gap-1">
            <li>Support Center</li>
            <li>Cancel booking</li>
            <li>Contact us</li>
          </ul>
        </div>

        {/* Discover */}
        <details className="group flex-1 md:hidden relative">
          <summary className=" text-turquoise-500 font-rubik font-semibold">
            <span className="group-open:hidden absolute right-2">
              <FontAwesomeIcon icon={faAngleDown}></FontAwesomeIcon>
            </span>
            <span className="hidden group-open:inline absolute right-2">
              <FontAwesomeIcon icon={faAngleUp}></FontAwesomeIcon>
            </span>
            Discover
          </summary>
          <ul className="flex flex-col gap-1">
            <li>Destinations</li>
            <li>Accomodation Types</li>
            <li>Support Center</li>
            <li>Gift Cards</li>
          </ul>
        </details>

        <div className="hidden md:flex flex-col gap-1 flex-1">
          <h3 className="text-turquoise-500">Discover</h3>
          <ul className="flex flex-col gap-1">
            <li>Destinations</li>
            <li>Accomodation Types</li>
            <li>Support Center</li>
            <li>Gift Cards</li>
          </ul>
        </div>

        {/* Company */}
        <details className="group flex-1 md:hidden relative">
          <summary className="text-turquoise-500 font-rubik font-semibold">
            <span className="group-open:hidden absolute right-2">
              <FontAwesomeIcon icon={faAngleDown}></FontAwesomeIcon>
            </span>
            <span className="hidden group-open:inline absolute right-2">
              <FontAwesomeIcon icon={faAngleUp}></FontAwesomeIcon>
            </span>
            Company
          </summary>
          <ul className="flex flex-col gap-1">
            <li>Career</li>
            <li>About</li>
            <li>Advertising</li>
            <li>News</li>
          </ul>
        </details>

        <div className="hidden md:flex flex-col gap-1 flex-1">
          <h3 className="text-turquoise-500">Company</h3>
          <ul className="flex flex-col gap-1">
            <li>Destinations</li>
            <li>Accomodation Types</li>
            <li>Support Center</li>
            <li>Gift Cards</li>
          </ul>
        </div>

        {/* Policies */}
        <details className="group flex-1 md:hidden relative">
          <summary className="text-turquoise-500 font-rubik font-semibold">
            <span className="group-open:hidden absolute right-2">
              <FontAwesomeIcon icon={faAngleDown}></FontAwesomeIcon>
            </span>
            <span className="hidden group-open:inline absolute right-2">
              <FontAwesomeIcon icon={faAngleUp}></FontAwesomeIcon>
            </span>
            Policies
          </summary>
          <ul className="flex flex-col gap-1">
            <li>Privacy</li>
            <li>Terms of Use</li>
            <li>Cookies</li>
          </ul>
        </details>

        <div className="hidden md:flex flex-col gap-1 flex-1">
          <h3 className="text-turquoise-500">Policies</h3>
          <ul className="flex flex-col gap-1">
            <li>Privacy</li>
            <li>Terms of Use</li>
            <li>Cookies</li>
          </ul>
        </div>
      </div>
      <div className="w-full flex flex-col md:flex-row justify-center items-center gap-1 text-sm">
        <div className="flex flex-col md:flex-row w-fit justify-center items-center gap-3">
          <div className="md:self-start ">
            <img className="size-5" src={logo} />
          </div>
          <p className="flex flex-col items-center text-center w-full gap-1">
            <span className="w-full">
              <strong className="w-fit">©2025 Holidaze Inc.,</strong>
              <span className="w-fit"> a part of Holiday Group.</span>
            </span>
            <span className="w-fit">All rights reserved.</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
