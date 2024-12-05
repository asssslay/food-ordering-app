import foody from "../assets/icons/foody.svg";
import cartIcon from "../assets/icons/cart.svg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Button from "./elements/Button";
import { useEffect, useState } from "react";

export const Header = ({ cartCount }) => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        sessionStorage.removeItem('Auth token');
        sessionStorage.removeItem('User Id');
        window.dispatchEvent(new Event("storage"))
        navigate("/");
    }

    const handleHomeClick = (e) => {
        e.preventDefault();
        navigate('/');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleAboutClick = (e) => {
        e.preventDefault();
        navigate('/');
        setTimeout(() => {
            const aboutSection = document.querySelector('.bg-white');
            if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
    };

    useEffect(() => {
        const checkAuthToken = () => {
            const token = sessionStorage.getItem('Auth token');
            if (token) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        }

        window.addEventListener('storage', checkAuthToken);

        return () => {
            window.removeEventListener('storage', checkAuthToken);
        }
    }, [])

    return (
        <nav className="bg-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link to="/" className="flex items-center">
                            <img src={foody} alt="logo" className="h-6 w-auto"/>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" onClick={handleHomeClick} className="text-white hover:text-yellow-500 px-3 py-2 text-sm font-medium transition-colors duration-200">
                            Home
                        </Link>
                        <Link to="/" onClick={handleAboutClick} className="text-white hover:text-yellow-500 px-3 py-2 text-sm font-medium transition-colors duration-200">
                            About
                        </Link>
                    </div>

                    {/* Right Side Items */}
                    <div className="hidden md:flex items-center space-x-4">
                        <Link to="/cart" className="relative p-2 text-white hover:text-yellow-500 transition-colors duration-200">
                            <img src={cartIcon} alt="cart" className="w-6 h-6"/>
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-yellow-500 text-black w-5 h-5 flex items-center justify-center rounded-full text-xs font-bold">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                        {isLoggedIn ? (
                            <Button 
                                onClick={handleLogout}
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200"
                            >
                                Log Out
                            </Button>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link 
                                    to="/login"
                                    className="text-white hover:text-yellow-500 px-3 py-2 text-sm font-medium transition-colors duration-200"
                                >
                                    Log In
                                </Link>
                                <Link 
                                    to="/register"
                                    className="bg-yellow-500 hover:bg-yellow-400 text-black px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-yellow-500 focus:outline-none"
                        >
                            <svg
                                className="h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                {isMobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden absolute top-20 left-0 w-full bg-black`}>
                <div className="px-2 pt-2 pb-3 space-y-1">
                    <Link to="/" onClick={handleHomeClick} className="text-white hover:text-yellow-500 block px-3 py-2 text-base font-medium transition-colors duration-200">
                        Home
                    </Link>
                    <Link to="/" onClick={handleAboutClick} className="text-white hover:text-yellow-500 block px-3 py-2 text-base font-medium transition-colors duration-200">
                        About
                    </Link>
                    <div className="flex items-center justify-between px-3 py-2">
                        <Link to="/cart" className="relative text-white hover:text-yellow-500 transition-colors duration-200">
                            <img src={cartIcon} alt="cart" className="w-6 h-6"/>
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-yellow-500 text-black w-5 h-5 flex items-center justify-center rounded-full text-xs font-bold">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                        {isLoggedIn ? (
                            <Button 
                                onClick={handleLogout}
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200"
                            >
                                Log Out
                            </Button>
                        ) : (
                            <div className="flex flex-col space-y-2">
                                <Link 
                                    to="/login"
                                    className="block text-white hover:text-yellow-500 text-base font-medium transition-colors duration-200"
                                >
                                    Log In
                                </Link>
                                <Link 
                                    to="/register"
                                    className="bg-yellow-500 hover:bg-yellow-400 text-black px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 text-center"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
};