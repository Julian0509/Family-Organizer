import Layout from "./Layout";
import UseFetchUsers from "./FetchUsers";
import useToken from "./useToken";
import { nanoid } from "nanoid";

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

function ManageUser(){
    const { token } = useToken();
    const { users } = UseFetchUsers(token);
    const userRole = getRoleFromToken(token);
    const mainFamily = getFamilyFromToken(token);
    const filteredUsers = users.filter((user) => {
      return user.familyId == mainFamily; 
    })
    console.log(filteredUsers);

    if(userRole == "admin"){
        return (
            <div className="flex flex-col gap-3">
    {filteredUsers.map((user) => (
      <div
        key={user._id}
        className="bg-white/80 backdrop-blur-lg shadow-md rounded-xl p-4 flex justify-between items-center"
      >
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{user.username}</h3>
          <p className="text-sm text-gray-500">Rolle: {user.role}</p>
        </div>

        <div className="text-xs text-gray-400">
          ID: {user._id}
        </div>
      </div>
    ))}
  </div>
        );
    }
    return(
        <div>
            No acces
        </div>
    );
}
export default ManageUser;