import { useState, useEffect } from "react";
import { Form, Field } from "react-final-form";
import axiosCliente from "./../config/axiosConfig";
import { Link } from "react-router-dom";

const EditUser = (id) => {
    
  const [values, setValues] = useState({
    name: "",
    lastname: "",
  });
  
  const handleClick = async () => {
    const res = await axiosCliente.put("/users", values);
    console.log("res.data del put --->" (res.data));
    window.alert("Usuario: " + values.name + " se edito con exito!");
    await sleep(2000);
    window.location.reload();
  };

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const onSubmit = async (values) => {
    await sleep(1000);
    window.location.reload();
  };
  const handleKeyUp = (e) => {
    console.log("target.value-->",(e.target.value));
    setValues({
      ...values,
      [e.target.name]:e.target.value
    })
  }

  const required = (value) => (value ? undefined : "Required");
  const close = (e) => {
    e.preventDefault();
    window.location.reload();
  };

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, form, submitting, pristine, values }) => (
        <div className="card-body p-3">
          <h2 className="card-title m-3">Editar usuario!</h2>
          <form onSubmit={handleSubmit}>
            <Field
              className="input-group-sm mb-3"
              name="name"
              validate={required}
            >
              {({ input, meta }) => (
                <div className="mb-2 input-group-sm">
                  <label className="input-group-sm p-2">Nombre</label>
                  <input
                    {...input}
                    autoFocus
                    className="input input-bordered input-sm p-2"
                    type="text"
                    onKeyUp={(e) => handleKeyUp(e)}
                    placeholder="ingresa tu nombre"
                    defaultValue={values.name}
                    
                  />
                  {meta.error && meta.touched && (
                    <span className="p-1 rounded alert-error">
                      {meta.error}
                    </span>
                  )}
                </div>
              )}
            </Field>

            <Field
              className="input-group-sm m-3"
              name="lastname"
              validate={required}
            >
              {({ input, meta }) => (
                <div className="mb-2 input-group-sm">
                  <label className="input-group-sm p-2">Apellido</label>
                  <input
                    {...input}
                    className="input input-bordered input-sm p-2"
                    type="text"
                    onKeyUp={(e) => handleKeyUp(e)}
                    placeholder="ingresa tu apellido"
                    defaultValue={values.lastname}
                    
                  />
                  {meta.error && meta.touched && (
                    <span className=" p-1 rounded alert-error">
                      {meta.error}
                    </span>
                  )}
                </div>
              )}
            </Field>

            <div>
              <button
                className="btn m-2 btn-outline btn-accent p-2"
                type="submit"
                onClick={(e) => handleClick(e)}
                disabled={submitting}
              >
                Enviar
              </button>
              <button
                onClick={(e) => close(e)}
                className="btn btn-outline btn-accent p-2"
              >
                Cancelar
              </button>
            </div>
          </form>
          <Link to="/">Volver al Home</Link>
        </div>
      )}
    />
  );
};

export default EditUser;
