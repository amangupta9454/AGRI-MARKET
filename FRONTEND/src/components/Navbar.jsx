import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaSeedling } from 'react-icons/fa';

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
    setIsMenuOpen(false);
  };

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/product', label: 'Products' },
    { to: '/weather', label: 'Weather' },
    { to: '/prices', label: 'Price' },
    { to: '/loan', label: 'Loan' },
    { to: '/equipment', label: 'Equipment' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-linear-to-r from-gray-900/95 via-slate-800/95 to-gray-900/95 backdrop-blur-lg border-b border-white/10 shadow-lg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2.5 lg:gap-3"
              onClick={() => setIsMenuOpen(false)}
            >
              <FaSeedling className="text-2xl lg:text-3xl text-green-400" />
              <span className="text-xl sm:text-2xl lg:text-3xl font-bold bg-linear-to-r from-amber-400 via-yellow-300 to-green-400 bg-clip-text text-transparent tracking-wide">
                FARMIO
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-x-1 xl:gap-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="relative px-3 py-2 text-base lg:text-lg font-medium text-white/90 hover:text-amber-400 transition-colors group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-3 right-3 h-0.5 bg-linear-to-r from-amber-400 to-green-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
                </Link>
              ))}
            </div>

            {/* Desktop Auth Section */}
            <div className="hidden lg:flex items-center gap-4">
              {user ? (
                <>
                  {user.role === 'farmer' && (
                    <Link
                      to="/farmer"
                      className="px-5 py-2.5 bg-linear-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white font-medium rounded-lg shadow-md transition-all duration-300 whitespace-nowrap"
                    >
                      Farmer Dashboard
                    </Link>
                  )}
                  {user.role === 'consumer' && (
                    <Link
                      to="/consumer"
                      className="px-5 py-2.5 bg-linear-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white font-medium rounded-lg shadow-md transition-all duration-300 whitespace-nowrap"
                    >
                      Consumer Dashboard
                    </Link>
                  )}
                  {user.role === 'admin' && (
                    <Link
                      to="/admin"
                      className="px-5 py-2.5 bg-linear-to-r from-amber-600 to-orange-700 hover:from-amber-700 hover:to-orange-800 text-white font-medium rounded-lg shadow-md transition-all duration-300 whitespace-nowrap"
                    >
                      Admin Panel
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="px-5 py-2.5 bg-gray-700/70 hover:bg-red-600/90 border border-gray-600 hover:border-red-500 text-white font-medium rounded-lg transition-all duration-300"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="px-6 py-2.5 bg-linear-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white font-medium rounded-lg shadow-md transition-all duration-300"
                >
                  Login
                </Link>
              )}
            </div>

            {/* Mobile Hamburger Button */}
            <button
              className="lg:hidden p-2.5 rounded-lg hover:bg-white/10 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {isMenuOpen ? (
                <FaTimes className="text-2xl text-amber-400" />
              ) : (
                <FaBars className="text-2xl text-white" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay + Panel */}
      <div
        className={`lg:hidden fixed inset-0 z-40 transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
        />

        {/* Slide-in Panel */}
        <div
          className={`absolute top-0 right-0 h-full w-4/5 max-w-xs bg-linear-to-b from-gray-900 to-slate-950 shadow-2xl transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col h-full pt-20 pb-10 px-6 overflow-y-auto">
            {/* Navigation Links */}
            <div className="flex flex-col space-y-3 mb-12">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="py-4 px-5 text-lg font-medium text-white/90 hover:text-amber-400 hover:bg-white/10 rounded-xl transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Auth Section */}
            <div className="mt-auto pt-8 border-t border-white/10 space-y-4">
              {user ? (
                <>
                  {user.role === 'farmer' && (
                    <Link
                      to="/farmer"
                      className="block py-4 px-6 bg-linear-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 rounded-xl text-center font-medium shadow-md transition-all duration-300"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Farmer Dashboard
                    </Link>
                  )}
                  {user.role === 'consumer' && (
                    <Link
                      to="/consumer"
                      className="block py-4 px-6 bg-linear-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 rounded-xl text-center font-medium shadow-md transition-all duration-300"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Consumer Dashboard
                    </Link>
                  )}
                  {user.role === 'admin' && (
                    <Link
                      to="/admin"
                      className="block py-4 px-6 bg-linear-to-r from-amber-600 to-orange-700 hover:from-amber-700 hover:to-orange-800 rounded-xl text-center font-medium shadow-md transition-all duration-300"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Admin Panel
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="w-full py-4 px-6 bg-gray-700/80 hover:bg-red-600/90 border border-gray-600 hover:border-red-500 rounded-xl font-medium transition-all duration-300"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="block py-4 px-6 bg-linear-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 rounded-xl text-center font-medium shadow-md transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;