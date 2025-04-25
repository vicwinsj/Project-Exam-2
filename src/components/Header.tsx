import { Link } from "react-router-dom";

const Header = () => { return ( <header className='flex flex-col gap-10 mx-5 p-5 bg-primaryBlue shadow-2xl drop-shadow-primaryBlue h-full rounded-b-[20px]'><div className="flex justify-between"><div>
        <p>Holidaxe</p></div><nav className="text-white flex items-center gap-3"><Link to="/register" className="transition-colors duration-300 hover:text-turquoise">Register</Link><a href="" className="transition-colors duration-300 rounded-lg px-4 py-1 bg-white hover:bg-turquoise text-primaryBlue">Login</a></nav></div>
        <div className="w-full flex justify-center"><input
        className="w-1/2 px-6 text-center py-3 rounded-lg border-transparent hover:border-orange bg-white"
      type="text"
      placeholder="Where are your dreams taking you?"
    /></div></header> ); };

export default Header;