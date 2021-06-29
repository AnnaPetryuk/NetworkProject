import React from "react";
import { reduxForm } from "redux-form";
import { CreateField, Input } from "../common/formsControllers/formController";
import { required } from "../../utils/validators/validators";
import { connect } from "react-redux";
import { login } from "../../redux/auth-reducer"
import { Redirect } from "react-router";
import style from "../common/formsControllers/formControlls.module.css"

const LoginForm = ({handleSubmit, error, captchaUrl}) => {
    return (
        <form onSubmit={handleSubmit}>
            { CreateField('Login', 'login', [required], Input) }
            { CreateField('Password', 'password', [required], Input, {type: 'password'})}
            { CreateField('','rememberMe', [], Input, {type: 'checkbox'}, "remember me")}
                
            {captchaUrl && 
                <div>
                    <img src={captchaUrl} alt="captcha"/>
                    { CreateField('Captcha', 'captcha', [required], Input) }
                </div>
            }

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
        props.login(formData.login, formData.password, formData.rememberMe, formData.captcha)
    }

    if(props.isAuth) {
        return <Redirect to={'/profile'}/>
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
        </div>
    );
};

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
})

export default connect(mapStateToProps, {login})(Login);
