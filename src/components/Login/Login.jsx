import React from "react";
import { Field, reduxForm } from "redux-form";
import { CreateField, Input } from "../common/formsControllers/formController";
import { required } from "../../utils/validators/validators";
import { connect } from "react-redux";
import { login } from "../../redux/auth-reducer"
import { Redirect } from "react-router";
import style from "../common/formsControllers/formControlls.module.css"

const LoginForm = ({handleSubmit, error}) => {
    return (
        <form onSubmit={handleSubmit}>
            { CreateField('Login', 'login', [required], Input) }
            { CreateField('Password', 'password', [required], Input, {type: 'password'})}
            { CreateField('','rememberMe', [required], Input, {type: 'checkbox'}, "remember me")}
                
            { error && <div className={style.formSummaryError}>
                {error}
            </div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    );
};

const LoginReduxForm = reduxForm({
    form: 'login'
})(LoginForm)

const Login = (props) => {
    const onSubmit = (formData) => {
        console.dir(formData);
        props.login(formData.login, formData.password, formData.rememberMe)
    }

    if(props.isAuth) {
        return <Redirect to={'/profile'}/>
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    );
};

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {login})(Login);
