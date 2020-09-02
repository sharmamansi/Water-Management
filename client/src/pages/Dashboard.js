import React, { useContext } from "react";
import userContext from "../context/userContext";
import p1 from "../assets/d1.jpeg";
import p2 from "../assets/d2.jpeg";
import p3 from "../assets/d3.jpeg";
import p4 from "../assets/d4.jpeg";

export default function Dashboard() {
  const { userData } = useContext(userContext);
  console.log(userData);

  return (
    <>
      <div className="mainblock">
        <div className="dashbox">
          <div className="row">
            <div className=" col s12 m6 ">
              <div className="card medium">
                <div className="card-image">
                  <img src={p1} alt="" class="responsive-img materialboxed" />
                </div>
                <div className="card-content">
                  <span className="card-title">Create Node</span>
                  <a
                    id="floatbtn"
                    className="btn-floating halfway-fab waves-effect waves-light red"
                    href="/createnode"
                  >
                    <i class="material-icons">create</i>
                  </a>
                  <p>
                    Register a new node.
                  </p>
                </div>
              </div>
            </div>

            <div className=" col s12 m6 ">
              <div className="card medium">
                <div className="card-image">
                  <img src={p2} alt="" class="responsive-img materialboxed" />
                </div>
                <div className="card-content">
                  <span className="card-title">Update Node</span>
                  <a
                    id="floatbtn"
                    className="btn-floating halfway-fab waves-effect waves-light red"
                    href="/updatenode"
                  >
                    <i class="material-icons">edit</i>
                  </a>
                  <p>
                  Update information regarding exsisting nodes, or can fill information about recieved and supplied water port list/quantity.
                  </p>
                </div>
              </div>
            </div>

            <div className=" col s12 m6 ">
              <div className="card medium">
                <div className="card-image">
                  <img src={p2} alt="" class="responsive-img materialboxed" />
                </div>
                <div className="card-content">
                  <span className="card-title">Full List</span>
                  <a
                    id="floatbtn"
                    className="btn-floating btn-medium halfway-fab waves-effect waves-light red"
                    href="/listing"
                  >
                    <i class="material-icons">info</i>
                  </a>
                  <p>
                   Get a full list of exsisting nodes,supplying/recieving points, and water transport details.
                  </p>
                </div>
              </div>
            </div>

            <div className=" col s12 m6 ">
              <div className="card medium">
                <div className="card-image">
                  <img src={p4} alt="" class="responsive-img materialboxed" />
                </div>
                <div className="card-content">
                  <span className="card-title">Get Analysis</span>
                  <a
                    id="floatbtn"
                    className="btn-floating halfway-fab waves-effect waves-light red"
                    href="/analysis"
                  >
                    <i class="material-icons">add</i>
                  </a>

                  <p>
                    Get basic monthly water loss percentage analysis.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
