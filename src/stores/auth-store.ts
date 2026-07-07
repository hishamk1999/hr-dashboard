import { create } from "zustand";
import { persist } from "zustand/middleware";

export const DEMO_LOGIN = {
  email: "demo.hr@example.com",
  password: "Demo@1234",
};

type DemoUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  avatarInitials: string;
};

type AuthSession = {
  token: string;
  createdAt: string;
};

type AuthState = {
  user: DemoUser | null;
  session: AuthSession | null;
  isAuthenticated: boolean;
  login: (email: string) => void;
  logout: () => void;
};

const createDemoSession = (email: string): Pick<AuthState, "user" | "session" | "isAuthenticated"> => ({
  user: {
    id: "demo-user-001",
    name: "Demo HR Manager",
    email,
    role: "HR Administrator",
    avatarInitials: "DH",
  },
  session: {
    token: `demo-session-${crypto.randomUUID()}`,
    createdAt: new Date().toISOString(),
  },
  isAuthenticated: true,
});

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      session: null,
      isAuthenticated: false,
      login: (email) => set(createDemoSession(email)),
      logout: () => set({ user: null, session: null, isAuthenticated: false }),
    }),
    {
      name: "hrms-demo-auth",
    },
  ),
);
