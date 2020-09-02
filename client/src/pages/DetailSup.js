import React,{useState, useEffect} from 'react';
import Axios from 'axios';
import Table from '../component/Table';

export default function Details({match}) {

    const[arr,SetArr] = useState();
    const[sport,SetSport] = useState();
 //   console.log(match.params.id);
    useEffect(() => {
        let i = {
          _id: match.params.id
        };
        Axios.post("/nodes/nodeone", i)
          .then(res => {
            if (res.status !== 200) {
              console.log(res.msg);
              return;
            }
          SetArr(res.data.supplied_item); 
          SetSport(res.data.port_name) ;
          })
          .catch(err => console.error(err));
      }, [match]);
 //     console.log(arr);
  return (
    <div>
    <table>
        <thead>
          <tr>
              <th>Supply Port</th>
              <th>Recieving Port</th>
              <th>Amount</th>
              <th>Month</th>
              <th>Year</th>

          </tr>
        </thead>

        <tbody>
        {
            arr ? (arr.map( (v,i) => {
              return  <Table data={{
                  rport : sport,
                  sport: v.suppliedport_name,
                  amount : v.quantity,
                  month : v.month,
                  year : v.year
              }} />
            })) : (null)
        }
        </tbody>
      </table>
            
    </div>
  )
}
