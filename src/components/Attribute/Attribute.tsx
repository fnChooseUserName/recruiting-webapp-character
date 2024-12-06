import React, { FC, memo } from 'react';
import styles from './Attribute.module.css';

export interface IAttribute {
  name: string;
  baseValue?: number;
  modifier?: number;
  handleIncrement?: (id) => void;
  handleDecrement?: (id) => void;
}

const Attribute: FC<IAttribute> = ({name, baseValue = 0, modifier = -10, handleIncrement, handleDecrement }) => {
  
  return(
    <div className={styles.Attribute}>
    <span> { name }: {baseValue} (Modifier: {modifier}) </span><button disabled={baseValue <= 0} onClick={ handleDecrement }>-</button><button onClick={ handleIncrement }>+</button>
  </div>
  );
};

export default memo(Attribute);
