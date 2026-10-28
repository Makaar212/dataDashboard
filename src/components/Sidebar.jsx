import { NavLink } from 'react-router-dom'

function Sidebar() {
  return (
    <nav className="sidebar">
      <h2 className="sidebar-title">🌦️ WA Weather</h2>
      <NavLink to="/" end className="sidebar-link">
        🏠 Dashboard
      </NavLink>
      <NavLink to="/about" className="sidebar-link">
        ℹ️ About
      </NavLink>
    </nav>
  )
}

export default Sidebar
