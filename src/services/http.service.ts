class HttpService {

  async http_get(url = '', headers = new Headers()) {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: headers,
        mode: 'cors',
        cache: 'default',    
        credentials: 'same-origin'
      })
      return await response.json();  
    } catch (error) {
      console.error(error)
      return {};
    }
  }

  async http_post(url = '', body = {}) {
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrer: 'no-referrer',
      body: JSON.stringify(body),
    });
    return await response.json(); // parses JSON response into native Javascript objects
  }

  async http_delete(url = '', body = {}, headers = new Headers()) {
    headers.append('Content-Type', 'application/json');
    const response = await fetch(url, {
      method: 'delete',
      //mode: 'cors', // no-cors, cors, *same-origin
      headers: headers,
      body: JSON.stringify(body),
    });
    return await response.json(); // parses JSON response into native Javascript objects
  }

  async http_put(url = '', body = {}, headers = new Headers()) {
    headers.append('Content-Type', 'application/json');
    const response = await fetch(url, {
      method: 'put',
      //mode: 'cors', // no-cors, cors, *same-origin
      headers: headers,
      body: JSON.stringify(body),
    });
    return await response.json(); // parses JSON response into native Javascript objects
  }

}

export default new HttpService()