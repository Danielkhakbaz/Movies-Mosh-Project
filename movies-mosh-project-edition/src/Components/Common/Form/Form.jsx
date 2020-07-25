import React, { Component } from "react";
import Input from "../Input/Input";
import Option from "../Option/Option";
import { saveMovie } from "../../../Services/MoviesServices/fakeMovieService";
import Joi from "joi-browser";

class Form extends Component {
    state = {
        Data: {},
        Errors: {},
    };
    Validate = () => {
        const { Data } = this.state;

        const Option = { abortEarly: false };
        const { error } = Joi.validate(Data, this.schema, Option);
        if (!error) {
            return null;
        }

        const Errors = {};
        for (let Item of error.details) {
            Errors[Item.path[0]] = item.message;
        }
        return Errors;
    };
    HandleSubmitButton = (e) => {
        const { match } = this.props;

        const Errors = this.Validate();
        this.setState({ Errors: Errors || {} });
        if (match.params.id) {
            this.HandleSaveButton();
        }

        e.preventDefault();
    };
    HandleSaveButton = () => {
        const { Data } = this.state;
        const { history } = this.props;

        saveMovie(Data);
        return history.push("/Movies");
    };
    ValidateMessage = ({ Name, Value }) => {
        const Data = { [Name]: Value };
        const schema = { [Name]: this.schema[Name] };
        const { error } = Joi.Validate(Data, schema);
        return error ? error.details[0].message : null;
    };
    HandleInputChange = ({ currentTarget: Input }) => {
        const { Data, Errors } = this.state;

        const allErrors = { ...Errors };
        const errorMessage = this.ValidateMessage(Input);
        if (errorMessage) {
            allErrors[Input.name] = errorMessage;
        } else {
            delete allErrors[Input.name];
        }

        const allData = { ...Data };
        allData[Input.name] = Input.value;

        this.setState({ Data: allData, Errors: allErrors });
    };
    RenderSubmitButton = (label) => {
        return (
            <button
                className="btn btn-primary"
                disabled={this.Validate()}
                onClick={(e) => this.HandleSubmitButton(e)}
            >
                {label}
            </button>
        );
    };
    RenderInputForm = (name, label, type) => {
        const { Data, Errors } = this.state;
        return (
            <Input
                name={name}
                label={label}
                type={type}
                value={Data[name]}
                errors={Errors[name]}
                onChange={this.HandleInputChange}
            />
        );
    };
    RenderOptionForm = (name, label, genres) => {
        const { Data, Errors } = this.state;
        return (
            <Option
                name={name}
                label={label}
                genres={genres}
                value={Data[name]}
                errors={Errors[name]}
                onChange={this.HandleInputChange}
            />
        );
    };
}

export default Form;
