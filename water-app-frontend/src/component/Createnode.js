import React, { useState, useContext } from "react";
import Axios from "axios";
import { Redirect } from "react-router";
import ErrorHandle from "./ErrorHandle";

export default function Createnode() {
  const [cusname, setCusname] = useState();
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [error, setError] = useState();
  const [redirect, setRedirect] = useState(false);
  const [disable, setDisable] = useState(false);

  const submit = async e => {
    setDisable(true);
    e.preventDefault();

    try {
      const cred = {
        customer_name: cusname,
        customer_email: email,
        port_name: username
      };
      const createnode = await Axios.post(
        "http://localhost:5000/nodes/register",
        cred
      );
      if (createnode) {
        setRedirect(true);
        setDisable(false);
      }
    } catch (err) {
      setError(err.response.data.msg);
    }
  };
  if (redirect) return <Redirect to="/dashboard" />;
  return (
    <>
      <div className="mainblock">
        <div className="block">
          <h1>Create node</h1>
          {error ? <ErrorHandle data={error} /> : null}
          <div className="row">
            <div className="col s12 l5">
              <form>
                <div className="input-feild">
                  <label htmlFor="customer_name">Customer Name</label>
                  <input
                    id="customer_name"
                    type="text"
                    onChange={e => setCusname(e.target.value)}
                  />
                </div>
                <div className="input-feild">
                  <label htmlFor="customer_email">Customer Email</label>
                  <input
                    id="customer_email"
                    type="email"
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>
                <div className="input-feild">
                  <label htmlFor="username">Username</label>
                  <input
                    id="username"
                    type="text"
                    onChange={e => setUsername(e.target.value)}
                  />
                </div>
              </form>
              {disable ? (
                <button className="btn-large disabled" onClick={submit}>
                  Submit
                </button>
              ) : (
                <button className="btn-large" onClick={submit}>
                  Submit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
