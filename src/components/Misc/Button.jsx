import React from 'react';
import styles from './Button.module.css';

const Button = (props) => {

    return (
        <button
            disabled={props.disabled}
            className={props.roundCorners ? `${styles.button} ${styles.roundCorners}` : styles.button}
            onClick={props.onClick}
            type={props.type}
            defaultValue={props.value}
        >{props.text}</button>
    )
}

export default Button