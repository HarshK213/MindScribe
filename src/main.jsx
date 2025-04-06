import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// for Redux tool kit
import { store } from './store.js'
import { Provider } from 'react-redux'

// for Toasters
import { Toaster } from 'react-hot-toast';


createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <Provider store={store}>
      <App />
      <Toaster />
    </Provider>
  // </StrictMode>,
)
