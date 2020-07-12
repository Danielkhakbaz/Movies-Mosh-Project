import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Navbar from "./Components/Main/Navbar/Navbar";
import MoviePage from "./Components/Main/MoviePage/MoviePage";
import Movies from "./Components/Main/Movies/Movies";
import Profile from "./Components/Main/Profile/Profile";
import Customer from "./Components/Main/Customer/Customer";
import LoginForm from "./Components/Main/LoginForm/LoginForm";
import RegisterForm from "./Components/Main/RegisterForm/RegisterFom";
import NotFound from "./Components/Main/NotFound/NotFound";

const App = () => {
    return (
        <>
            <Navbar />
            <div className="container-fluid">
                <Switch>
                    <Route path="/Movies/:id" component={MoviePage} />
                    <Route path="/Movies" component={Movies} />
                    <Route path="/Profile" component={Profile} />
                    <Route path="/Customer" component={Customer} />
                    <Route path="/Login" component={LoginForm} />
                    <Route path="/Register" component={RegisterForm} />
                    <Route path="/NotFound" component={NotFound} />
                    <Redirect exact from="/" to="/Movies" />
                    <Redirect to="/NotFound" />
                </Switch>
            </div>
        </>
    );
};

export default App;
