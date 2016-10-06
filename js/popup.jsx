import React from 'react';
import ReactDOM from 'react-dom';
import Root from '../js/components/root.jsx';

document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('popup');
    ReactDOM.render(<Root />, root);
});
