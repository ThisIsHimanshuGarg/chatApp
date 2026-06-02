
import React from 'react'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ToastContainer} from "react-toastify";
import MainLayout from './Layouts/MainLayouts'
import Chat from './pages/Chat'
import Group from './pages/Group'
import Profile from './pages/Profile'
import Page from './Pages/Page';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Signup />
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path:"/",
    element:<MainLayout/>,
    children:[
      {
        path:"chat",
        element:(
          <div className='flex items-center justify-center h-screen text-gray-600 font-semibold'>Select user to start chat</div>
        )
      },
      {
        path:"chat/:userId",
        element:<Chat/>
      },
      // {
      //   path:"group/groupId",
      //   element:<Group/>
      // },
      {
        path:"profile",
        element:<Profile/>
      },
      
    ]
  },
  {
    path: "*",
    element: <Page/>
  }
])

const App = () => {
  return (
    <>
      <ToastContainer 
        position='top-right'
        autoClose={3000}
        />
      <RouterProvider router={router} />
    </>
  )
}

export default App
