import React , {useState , useContext }from 'react';
import Axios from 'axios';
import { Redirect } from 'react-router';
import userContext from '../context/userContext';
import ErrorHandle from '../component/ErrorHandle'


export default function Login() {
  
  const [password, setPassword] = useState();
  const[email, setEmail] = useState();
  const [error, setError] = useState();
  const [redirect,setRedirect] = useState(false);
  const[disable,setDisable] = useState(false);

  const { setUserData } = useContext(userContext);

  const submit = async (e) => {
    setDisable(true);
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
        setRedirect(true);
        setDisable(false);
      }
      console.log(getUser);

    }catch (err){
      setError(err.response.data.msg);

    }
  }

  if(redirect) return <Redirect to="/dashboard"/>
  return (

 <>
<div className="mainblock">
<div className="block">
    <h1>Login</h1>

    {error ? <ErrorHandle data={error} /> : null}
   <div className="row">
     <div className="col s12">
       <form>
      <div className="input-feild">
      <label for="email">Email</label>
      <input id="email" type="email" onChange={(e) => setEmail(e.target.value)} />
      
      </div>
      <div className="input-feild">
      <label htmlFor="reg-password">Password</label>
          <input id="reg-password" type="password" onChange={(e) => setPassword(e.target.value)} />
      </div>
       </form>
       {
                disable ? (
                  <button  className="btn-large disabled" onClick={submit}>
                Submit
              </button>
                ) :
                 (
                   <button  className="btn-large" onClick={submit}>
                Submit
              </button>
              
              )
              }
     </div>
   </div>
  </div>
</div>
 
</>
  )
}
