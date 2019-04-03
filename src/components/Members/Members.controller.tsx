import React, { useContext, useEffect } from 'react';
import { renderToString } from 'react-dom/server';
import http from '../../services/http.service';
import { resMsg } from 'rober19-config';
import config, { StateContext } from '../../config/global.config';
import Swal from 'sweetalert2';

function context_(
  { InitVoid, arr, App_Loader, type, AppChange }: StateContext,
  state: any,
  dispatch: any,
) {
  return dispatch({
    InitVoid: InitVoid || state.InitVoid,
    arr: arr || state.arr,
    App_Loader: App_Loader != undefined ? App_Loader : state.App_Loader,
    AppChange: AppChange != undefined ? AppChange : state.AppChange,
    type: type || state.type,
  } as StateContext);
}

export async function NewMember(e: React.FormEvent<HTMLFormElement>, state: any, dispatch: any) {
  e.preventDefault();

  const { apellido, nombre, cc_id, rama_id, rama, semestre, email }: any = e.target;

  const data = {
    nombre: nombre.value,
    apellido: apellido.value,
    rama_id: rama_id.value,
    rama: rama.value,
    id_ciudadania: cc_id.value,
    semestre: semestre.value,
    email: email.value,
  };

  try {
    let res = await http.http_post(`${config.app_config.backend_heroku_link}/member`, data);
    if (res.status == 200) {
      // console.log('es 200')
      context_({ type: 'CHANGE_NAME', App_Loader: true }, state, dispatch);
    }
  } catch (error) {
    context_({ type: 'CHANGE_NAME', App_Loader: true }, state, dispatch);
  }
  // console.log(res)
}

export async function getAllMembers(state: any, dispatch: any) {
  let res: any = await http.http_get(`${config.app_config.backend_heroku_link}/members`);
  console.log(res);
  console.log(state);

  if (!state.InitVoid && res) {
    return context_({ type: 'CHANGE_NAME', App_Loader: false, InitVoid: true }, state, dispatch);
  }

  if (!res) {
    console.warn('Calling');
    //peticion en caso de error para revisar conectividad cada 5 segundos
    setTimeout(() => {
      context_({ type: 'CHANGE_NAME', App_Loader: true }, state, dispatch);
    }, 5000);
  }
  if ((res && res.length != state.arr.length) || (res && state.AppChange)) {
    context_(
      { type: 'CHANGE_NAME', App_Loader: false, arr: res, AppChange: false },
      state,
      dispatch,
    );
  }
}

export async function deleteMember(id: string, state: any, dispatch: any) {
  const result = await Swal.fire({
    title: `${resMsg.delete_1}?`,
    text: "No se prodrá revertir!",
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    cancelButtonText:  `${resMsg.cancel_1}`,
    confirmButtonText: `${resMsg.delete_1}?`
  })

  if (result.dismiss) return {};

  try {
    let res = await http.http_delete(`${config.app_config.backend_heroku_link}/member?id=${id}`);
    if (res) {
      //getAllMembers(state, dispatch); // console.log('es 200')
      context_({ type: 'CHANGE_NAME', App_Loader: true }, state, dispatch);
    }
  } catch (error) {
    context_({ type: 'CHANGE_NAME', App_Loader: true }, state, dispatch);
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
  //return renderToString(select_ as any); //para convertirlo de [object] a html
  return select_;
}

export async function UpdateMember(item: any, state: any, dispatch: any) {
  const { apellido, nombre, rama_id, id_ciudadania, rama, semestre, email } = item;

  const result = await Swal.fire({
    title: 'Formulario de Actualización',
    width: '1000px',
    type: 'info',   
    showCloseButton: true,
    showCancelButton: true,
    confirmButtonText: `${resMsg.edit}`,
    cancelButtonText:  `${resMsg.cancel_1}`, 
    html: `  
    <form class="col s12" name="form" >
          <div class="row">
            <div class="col s12 m6">
              <input                
                id="nombre-editar"
                type="text"
                class="input-field" 
                name="nombre"
                value="${nombre}"
                required
              />
              <label>${resMsg.name_1}</label>
            </div>
            <div class="col s12 m6">
              <input
                id="apellido-editar"
                name="apellido"
                type="text"
                class="input-field"    
                value=${apellido}            
                required
              />
              <label>${resMsg.surname_1}</label>
            </div>
          </div>

          <div class="row">
          <div class="col s12 m6">
              <input
                id="cc_id-editar"
                name="cc_id"               
                type="text"
                class="input-field"           
                value=${id_ciudadania}
                required
              />
              <label>${resMsg.cc_col_id.toUpperCase()}</label>
            </div>
            <div class="col s12 m6">
              <input
                id="rama_id-editar"
                name="rama_id"
                type="text"
                class="input-field"      
                value=${rama_id}            
                required
              />
              <label>${resMsg.branch}-ID</label>
            </div>
          </div>

         
        ${renderToString(
          <div className="row">
            <div className="col s6">
              <select
                id="semestre-editar"
                className="browser-default"
                defaultValue={semestre}
                required
              >
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
              <select id="rama-editar" className="browser-default" defaultValue={rama} required>
                <option value="" disabled>
                  {resMsg.ChooseOneOpc}
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
              </select>
              <label>{resMsg.branch}</label>
            </div>
          </div>,
        )}
          <div class="row">
            <div class="col s12 m6">
              <input
                id="email-editar"
                name="email"
                type="email"
                class="input-field" 
                value=${email}              
                required
              />
              <label>${resMsg.email_address_2}</label>
            </div>
          </div>        
        </form>
    `,
    focusConfirm: false,
    preConfirm: async () => {
      return await {
        nombre: (document.getElementById('nombre-editar') as any).value,
        apellido: (document.getElementById('apellido-editar') as any).value,
        id_ciudadania: (document.getElementById('cc_id-editar') as any).value,
        rama: (document.getElementById('rama-editar') as any).value,
        rama_id: (document.getElementById('rama_id-editar') as any).value,
        semestre: (document.getElementById('semestre-editar') as any).value,
        email: (document.getElementById('email-editar') as any).value,
        // document.getElementById('swal-input2').value,
        // document.getElementById('swal-input3').value,
      };
    },
  });

  if (result.dismiss) return {};

  try {
    const res = await http.http_put(
      `${config.app_config.backend_heroku_link}/member?id=${item.id}`,
      result.value,
    );
    if (res.status == 200) {
      console.log('pasó');
      context_(
        { type: 'CHANGE_NAME', App_Loader: true, AppChange: true } as StateContext,
        state,
        dispatch,
      );
    }
  } catch (error) {
    console.log(error);
    context_({ type: 'CHANGE_NAME', App_Loader: true }, state, dispatch);
  }
}
