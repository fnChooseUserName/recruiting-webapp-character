import React from 'react';
import ReactDOM from 'react-dom';
import Requirements from './Requirements';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Requirements />, div);
  ReactDOM.unmountComponentAtNode(div);
});