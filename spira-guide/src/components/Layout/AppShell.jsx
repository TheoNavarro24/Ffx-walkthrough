import { Outlet } from 'react-router-dom'

export default function AppShell() {
  return (
    <div style={{ padding: '1rem' }}>
      <Outlet />
    </div>
  )
}
