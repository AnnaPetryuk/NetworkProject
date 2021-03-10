import React from "react";
import { Field, reduxForm } from "redux-form";
import { Input } from "../common/formsControllers/formController";
import { required } from "../../utils/validators/validators";
import { connect } from "react-redux";
import { login } from "../../redux/auth-reducer"
import { Redirect } from "react-router";

const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field  name={'login'} 
                    component={Input} placeholder={'Login'} validate={[required]}/>
            </div>
            <div>
                <Field name={'password'} type={'password'}
                    component={Input} placeholder={'Password'} validate={[required]}/>
            </div>
            <div>
                <Field component={Input} name={'rememberMe'}
                    type={'checkbox'} /> rememver me
            </div>
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
        debugger;
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
