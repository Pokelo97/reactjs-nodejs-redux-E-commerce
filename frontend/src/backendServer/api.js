import axios from 'axios'
import authHeader from './authHeader';

const signIn = (password,username)=>{
    let info ={
        password:password,
        email:username
    }
     return axios.post("/signIn",info)
      .then(response => response.data)
    .catch(error => {
      throw error;
    });
}

const signUp = (values)=>{
    return axios.post("/signUp",values)
      .then(response => response.data)
    .catch(error => {
      throw error;
    });
}
const getUser = (token)=>{
  return axios.get("/getUser", { headers: authHeader(token) })
              .then(data=>data)

}

const addProduct = (values,token)=>{
  return axios.post("/addProduct",values,{headers: authHeader(token) })
  .then(response => response.data)
  .catch(error => {
    throw error;
  });
}

const removeProduct = (id)=>{
  return axios.delete(`/removeProduct/${id}`)
  .then( response => response.data)
  .catch(error => {
    throw error;
  });
}
export {signIn,signUp,getUser,addProduct,removeProduct}