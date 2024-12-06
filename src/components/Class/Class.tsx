import React, { FC, memo } from 'react';
import styles from './Class.module.css';

export interface IClass {
  name: string;
  handleOnClick?: (name) => void;
  canSelect?: boolean;
}

const Class: FC<IClass> = ({ name, handleOnClick, canSelect = false }) => {

  if(canSelect) console.log(`Can select ${name}`);

  return(
    <div className={ styles.Class }>
      <span className={`${styles.Selector} ${canSelect ? styles.ActiveClass : null}`} onClick={() => handleOnClick(name)}>{name}</span>
    </div>
  );
};

export default memo(Class);
