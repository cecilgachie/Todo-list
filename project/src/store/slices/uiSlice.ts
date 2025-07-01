import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  sidebarOpen: boolean;
  activePanel: 'templates' | 'elements' | 'text' | 'images' | 'brand' | null;
  showWelcomeModal: boolean;
  showUpgradeModal: boolean;
  showExportModal: boolean;
  notifications: Notification[];
  theme: 'light' | 'dark';
}

interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: number;
  autoDismiss?: boolean;
}

const initialState: UIState = {
  sidebarOpen: true,
  activePanel: null,
  showWelcomeModal: false,
  showUpgradeModal: false,
  showExportModal: false,
  notifications: [],
  theme: 'light',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
    setActivePanel: (state, action: PayloadAction<UIState['activePanel']>) => {
      state.activePanel = action.payload;
    },
    showModal: (state, action: PayloadAction<keyof Pick<UIState, 'showWelcomeModal' | 'showUpgradeModal' | 'showExportModal'>>) => {
      state[action.payload] = true;
    },
    hideModal: (state, action: PayloadAction<keyof Pick<UIState, 'showWelcomeModal' | 'showUpgradeModal' | 'showExportModal'>>) => {
      state[action.payload] = false;
    },
    addNotification: (state, action: PayloadAction<Omit<Notification, 'id' | 'timestamp'>>) => {
      const notification: Notification = {
        ...action.payload,
        id: Date.now().toString(),
        timestamp: Date.now(),
      };
      state.notifications.push(notification);
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(n => n.id !== action.payload);
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    },
  },
});

export const {
  toggleSidebar,
  setSidebarOpen,
  setActivePanel,
  showModal,
  hideModal,
  addNotification,
  removeNotification,
  clearNotifications,
  setTheme,
} = uiSlice.actions;

export default uiSlice.reducer;