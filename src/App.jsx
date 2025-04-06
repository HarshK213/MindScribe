import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router'
import './App.css'
import Navbar from './Components/Navbar'
import Home from './Components/Home'
import Notes from './Components/Notes'
import ViewNote from './Components/ViewNote'

const router = createBrowserRouter(
  [
    {
      path:'/',
      element:
      <div>
        <Navbar/>
        <Home/>
      </div>
    },
    {
      path:'/notes',
      element:
      <div>
        <Navbar/>
        <Notes/>
      </div>
    },
    {
      path:'/notes/:id',
      element:
      <div>
        <Navbar/>
        <ViewNote/>
      </div>
    }
  ]
)

function App() {

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
