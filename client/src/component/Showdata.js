import React, { useState, useEffect } from "react";
import Axios from "axios";
import Tablerow from "./Tablerow";
import { Link } from "react-router-dom";

export default function Showdata(props) {
  const [customername, SetCustomername] = useState();
  const [customeremail, SetCustomeremail] = useState();
  const [portname, SetPortname] = useState();
  const [distributionlist, SetDistributionlist] = useState();
  const [recievinglist, SetRecievinglist] = useState();

  useEffect(() => {
    let i = {
      _id: props.props
    };
    Axios.post("/nodes/nodeone", i)
      .then(res => {
        if (res.status !== 200) {
          console.log(res.msg);
          return;
        }

        SetCustomername(res.data.customer_name);
        SetCustomeremail(res.data.customer_email);
        SetPortname(res.data.port_name);
        SetDistributionlist(res.data.distribution_list);
        SetRecievinglist(res.data.recieving_list);

        //        console.log(res.data);
      })
      .catch(err => console.error(err));
  }, [props.props]);

  //   console.log(recievinglist);
  return (
    <>
    <div className="float-child3">
        <h1>Registered Port Name -{portname}</h1>
        <h2>ID - {props.props}</h2>
        <h2>Customer Name - {customername}</h2>
        <h2>Customer Email - {customeremail}</h2>
      </div>

      <div className="float-child4">
        <h1 className="white-text">Recieving Port List</h1>
        <div>
          <table className="centered highlight white-text">
            <thead>
              <tr>
                <th>Port Id</th>
                <th>Port Name</th>
              </tr>
            </thead>

            <tbody>
              {recievinglist
                ? recievinglist.map((v, i) => {
                    return (
                      <Tablerow
                        data={{
                          id: v._id,
                          portname: v.port_name
                        }}
                      />
                    );
                  })
                : null}
            </tbody>
          </table>
        </div>

        <Link className="btn" to={`/${props.props}/detail`}>
          Details
        </Link>
      </div>
      <div className="float-child4">
        <h1 className="white-text">Supplying Port List</h1>

        <div>
          <table className="centered highlight white-text">
            <thead>
              <tr>
                <th>Port Id</th>
                <th>Port Name</th>
              </tr>
            </thead>

            <tbody>
              {distributionlist
                ? distributionlist.map((v, i) => {
                    return (
                      <Tablerow
                        data={{
                          id: v._id,
                          portname: v.port_name
                        }}
                      />
                    );
                  })
                : null}
            </tbody>
          </table>
        </div>

        <Link className="btn" to={`/${props.props}/detailsup`}>
          Details
        </Link>
      </div>
    </>
  );
}
