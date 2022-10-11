import { useState } from 'react';
import { Form, Field } from 'react-final-form';
import axios from 'axios';


const NewUser = () => {

  const  [values, setValues] = useState({
    name:'',
    lastname:'',
  });

  const handleKeyUp = (e) => {
    console.log(e.target.value);
    setValues({
      ...values,
      [e.target.name]:e.target.value
    })
  }

  const handleClick = async () =>{
    //sendToBack(values)
    await sleep(2000);
    console.log("se envio al Backend!");
    //navegar al home
  }

  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
  const onSubmit = async values => {
  await sleep(2000)
  window.alert("Usuario guardado!");
}

const required = value => (value ? undefined : 'Required')

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, form, submitting, pristine, values }) => (
        <div className="card-body p-3">
          <h2 className="card-title m-3">Ingresa nuevo usuario!</h2>
        <form onSubmit={handleSubmit} >
          <Field  className="input-group-sm mb-3" name="name" validate={required}>
            {({ input, meta }) => (
              <div className="mb-2 input-group-sm" >
                <label className="input-group-sm p-2">Nombre</label>
                <input {...input} 
                className="input input-bordered input-sm p-2" 
                type="text" onKeyUp={(e)=>handleKeyUp(e)}
                placeholder="ingresa tu nombre" />
                {meta.error && meta.touched && 
                <span className="p-1 rounded alert-error">{meta.error}</span>}
              </div>
            )}
          </Field>

          <Field className="input-group-sm m-3" name="lastname" validate={required}>
            {({ input, meta }) => (
              <div className="mb-2 input-group-sm">
                <label className="input-group-sm p-2">Apellido</label>
                <input {...input} 
                className="input input-bordered input-sm p-2" type="text" 
                onKeyUp={(e)=>handleKeyUp(e)}
                placeholder="ingresa tu apellido" />
                {meta.error && meta.touched && 
                <span className=" p-1 rounded alert-error">{meta.error}</span>}
              </div>
            )}
          </Field>

          <div >
            <button className="btn m-2 btn-outline btn-accent p-2" 
            type="submit" 
            onClick={(e)=>handleClick(e)}
            disabled={submitting}>
              Enviar
            </button>
            <button className="btn btn-outline btn-accent p-2">
              Cancelar</button>
          </div>
        </form>
        
        </div>
      )}
    />
  );
};

export default NewUser;
