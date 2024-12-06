import React from 'react';
import ReactDOM from 'react-dom';
import Skill from './Skill';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Skill />, div);
  ReactDOM.unmountComponentAtNode(div);
});