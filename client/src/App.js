import React, { useState,useEffect } from 'react';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Header from './pages/Header';
import Createnode from './component/Createnode';
import Updatenode from './component/Updatenode';
import Listing from './pages/Listing';
import { Switch , Route } from 'react-router-dom';
import userContext from './context/userContext';
import Axios from "axios";
import Details from './pages/Details';
import DetailSup from './pages/DetailSup';
import NormalAnalysis from './analysis/NormalAnalysis';


function App() {

  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await Axios.post(
        "/users/tokenIsValid",
        null,
        { headers: { "x-auth-token": token } }
      );
      if (tokenRes.data) {
        const userRes = await Axios.get("/users/", {
          headers: { "x-auth-token": token },
        });
        setUserData({
          token,
          user: userRes.data,
        });
      }
    };

    checkLoggedIn();
  }, []);


  return (
    <userContext.Provider value={{ userData, setUserData}}>
    <div>
    <Header />
    <Switch>
    <Route exact path="/" component={Login} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/register" component={Register} />
    <Route exact path="/dashboard" component={Dashboard} />
    <Route exact path="/createnode" component={Createnode} />
    <Route exact path="/updatenode" component={Updatenode} />
    <Route  path="/listing" component={Listing} />
    <Route  path="/:id/detail" component={Details} />
    <Route  path="/:id/detailsup" component={DetailSup} />
    <Route  path="/analysis" component = {NormalAnalysis} />
    </Switch>
    </div>
    </userContext.Provider>
   
  );
}

export default App;
