import React from 'react';
import classes from './Button.css';

const button = props => {
  let btnClass = [classes.Button, classes[props.btnType]].join (' ');
  return (
    <button
      disabled={props.disabled}
      className={btnClass}
      onClick={props.clicked}>
      {props.children}
    </button>
  );
};

export default button;
