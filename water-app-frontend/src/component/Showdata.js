import React,{useState , useEffect} from 'react';
import Axios from 'axios';

export default function Showdata(props) {

  const[customername , SetCustomername] = useState();
  const[customeremail , SetCustomeremail] = useState();
  const[portname , SetPortname] = useState();
  const[distributionlist , SetDistributionlist] = useState();
  const[recievingList , SetRecievinglist] = useState();
  const[recieveditem , SetRecieveditem] = useState();
  const[supplieditem , SetSupplieditem] = useState();


    useEffect ( () => {
    
     let i = {
       _id : props.props
     }
     Axios
     .post("http://localhost:5000/nodes/nodeone" , i)
     .then((res) => {
       if (res.status !== 200){
         console.log(res.msg);
         return;
         }

         SetCustomername(res.data.customer_name);
         SetCustomeremail(res.data.customer_email);
         SetPortname(res.data.port_name);
         SetDistributionlist(res.data.distribution_list);
         SetRecievinglist(res.data.recieving_list);
         SetRecieveditem(res.data.recieved_item);
         SetSupplieditem(res.data.supplied_item);
         console.log(res.data);
     }).catch((err) => console.error(err));
    },[props.props]);
  
       

  return (
    <div className="container">
     <h1>{customername}</h1> 
      <h2>{customeremail}</h2>

    </div>
  )
}
