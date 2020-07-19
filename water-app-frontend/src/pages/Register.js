import React, { useState } from "react";
import Axios from "axios";
import { Redirect } from "react-router";
import ErrorHandle from "../component/ErrorHandle";

export default function Register() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [password2, setPassword2] = useState();
  const [username, setUsername] = useState();
  const [error, setError] = useState();
  const [redirect, setRedirect] = useState(false);
  const[disable,setDisable] = useState(false);

  const submit = async e => {
    setDisable(true);
    const newUser = { email, username, password, password2 };
    try {
      await Axios.post("http://localhost:5000/users/register", newUser);
      setRedirect(true);
      setDisable(false);
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };
  if (redirect) return <Redirect to="/login" />;
  return (

    <>
      <div className="mainblock">
        <div className="block">
          <h1>Register</h1>
          {error ? <ErrorHandle data={error} /> : null}
          <div className="row">
            <div className="col s12">
              <form>
                <div className="input-feild">
                  <label htmlFor="reg-email">Email</label>
                  <input
                    id="reg-email"
                    type="email"
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>
                <div className="input-feild">
                  <label htmlFor="reg-username">Username</label>
                  <input
                    id="reg-username"
                    type="text"
                    onChange={e => setUsername(e.target.value)}
                  />
                </div>
                <div className="input-feild">
                  <label htmlFor="reg-password">Password</label>
                  <input
                    id="reg-password"
                    type="password"
                    onChange={e => setPassword(e.target.value)}
                  />
                </div>
                <div className="input-feild">
                  <label htmlFor="reg-cnfpassword">Confirm Password</label>
                  <input
                    id="reg-cnfpassword"
                    type="text"
                    onChange={e => setPassword2(e.target.value)}
                  />
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
  );
}
