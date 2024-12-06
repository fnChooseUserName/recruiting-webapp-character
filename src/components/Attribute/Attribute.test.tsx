import React from 'react';
import ReactDOM from 'react-dom';
import Attribute from './Attribute';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Attribute name="name" />, div);
  ReactDOM.unmountComponentAtNode(div);
});