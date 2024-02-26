async function fazendas(req, res) {

    const q = encodeURI(req.query.q);
    const p = req.query.p;
    const min = req.query.min;
    const max = req.query.max;
  
    const options = {
      method: 'get',
      headers: {
        Authorization: `Bearer apanTOmOuTetYrfaRgANtraW`,
      },
    }

    const response = await fetch(`https://goweb.cloudcrow.com.br/?q=${q}&p=${p}&min=${min}&max=${max}`, options);
    const json = await response.json();
  
    res.json({ ...json })
  
  }
  
  export default fazendas;