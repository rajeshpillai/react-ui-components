import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import AppDragDropDemo from './AppDragDropDemo';
import AppLazyLoad from './AppLazyLoad';


ReactDOM.render(<AppLazyLoad />, document.getElementById('root'));
registerServiceWorker();
