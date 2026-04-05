import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import './styles/index.css'
import AppShell from './components/Layout/AppShell'
import LandingPage from './pages/LandingPage'
import ChapterPage from './pages/ChapterPage'
import CollectiblesHub from './pages/CollectiblesHub'
import SettingsPage from './pages/SettingsPage'
import { TocProvider } from './context/TocContext'
import { SaveContextProvider } from './context/SaveContext'

const router = createHashRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: 'chapter/:slug', element: <ChapterPage /> },
      { path: 'collectibles', element: <CollectiblesHub /> },
      { path: 'settings', element: <SettingsPage /> },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TocProvider>
      <SaveContextProvider>
        <RouterProvider router={router} />
      </SaveContextProvider>
    </TocProvider>
  </StrictMode>
)
