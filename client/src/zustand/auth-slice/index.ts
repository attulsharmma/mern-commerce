import { type StateCreator } from "zustand";
export interface AuthState {
  user: {role:string } | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: {role:string} | null, token: string) => void;
  logout: () => void;
}
export const authSlice: StateCreator<
  { auth: AuthState },
  [],
  [],
  AuthState
> = (set, get) => {
  return {
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,
    login: (user, token) => {
        const current = get().auth;
        const currentUser = get().auth.user;
        const isAuthenticated = get().auth.isAuthenticated;
      if (isAuthenticated && currentUser) {
        set({auth:{...current, user: currentUser, token, isAuthenticated }});
      } else {
        console.log({user})
        set({auth:{ ...current,user, token, isAuthenticated: true }});
      }
    },
    logout: () => {
        const current = get().auth;
      set({auth:{...current, user: null, token: null, isAuthenticated: false }});
    },
  };
};

// set((state) => ({ auth: { ...state.auth, user: name } }));

