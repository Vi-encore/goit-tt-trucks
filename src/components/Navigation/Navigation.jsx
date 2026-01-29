import css from './Navigation.module.css';

import { NavLink } from 'react-router-dom';

// const spritePath = '/icons.svg';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/catalog', label: 'Catalog' },
];

export default function Navigation() {
  return (
    <nav className={css['nav-container']}>
      <div>
        <NavLink to="/">
          <img src="/Logo.webp" alt="Travel Trucks logo" />
        </NavLink>
      </div>
      <ul className={css.nav}>
        {navLinks.map(({ to, label }) => (
          <li key={to}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                isActive ? `${css['nav-link']} ${css.active}` : css['nav-link']
              }
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
