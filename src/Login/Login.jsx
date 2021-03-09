import React from "react";
import { Field, reduxForm } from "redux-form";
import { Input } from "../components/common/formsControllers/formController";
import { required } from "../utils/validators/validators";

const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field  name={'login'} 
                    component={Input} placeholder={'Login'} validate={[required]}/>
            </div>
            <div>
                <Field name={'password'}
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
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    );
};

export default Login;
