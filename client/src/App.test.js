import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import find from './CatRepository'

const assert = require('assert')

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});


it('should test something', () => {
    find('asd').then(cat => {
        console.log(cat)
        expect(cat.name).toEqual('Gru')
    })

    
})
