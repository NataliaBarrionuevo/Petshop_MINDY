async function getData(){
    await fetch("https://apipetshop.herokuapp.com/api/articulos")
    .then(response => response.json())
    .then(json => data = json);
    localStorage.setItem('data', JSON.stringify(data));
    }
    getData()