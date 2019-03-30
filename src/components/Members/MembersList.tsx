import React, { Component, useState, useEffect } from 'react';
import { resMsg } from 'rober19-config';
import http from '../../services/http.service'

export default function MembersList() {

  const [members, setMembers] = useState<[]>([]);

     useEffect(() => {    
      getMembers();      
    }, []);
   

  function getMembers() {
   getAllMembers();
   console.log(1)
    //setMembers(db);
  }
  

  async function getAllMembers() {
    let res = await http.http_get(`https://api.github.com/users/rober19/repos?per_page=200`)
    console.log(res)
    setMembers(res);
  }

  function showm() {
    //console.log(db)
  }

  function deleteMember() {
    // db.splice(2, 2);
    // console.table(db);
    // getMembers();
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
            {members.map((item) => {
              let { node_id, name, owner, default_branch } = item as any;
              return (
                <tr key={node_id}>
                  <td>{name}</td>
                  <td>{owner.login}</td>
                  <td>{default_branch}</td>
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
                          onClick={async (e) => await getAllMembers()}
                        >
                          {resMsg.delete_1}
                          <i className="material-icons right">delete_sweep</i>
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
