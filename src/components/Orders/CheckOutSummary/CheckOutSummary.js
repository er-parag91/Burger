import React from 'react';
import Burger from '../../Burger/Burger';
import classes from './CheckOutSummary.css';
import Button from '../../UI/Button/Button';
const checkOutSummary = props => {
  return (
    <div className={classes.CheckOutSummary}>
      <h2>We hope it tastes well..!</h2>
      <Burger ingredients={props.ingredients} />
      <Button clicked={props.checkoutCancelled} btnType="Danger">CANCEL</Button>
      <Button clicked={props.checkoutContinued} btnType="Success">
        CONTINUE
      </Button>
    </div>
  );
};

export default checkOutSummary;
