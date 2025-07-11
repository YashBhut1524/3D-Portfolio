import { useState } from "react";
import { navLinks } from "../constants";

const NavItems = ({ onClick = () => {} }) => {
    const [activeItem, setActiveItem] = useState(1);

    return (
        <ul className="flex flex-col items-center gap-4 sm:flex-row md:gap-6 relative z-50">
            {navLinks.map((item) => (
                <li
                    key={item.id}
                    className={`text-neutral-400 font-generalsans max-sm:w-full max-sm:rounded-md py-2 max-sm:px-5 transition-colors ${
                        activeItem === item.id ? 'text-white font-bold' : 'hover:text-white'
                    }`}
                >
                    <a
                        href={item.href}
                        className="text-lg md:text-base transition-colors"
                        onClick={() => {
                            setActiveItem(item.id);
                            onClick();
                        }}
                    >
                        {item.name}
                    </a>
                </li>
            ))}
        </ul>
    );
};

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    return (
        <header className="fixed top-0 left-0 right-0 bg-[#181818]/20 z-50">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center py-5 mx-auto sm:px-10 px-5">
                    <a
                        href="/"
                        className="text-neutral-400 font-bold text-xl hover:text-white transition-colors"
                    >
                        Yash
                    </a>

                    <button
                        onClick={toggleMenu}
                        className="text-neutral-400 hover:text-white focus:outline-none sm:hidden flex"
                        aria-label="Toggle menu"
                    >
                        <img
                            src={isOpen ? "assets/close.svg" : "assets/menu.svg"}
                            alt="toggle"
                            className="w-6 h-6"
                        />
                    </button>

                    <nav className="sm:flex hidden">
                        <NavItems />
                    </nav>
                </div>
            </div>

            <div className={`absolute left-0 right-0 bg-[#0D0D0F] backdrop-blur-sm transition-all duration-300 ease-in-out overflow-hidden z-50 mx-auto sm:hidden block ${isOpen ? "max-h-screen" : "max-h-0"}`}>
                <nav className="p-5">
                    <NavItems onClick={closeMenu} />
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
