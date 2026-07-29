import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// ─── Types ───────────────────────────────────────────────────────────
export type Theme = "light" | "dark" | "system";

export interface Toast {
  id: string;
  message: string;
  type: "success" | "error" | "info" | "warning";
}

export interface UIState {
  /** Sidebar collapsed state */
  sidebarOpen: boolean;
  /** Active theme */
  theme: Theme;
  /** Queue of toast notifications */
  toasts: Toast[];
  /** Whether any modal / drawer is open (for scroll-lock, etc.) */
  isModalOpen: boolean;
}

// ─── Initial state ───────────────────────────────────────────────────
const initialState: UIState = {
  sidebarOpen: true,
  theme: "system",
  toasts: [],
  isModalOpen: false,
};

// ─── Slice ───────────────────────────────────────────────────────────
const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen(state, action: PayloadAction<boolean>) {
      state.sidebarOpen = action.payload;
    },
    setTheme(state, action: PayloadAction<Theme>) {
      state.theme = action.payload;
    },
    addToast(state, action: PayloadAction<Omit<Toast, "id">>) {
      state.toasts.push({
        ...action.payload,
        id: crypto.randomUUID(),
      });
    },
    dismissToast(state, action: PayloadAction<string>) {
      state.toasts = state.toasts.filter((t) => t.id !== action.payload);
    },
    setModalOpen(state, action: PayloadAction<boolean>) {
      state.isModalOpen = action.payload;
    },
  },
});

export const {
  toggleSidebar,
  setSidebarOpen,
  setTheme,
  addToast,
  dismissToast,
  setModalOpen,
} = uiSlice.actions;

// ─── Selectors ───────────────────────────────────────────────────────
export const selectSidebarOpen = (state: { ui: UIState }) => state.ui.sidebarOpen;
export const selectTheme = (state: { ui: UIState }) => state.ui.theme;
export const selectToasts = (state: { ui: UIState }) => state.ui.toasts;
export const selectIsModalOpen = (state: { ui: UIState }) => state.ui.isModalOpen;

export default uiSlice.reducer;
