import logo from "../../assets/holidaze_small.svg";

const Footer = () => {
  return (
    <footer className="text-white h-80 flex flex-col gap-20 p-10 bg-ocean-700 border-t-1 border-x-1 border-solid border-ocean-700 rounded-t-[20px]">
      <div className="flex justify-between">
        <ul className="flex flex-col gap-1 flex-[1]">
          <h3 className="text-turquoise-500">Help</h3>
          <li className="text-[16px]">Support Center</li>
          <li>Cancel booking</li>
          <li>Contact us</li>
        </ul>
        <ul className="flex flex-col gap-1 flex-[1]">
          <h3 className="text-turquoise-500">Discover</h3>
          <li>Destinations</li>
          <li>Accomodation Types</li>
          <li>Support Center</li>
          <li>Gift Cards</li>
        </ul>
        <ul className="flex flex-col gap-1 flex-[1]">
          <h3 className="text-turquoise-500">Company</h3>
          <li>Career</li>
          <li>About</li>
          <li>Advertising</li>
          <li>News</li>
        </ul>
        <ul className="flex flex-col gap-1 flex-[1]">
          <h3 className="text-turquoise-500">Policies</h3>
          <li>Privacy</li>
          <li>Terms of Use</li>
          <li>Cookies</li>
        </ul>
      </div>
      <div className="flex justify-center items-center gap-3">
        <div className="border-white border-1">
          <img className="w-5 h-full" src={logo} />
        </div>
        <p className="text-sm">
          <strong>©2025 Holidaze Inc.</strong>, a part of Holiday Group. All
          rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
