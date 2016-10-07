import React from 'react';
import ReactDOM from 'react-dom';
import PopupRoot from '../js/components/popup_root.jsx';

document.addEventListener('DOMContentLoaded', () => {
    const popup = document.getElementById('popup');
    ReactDOM.render(<PopupRoot />, popup);
});
