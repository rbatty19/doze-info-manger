import React, { Component, useState, useEffect, useContext } from 'react';
import { resMsg } from 'rober19-config';
import http from '../../services/http.service';
import config, { StateContext } from '../../config/global.config';
import { AppContext } from '../../AppContext';

export default function MembersList() {
  //const [members, setMembers] = useState<[]>([]);

  const { state, dispatch }: any = useContext(AppContext);

  useEffect(() => {
    //console.table(state);
    getMembers();
  });

  function getMembers() {
    getAllMembers();
    //setMembers(db);
  }

  async function getAllMembers() {
    let res: any = await http.http_get(`${config.app_config.backend_heroku_link}/members`);

    if (!state.InitVoid && res) {
      return dispatch({
        type: 'CHANGE_NAME',
        name: state.name,
        arr: state.arr,
        test: false,
        InitVoid: true,
      } as StateContext);
    }

    if (!res) {
      console.warn(':v');
      //peticion en caso de error para revisar conectividad cada 5 segundos
      setTimeout(() => {
        dispatch({
          type: 'CHANGE_NAME',
          name: state.name,
          arr: state.arr,
          test: true,
          InitVoid: state.InitVoid,
        } as StateContext);
      }, 5000);
    }
    //console.log(state.arr.length)
    if (res && res.length != state.arr.length) {
      console.log(2)
      return dispatch({
        type: 'CHANGE_NAME',
        name: 'name',
        arr: res,
        test: false,
        InitVoid: state.InitVoid,
      } as StateContext);
    }
  }

  async function deleteMember(id: string) {
    try {
      let res = await http.http_delete(`${config.app_config.backend_heroku_link}/member?id=${id}`);
      if (res) {
        getAllMembers(); // console.log('es 200')
        dispatch({
          type: 'CHANGE_NAME',
          name: state.name,
          arr: state.arr,
          test: true,
          InitVoid: state.InitVoid,
        } as StateContext);
      }
    } catch (error) {
      dispatch({
        type: 'CHANGE_NAME',
        name: state.name,
        arr: state.arr,
        test: true,
        InitVoid: state.InitVoid,
      } as StateContext);
    }
  }

  return (
    <div className="container">
      <div className="row">
        <table className="striped centered">
          <thead>
            <tr>
              <th>{resMsg.name_1}</th>
              <th>{resMsg.branch}</th>
              <th>Doze ID</th>
              <th>-</th>
            </tr>
          </thead>
          <tbody>
            {state.arr
              ? state.arr.map((item: any) => {
                  if (!item) return {};
                  let { id, nombre, rama, rama_id } = item as any;
                  return (
                    <tr key={id}>
                      <td>{nombre}</td>
                      <td>{rama}</td>
                      <td>
                        D{rama}-{rama_id}
                      </td>
                      <td>
                        <div className="container">
                          <div className="col s12 m6">
                            <button
                              className="btn cyan waves-effect waves-light"
                              type="submit"
                              name="action"
                              onClick={e => getAllMembers()}
                            >
                              {resMsg.edit}
                              <i className="material-icons right">short_text</i>
                            </button>
                          </div>
                          <div className="col s12 m6">
                            <button
                              className="btn orange waves-effect waves-light"
                              type="submit"
                              name="action"
                              onClick={async e => deleteMember(id)}
                            >
                              {resMsg.delete_1}
                              <i className="material-icons right">delete_sweep</i>
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
