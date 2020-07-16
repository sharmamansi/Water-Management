import React, {useContext} from 'react';
import userContext from '../context/userContext';
import p1 from '../assets/d1.jpeg';
import p2 from '../assets/d2.jpeg';
import p3 from '../assets/d3.jpeg';
import p4 from '../assets/d4.jpeg';

export default function Dashboard() {
 const { userData } = useContext(userContext);
 console.log(userData);

  return (
    <>
    <div className="container">
     <div className="row">
      
       <div className=" col s12 m6 l4">
         <div className="card">
         <div class="card-image">
            <img src={p2} alt="" class="responsive-img materialboxed"/>
          </div>
           <div className="card-content">
           <span class="card-title">Create Node</span>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean quis aliquam orci. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
           </div>
           <div class="card-action">
            <a href="/createnode">More details</a>
          </div>
         </div>
       </div>
     
       <div className=" col s12 m6 l4">
         <div className="card">
         <div class="card-image">
            <img src={p2} alt="" class="responsive-img materialboxed"/>
          </div>
           <div className="card-content">
           <span class="card-title">Update Node</span>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean quis aliquam orci. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
           </div>
           <div class="card-action">
            <a href="/updatenode">More details</a>
          </div>
         </div>
       </div>

       <div className=" col s12 m6 l4">
         <div className="card">
         <div class="card-image">
            <img src={p2} alt="" class="responsive-img materialboxed"/>
          </div>
           <div className="card-content">
           <span class="card-title">Full List</span>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean quis aliquam orci. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
           </div>
           <div class="card-action">
            <a href="/listing">More details</a>
          </div>
         </div>
       </div>

       <div className=" col s12 m6 l4">
         <div className="card">
         <div class="card-image">
            <img src={p2} alt="" class="responsive-img materialboxed"/>
          </div>
           <div className="card-content">
           <span class="card-title">Get Analysis</span>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean quis aliquam orci. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
           </div>
           <div class="card-action">
            <a href="/">More details</a>
          </div>
         </div>
       </div>

     </div>
    </div>
    </>
  )
}
