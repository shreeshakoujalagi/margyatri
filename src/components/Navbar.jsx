import React, { useState } from 'react';
import { Menu, X, Compass, User, Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const { theme, toggleTheme } = useTheme();

    const navLinks = [
        { name: 'Home', path: '/home' },
        { name: 'AI Maps', path: '/aimaps' },
        { name: 'Hidden Gems', path: '/hidden-gems' },
        { name: 'Bookings', path: '/bookings' },
    ];

    return (
        <nav className="fixed w-full z-50 transition-all duration-300 bg-[var(--color-glass-bg)] backdrop-blur-md border-b border-[var(--color-glass-border)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link to="/home" className="flex items-center gap-2">
                        <div className="p-2 bg-gradient-to-tr from-primary to-secondary rounded-lg">
                            <Compass className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-text)] to-gray-500">
                            Marg Yatri
                        </span>
                    </Link>

                    <div className="hidden md:block">
                        <div className="ml-10 flex items-center space-x-6">
                            {navLinks.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${location.pathname === item.path
                                        ? 'bg-primary/10 text-primary'
                                        : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-input-bg)]'
                                        }`}
                                >
                                    {item.name}
                                </Link>
                            ))}

                            <button
                                onClick={toggleTheme}
                                className="p-2 rounded-full hover:bg-[var(--color-input-bg)] text-[var(--color-text)] transition-colors"
                            >
                                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                            </button>

                            <Link to="/profile" className="p-2 rounded-full hover:bg-[var(--color-input-bg)] text-[var(--color-text)] transition-colors">
                                <User className="w-5 h-5" />
                            </Link>

                            <Link to="/plan-trip" className="bg-gradient-to-r from-primary to-secondary px-4 py-2 rounded-full text-white text-sm font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all duration-300">
                                Plan Trip
                            </Link>
                        </div>
                    </div>

                    <div className="md:hidden flex items-center gap-4">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full hover:bg-[var(--color-input-bg)] text-[var(--color-text)] transition-colors"
                        >
                            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 rounded-md text-[var(--color-text)] hover:bg-[var(--color-input-bg)] focus:outline-none"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="md:hidden bg-[var(--color-bg)] border-b border-[var(--color-glass-border)]"
                >
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map((item) => (
                            <Link
                                key={item.name}
                                to={item.path}
                                onClick={() => setIsOpen(false)}
                                className={`block px-3 py-2 rounded-md text-base font-medium ${location.pathname === item.path
                                    ? 'bg-primary/10 text-primary'
                                    : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-input-bg)]'
                                    }`}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <Link
                            to="/profile"
                            onClick={() => setIsOpen(false)}
                            className="block px-3 py-2 rounded-md text-base font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-input-bg)]"
                        >
                            Profile
                        </Link>
                    </div>
                </motion.div>
            )}
        </nav>
    );
};

export default Navbar;
