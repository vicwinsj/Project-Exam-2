import { Link } from "react-router-dom";

const Header = () => { return ( <header className='flex flex-col gap-10 mx-5 p-5 bg-ocean-700 shadow-2xl drop-shadow-ocean-700 h-full rounded-b-[20px]'><div className="flex justify-between"><div>
        <p>Holidaxe</p></div><nav className="text-white flex items-center gap-3"><Link to="/register" className="transition-colors duration-300 hover:text-turquoise-500">Register</Link><a href="" className="transition-colors duration-300 rounded-lg px-4 py-1 bg-white hover:bg-turquoise-500 text-ocean-700">Login</a></nav></div>
        <div className="w-full flex justify-center"><input
        className="transition-colors duration-300 w-1/2 px-6 text-center py-3 rounded-lg border-2 outline-none border-transparent focus:border-sunset-800 bg-white"
      type="text"
      placeholder="Where are your dreams taking you?"
    /></div></header> ); };

export default Header;