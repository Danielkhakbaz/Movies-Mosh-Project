import React from "react";
import Form from "../../Common/Form/Form";
import Joi from "joi-browser";

class LoginForm extends Form {
    state = {
        data: { username: "", password: "" },
        errors: {},
    };
    schema = {
        username: Joi.string().required().label("Username"),
        password: Joi.string().required().label("Password"),
    };
    render() {
        return (
            <>
                <h1>Login</h1>
                <form className="form__input">
                    {this.renderInputForm("username", "Username", "text")}
                    {this.renderInputForm("password", "Password", "password")}
                    {this.renderSubmitButton("Login")}
                </form>
            </>
        );
    }
}

export default LoginForm;
