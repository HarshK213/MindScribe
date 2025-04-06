import { configureStore } from '@reduxjs/toolkit'
import noteReducer from './redux/noteslice'

export const store = configureStore({
  reducer: {
    note : noteReducer,
  },
})