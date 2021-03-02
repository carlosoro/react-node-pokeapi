import React from 'react';
import styles from './Footer.module.css';

const Footer = () => (
  <div className={styles.FooterContent}>
    <span className={styles.AlignLeft}>Made by: Carlos Oronoz</span>
    <span className={styles.AlignRight}>
      <a className="nes-btn is-warning" target="_blank" rel="noreferrer" href="https://github.com/carlosoro/react-node-pokeapi">
        GitHub Repo
      </a>
    </span>
  </div>
);

export default Footer;
