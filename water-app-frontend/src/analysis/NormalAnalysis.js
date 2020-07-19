import React, { useState, useEffect } from "react";
import Axios from "axios";
import Rowforanalysis from "./Rowforanalysis";

export default function NormalAnalysis() {
  const [data, setData] = useState();
  const [month, setMonth] = useState();
  const [year, setYear] = useState();
  const [dip, setDip] = useState(false);
  const [finalarr, setFinalarr] = useState();

  useEffect(() => {
    Axios.get("http://localhost:5000/nodes/nodesList")
      .then(res => {
        if (res.status !== 200) {
          console.log(res.msg);
          return;
        }
        setData(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  /*  console.log(data);
       console.log(list);
       console.log(suplist);
       console.log(reclist);
       console.log(suplist);
       console.log(recitem); */

  const submit = async e => {
    e.preventDefault();
    console.log(month);
    console.log(year);
    setDip(dip ? false : true);
  };

  useEffect(() => {
    if (data) {
      var list = [];
      var reclist = [];
      var suplist = [];
      var supitem = [];
      var recitem = [];
      data.map((v, i) => {
        list.push(v.port_name);
        reclist.push(v.recieving_list);
        suplist.push(v.distribution_list);
        supitem.push(
          v.supplied_item.filter(
            node => node.month === month && node.year === year
          )
        );
        recitem.push(
          v.recieved_item.filter(
            node => node.month === month && node.year === year
          )
        );
      });
    }

    var arrdata = [];

    if (list) {
      for (var i = 0; i < list.length; i++) {
        //     console.log(list[i]);
        if (suplist[i]) {
          var suppliedListofEle = suplist[i];
          //    console.log(suppliedListofEle);
          if (suppliedListofEle.length > 0) {
            suppliedListofEle.map((v, j) => {
              // console.log(v);
              // console.log(j);

              var supAmountArr = supitem[i].filter(
                h => h.suppliedport_name === v.port_name
              );
              var suppliedAmount = 0;
              supAmountArr.map(node => {
                //      console.log(node);
                suppliedAmount += parseInt(node.quantity);
              });

              //  console.log(suppliedAmount);

              var index = -1;
              for (var k = 0; k < list.length; k++) {
                if (list[k] === v.port_name) {
                  //  console.log(v.port_name);
                  //  console.log(list[k]);
                  index = k;
                }
              }

              var recAmountArr = recitem[index].filter(
                h => h.recivedport_name === list[i]
              );
              //      console.log(recAmountArr)
              var recievedAmount = 0;
              recAmountArr.map(node => {
                recievedAmount += parseInt(node.quantity);
              });

              //     console.log(recievedAmount);

              var loss =
                ((suppliedAmount - recievedAmount) / suppliedAmount) * 100;

              if (loss > 5) {
                console.log(loss);
                arrdata.push({
                  supplyport: list[i],
                  recieveport: v.port_name,
                  lossPercentage: loss
                });
              }
            });
          }
        }
      }
    }
    console.log("hey");

    if (arrdata) {
      //console.log(arrdata);
      setFinalarr(arrdata);
    }
  }, [dip]);

  return (
    <>
      <div className="renform">
        <div className="row">
          <form className="col s12">
            <div className="row">
              <div className="input-field col s4">
                <input
                  id="month"
                  type="text"
                  className="validate"
                  onChange={e => setMonth(e.target.value)}
                />
                <label htmlFor="month">Month</label>
              </div>
              <div className="input-field col s4">
                <input
                  id="year"
                  type="text"
                  className="validate"
                  onChange={e => setYear(e.target.value)}
                />
                <label for="year">Year</label>
              </div>
              <div className="col s4">
                <button id="submit-btn" className="btn-large" onClick={submit}>
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="rendata">
        {finalarr ? (
          <table className="striped highlight centered">
            <thead>
              <tr>
                <th>Supply Port</th>
                <th>Recieve Port </th>
                <th> Loss Percentage</th>
              </tr>
            </thead>

            <tbody>
              {finalarr.length > 0 ? (
                finalarr.map(v => {
                  return <Rowforanalysis props={v} />;
                })
              ) : (
                <div>No data</div>
              )}
            </tbody>
          </table>
        ) : null}
      </div>
    </>
  );
}
