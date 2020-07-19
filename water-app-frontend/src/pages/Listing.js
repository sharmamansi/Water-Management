import React, { useState, useEffect } from "react";
import Card from "../component/Card";
import Showdata from "../component/Showdata";
import Axios from "axios";

export default function Listing(props) {
  const [wantData, SetwantData] = useState();
  const [id, SetId] = useState();

  useEffect(() => {
    let arr = props.location.pathname.split("/");
    SetwantData(arr.length === 3 ? true : false);
    SetId(arr[2]);
    //  console.log(id);
    //  console.log(wantData);
  }, [props]);

  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get("http://localhost:5000/nodes/nodesList")
      .then(res => {
        if (res.status !== 200) {
          console.log(res.msg);
          return;
        }
        setCards(res.data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="float-container">
      <div className="float-child1">
        {wantData ? <Showdata props={id} /> : null}
      </div>

      <div className="float-child2">
        {loading
          ? null
          : cards.map((v, i) => (
              <Card
                key={i}
                props={{
                  name: v.port_name,
                  id: v._id
                }}
              />
            ))}
      </div>
    </div>
  );
}
