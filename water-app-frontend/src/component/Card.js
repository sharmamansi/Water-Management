import React, {useState} from 'react';
import {Link} from "react-router-dom";


export default function Card({key , props , params}) {
  return (
       <div id="ren">
       <div  class="card transparent">
       <div class="card-content">
        <span class="card-title white-text">{props.name}</span>
        <p>{props.id}</p>
        </div>
        <div class="card-action">
         <Link to = {`/listing/${props.id}`} 
         >More details</Link>
       </div>
      </div>
    </div>
  )
}
