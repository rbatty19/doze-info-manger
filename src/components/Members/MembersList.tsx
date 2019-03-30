import React, { Component, useState, useEffect } from 'react';
import { resMsg } from 'rober19-config';

export default function MembersList() {

  const [members, setMembers] = useState<[]>([]);

  let db: any = [1, 3, 4, 5, 6, 7];

  useEffect(() => {
    getMembers();
  });

  function getMembers() {
    setMembers(db);
  }

  function showm(){
      console.log(db)
  }

  function deleteMember() {
    db.splice(2,2);
    console.table(db);
    getMembers();
  }

  return (
    <div className="container">
      <div className="row">
        <table className="striped centered">
          <thead>
            <tr>
              <th>{resMsg.name_1}</th>
              <th>{resMsg.branch}</th>
              <th>{resMsg.branch} ID</th>
              <th>-</th>
            </tr>
          </thead>
          <tbody>
            {members.map(a => (
              <tr key={a}>
                <td>Alvin</td>
                <td>Eclair</td>
                <td>$0.87</td>
                <td>
                  <div className="container">
                    <div className="col s12 m6">
                      <button
                        className="btn cyan waves-effect waves-light"
                        type="submit"
                        name="action"
                        onClick={(e) => showm()}
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
                        onClick={(e) => deleteMember()}
                      >
                        {resMsg.delete_1}
                        <i className="material-icons right">delete_sweep</i>
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
