import React, { FC, memo } from 'react';
import styles from './Skill.module.css';

export interface ISkill {
  name: string;
  modifier: string;
  modifierValue?: number;
  points: number;
  handleIncrement?: () => void;
  handleDecrement?: () => void;
}

const Skill: FC<ISkill> = ({ name, modifier, points, modifierValue = 0, handleIncrement, handleDecrement }) => {

  let calculatedTotal = points + modifierValue;
  
  return(
    <div className={styles.Skill}>
      <span>{ name }: {points} (Modifier: {modifier}):{modifierValue}</span><button onClick={handleDecrement}>-</button><button onClick={handleIncrement}>+</button><span>Total: {calculatedTotal}</span>
    </div>
  );
};

export default memo(Skill);
