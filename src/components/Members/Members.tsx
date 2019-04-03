import React, { useContext, useEffect } from 'react';
import { resMsg } from 'rober19-config';
import http from '../../services/http.service';
import config, { StateContext } from '../../config/global.config';
import { NewMember } from './Members.controller';
import { AppContext } from '../../AppContext';

export default function Members() {
  const { state, dispatch }: any = useContext(AppContext);

  useEffect(() => {
    //console.log(`Component One`);
  });

  function context_({ InitVoid, arr, App_Loader, type }: StateContext) {
    return dispatch({
      InitVoid: InitVoid || state.InitVoid,
      arr: arr || state.arr,
      App_Loader: App_Loader != undefined ? App_Loader : state.App_Loader,
      type: type || state.type,
    } as StateContext);
  }

  function semestres() {
    let select_ = [];
    for (let j = 1; j <= 10; j++) {
      select_.push(
        <option key={j} defaultValue={`${j}`}>
          {j}
        </option>,
      );
    }
    return select_;
  }

  return (
    <div className="container">
      <h1>Formulario</h1>

      <div className="row">
        <form className="col s12" name="form" onSubmit={e => NewMember(e, state, dispatch)}>
          <div className="row">
            <div className="input-field col s12 m6">
              <input
                placeholder="Jack"
                id="nombre"
                type="text"
                className="validate"
                name="nombre"
                required
              />
              <label>{resMsg.name_1}</label>
            </div>
            <div className="input-field col s12 m6">
              <input
                id="apellido"
                name="apellido"
                type="text"
                className="validate"
                placeholder="Frost"
                required
              />
              <label>{resMsg.surname_1}</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12 m6">
              <input
                id="cc_id"
                name="cc_id"
                placeholder="CC #.###.###"
                type="text"
                className="validate"
                required
              />
              <label>{resMsg.cc_col_id.toUpperCase()}</label>
            </div>
            <div className="input-field col s12 m6">
              <input
                id="rama_id"
                name="rama_id"
                type="text"
                className="validate"
                placeholder="4"
                required
              />
              <label>{resMsg.branch}-ID</label>
            </div>
          </div>

          <div className="row">
            <div className="col s12 m6">
              <select id="semestre" className="browser-default" defaultValue="" required>
                <option value="" disabled>
                  {resMsg.ChooseOneOpc}
                </option>
                {semestres()}
                <option defaultValue="Escuela">Escuela</option>
                <option defaultValue="Otro">Otro</option>
              </select>
              <label>Semestre</label>
            </div>
            <div className="col s12 m6">
              <select id="rama" className="browser-default" defaultValue="" required>
                <option value="" disabled>
                  {resMsg.ChooseOneOpc}
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
              </select>
              <label>{resMsg.branch}</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12">
              <input
                id="email"
                name="email"
                type="email"
                className="validate"
                placeholder="jack@frost.com"
                required
              />
              <label>{resMsg.email_address_2}</label>
            </div>
          </div>
          <button className="btn blue waves-effect waves-light" type="submit" name="action">
            {resMsg.save}
            <i className="material-icons right">send</i>
          </button>
        </form>
      </div>
    </div>
  );
}
