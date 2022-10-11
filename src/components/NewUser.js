const NewUser = () => {
  return (
    <div>
      <input
        type="text"
        placeholder="name"
        name="name"
        className="input input-bordered w-full max-w-xs"
      />
      <input
        type="text"
        placeholder="lastname"
        name="lastname"
        className="input input-bordered w-full max-w-xs"
      />
      <button className="btn btn-outline btn-secondary">Agregar</button>
      <button className="btn btn-outline btn-secondary">Cancelar</button>
    </div>
  );
};

export default NewUser;
