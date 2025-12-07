import Layout from "./Layout";
import UseFetchUsers from "./FetchUsers";
import useToken from "./useToken";
import { nanoid } from "nanoid";
import EditUserModal from "./editUser";
import { useState } from "react";

function getRoleFromToken(token) {
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.role;
  } catch {
    return null;
  }
}

function getFamilyFromToken(token) {
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.familyId;
  } catch {
    return null;
  }
}

function ManageUser() {
  const { token, setToken } = useToken();
  const { users } = UseFetchUsers(token);
  const userRole = getRoleFromToken(token);
  const mainFamily = getFamilyFromToken(token);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const openEditUser = (user) => {
    setSelectedUser(user);
    setIsEditOpen(true);
  };

  const handleUserUpdated = (updatedUser) => {
    setUsers((prev) =>
      prev.map((u) =>
        (u._id || u.id) === (updatedUser._id || updatedUser.id)
          ? updatedUser
          : u
      )
    );
  };

  const filteredUsers = users.filter((user) => {
    return user.familyId == mainFamily;
  });

  const handleDeleteUser = (_id) => {
    return fetch("http://localhost:3002/delete-user/${_id}", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id }),
    })
      .then((data) => data.json())
      .then(window.location.reload());
  };

  if (userRole == "admin") {
    return (
      <div className="flex flex-col gap-3 bg-gradient-to-br from-indigo-500/20 via-sky-500/20 to-emerald-500/20 backdrop-blur-xl min-h-screen">
        <Layout></Layout>
        {filteredUsers.map((user) => (
          <div
            key={nanoid()}
            className="bg-white/80 backdrop-blur-lg shadow-md rounded-xl p-4 flex justify-between items-center"
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {user.user}
              </h3>
              <p className="text-sm text-gray-500">Role: {user.role}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => openEditUser(user)}
                className="px-3 py-1 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteUser(user._id)}
                className="px-3 py-1 bg-red-400 text-white rounded-lg hover:bg-red-500"
              >
                X
              </button>
              
            </div>
          </div>
        ))}
        <EditUserModal
          isOpen={isEditOpen}
          user={selectedUser}
          onClose={() => setIsEditOpen(false)}
          onUserUpdated={handleUserUpdated}
        />
      </div>
    );
  }
  return (
    <div className="bg-gradient-to-br from-indigo-500/20 via-sky-500/20 to-emerald-500/20 backdrop-blur-xl min-h-screen flex flex-col">
      <Layout></Layout>
      <p>No Acces</p>
    </div>
  );
}
export default ManageUser;
