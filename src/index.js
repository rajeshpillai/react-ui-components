import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AppWithMouse from './AppWithMouse';
import registerServiceWorker from './registerServiceWorker';

const DATA = [
    {
        id: 1,
        label: "USA",
        content: "Land of the Free, Home of the brave"
    },
    {
        id: 2,
        label: "Brazil",
        content: "Sunshine, beaches, and Carnival"
    },
    { id: 3, label: "Russia", content: "World Cup 2018!" }
];

console.log(DATA);

ReactDOM.render(<AppWithMouse countries={DATA} />, document.getElementById('root'));
registerServiceWorker();
