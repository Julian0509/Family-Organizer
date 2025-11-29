import Layout from "./Layout";
import { useState } from "react";
function Login() {
  return (
    <div className="login-wrapper">
    <Layout></Layout>
      <h1>Please Log In</h1>
       <form>
        <label>
          <p>Username</p>
          <input type="text"/>
        </label>
        <label>
          <p>Password</p>
          <input type="password" />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>

  );
}
export default Login; 
