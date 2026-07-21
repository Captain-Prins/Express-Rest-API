import axios from "axios";
import { useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  const [name, setname] = useState("");
  const [role, setrole] = useState("");

  const loadUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/users");
      setUsers(response.data);
    } catch (err) {
      setError(err.message);
    }
  };

  const createUser = async () => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/users", {
        name,
        role,
      });

      setUsers((currentUser) => [...currentUser, response.data]);

      setname("");
      setrole("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
    
      <h1>Users</h1>

      <form onSubmit={createUser} method="post">
        <input
          type="text"
          placeholder="Input User"
          value={name}
          onChange={(event) => setname(event.target.value)}
        />

        <input
          type="text"
          placeholder="Input role"
          value={role}
          onChange={(event) => setrole(event.target.value)}
        />

        <button type="submit">Create User</button>
      </form>

      <button onClick={loadUsers}>Load Users</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <pre>{JSON.stringify(users, null, 2)}</pre>
    </>
  );
}

export default App;
