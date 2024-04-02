import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import './index.css';
import App from './App';
// import InfoApp from "./InfoApp";
import { Provider } from 'react-redux';
import store from "./store";
import {createRoot} from 'react-dom/client';

const root = createRoot(document.getElementById('root'));

root.render(

    <Provider store={store}>
        <BrowserRouter>
            <div className='App'>
                <App />
                {/*<InfoApp />*/}
            </div>
        </BrowserRouter>
    </Provider>

);


