import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Vaggie Patty', type: 'vaggiePatty' },
  { label: 'Meat', type: 'meat' },
];

const buildControls = props => {
  return (
    <div className={classes.BuildControls}>
      <p>Current Price: <strong>{props.price.toFixed (2)}</strong></p>

      {controls.map (ctrl => {
        return (
          <BuildControl
            label={ctrl.label}
            key={ctrl.label}
            type={ctrl.type}
            added={() => props.ingredientAdded (ctrl.type)}
            removed={() => props.ingredientRemoved (ctrl.type)}
            disabled={props.disabled[ctrl.type]}
          />
        );
      })}
      <button
        disabled={props.purchable}
        className={classes.OrderButton}
        onClick={props.ordered}>
        ORDER NOW
      </button>
    </div>
  );
};

export default buildControls;

// <p>Prices for each ingredients:</p>
// <p style={{ textAlign: 'center', wordWrap: 'break-word' }}>
//   (Salad: <strong>$0.5</strong>,
//   Bacon: <strong>$0.7</strong>,
//   Cheese: <strong>$0.4</strong>,
//   Vaggie Patty: <strong>$1.0</strong>,
//   Meat: <strong>$1.3</strong>,
//   )
// </p>
