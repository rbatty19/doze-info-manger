import { useContext } from 'react';
import { AppContext } from '../AppContext';

class Config {
  public app_config = {
    backend_heroku_link: 'https://backed-doze-info-manager.herokuapp.com',
  };
}

export default new Config();

export interface StateContext {
  type?: any;
  arr?: any;
  App_Loader?: boolean;
  InitVoid?: any; 
  AppChange?: boolean; 
}


