import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut, Search, Bell, MessageSquare } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { currentUser, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/browse?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsMenuOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-teal-500 to-purple-600 text-white p-2 rounded-lg mr-2">
                <div className="font-bold">SM</div>
              </div>
              <span className="font-bold text-xl text-gray-900">ServiceMarket</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link
              to="/"
              className={`nav-link text-gray-700 hover:text-teal-600 ${
                isActive('/') ? 'text-teal-600 font-medium' : ''
              }`}
            >
              Home
            </Link>
            <Link
              to="/browse"
              className={`nav-link text-gray-700 hover:text-teal-600 ${
                isActive('/browse') ? 'text-teal-600 font-medium' : ''
              }`}
            >
              Browse
            </Link>
            {isAuthenticated && (
              <Link
                to="/create-listing"
                className={`nav-link text-gray-700 hover:text-teal-600 ${
                  isActive('/create-listing') ? 'text-teal-600 font-medium' : ''
                }`}
              >
                Create Listing
              </Link>
            )}
          </nav>

          {/* Desktop Search & Auth */}
          <div className="hidden md:flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search services..."
                className="w-48 pl-9 pr-3 py-1.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </form>

            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link to="/messages" className="text-gray-700 hover:text-teal-600 relative">
                  <MessageSquare className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">3</span>
                </Link>
                <Link to="/notifications" className="text-gray-700 hover:text-teal-600 relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">2</span>
                </Link>
                <div className="relative group">
                  <div className="flex items-center space-x-1 cursor-pointer">
                    <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                      {currentUser?.avatar ? (
                        <img 
                          src={currentUser.avatar} 
                          alt={currentUser.name} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="w-full h-full p-1 text-gray-600" />
                      )}
                    </div>
                  </div>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 z-50">
                    <Link 
                      to="/profile" 
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login" className="btn btn-outline btn-sm">
                  Sign In
                </Link>
                <Link to="/register" className="btn btn-primary btn-sm">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button 
            onClick={toggleMenu}
            className="md:hidden text-gray-700 hover:text-teal-600 focus:outline-none"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 animate-fadeIn">
            <form onSubmit={handleSearch} className="mb-4 relative">
              <input
                type="text"
                placeholder="Search services..."
                className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </form>

            <nav className="flex flex-col space-y-3">
              <Link
                to="/"
                className={`text-gray-700 hover:text-teal-600 py-2 ${
                  isActive('/') ? 'text-teal-600 font-medium' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/browse"
                className={`text-gray-700 hover:text-teal-600 py-2 ${
                  isActive('/browse') ? 'text-teal-600 font-medium' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Browse
              </Link>
              {isAuthenticated && (
                <Link
                  to="/create-listing"
                  className={`text-gray-700 hover:text-teal-600 py-2 ${
                    isActive('/create-listing') ? 'text-teal-600 font-medium' : ''
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Create Listing
                </Link>
              )}

              {isAuthenticated ? (
                <>
                  <div className="border-t border-gray-200 my-2 pt-2"></div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden mr-2">
                      {currentUser?.avatar ? (
                        <img 
                          src={currentUser.avatar} 
                          alt={currentUser.name} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="w-full h-full p-1 text-gray-600" />
                      )}
                    </div>
                    <span className="text-gray-800 font-medium">{currentUser?.name}</span>
                  </div>
                  <Link
                    to="/profile"
                    className="text-gray-700 hover:text-teal-600 py-2 pl-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    to="/messages"
                    className="text-gray-700 hover:text-teal-600 py-2 pl-2 flex items-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span>Messages</span>
                    <span className="ml-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">3</span>
                  </Link>
                  <Link
                    to="/notifications"
                    className="text-gray-700 hover:text-teal-600 py-2 pl-2 flex items-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span>Notifications</span>
                    <span className="ml-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">2</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-gray-700 hover:text-teal-600 py-2 pl-2 flex items-center w-full text-left"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    <span>Sign Out</span>
                  </button>
                </>
              ) : (
                <>
                  <div className="border-t border-gray-200 my-2 pt-2"></div>
                  <Link
                    to="/login"
                    className="btn btn-outline w-full"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="btn btn-primary w-full"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;