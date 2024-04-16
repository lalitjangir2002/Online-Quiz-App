import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    return (
        <nav className="bg-blue-900 text-white py-6 w-full">
            <div className="mx-6 flex justify-between items-center">
                <div className="font-semibold">
                    <Link to="/">ONLINE QUIZ APP</Link>
                </div>
                <div className="hidden lg:flex">
                    <ul className="flex align-middle">
                    <li className="mr-6 hover:text-violet-600">
                            <Link to="/">Home</Link>
                        </li>
                        <li className="mr-6 hover:text-violet-600">
                            <Link to="/admin">Admin</Link>
                        </li>
                        <li className="mr-6 hover:text-violet-600">
                            <Link to="/quiz-stepper">Take Quiz</Link>
                        </li>
                    </ul>
                </div>
                <div className="lg:hidden">
                    <button onClick={toggleMenu} className="text-white focus:outline-none">
                        {isOpen ? (
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        ) : (
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        )}
                    </button>
                </div>
            </div>
            {isOpen && (
                <div className="lg:hidden fixed inset-0 bg-gray-900 bg-opacity-75 z-50">
                    <div className="flex justify-end h-full">
                        <div className="bg-white w-64 p-4">
                            <button onClick={closeMenu} className="absolute top-0 right-0 m-4 text-blue-900 hover:text-blue-600">
                                <svg
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                            <ul className="text-xl mt-12">
                                <li className="mb-4">
                                    <Link to="/" className="text-blue-900 hover:text-blue-600" onClick={toggleMenu}>Home</Link>
                                </li>
                                <li className="mb-4">
                                    <Link to="/admin" className="text-blue-900 hover:text-blue-600" onClick={toggleMenu}>Admin</Link>
                                </li>
                                <li>
                                    <Link to="/quiz-stepper" className="text-blue-900 hover:text-blue-600" onClick={toggleMenu}>Take Quiz</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
