import React , {useState , useContext }from 'react';
import Axios from 'axios';
import { Redirect } from 'react-router';
import userContext from '../context/userContext';


export default function Login() {
  
  const [password, setPassword] = useState();
  const[email, setEmail] = useState();
  const [error, setError] = useState();
  const [redirect,setRedirect] = useState(false);

  const { setUserData } = useContext(userContext);

  const submit = async (e) => {
    e.preventDefault();

    try{
      const credential = {email,password};
      const getUser = await Axios.post("http://localhost:5000/users/login",credential);
      if(getUser){
        setUserData({
          token : getUser.data.token,
          user : getUser.data.user,
        });
        localStorage.setItem("auth-token",getUser.data.token);
        setRedirect(true)
      }
      console.log(getUser);

    }catch (err){
      setError(err.response.data.msg);

    }
  }

  if(redirect) return <Redirect to="/dashboard"/>
  return (
 <>
  <div className="block">
    <h1>Login</h1>
   <div className="row">
     <div className="col s12">
       <form>
      <div className="input-feild">
      <label htmlFor="reg-email">Email</label>
      <input id="reg-email" type="email"  onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="input-feild">
      <label htmlFor="reg-password">Password</label>
          <input id="reg-password" type="password" onChange={(e) => setPassword(e.target.value)} />
      </div>
       </form>
       <button className="btn-large"  onClick={submit}>Submit</button>
     </div>
   </div>
  </div>
</>
  )
}
