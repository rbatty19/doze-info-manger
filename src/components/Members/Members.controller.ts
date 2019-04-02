import http from '../../services/http.service';
import { resMsg } from 'rober19-config';
import config, { StateContext } from '../../config/global.config';
import Swal from 'sweetalert2';

export async function deleteMember(id: string, state: any, dispatch: any) {
  try {
    let res = await http.http_delete(`${config.app_config.backend_heroku_link}/member?id=${id}`);
    if (res) {
      getAllMembers(state, dispatch); // console.log('es 200')
      context_({ type: 'CHANGE_NAME', App_Loader: true }, state, dispatch);
    }
  } catch (error) {
    context_({ type: 'CHANGE_NAME', App_Loader: true }, state, dispatch);
  }
}

function context_({ InitVoid, arr, App_Loader, type }: StateContext, state: any, dispatch: any) {
  return dispatch({
    InitVoid: InitVoid || state.InitVoid,
    arr: arr || state.arr,
    App_Loader: App_Loader != undefined ? App_Loader : state.App_Loader,
    type: type || state.type,
  } as StateContext);
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
  if (res && res.length != state.arr.length) {
    context_({ type: 'CHANGE_NAME', App_Loader: false, arr: res }, state, dispatch);
  }
}

export function UpdateMember(e: any) {
  const { Name, Price, Id, ImageURL } = e;

  Swal.fire({
    title: 'Formulario de Actualización',
    width: '1000px',
    html: `  
    <form class="col s12" name="form" >
          <div class="row">
            <div class="col s12 m6">
              <input
                
                id="first_name"
                type="text"
                class="input-field" 
                name="first_name"
                value=${resMsg.name_1}
                required
              />
              <label>${resMsg.name_1}</label>
            </div>
            <div class="col s12 m6">
              <input
                id="last_name"
                name="last_name"
                type="text"
                class="input-field"                
                required
              />
              <label>${resMsg.surname_1}</label>
            </div>
          </div>

          <div class="row">
          <div class="col s12 m6">
              <input
                id="cc_id"
                name="cc_id"               
                type="text"
                class="input-field"           
                value=${resMsg.name_1}
                required
              />
              <label>${resMsg.cc_col_id.toUpperCase()}</label>
            </div>
            <div class="col s12 m6">
              <input
                id="rama_id"
                name="rama_id"
                type="text"
                class="input-field"                     
                required
              />
              <label>${resMsg.branch}-ID</label>
            </div>
          </div>

          <div class="row">
            <div class="col s6">
              <select id="semestre" class="browser-default" defaultValue="" required>
                <option value="" disabled>
                  {resMsg.ChooseOneOpc}
                </option>
                {semestres()}
                <option defaultValue="Escuela">Escuela</option>
                <option defaultValue="Otro">Otro</option>
              </select>
              <label>Semestre</label>
            </div>
            <div class="col s6">
              <select id="rama" class="browser-default" defaultValue="" required>
                <option value="" disabled>
                  {resMsg.ChooseOneOpc}
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
              </select>
              <label>${resMsg.branch}</label>
            </div>
          </div>

          <div class="row">
            <div class="col s12 m6">
              <input
                id="email"
                name="email"
                type="email"
                class="input-field"               
                required
              />
              <label>${resMsg.email_address_2}</label>
            </div>
          </div>        
        </form>
    `,
    focusConfirm: false,
    preConfirm: () => {
      return [
        (document.getElementById('swal-input1') as any).value,
        // document.getElementById('swal-input2').value,
        // document.getElementById('swal-input3').value,
      ];
    },
  }).then(async result => {
    console.warn(result);

    // await Product_Update({
    //   Id: Id,
    //   Name: result.value[0],
    //   ImageURL: result.value[1],
    //   Price: result.value[2],
    // });
    // await getProducts();
  });
}
