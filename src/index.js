import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import IcalApp from './components/IcalApp';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<IcalApp />, document.getElementById('root'));
registerServiceWorker();
