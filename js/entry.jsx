import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root.jsx';
import configureStore from './store/store.js';

document.addEventListener('DOMContentLoaded', () => {
    let store = configureStore();
    window.store = store;
    const root = document.getElementById('root');
    ReactDOM.render(<Root />, root);
});
