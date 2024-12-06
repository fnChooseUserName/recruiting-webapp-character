import React, { FC } from 'react';
import styles from './Requirements.module.css';
import { Attributes, Class } from '../../types';

export interface IRequirements {
  isActive?: boolean;
  data?: Attributes;
  handleOnClose?: () => void;
}

const Requirements: FC<IRequirements> = ({ isActive = false, data, handleOnClose }) => {

  if(!isActive) return null;

  return(
    <div>
      <div className={styles.Requirements}>
        <h2>Skill Requirements</h2>
        <span>Strength: { data.Strength }</span>
        <span>Dexterity: { data.Dexterity }</span>
        <span>Constitution: { data.Constitution }</span>
        <span>Intelligence: { data.Intelligence }</span>
        <span>Wisdom: { data.Wisdom }</span>
        <span>Charisma: { data.Charisma }</span>
        <button onClick={ handleOnClose }>Close Requirements View</button>
      </div>
      
    </div>
  );
};

export default Requirements;
