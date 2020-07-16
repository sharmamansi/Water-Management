import React , { useState ,useEffect} from 'react';
import Showdata from '../component/Showdata';
import Card from '../component/Card';
import { Redirect } from 'react-router';
import Axios from 'axios';

export default function Listing() {

 
    useEffect( () => {
      return fun();
    },[]);
    const fun = async()=> {
        const get = await Axios.get("http://localhost:5000/nodes/nodesList");
        const propkeys = Object.keys(get.data);
        const propvalues = Object.values(get.data)
        console.log(propkeys);
        console.log(propvalues);
       for( var i=0 ; i< propkeys.length ; i++){
        document.getElementById("ren").insertAdjacentHTML(
        "beforebegin", 
        `<div  class="card transparent"><div class="card-content">
        <span class="card-title white-text">${propkeys[i]}</span>
        <p>${propvalues[i]}</p>
        </div>
        <div class="card-action">
         <a href="/listing/${propvalues[i]}">More details</a>
       </div>
      </div>`);    
       }
       
    }

    
 

  return (
 <div className="float-container">
 
              <div className="float-child1">
     <Showdata />
    </div>

  
  
  <div className="float-child2">
      <Card/>
  </div>
   
   </div>

  )
}
