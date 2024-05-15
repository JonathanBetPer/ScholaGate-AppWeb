import React, { useEffect, useState } from "react";
import { getUsers } from "../services/authService";

function UserCard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers()
      .then((data) => setUsers(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      {users.map((user) => (
        <div key={user._id}>
          <h2>{user.name}</h2>
          {/* Muestra más datos del usuario si los hay */}
        </div>
      ))}
    </div>
  );
}

export default UserCard;
