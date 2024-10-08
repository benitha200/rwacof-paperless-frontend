import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Assuming you have an App.js file in the src directory
import './index.css'; // Optional: include your CSS file if you have one

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
