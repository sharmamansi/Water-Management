import React, { useState, useEffect } from 'react'

export default function Showdata() {

  const url = window.location.href ;

  if(url === "http://localhost:3000/listing"){
    var h = false;
  }

  

  return (
    <div>
      {
        h ? (
          <div>normal</div>
          ) : (
           <div>show</div>

)
}
    </div>
  )
  }

