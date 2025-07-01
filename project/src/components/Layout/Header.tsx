import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  User, 
  Settings, 
  LogOut, 
  Crown,
  Bell,
  Menu
} from 'lucide-react';
import { RootState } from '../../store';
import { logout } from '../../store/slices/authSlice';
import { toggleSidebar } from '../../store/slices/uiSlice';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { notifications } = useSelector((state: RootState) => state.ui);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const unreadNotifications = notifications.filter(n => !n.autoDismiss).length;

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Navigation */}
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2">
              <motion.div
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.3 }}
                className="p-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg"
              >
                <Sparkles className="h-6 w-6 text-white" />
              </motion.div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                AI Poster
              </span>
            </Link>

            {isAuthenticated && (
              <nav className="hidden md:flex items-center space-x-6">
                <Link
                  to="/dashboard"
                  className="text-gray-700 hover:text-primary-600 transition-colors font-medium"
                >
                  Dashboard
                </Link>
                <Link
                  to="/templates"
                  className="text-gray-700 hover:text-primary-600 transition-colors font-medium"
                >
                  Templates
                </Link>
                <Link
                  to="/designs"
                  className="text-gray-700 hover:text-primary-600 transition-colors font-medium"
                >
                  My Designs
                </Link>
              </nav>
            )}
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {/* Notifications */}
                <div className="relative">
                  <button className="p-2 text-gray-600 hover:text-primary-600 transition-colors">
                    <Bell className="h-5 w-5" />
                    {unreadNotifications > 0 && (
                      <span className="absolute -top-1 -right-1 bg-error-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {unreadNotifications}
                      </span>
                    )}
                  </button>
                </div>

                {/* Upgrade Button */}
                {user?.subscription === 'free' && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/pricing')}
                    className="flex items-center space-x-1 px-3 py-1.5 bg-gradient-to-r from-accent-500 to-accent-600 text-white rounded-full text-sm font-medium hover:from-accent-600 hover:to-accent-700 transition-all"
                  >
                    <Crown className="h-4 w-4" />
                    <span>Upgrade</span>
                  </motion.button>
                )}

                {/* User Menu */}
                <div className="relative group">
                  <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors">
                    {user?.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="h-8 w-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="h-8 w-8 bg-primary-500 rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-white" />
                      </div>
                    )}
                    <span className="hidden md:block text-sm font-medium text-gray-700">
                      {user?.name}
                    </span>
                  </button>

                  {/* Dropdown Menu */}
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="py-1">
                      <Link
                        to="/profile"
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <User className="h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                      <Link
                        to="/settings"
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <Settings className="h-4 w-4" />
                        <span>Settings</span>
                      </Link>
                      <hr className="my-1 border-gray-200" />
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-error-600 hover:bg-error-50 transition-colors"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                  onClick={() => dispatch(toggleSidebar())}
                  className="md:hidden p-2 text-gray-600 hover:text-primary-600 transition-colors"
                >
                  <Menu className="h-5 w-5" />
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-primary-600 transition-colors font-medium"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;