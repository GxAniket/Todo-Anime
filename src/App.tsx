import { useState, createContext, useContext, useCallback } from 'react';
import type {
  AppTheme,
  Task,
  NavItem,
  StudySession,
  Subject,
  ThemeId,
} from './types';
import { themes } from './themes';
import Onboarding from './components/Onboarding';
import Layout from './components/Layout';

interface AppState {
  userName: string;
  theme: AppTheme;
  setTheme: (id: ThemeId) => void;

  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;

  studySessions: StudySession[];
  addStudySession: (session: Omit<StudySession, 'id'>) => void;

  subjects: Subject[];

  activeNav: NavItem;
  setActiveNav: (nav: NavItem) => void;

  showCreateModal: boolean;
  setShowCreateModal: (v: boolean) => void;
}

export const AppContext = createContext<AppState>(
  {} as AppState
);

export const useApp = () => useContext(AppContext);

export default function App() {
  const [screen, setScreen] = useState<
    'onboarding' | 'app'
  >('onboarding');

  const [userName, setUserName] = useState('');

  const [themeId, setThemeId] =
    useState<ThemeId>('dark');

  // Empty from the beginning.
  // User-created tasks will be added here.
  const [tasks, setTasks] = useState<Task[]>([]);

  // No dummy study sessions.
  const [studySessions, setStudySessions] =
    useState<StudySession[]>([]);

  // No dummy subjects.
  const [subjects] = useState<Subject[]>([]);

  const [activeNav, setActiveNav] =
    useState<NavItem>('home');

  const [showCreateModal, setShowCreateModal] =
    useState(false);

  const theme = themes[themeId];

  // =========================
  // ADD TASK
  // =========================
  const addTask = useCallback(
    (
      task: Omit<Task, 'id' | 'createdAt'>
    ) => {
      setTasks((prev) => [
        ...prev,
        {
          ...task,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
        },
      ]);
    },
    []
  );

  // =========================
  // UPDATE TASK
  // =========================
  const updateTask = useCallback(
    (
      id: string,
      updates: Partial<Task>
    ) => {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === id
            ? { ...task, ...updates }
            : task
        )
      );
    },
    []
  );

  // =========================
  // DELETE TASK
  // =========================
  const deleteTask = useCallback(
    (id: string) => {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === id
            ? { ...task, deleted: true }
            : task
        )
      );
    },
    []
  );

  // =========================
  // ADD STUDY SESSION
  // =========================
  const addStudySession = useCallback(
    (
      session: Omit<StudySession, 'id'>
    ) => {
      setStudySessions((prev) => [
        ...prev,
        {
          ...session,
          id: Date.now().toString(),
        },
      ]);
    },
    []
  );

  // =========================
  // ONBOARDING
  // =========================
  if (screen === 'onboarding') {
    return (
      <Onboarding
        onComplete={(name, selectedTheme) => {
          setUserName(name);
          setThemeId(selectedTheme);
          setScreen('app');
        }}
      />
    );
  }

  // =========================
  // APPLICATION
  // =========================
  return (
    <AppContext.Provider
      value={{
        userName,

        theme,

        setTheme: setThemeId,

        tasks,
        addTask,
        updateTask,
        deleteTask,

        studySessions,
        addStudySession,

        subjects,

        activeNav,
        setActiveNav,

        showCreateModal,
        setShowCreateModal,
      }}
    >
      <Layout />
    </AppContext.Provider>
  );
}