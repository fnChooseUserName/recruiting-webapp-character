import React from 'react';
import ReactDOM from 'react-dom';
import Class from './Class';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Class />, div);
  ReactDOM.unmountComponentAtNode(div);
});