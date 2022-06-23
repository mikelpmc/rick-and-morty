import React from 'react';
import styles from './hello.module.css';

const Hello = ({ name }: { name: string }): JSX.Element => <p className={styles.welcome}>Welcome {name}</p>;

export default Hello;
