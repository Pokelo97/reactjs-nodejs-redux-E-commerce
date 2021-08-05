import axios from "axios";

const AddProduct = (setErr,values,setApiRep,setOpen)=>{
    //props.setErr([]);

    axios.post("/addProduct",values)
    .then(res => {
      res.data.message.errors 
        ?(res.data.message.errors.map((error)=>
            setErr(oldArray => [...oldArray,error.msg])))
        :(setApiRep(res.data.message));
    }).catch(err => {
    console.log(err);
    });

    setOpen(true)
}
export {AddProduct};