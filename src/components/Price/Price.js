import React from 'react';
import classes from './Price.css';

const price = () => {
  return (
    <div className={classes.Price}>
      <h4
        style={{
          display: 'block',
          width: '100%',
          background: '#009688',
          padding: '8px',
          margin: '10px 10%',
          borderBottom: '4px solid #022723',
        }}>
        Ingredients Prices :
      </h4>
      <div className={classes.columns}>
        <ul className={classes.price}>
          <li className={classes.salad}>Salad</li>
          <li className={classes.grey}>$ 0.50 for each</li>
          <li className={classes.grey}>
            <a href="/" className={classes.button}>Buy Now</a>
          </li>
        </ul>
      </div>

      <div className={classes.columns}>
        <ul className={classes.price}>
          <li className={classes.bacon}>Bacon</li>
          <li className={classes.grey}>$ 0.70 for each</li>
          <li className={classes.grey}>
            <a href="/" className={classes.button}>Buy Now</a>
          </li>
        </ul>
      </div>

      <div className={classes.columns}>
        <ul className={classes.price}>
          <li className={classes.cheese}>Cheese</li>
          <li className={classes.grey}>$ 0.40 for each</li>
          <li className={classes.grey}>
            <a href="/" className={classes.button}>Buy Now</a>
          </li>
        </ul>
      </div>

      <div className={classes.columns}>
        <ul className={classes.price}>
          <li className={classes.meat}>Meat</li>
          <li className={classes.grey}>$ 1.3 for each</li>
          <li className={classes.grey}>
            <a href="/" className={classes.button}>Buy Now</a>
          </li>
        </ul>
      </div>

      <div className={classes.columns}>
        <ul className={classes.price}>
          <li className={classes.vaggiePatty}>Vaggie Patty</li>
          <li className={classes.grey}>$ 1.0 for each</li>
          <li className={classes.grey}>
            <a href="/" className={classes.button}>Buy Now</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default price;
// <div className={classes.Price}>
//
//     </div>
// <h1>Prices</h1>
// <br />
// <h4 style={{ background: 'green' }}>Salad: <strong>$0.5</strong>,</h4>
// <h4>Bacon: <strong>$0.7</strong>,</h4>
// <h4>Cheese: <strong>$0.4</strong>,</h4>
// <h4>Vaggie Patty: <strong>$1.0</strong>,</h4>
// <h4>Meat: <strong>$1.3</strong>,</h4>
