import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import AppDragDropDemo from './AppDragDropDemo';
import AppWithCalendar from './AppWithCalendar';


ReactDOM.render(<AppWithCalendar />, document.getElementById('root'));
registerServiceWorker();
