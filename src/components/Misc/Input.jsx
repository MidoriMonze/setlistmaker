import React from 'react'
import styles from './Input.module.css';

const Input = (props) => {
  return (
    <div className={styles.container}>
      <label>{props.label}</label>
      <input
        required
        className={styles.input}
        style={{ width: props.width, padding: props.padding }}
        onChange={props.onChange}
        type={props.type}
        value={props.value}
        placeholder={props.placeholder}
      >{props.text}</input>
    </div >
  )
}

export default Input