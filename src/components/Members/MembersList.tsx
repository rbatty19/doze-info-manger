import React, { Component, useState, useEffect, useContext } from 'react';
import './Members.css';
import { resMsg } from 'rober19-config';
import { deleteMember, getAllMembers, UpdateMember } from './Members.controller';
import { AppContext } from '../../AppContext';

export default function MembersList() {
  //const [members, setMembers] = useState<[]>([]);

  const { state, dispatch }: any = useContext(AppContext);

  useEffect(() => {
    //console.table(state);
    getAllMembers(state, dispatch);
  });

  const { Modal } = require('react-materialize');

  return (
    <div className="container">
      <div className="row ">
        <div className="">
          <table className="responsive-table bordered">
            <thead>
              <tr>
                <th>{resMsg.name_1}</th>
                <th>{resMsg.branch}</th>
                <th>Doze ID</th>
                <th>-</th>
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
                          <div className="col s12 m12">
                            <button
                              className="btn cyan waves-effect waves-light"
                              type="submit"
                              name="action"
                              onClick={e => UpdateMember(e)}
                            >
                              {resMsg.edit}
                              <i className="material-icons right">insert_comment</i>
                            </button>
                          </div>
                        </td>
                        <td>
                          <div className="col s12 m12">
                            <button
                              className="btn orange waves-effect waves-light"
                              type="submit"
                              name="action"
                              onClick={async e => deleteMember(id, state, dispatch)}
                            >
                              {resMsg.delete_1}
                              <i className="material-icons right">delete_sweep</i>
                            </button>
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
    </div>
  );
}
