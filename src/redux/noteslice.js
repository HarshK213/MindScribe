import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';

const initialState = {
  notes: localStorage.getItem('notes')
    ? JSON.parse(localStorage.getItem('notes'))
    : []
};

export const noteSlice = createSlice({
  name: 'Note',
  initialState,
  reducers: {
    AddnewNotes: (state, action) => {
      const note = action.payload;
      const ids = state.notes.map(n => n._id);

      if (!ids.includes(note._id)) {
        state.notes.push(note);
        toast.success("New note added successfully");
      } else {
        const index = state.notes.findIndex(n => n._id === note._id);
        if (index >= 0) {
          state.notes[index] = note;
          toast.success("Note updated successfully");
        }
      }

      localStorage.setItem('notes', JSON.stringify(state.notes));
    },

    UpdateNotes: (state, action) => {
      const note = action.payload;
      const index = state.notes.findIndex(n => n._id === note._id);
      if (index >= 0) {
        state.notes[index] = note;
        localStorage.setItem('notes', JSON.stringify(state.notes));
        toast.success("Note updated");
      }
    },

    ResetAllNotes: (state) => {
      state.notes = [];
      localStorage.removeItem('notes');
      toast.success("All notes deleted");
    },

    RemoveFromNotes: (state, action) => {
      const noteId = action.payload;
      const index = state.notes.findIndex(n => n._id === noteId);
      if (index >= 0) {
        state.notes.splice(index, 1);
        localStorage.setItem('notes', JSON.stringify(state.notes));
        toast.success("Note deleted");
      }
    }
  }
});

export const { AddnewNotes, UpdateNotes, ResetAllNotes, RemoveFromNotes } = noteSlice.actions;

export default noteSlice.reducer;
