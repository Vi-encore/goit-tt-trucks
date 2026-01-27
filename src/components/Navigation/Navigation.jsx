import css from './Navigation.module.css';

import { NavLink } from 'react-router-dom';

const spritePath = '/icons.svg';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/catalog', label: 'Catalog' },
];

export default function Navigation() {
  return (
    <nav>
      <svg width="32" height="32">
        {/* The href attribute points to the file path and the specific icon's ID */}
        <use href={`${spritePath}#icon-map`} />
      </svg>
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
      <ul>
        <li>jopa</li>
      </ul>
    </nav>
  );
}
