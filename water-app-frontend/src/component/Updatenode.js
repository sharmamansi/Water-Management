import React, { useState } from "react";
import Axios from "axios";
import { Redirect } from "react-router";
import ErrorHandle from './ErrorHandle';

export default function Updatenode() {
  const [id, setId] = useState();
  const [recievingl, setRecievingl] = useState();
  const [supplyingl, setSupplyingl] = useState();
  const [syear, setSyear] = useState();
  const [sportname, setSportname] = useState();
  const [squantity, setSquantity] = useState();
  const [smonth, setSmonth] = useState();
  const [ryear, setRyear] = useState();
  const [rportname, setRportname] = useState();
  const [rquantity, setRquantity] = useState();
  const [rmonth, setRmonth] = useState();
  const [error, setError] = useState();
  const [redirect, setRedirect] = useState(false);
  const[disable,setDisable] = useState(false);

  let getArray = a => {
    let Arr = [];
    a.toString();
    let start = 0,
      end = 0,
      i = 0;
    while (i < a.length) {
      if (a[i] === " ") {
        end = i;
        let u = a.substring(start, end);
        Arr.push(u);
        start = i + 1;
      }
      if (i == a.length - 1) {
        end = i;
        let u = a.substring(start, end + 1);
        Arr.push(u);
      }
      i = i + 1;
    }

    return Arr;
  };

  const submit = async e => {
    setDisable(true);
    e.preventDefault();

    try {
      if(!id && !((recievingl && supplyingl) || (syear && sportname && smonth && squantity) || (ryear && rportname && rmonth && rquantity))){
        setError("input minimum required data!");
      }
      if (recievingl) {
        const recievinglist = getArray(recievingl);
        const cred = {
          _id: id,
          recievinglist
        };
        var hasrecievingl = await Axios.put(
          "http://localhost:5000/nodes/update/recievepoints",
          cred
        );
        if (!hasrecievingl) {
          setError("not valid recieving list");
        }
      }

      if (supplyingl) {
        const distributionlist = getArray(supplyingl);
        const cred = {
          _id: id,
          distributionlist
        };
        var hassupplyingl = await Axios.put(
          "http://localhost:5000/nodes/update/supplypoints",
          cred
        );
        if (!hassupplyingl) {
          setError("not valid supplying list");
        }
      }

      if (sportname) {
        let cred = {
          _id: id,
          port_name: sportname,
          quantity: squantity,
          month: smonth,
          year: syear
        };
        var hassupplyobj = await Axios.put(
          "http://localhost:5000/nodes/update/supplyobj",
          cred
        );
        if (!hassupplyobj) {
          setError("not valid supplied data");
        }
      }

      if (rportname) {
        let cred = {
          _id: id,
          port_name: rportname,
          quantity: rquantity,
          month: rmonth,
          year: ryear
        };
        var hasrecieveobj = await Axios.put(
          "http://localhost:5000/nodes/update/recievedobj",
          cred
        );
        console.log(hasrecieveobj);
        if (!hasrecieveobj) { 
         setError("not valid recieved data");
        }
      }

      if (hasrecieveobj || hasrecievingl || hassupplyingl || hassupplyobj) {
        alert("form submited");
        setRedirect(true);
        setDisable(false);
      }
    } catch (err) {
      console.log(err);
      setError(err.response.data.msg);
    }
  };

  if (redirect) return <Redirect to="/dashboard" />;

  
  return (
    <>
      <section className="container ">
        <h1 className="center">Update Node</h1>
        {error ? <ErrorHandle data={error} /> : null}
        <div className="row">
          <div className="col s12 l4">
            <h5>Node Basic Details</h5>
            <form>
              <div className="input-feild">
                <label htmlFor="customer_id"> Id</label>
                <input
                  id="customer_id"
                  type="text"
                  onChange={e => setId(e.target.value)}
                />
              </div>
              <h5>Add Recieve/Supply Points</h5>
              <br />
              <div className="input-feild">
                <label htmlFor="recievingl">Enter Recieving points</label>
                <input
                  id="recievingl"
                  type="text"
                  onChange={e => setRecievingl(e.target.value)}
                />
              </div>
              <div className="input-feild">
                <label htmlFor="supplyingl">Enter Supply Points</label>
                <input
                  id="supplyingl"
                  type="text"
                  onChange={e => setSupplyingl(e.target.value)}
                />
              </div>
            </form>
          </div>

          <div className="col s12 l4">
            <h5>Supplied Water Details</h5>
            <form>
              <div className="input-feild">
                <label htmlFor="sportname"> Supply To Port Name</label>
                <input
                  id="sportname"
                  type="text"
                  onChange={e => setSportname(e.target.value)}
                />
              </div>
              <div className="input-feild">
                <label htmlFor="squantity">Supplied quantity</label>
                <input
                  id="squantity"
                  type="text"
                  onChange={e => setSquantity(e.target.value)}
                />
              </div>
              <div className="input-feild">
                <label htmlFor="smonth">Supply month</label>
                <input
                  id="smonth"
                  type="text"
                  onChange={e => setSmonth(e.target.value)}
                />
              </div>
              <div className="input-feild">
                <label htmlFor="syear">Supply year</label>
                <input
                  id="syear"
                  type="text"
                  onChange={e => setSyear(e.target.value)}
                />
              </div>
            </form>
          </div>

          <div className="col s12 l4">
            <h5>Recieved Water Details</h5>
            <form>
              <div className="input-feild">
                <label htmlFor="rportname"> Recieved From Port Name</label>
                <input
                  id="rportname"
                  type="text"
                  onChange={e => setRportname(e.target.value)}
                />
              </div>
              <div className="input-feild">
                <label htmlFor="rquantity">Recieved quantity</label>
                <input
                  id="rquantity"
                  type="text"
                  onChange={e => setRquantity(e.target.value)}
                />
              </div>
              <div className="input-feild">
                <label htmlFor="rmonth">Recieved month</label>
                <input
                  id="rmonth"
                  type="text"
                  onChange={e => setRmonth(e.target.value)}
                />
              </div>
              <div className="input-feild">
                <label htmlFor="ryear">Recieved year</label>
                <input
                  id="ryear"
                  type="text"
                  onChange={e => setRyear(e.target.value)}
                />
              </div>
            </form>
          </div>
        </div>
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
      </section>
    </>
  );
}
