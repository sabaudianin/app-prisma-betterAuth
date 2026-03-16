import { create } from "zustand";

export type TechNoteSummary = {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  createdAt: Date | null;
  updatedAt: Date | null;
};

interface User {
  id: string;
  email: string;
  name: string;
  image?: string;
}

interface DevState {
  user: User | null;
  notes: TechNoteSummary[];
  isLoading: boolean;
  //ACTIONS
  setAuth: (user: User | null) => void;
  setNotes: (notes: TechNoteSummary[]) => void;
  //CRUD
  addNote: (note: TechNoteSummary) => void;
  updateNoteInStore: (id: string, data: Partial<TechNoteSummary>) => void;
  removeNote: (id: string) => void;
}

export const useDevStore = create<DevState>((set) => ({
  user: null,
  notes: [],
  isLoading: false,
  setAuth: (user) => set({ user }),
  setNotes: (notes) => set({ notes }),
  addNote: (note) =>
    set((state) => ({
      notes: [note, ...state.notes],
    })),
  updateNoteInStore: (id, data) =>
    set((state) => ({
      notes: state.notes.map((note) =>
        note.id === id ? { ...note, ...data } : n,
      ),
    })),
  removeNote: (id) =>
    set((state) => ({
      notes: state.notes.filter((note) => note.id !== id),
    })),
}));
