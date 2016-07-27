import React from 'react';
import { Home } from './Home.jsx';

function App(props) {
  console.log(props.children);
  if (props.children) {
    return (
      <div className="row">
        {props.children}
      </div>
    );
  } else {
    return (
      <div>
        <Home />
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.element,
};

export default App;
