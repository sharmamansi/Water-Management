import React, {  useContext} from 'react';
import userContext from '../context/userContext';
import { useHistory } from "react-router-dom";

export default function Header() {

  const { userData , setUserData } = useContext(userContext);
  const history = useHistory();
  console.log(userData);

  const logout = () => {
       setUserData({
         token: "",
         user : "",
       });
    localStorage.setItem("auth-token","");
    history.push("/");
  }
    
  return (
   <>

  <div className="navbar-fixed">
    <nav className="header">
      <div className="nav-wrapper">
      <a href="/" className="brand-logo left">Water Management</a>
        {
          userData.token ? (
            <a className="waves-effect waves-light right" href="/" onClick={logout}>LogOut</a>
            ) : (
              <>
        <ul class="right">
          <li><a className="waves-effect waves-light " href="/login">Login</a></li>
          <li><a className="waves-effect waves-light large" href="/register">Register</a></li>
        </ul>
        </>

)
}
      </div>
    </nav>
  </div>
   </>
  )
}
