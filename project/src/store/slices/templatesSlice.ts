import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Template, TemplateCategory } from '../../types';

interface TemplatesState {
  templates: Template[];
  categories: TemplateCategory[];
  selectedCategory: TemplateCategory | 'all';
  searchQuery: string;
  filteredTemplates: Template[];
  isLoading: boolean;
  error: string | null;
}

const initialState: TemplatesState = {
  templates: [],
  categories: [
    'business',
    'event',
    'social-media',
    'education',
    'health',
    'real-estate',
    'restaurant',
    'fitness',
    'beauty',
    'technology',
  ],
  selectedCategory: 'all',
  searchQuery: '',
  filteredTemplates: [],
  isLoading: false,
  error: null,
};

const templatesSlice = createSlice({
  name: 'templates',
  initialState,
  reducers: {
    setTemplates: (state, action: PayloadAction<Template[]>) => {
      state.templates = action.payload;
      state.filteredTemplates = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<TemplateCategory | 'all'>) => {
      state.selectedCategory = action.payload;
      state.filteredTemplates = state.templates.filter(template => {
        const categoryMatch = action.payload === 'all' || template.category === action.payload;
        const searchMatch = state.searchQuery === '' || 
          template.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
          template.tags.some(tag => tag.toLowerCase().includes(state.searchQuery.toLowerCase()));
        return categoryMatch && searchMatch;
      });
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.filteredTemplates = state.templates.filter(template => {
        const categoryMatch = state.selectedCategory === 'all' || template.category === state.selectedCategory;
        const searchMatch = action.payload === '' || 
          template.name.toLowerCase().includes(action.payload.toLowerCase()) ||
          template.tags.some(tag => tag.toLowerCase().includes(action.payload.toLowerCase()));
        return categoryMatch && searchMatch;
      });
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setTemplates,
  setSelectedCategory,
  setSearchQuery,
  setLoading,
  setError,
} = templatesSlice.actions;

export default templatesSlice.reducer;