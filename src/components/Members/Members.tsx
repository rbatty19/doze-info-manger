import React, { useContext, useEffect } from 'react';
import { resMsg } from 'rober19-config';
import http from '../../services/http.service';
import config from '../../config/global.config';
import { AppContext } from '../../AppContext';

export default function Members() {

  const { state, dispatch } : any = useContext(AppContext);

  useEffect(() => {
    console.log(`Component One`);
  })

  async function NewMember(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { last_name, first_name, cc_id, rama_id, rama, semestre, email }: any = e.target;

    const data = {
      nombre: first_name.value,
      apellido: last_name.value,
      rama_id: rama_id.value,
      rama: rama.value,
      id_ciudadania: cc_id.value,
      semestre: semestre.value,
      email: email.value,
    };

    //console.log(data)    
    let res = await http.http_post(`${config.app_config.backend_heroku_link}/member`, data);
   // console.log(res)

    if (res.status == 200) {
     // console.log('es 200')
      dispatch({
        type: "CHANGE_NAME",
        name: 'name',
        arr: state.arr        
      });
    }
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
        <form className="col s12" name="form" onSubmit={e => NewMember(e)}>
          <div className="row">
            <div className="input-field col s6">
              <input
                placeholder="Jack"
                id="first_name"
                type="text"
                className="validate"
                name="first_name"
                required
              />
              <label>{resMsg.name_1}</label>
            </div>
            <div className="input-field col s6">
              <input
                id="last_name"
                name="last_name"
                type="text"
                className="validate"
                placeholder="Frost"
                required
              />
              <label>{resMsg.surname_1}</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s6">
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
            <div className="input-field col s6">
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
            <div className="col s6">
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
            <div className="col s6">
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
