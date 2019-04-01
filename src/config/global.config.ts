import React, { Component } from 'react';
import { resMsg } from 'rober19-config';

class Config {
  public app_config = {
    backend_heroku_link: 'https://backed-doze-info-manager.herokuapp.com',
  };
}

export default new Config();

export interface StateContext {
  type: any;
  name: any;
  arr: any;
  test: any;
  InitVoid: any;  
}
