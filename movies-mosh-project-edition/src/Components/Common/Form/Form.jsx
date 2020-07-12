import React, { Component } from "react";
import Input from "../Input/Input";
import Option from "../Option/Option";
import { saveMovie } from "../../../Services/MoviesServices/fakeMovieService";
import Joi from "joi-browser";

class Form extends Component {
    state = {
        data: {},
        errors: {},
    };
    validate = () => {
        const { data } = this.state;

        const option = { abortEarly: false };
        const { error } = Joi.validate(data, this.schema, option);
        if (!error) {
            return null;
        }

        const errors = {};
        for (let item of error.details) {
            errors[item.path[0]] = item.message;
        }
        return errors;
    };
    handleSubmitButton = (e) => {
        const { match } = this.props;

        const errors = this.validate();
        this.setState({ errors: errors || {} });
        if (match.params.id) {
            this.handleSaveButton();
        }

        e.preventDefault();
    };
    handleSaveButton = () => {
        const { data } = this.state;
        const { history } = this.props;

        saveMovie(data);
        return history.push("/Movies");
    };
    validateMessage = ({ name, value }) => {
        const data = { [name]: value };
        const schema = { [name]: this.schema[name] };
        const { error } = Joi.validate(data, schema);
        return error ? error.details[0].message : null;
    };
    handleInputChange = ({ currentTarget: input }) => {
        const { data, errors } = this.state;
        
        const allErrors = { ...errors };
        const errorMessage = this.validateMessage(input);
        if (errorMessage) {
            allErrors[input.name] = errorMessage;
        } else {
            delete allErrors[input.name];
        }

        const allData = { ...data };
        allData[input.name] = input.value;

        this.setState({ data: allData, errors: allErrors });
    };
    renderSubmitButton = (label) => {
        return (
            <button
                className="btn btn-primary"
                disabled={this.validate()}
                onClick={(e) => this.handleSubmitButton(e)}
            >
                {label}
            </button>
        );
    };
    renderInputForm = (name, label, type) => {
        const { data, errors } = this.state;
        return (
            <Input
                name={name}
                label={label}
                type={type}
                value={data[name]}
                errors={errors[name]}
                onChange={this.handleInputChange}
            />
        );
    };
    renderOptionForm = (name, label, genres) => {
        const { data, errors } = this.state;
        return (
            <Option
                name={name}
                label={label}
                genres={genres}
                value={data[name]}
                errors={errors[name]}
                onChange={this.handleInputChange}
            />
        );
    };
}

export default Form;
