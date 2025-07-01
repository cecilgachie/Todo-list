import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AIGenerationRequest, ColorPalette } from '../../types';

interface AIState {
  isGenerating: boolean;
  generatedText: string[];
  colorPalettes: ColorPalette[];
  designSuggestions: string[];
  lastRequest: AIGenerationRequest | null;
  error: string | null;
}

const initialState: AIState = {
  isGenerating: false,
  generatedText: [],
  colorPalettes: [],
  designSuggestions: [],
  lastRequest: null,
  error: null,
};

const aiSlice = createSlice({
  name: 'ai',
  initialState,
  reducers: {
    startGeneration: (state, action: PayloadAction<AIGenerationRequest>) => {
      state.isGenerating = true;
      state.lastRequest = action.payload;
      state.error = null;
    },
    setGeneratedText: (state, action: PayloadAction<string[]>) => {
      state.generatedText = action.payload;
      state.isGenerating = false;
    },
    setColorPalettes: (state, action: PayloadAction<ColorPalette[]>) => {
      state.colorPalettes = action.payload;
      state.isGenerating = false;
    },
    setDesignSuggestions: (state, action: PayloadAction<string[]>) => {
      state.designSuggestions = action.payload;
      state.isGenerating = false;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isGenerating = false;
    },
    clearGeneration: (state) => {
      state.generatedText = [];
      state.colorPalettes = [];
      state.designSuggestions = [];
      state.error = null;
    },
  },
});

export const {
  startGeneration,
  setGeneratedText,
  setColorPalettes,
  setDesignSuggestions,
  setError,
  clearGeneration,
} = aiSlice.actions;

export default aiSlice.reducer;