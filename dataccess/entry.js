let Entry = [
  {
    id: 1,
    title: "hola",
    content: "jdbc es lo más",
  },
  {
    id: 2,
    title: "PHP",
    content: "aguante laravel",
  },
  {
    id: 3,
    title: "java",
    content: "hola xava",
  },
  {
    id: 4,
    title: "Python",
    content: "hola python",
  },
];

const getAll = (filter) => { 
  let filtrado = Entry;
  
  if(filter.title){
    filtrado = filtrado.filter(e => e.title === filter.title)
  }

  if(filter.content){
    filtrado = filtrado.filter (e => e.content.includes(filter.content))
  }

  if(filter.multitle){
    filtrado = filtrado.filter(e => filter.multitle.split(',').includes(e.title))
  }

  if(filter.search){
    filtrado = filtrado.filter(e => e.title.includes(filter.search) || e.content.includes(filter.search))
  }

  if(filter.multisearch){
    const palabrasABuscar = filter.multisearch.split(',');
    filtrado = filtrado.filter(entry => { 
      const filtro = palabrasABuscar.filter(palabra => entry.title.includes(palabra) || entry.content.includes(palabra))
      return filtro.length > 0      
    })
  }
  

  return filtrado
};

const getOne = (id) => { return Entry.find((registro) => registro.id == id);}

const save = (body) => { Entry.push(body);}

const borrar = (id) => {
  const index = Entry.findIndex((registro) => registro.id == id);
  if (index > 0) {
    Entry.splice(index, 1);
    return true
  }
  return false
}

const update = (id) => { 
  const index = Entry.findIndex((registro) => registro.id == id);
  if (index >= 0) {
    Entry[index] = req.body;
    return true
  } 
  return false
}

module.exports = { getAll, getOne, save, borrar, update};
