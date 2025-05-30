import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Amplify Imports
import { Amplify } from 'aws-amplify'; // Named import, not default
import awsmobile from './aws-exports'; // AWS Amplify configuration generated by the CLI

// Configure AWS Amplify with the app's settings
Amplify.configure(awsmobile);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
