import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import './index.css'
import Login from "./pages/Login/Login"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as ReactDOM.Container).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
