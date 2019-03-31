import React, { useReducer, Fragment, Component } from 'react';
import './App.css';
import Members from './components/Members/Members';
import MembersList from './components/Members/MembersList';
import { AppContext } from './AppContext';

export default function App() {
  let defaultData = {
    name: 'Juan Manuel',
    arr: []
  };

  const [state, dispatch] = useReducer((state, action) => {
    //console.log(action.type)
    switch (action.type) {
      case 'CHANGE_NAME':
        return { ...state, name: action.name, arr: action.arr };
      default:
        return {};
    }
  }, defaultData);

  return (
    <div>
      <AppContext.Provider value={{ state, dispatch }}>
        <Fragment>
          <Members />
          <MembersList />
        </Fragment>
      </AppContext.Provider>
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
