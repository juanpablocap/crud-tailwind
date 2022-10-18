import { useEffect, useState } from "react";
import axiosCliente from "../config/axiosConfig";
import { Form, Field } from 'react-final-form';




const Table = () => {

  const [users, setUsers] = useState();
  const [editUser, setEditUser] = useState();
  const required = value => (value ? undefined : 'Required')
  const onSubmit = async values => {

  }
  
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
  };

// editar modal
  const handleEditModal = async (id) => {
    const resEdit = await axiosCliente.get("/users/"+id);
    console.log(resEdit.data.name);
    setEditUser(resEdit.data);
    setValues({
      name:'',
      lastname:'',
    });
    
  };

//traer usuarios 
  const getUsers = async () => {
    const res = await axiosCliente.get("/users");
    setUsers(res.data);
  };
// borrar usuario
  const delUser = async (id) => {
    if (
      window.confirm(`Confirma que desea elimiarel usuario? ${users.id}`) ===
      true
    ) {
      const res = await axiosCliente.delete("/users/" + id);
      console.log(res);
      if (res.status === 200) {
        console.log("Usuario borrado con exito!");
      } else {
        console.log("Hubo un error en el borrado del usuario");
      }
      getUsers();
    }
  };


  useEffect(() => {
    getUsers();
  }, [setUsers]);

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Accion</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, idx) => (
              <tr key={idx}>
                <th>{idx + 1}</th>
                <td>{user.name}</td>
                <td>{user.lastname}</td>
                <td>
                  <button>
                    <label
                      onClick={() => handleEditModal(user.id)}
                      htmlFor="my-modal-3"
                      className="btn modal-button btn-accent  btn-xs m-2"
                    >
                      Editar
                    </label>
                  </button>

                  <button
                    className="btn  btn-secondary  btn-xs"
                    onClick={() => delUser(user.id)}
                  >
                    Borrar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="my-modal-3"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">
            Editar el usuario
          </h3>
          <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, form, submitting, pristine, values }) => (
        <div className="card-body p-3">
        <form onSubmit={handleSubmit} >
          <Field  className="input-group-sm mb-3" name="name" validate={required}>
            {({ input, meta }) => (
              <div className="mb-2 input-group-sm" >
                <label className="input-group-sm p-2">Nombre</label>
                <input {...input} 
                autoFocus
                name="name"
                className="input input-bordered input-sm p-2" 
                type="text" 
                onKeyUp={(e)=>handleKeyUp(e)}
                value={!editUser? "nada" : editUser.name }
                 />
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
                placeholder="ingresa tu apellido"
                name="lastname"
                value={!editUser? "nada" : editUser.lastname } 
                />
                {meta.error && meta.touched && 
                <span className=" p-1 rounded alert-error">{meta.error}</span>}
              </div>
            )}
          </Field>

          <div >
            <button onClick={handleEditModal} className="btn m-2 btn-outline btn-accent p-2" 
            type="submit" 
           
            disabled={submitting} >
              Editar
            </button>
          </div>
        </form>
        </div>
      )}
    />
        </div>
      </div>
    </>
  );
};

export default Table;
