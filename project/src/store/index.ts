import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import designReducer from './slices/designSlice';
import templatesReducer from './slices/templatesSlice';
import uiReducer from './slices/uiSlice';
import aiReducer from './slices/aiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    design: designReducer,
    templates: templatesReducer,
    ui: uiReducer,
    ai: aiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['design/setCanvas'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;