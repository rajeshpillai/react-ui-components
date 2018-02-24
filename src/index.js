import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import App from './App';
import AppDragDropDemo2 from './AppDragDropDemo2';
import AppSlideShow from './AppSlideShow';

ReactDOM.render(<AppSlideShow />, document.getElementById('root'));
registerServiceWorker();
