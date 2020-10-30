import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import Logo from './Logo';

const NavStyles = styled.nav`
  margin-bottom: 3rem;
  .logo {
    transform: translateY(-25%);
  }
  ul {
    margin: 0;
    padding: 0;
    text-align: center;
    list-style: none;

    display: grid;
    grid-gap: 2rem;
    grid-template-columns: 1fr 1fr auto 1fr 1fr;
    align-items: center;
    margin-top: -6rem;
  }

  li {
    /* MVP Trick for alternatiting rotating — use a variable */
    --rotate: -2deg;
    transform: rotate(var(--rotate));
    order: 1;

    &:nth-child(1) {
      --rotate: 1deg;
    }
    &:nth-child(2) {
      --rotate: -2.5deg;
    }
    &:nth-child(4) {
      --rotate: 2.5deg;
    }
    &:hover {
      /* --rotate: 0deg; */
    }
  }
  a {
    font-size: 3rem;
    text-decoration: none;
    &:hover {
      color: var(--red);
      text-decoration: underline;
    }
    &[aria-current='page'] {
      color: var(--red);
    }
  }
`;

/* function goToSliceMasters() {
  // 1. wait for 2 seconds
  setTimeout(() => {
    console.log('go slicers');
    // navigate is a gatsby function to control with code. replace: true option adds the navigation to browser history (important)
    // wes mostly doesn't use this as its for web apps, not websites
    // also navigate requires you to put a link in a button — which you shouldn't do!!
    navigate('/slicemasters', { replace: true });
  }, 2000);
  // 2. change the page
}
 */
const Nav = () => (
  <NavStyles>
    <ul>
      <li>
        <Link to="/">Hot Now</Link>
      </li>
      <li>
        <Link to="/pizzas">Pizza Menu</Link>
      </li>
      <li>
        <Link to="/">
          <Logo />
        </Link>
      </li>
      <li>
        <Link to="/slicemasters">Slicesmasters</Link>
      </li>
      <li>
        <Link to="/order">Order Ahead</Link>
      </li>
    </ul>
  </NavStyles>
);

export default Nav;
