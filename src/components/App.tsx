import React, { Component } from 'react';
import './App.css';
import Members from './Members/Members';
import MembersList from './Members/MembersList';

class App extends Component {
  render() {
    return (
      <div>
        {/* <header className="App-header">
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header> */}

        <Members />
        <MembersList />

        <footer className="page-footer">
          <div className="row">
            <div className="center-align">
              <img src="doze.png" />
            </div>
          </div>

          <div className="container">
            <div className="row">
              <div className="col l6 s12">
                <h5 className="white-text">Info-Manager</h5>
                <p className="grey-text text-lighten-4">
                  Este es el prototipo de control de información de doze-group
                </p>
              </div>
              <div className="col l4 offset-l2 s12">
                <h5 className="white-text">Encuentranos: </h5>
                <ul>
                  <li>
                    <a className="grey-text text-lighten-3" href="https://github.com/doze-group">
                      Github
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-copyright">
            <div className="container">
              © 2019 doze-group
              <a className="grey-text text-lighten-4 right" href="#!">
                Web
              </a>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
