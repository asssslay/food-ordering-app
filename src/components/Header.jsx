import foody from "../assets/icons/foody.svg";
import cartIcon from "../assets/icons/cart.svg";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export const Header = ({ cartCount }) => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

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

                    {/* Navigation Links */}
                    <div className="flex items-center space-x-8">
                        <Link to="/" onClick={handleHomeClick} className="text-white hover:text-yellow-500 px-3 py-2 text-sm font-medium transition-colors duration-200">
                            Home
                        </Link>
                        <Link to="/" onClick={handleAboutClick} className="text-white hover:text-yellow-500 px-3 py-2 text-sm font-medium transition-colors duration-200">
                            About
                        </Link>
                    </div>

                    {/* Right Side Items */}
                    <div className="flex items-center space-x-4">
                        <Link to="/cart" className="text-white hover:text-yellow-500 transition-colors duration-200">
                            <div className="relative">
                                <img src={cartIcon} alt="cart" className="w-6 h-6"/>
                                {cartCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-yellow-500 text-black rounded-full w-5 h-5 flex items-center justify-center text-xs font-semibold">
                                        {cartCount}
                                    </span>
                                )}
                            </div>
                        </Link>
                        {isLoggedIn && (
                            <Link to="/orders" className="text-white hover:text-yellow-500 px-3 py-2 text-sm font-medium transition-colors duration-200">
                                My Orders
                            </Link>
                        )}
                        {isLoggedIn ? 
                            <button onClick={handleLogout} className="text-white hover:text-yellow-500 px-3 py-2 text-sm font-medium transition-colors duration-200">
                                Logout
                            </button>
                            :
                            <>
                                <Link to="/login" className="text-white hover:text-yellow-500 px-3 py-2 text-sm font-medium transition-colors duration-200">
                                    Login
                                </Link>
                                <Link to="/register" className="text-white hover:text-yellow-500 px-3 py-2 text-sm font-medium transition-colors duration-200">
                                    Sign Up
                                </Link>
                            </>
                        }
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Header;