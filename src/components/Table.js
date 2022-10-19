import { useEffect, useRef, useState } from "react";
import axiosClient from "../config/axiosConfig";
import { Form, Field } from "react-final-form";

const Table = () => {
  const ref = useRef(null);
  const [users, setUsers] = useState();
  const [editUser, setEditUser] = useState();
  const required = (value) => (value ? undefined : "Required");
  const onSubmit = async (values) => {};

  // editar modal
  const handleEditModal = async (id) => {
    const resEdit = await axiosClient.get("/users/" + id);
    setEditUser(resEdit.data);
  };

  const handleEdit = async (values) => {
    const update = await axiosClient.put("/users/" + values.id, values);
    update.status === 200
      ? console.log("Se edito con exito!")
      : console.log("Error al editar");
    getUsers();
  };

  const getUsers = async () => {
    const res = await axiosClient.get("/users");
    setUsers(res.data);
  };

  const delUser = async (id) => {
    if (
      window.confirm(`Confirma que desea elimiarel usuario? ${users.id}`) ===
      true
    ) {
      const res = await axiosClient.delete("/users/" + id);
      if (res.status === 200) {
        console.log("Usuario borrado con exito!");
        getUsers();
      } else {
        console.log("Hubo un error en el borrado");
      }
    }
  };

  const handleClose = () => {
    ref.current.checked = false;
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

      <input
        type="checkbox"
        ref={ref}
        id="my-modal-3"
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="my-modal-3"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            {" "}
            ✕
          </label>
          <h3 className="text-lg font-bold">
            Editar el usuario n {editUser ? editUser.id : ""}
          </h3>
          <Form
            initialValues={editUser}
            onSubmit={handleEdit}
            render={({
              handleSubmit,
              form,
              submitting,
              pristine,
              values,
              validate,
            }) => (
              <div className="card-body p-3">
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
                        />
                        {meta.error && meta.touched && (
                          <span className="p-1 rounded alert-error m-3">
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
                          placeholder="ingresa tu apellido"
                        />
                        {meta.error && meta.touched && (
                          <span className=" p-1 rounded alert-error m-3">
                            {meta.error}
                          </span>
                        )}
                      </div>
                    )}
                  </Field>

                  <div>
                    <button
                      className="btn m-2 btn-outline btn-accent p-2 "
                      type="submit"
                      onClick={handleClose}
                      disabled={submitting}
                    >
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
