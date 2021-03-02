import React from 'react';
import styles from './Header.module.css';

const Header = () => (
  <div className={styles.HeaderContainer}>
    <h1>POKEMON FINDER</h1>
    <h3>If you want a pokemon, you have to find it.</h3>
  </div>
);

export default Header;
