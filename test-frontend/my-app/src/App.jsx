import axios from "axios";
import { useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  const loadUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/users");
      setUsers(response.data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <h1>Users</h1>

      <button onClick={loadUsers}>Load Users</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <pre>{JSON.stringify(users, null, 2)}</pre>
    </>
  );
}

export default App;
