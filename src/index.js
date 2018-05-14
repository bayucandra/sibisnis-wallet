import React from 'react';
import ReactDOM from 'react-dom';
import './styles/styles.css';
import App from './components/Main/App';
import registerServiceWorker from './registerServiceWorker';


class Index extends React.Component {
  render() {
      return (
      <App />
      );
  }
}

ReactDOM.render(
<Index />,
 document.getElementById('root'));
registerServiceWorker();
