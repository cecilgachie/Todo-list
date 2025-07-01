import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { BookTemplate as Template, Type, Image, Shapes, Palette, Sparkles, X, Search } from 'lucide-react';
import { RootState } from '../../store';
import { setActivePanel, setSidebarOpen } from '../../store/slices/uiSlice';

const Sidebar: React.FC = () => {
  const dispatch = useDispatch();
  const { sidebarOpen, activePanel } = useSelector((state: RootState) => state.ui);

  const panels = [
    { id: 'templates', label: 'Templates', icon: Template },
    { id: 'text', label: 'Text', icon: Type },
    { id: 'images', label: 'Images', icon: Image },
    { id: 'elements', label: 'Elements', icon: Shapes },
    { id: 'brand', label: 'Brand Kit', icon: Palette },
  ] as const;

  const handlePanelClick = (panelId: typeof panels[number]['id']) => {
    if (activePanel === panelId) {
      dispatch(setActivePanel(null));
    } else {
      dispatch(setActivePanel(panelId));
      if (!sidebarOpen) {
        dispatch(setSidebarOpen(true));
      }
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => dispatch(setSidebarOpen(false))}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -320 }}
        animate={{ x: sidebarOpen ? 0 : -320 }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-80 bg-white border-r border-gray-200 z-50 md:relative md:top-0 md:h-screen"
      >
        <div className="flex h-full">
          {/* Panel Navigation */}
          <div className="w-16 bg-gray-50 border-r border-gray-200 flex flex-col items-center py-4 space-y-2">
            {panels.map(({ id, label, icon: Icon }) => (
              <motion.button
                key={id}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handlePanelClick(id)}
                className={`p-3 rounded-lg transition-all ${
                  activePanel === id
                    ? 'bg-primary-100 text-primary-600'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
                title={label}
              >
                <Icon className="h-5 w-5" />
              </motion.button>
            ))}

            {/* AI Assistant */}
            <div className="pt-4 border-t border-gray-200">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-lg bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg"
                title="AI Assistant"
              >
                <Sparkles className="h-5 w-5" />
              </motion.button>
            </div>
          </div>

          {/* Panel Content */}
          <div className="flex-1 flex flex-col h-full">
            {/* Panel Header */}
            {activePanel && (
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">
                  {panels.find(p => p.id === activePanel)?.label}
                </h2>
                <button
                  onClick={() => dispatch(setActivePanel(null))}
                  className="p-1 text-gray-400 hover:text-gray-600 transition-colors md:hidden"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            )}

            {/* Panel Content */}
            <div className="flex-1 overflow-y-auto">
              <AnimatePresence mode="wait">
                {activePanel === 'templates' && <TemplatesPanel />}
                {activePanel === 'text' && <TextPanel />}
                {activePanel === 'images' && <ImagesPanel />}
                {activePanel === 'elements' && <ElementsPanel />}
                {activePanel === 'brand' && <BrandPanel />}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
};

// Panel Components
const TemplatesPanel: React.FC = () => {
  const { templates, searchQuery } = useSelector((state: RootState) => state.templates);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="p-4 space-y-4"
    >
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search templates..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </div>

      {/* Categories */}
      <div className="grid grid-cols-2 gap-2">
        {['Business', 'Event', 'Social', 'Education'].map((category) => (
          <button
            key={category}
            className="p-3 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {category}
          </button>
        ))}
      </div>

      {/* Template Grid */}
      <div className="grid grid-cols-2 gap-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="aspect-[3/4] bg-gradient-to-br from-primary-100 to-secondary-100 rounded-lg cursor-pointer shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="w-full h-full rounded-lg bg-white/50 flex items-center justify-center">
              <span className="text-xs text-gray-600">Template {i}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const TextPanel: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="p-4 space-y-4"
  >
    <div className="space-y-3">
      {['Add Heading', 'Add Subheading', 'Add Body Text'].map((option) => (
        <button
          key={option}
          className="w-full p-3 text-left text-sm font-medium bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {option}
        </button>
      ))}
    </div>
  </motion.div>
);

const ImagesPanel: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="p-4 space-y-4"
  >
    <button className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-center hover:border-primary-400 transition-colors">
      <span className="text-sm text-gray-600">Upload Image</span>
    </button>
    
    <div className="grid grid-cols-2 gap-2">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="aspect-square bg-gray-200 rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
        />
      ))}
    </div>
  </motion.div>
);

const ElementsPanel: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="p-4 space-y-4"
  >
    <div className="grid grid-cols-3 gap-3">
      {['Rectangle', 'Circle', 'Triangle', 'Line', 'Arrow', 'Star'].map((shape) => (
        <button
          key={shape}
          className="aspect-square bg-gray-50 rounded-lg flex items-center justify-center text-xs font-medium hover:bg-gray-100 transition-colors"
        >
          {shape}
        </button>
      ))}
    </div>
  </motion.div>
);

const BrandPanel: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="p-4 space-y-4"
  >
    <div className="text-center py-8">
      <p className="text-sm text-gray-600">No brand kit yet</p>
      <button className="mt-2 px-4 py-2 bg-primary-600 text-white text-sm rounded-lg hover:bg-primary-700 transition-colors">
        Create Brand Kit
      </button>
    </div>
  </motion.div>
);

export default Sidebar;