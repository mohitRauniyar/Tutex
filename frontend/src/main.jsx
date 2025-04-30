import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {Provider} from "react-redux"
import './index.css'
import App from './App.jsx'
import store from './redux/store.js'
import { Toaster } from 'react-hot-toast'; 

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
    <Toaster // 👉 Add Toaster inside Provider, outside App
        position="top-right" // you can change position like 'bottom-right' etc.
        reverseOrder={false} 
      />
    <App />
  </Provider>,
)
