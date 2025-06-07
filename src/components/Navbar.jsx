import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='w-[85%] mx-auto'>
      <ul className='flex items-center justify-between bg-white rounded-[999px] px-3 py-3 shadow-lg font-Montserrat font-medium text-xs'>
        {[
          { to: '/', label: 'Beranda' },
          { to: '/modul', label: 'Modul' },
          { to: '/profile', label: 'Profil' }
        ].map(({ to, label }) => (
          <li key={to}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                `flex items-center justify-center w-24 py-3 rounded-full transition-all duration-300 ${
                  isActive ? 'bg-purple-main text-white' : 'text-purple-main'
                }`
              }
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Navbar