import css from './Navigation.module.css';

import { NavLink } from 'react-router-dom';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/catalog', label: 'Catalog' },
];

export default function Navigation() {
  return (
    <nav>
      {navLinks.map(({ to, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            isActive ? `${css['nav-link']} ${css.active}` : css['nav-link']
          }
        >
          {label}
        </NavLink>
      ))}
    </nav>
  );
}
