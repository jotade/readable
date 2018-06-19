


const api = `http://localhost:3001`
const headers = { headers: { 'Authorization': 'whatever-you-want' }}


export const getCategories = () => {
  return fetch(`${api}/categories`, headers)
    .then( (res) => { return(res.json()) })
    .then((data) => data)
}

export const addPost = () => {
  return fetch(`${api}/posts`, headers)
    .then( (res) => { return(res.json()) })
    .then((data) => data)
}
