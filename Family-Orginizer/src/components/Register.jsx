import { useState } from "react";
import "../styles/styling.css";
import { useNavigate } from "react-router-dom";
import useToken from "./useToken";

async function registerUser(credentials) {
    return fetch('http://localhost:3002/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
   }



function Register({ setToken }) {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [familyId, setFamilyId] = useState();
    const [role, setRole] = useState("Member");
    const navigate = useNavigate();
    

    const goToLogin = () => {
      navigate("/login");
    }

    const handleSubmit = async e => {
        e.preventDefault();
        navigate("/login");
        const token = await registerUser({
          username,
          password,
          familyId,
          role
        });
        
      }

  return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 px-4">
    <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">
      
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Welcome</h1>
        <p className="text-gray-500 mt-2">Please register</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Username */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Username
          </label>
          <input
            type="text"
            placeholder="Enter your username"
            onChange={e => setUserName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
            required
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            onChange={e => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            FamilyId
          </label>
          <input
            type="text"
            placeholder="Enter your FamilyId"
            onChange={e => setFamilyId(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
            required
          />
        </div>

        <div>
          <label className="text-sm text-gray-600">Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="input cursor-pointer"
          >
            <option value="member">Member</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition duration-200 shadow-md"
        >
          Create User
        </button>

        <button
          className="w-full py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition duration-200 shadow-md"
          onClick={goToLogin}
        >
          Log In
        </button>
      </form>

      
    </div>
  </div>
  );
}

export default Register; 
