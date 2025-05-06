import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from "react-router-dom"
import { router } from './Routes'
import { app } from './firebaseConfig'
import { ToastContainer } from 'react-toastify';


import './index.scss'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='app-container'>
      <main>
      <RouterProvider router={router} />
      <ToastContainer />
      </main>
    </div>
  </StrictMode>,
)
