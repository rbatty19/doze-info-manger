import './App.css';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize';
import React, { useReducer, Fragment } from 'react';
import Members from './components/Members/Members';
import MembersList from './components/Members/MembersList';
import { AppContext } from './AppContext';
import { StateContext } from './config/global.config';

export default function App() {
  let defaultData: StateContext = {
    arr: [],
    App_Loader: true,
    InitVoid: false,
    AppChange: false,
    type: '',
  };

  const { Modal } = require('react-materialize');

  const [state, dispatch] = useReducer((state, action) => {
    //console.log(action.type)
    switch (action.type) {
      case 'CHANGE_NAME':
        return {
          ...state,
          arr: action.arr,
          App_Loader: action.App_Loader,
          InitVoid: action.InitVoid,
          AppChange: action.AppChange
        };
      default:
        return {};
    }
  }, defaultData);

  //const trigger = <Button>Open Modal</Button>;

  return (
    <div>
      {/* <Spinner size={120} spinnerColor={'#333'} spinnerWidth={2} visible={true} /> */}
      <AppContext.Provider value={{ state, dispatch }}>
        <Fragment>
          <Members />
          <MembersList />
        </Fragment>
      </AppContext.Provider>
      {true ? (
        <div>
          <Modal
            bottomSheet
            options={{ dismissible: false }}
            open={state.App_Loader}
            actions={null}
          >
            <div className="sk-folding-cube">
              <div className="sk-cube1 sk-cube" />
              <div className="sk-cube2 sk-cube" />
              <div className="sk-cube4 sk-cube" />
              <div className="sk-cube3 sk-cube" />
            </div>
          </Modal>
        </div>
      ) : null}

      <footer className="page-footer">
        <div className="row">
          <div className="col md12 s12 center-align">
            <img className="responsive-img" src="assets/img/doze.png" />
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
