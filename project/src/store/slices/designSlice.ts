import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Design, DesignElement } from '../../types';

interface DesignState {
  currentDesign: Design | null;
  selectedElement: string | null;
  clipboard: DesignElement | null;
  history: Design[];
  historyIndex: number;
  canvas: {
    zoom: number;
    pan: { x: number; y: number };
    showGrid: boolean;
    snapToGrid: boolean;
  };
  isLoading: boolean;
  error: string | null;
}

const initialState: DesignState = {
  currentDesign: null,
  selectedElement: null,
  clipboard: null,
  history: [],
  historyIndex: -1,
  canvas: {
    zoom: 1,
    pan: { x: 0, y: 0 },
    showGrid: false,
    snapToGrid: true,
  },
  isLoading: false,
  error: null,
};

const designSlice = createSlice({
  name: 'design',
  initialState,
  reducers: {
    loadDesign: (state, action: PayloadAction<Design>) => {
      state.currentDesign = action.payload;
      state.selectedElement = null;
      state.history = [action.payload];
      state.historyIndex = 0;
    },
    updateDesign: (state, action: PayloadAction<Partial<Design>>) => {
      if (state.currentDesign) {
        const updatedDesign = { ...state.currentDesign, ...action.payload };
        state.currentDesign = updatedDesign;
        
        // Add to history
        state.history = state.history.slice(0, state.historyIndex + 1);
        state.history.push(updatedDesign);
        state.historyIndex = state.history.length - 1;
        
        // Limit history size
        if (state.history.length > 50) {
          state.history = state.history.slice(-50);
          state.historyIndex = state.history.length - 1;
        }
      }
    },
    addElement: (state, action: PayloadAction<DesignElement>) => {
      if (state.currentDesign) {
        state.currentDesign.elements.push(action.payload);
        state.selectedElement = action.payload.id;
      }
    },
    updateElement: (state, action: PayloadAction<{ id: string; updates: Partial<DesignElement> }>) => {
      if (state.currentDesign) {
        const elementIndex = state.currentDesign.elements.findIndex(
          el => el.id === action.payload.id
        );
        if (elementIndex !== -1) {
          state.currentDesign.elements[elementIndex] = {
            ...state.currentDesign.elements[elementIndex],
            ...action.payload.updates,
          };
        }
      }
    },
    removeElement: (state, action: PayloadAction<string>) => {
      if (state.currentDesign) {
        state.currentDesign.elements = state.currentDesign.elements.filter(
          el => el.id !== action.payload
        );
        if (state.selectedElement === action.payload) {
          state.selectedElement = null;
        }
      }
    },
    selectElement: (state, action: PayloadAction<string | null>) => {
      state.selectedElement = action.payload;
    },
    copyElement: (state) => {
      if (state.currentDesign && state.selectedElement) {
        const element = state.currentDesign.elements.find(
          el => el.id === state.selectedElement
        );
        if (element) {
          state.clipboard = element;
        }
      }
    },
    pasteElement: (state) => {
      if (state.currentDesign && state.clipboard) {
        const newElement = {
          ...state.clipboard,
          id: Date.now().toString(),
          position: {
            x: state.clipboard.position.x + 20,
            y: state.clipboard.position.y + 20,
          },
        };
        state.currentDesign.elements.push(newElement);
        state.selectedElement = newElement.id;
      }
    },
    undo: (state) => {
      if (state.historyIndex > 0) {
        state.historyIndex--;
        state.currentDesign = state.history[state.historyIndex];
        state.selectedElement = null;
      }
    },
    redo: (state) => {
      if (state.historyIndex < state.history.length - 1) {
        state.historyIndex++;
        state.currentDesign = state.history[state.historyIndex];
        state.selectedElement = null;
      }
    },
    updateCanvas: (state, action: PayloadAction<Partial<DesignState['canvas']>>) => {
      state.canvas = { ...state.canvas, ...action.payload };
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
  loadDesign,
  updateDesign,
  addElement,
  updateElement,
  removeElement,
  selectElement,
  copyElement,
  pasteElement,
  undo,
  redo,
  updateCanvas,
  setLoading,
  setError,
} = designSlice.actions;

export default designSlice.reducer;