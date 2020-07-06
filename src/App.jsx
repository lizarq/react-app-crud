import React, { useState } from "react";
import shortid from "short-id";
function App() {
  const [tarea, setTarea] = useState("");
  const [tareas, setTareas] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [id, setId] = useState("");
  const [error, setError] = useState("");
  const addTask = (e) => {
    e.preventDefault();
    if (!tarea.trim()) {
      setError("Escriba algo por favor ...");
      return;
    }
    setTareas([...tareas, { id: shortid.generate(), nombreTarea: tarea }]);
    setError(null);
    setTarea("");
  };

  const submitModifyTask = (e) => {
    e.preventDefault();
    if (!tarea.trim()) {
      setError("Escriba algo por favor ...");
      return;
    }
    const arrayModificado = tareas.map((el) =>
      el.id === id ? { id, nombreTarea: tarea } : el
    );
    setTareas(arrayModificado);
    setTarea("");
    setId("");
    setError(null);
    setEditMode(false);
  };
  const deleteTask = (id) => {
    const arrayFiltrado = tareas.filter((el) => el.id !== id);
    setTareas(arrayFiltrado);
  };
  const modifyTask = (item) => {
    setEditMode(true);
    setId(item.id);
    setTarea(item.nombreTarea);
  };
  return (
    <div className="container mt-5">
      <h1>Crud Simple</h1>
      <hr />
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">Lista de tareas</h4>
          <ul className="list-group">
            {tareas.length === 0 ? (
              <li className="list-group-item">No hay items seleccionados</li>
            ) : (
              tareas.map((item) => (
                <li className="list-group-item" key={item.id}>
                  <span className="lean">{item.nombreTarea}</span>
                  <button
                    onClick={() => deleteTask(item.id)}
                    className="btn btn-danger btn-sm float-right mx-2"
                  >
                    Eliminar{" "}
                  </button>
                  <button
                    onClick={() => modifyTask(item)}
                    className="btn btn-warning btn-sm float-right mx-2"
                  >
                    Editar{" "}
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
        <div className="col-4">
          <h4 className="text-center">
            {editMode ? "Editar Tarea" : "Agregar tarea"}
          </h4>
          <form onSubmit={editMode ? submitModifyTask : addTask}>
            {error ? <span className="text-danger">{error}</span> : null}

            <input
              type="text"
              className="form-control mb-2"
              placeholder="Ingrese tarea"
              onChange={(e) => setTarea(e.target.value)}
              value={tarea}
            />
            {editMode ? (
              <button className="btn btn-warning btn-block" type="submit">
                Editar Tarea
              </button>
            ) : (
              <button className="btn btn-dark btn-block" type="submit">
                Agregar Tarea
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
