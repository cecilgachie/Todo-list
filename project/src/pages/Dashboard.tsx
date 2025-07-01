import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Plus,
  Search,
  Filter,
  Grid3X3,
  List,
  Folder,
  Clock,
  Star,
  Share2,
  MoreHorizontal,
  Trash2,
  Edit3,
} from 'lucide-react';
import { RootState } from '../store';

const Dashboard: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { currentDesign } = useSelector((state: RootState) => state.design);

  // Mock data for now
  const recentDesigns = [
    {
      id: '1',
      name: 'Summer Sale Poster',
      thumbnail: 'https://images.pexels.com/photos/1097456/pexels-photo-1097456.jpeg?auto=compress&cs=tinysrgb&w=300&h=400',
      updatedAt: '2 hours ago',
      isPublic: false,
    },
    {
      id: '2',
      name: 'Event Flyer Design',
      thumbnail: 'https://images.pexels.com/photos/1367856/pexels-photo-1367856.jpeg?auto=compress&cs=tinysrgb&w=300&h=400',
      updatedAt: '1 day ago',
      isPublic: true,
    },
    {
      id: '3',
      name: 'Restaurant Menu',
      thumbnail: 'https://images.pexels.com/photos/616401/pexels-photo-616401.jpeg?auto=compress&cs=tinysrgb&w=300&h=400',
      updatedAt: '3 days ago',
      isPublic: false,
    },
    {
      id: '4',
      name: 'Social Media Post',
      thumbnail: 'https://images.pexels.com/photos/1762851/pexels-photo-1762851.jpeg?auto=compress&cs=tinysrgb&w=300&h=400',
      updatedAt: '1 week ago',
      isPublic: true,
    },
  ];

  const quickActions = [
    {
      title: 'Create New Design',
      description: 'Start from scratch with a blank canvas',
      icon: Plus,
      action: '/editor/new',
      color: 'from-primary-500 to-primary-600',
    },
    {
      title: 'Browse Templates',
      description: 'Choose from thousands of templates',
      icon: Grid3X3,
      action: '/templates',
      color: 'from-secondary-500 to-secondary-600',
    },
    {
      title: 'AI Assistant',
      description: 'Generate designs with AI help',
      icon: Star,
      action: '/ai-assistant',
      color: 'from-accent-500 to-accent-600',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-gray-600">
            Ready to create something amazing today?
          </p>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          {quickActions.map((action, index) => (
            <Link
              key={action.title}
              to={action.action}
              className="group relative overflow-hidden bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${action.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
              <div className="p-6">
                <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-xl flex items-center justify-center mb-4`}>
                  <action.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {action.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {action.description}
                </p>
              </div>
            </Link>
          ))}
        </motion.div>

        {/* Recent Designs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Recent Designs</h2>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search designs..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                  />
                </div>
                <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                  <Filter className="h-5 w-5" />
                </button>
                <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                  <Grid3X3 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Designs Grid */}
          <div className="p-6">
            {recentDesigns.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {recentDesigns.map((design, index) => (
                  <motion.div
                    key={design.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="group relative bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-all"
                  >
                    {/* Thumbnail */}
                    <div className="aspect-[3/4] overflow-hidden">
                      <img
                        src={design.thumbnail}
                        alt={design.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Overlay Actions */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                      <Link
                        to={`/editor/${design.id}`}
                        className="p-2 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-colors"
                      >
                        <Edit3 className="h-4 w-4" />
                      </Link>
                      <button className="p-2 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-colors">
                        <Share2 className="h-4 w-4" />
                      </button>
                      <button className="p-2 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-colors">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Status Indicators */}
                    <div className="absolute top-2 right-2 flex space-x-1">
                      {design.isPublic && (
                        <div className="p-1 bg-success-500 rounded-full">
                          <Share2 className="h-3 w-3 text-white" />
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="p-4">
                      <h3 className="font-medium text-gray-900 mb-1 truncate">
                        {design.name}
                      </h3>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-3 w-3 mr-1" />
                        {design.updatedAt}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Folder className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No designs yet
                </h3>
                <p className="text-gray-600 mb-6">
                  Start creating your first design to see it here.
                </p>
                <Link
                  to="/editor/new"
                  className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Design
                </Link>
              </div>
            )}
          </div>
        </motion.div>

        {/* Usage Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            { label: 'Designs Created', value: '12', max: user?.subscription === 'free' ? 20 : 'Unlimited' },
            { label: 'AI Generations', value: '45', max: user?.subscription === 'free' ? 50 : 'Unlimited' },
            { label: 'Storage Used', value: '2.3 GB', max: user?.subscription === 'free' ? '5 GB' : '100 GB' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">{stat.label}</span>
                <span className="text-sm text-gray-500">{stat.value}/{stat.max}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full"
                  style={{ width: `${stat.max === 'Unlimited' ? 0 : (parseInt(stat.value) / parseInt(stat.max.toString())) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;