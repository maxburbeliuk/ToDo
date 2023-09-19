import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ToDo from './App';
import reportWebVitals from './reportWebVitals';
import {MantineProvider} from '@mantine/core';
import '@mantine/core/styles.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <MantineProvider>
        <ToDo />
    </MantineProvider>
)

reportWebVitals();
