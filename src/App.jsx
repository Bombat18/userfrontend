import React, { useState, useEffect } from "react";
import axios from "axios";
import AddUser from "./components/AddUser";
import UserList from "./components/UserList";

const App = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("https://userbackend-hdnw.onrender.com/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const addUser = async (newUser) => {
    try {
      await axios.post("https://userbackend-hdnw.onrender.com/users", newUser);
      fetchUsers();
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const updateUser = async (id, updatedUser) => {
    try {
      await axios.put(`https://userbackend-hdnw.onrender.com/users/${id}`, updatedUser);
      fetchUsers();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`https://userbackend-hdnw.onrender.com/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="container p-4 mx-auto">
      <h1 className="mb-4 text-3xl font-bold text-center">User Management</h1>
      <AddUser addUser={addUser} />
      <UserList users={users} updateUser={updateUser} deleteUser={deleteUser} />
    </div>
  );
};

export default App;
