import React from "react";
import Form from "../../Common/Form/Form";
import Joi from "joi-browser";

class RegisterForm extends Form {
    state = {
        data: { username: "", password: "", name: "" },
        errors: {},
    };
    schema = {
        username: Joi.string().email().required().label("Username"),
        password: Joi.string().min(5).required().label("Password"),
        name: Joi.string().required().label("Name"),
    };
    render() {
        return (
            <>
                <h1>Register</h1>
                <form className="form__input">
                    {this.renderInputForm("username", "Username", "text")}
                    {this.renderInputForm("password", "Password", "password")}
                    {this.renderInputForm("name", "Name", "text")}
                    {this.renderSubmitButton("Register")}
                </form>
            </>
        );
    }
}

export default RegisterForm;
