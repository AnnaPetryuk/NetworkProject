import React from "react";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { CreateField, Input } from "../common/formsControllers/formController";
import { required } from "../../utils/validators/validators";
import { connect } from "react-redux";
import { login } from "../../redux/auth-reducer"
import style from "../common/formsControllers/formControlls.module.css"
import { AppStateType } from "../../redux/redux-store";
import { Redirect } from "react-router-dom";

type LoginFormOwnProps = {
  captchaUrl: string | null;
}

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = ({ handleSubmit, error, captchaUrl }) => {
  return (
    <form onSubmit={handleSubmit}>
      {CreateField<LoginFormValuesTypeKeys>('Login', 'email', [required], Input)}
      {CreateField<LoginFormValuesTypeKeys>('Password', 'password', [required], Input, { type: 'password' })}
      {CreateField<LoginFormValuesTypeKeys>(undefined, 'rememberMe', [], Input, { type: 'checkbox' }, "remember me")}

      {captchaUrl &&
        <div>
          <img alt="test" src={captchaUrl} />
          {CreateField<LoginFormValuesTypeKeys>('Captcha', 'captcha', [required], Input)}
        </div>
      }

      {error && <div className={style.formSummaryError}>
        {error}
      </div>}
      <div>
        <button>Login</button>
      </div>
    </form>
  );
};

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({
  form: 'login'
})(LoginForm)

type MapStatePropsType = {
  captchaUrl: string | null;
  isAuth: boolean;
}

type MapDispatchPropsType = {
  login: (email: string, password: string, rememberMe: boolean, captcha: string) => void;
}

type LoginFormValuesType = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha: string;
}

type LoginFormValuesTypeKeys = Extract<keyof LoginFormValuesType, string>;

const Login: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
  const onSubmit = (formData: any) => {
    console.dir(formData);
    props.login(formData.login, formData.password, formData.rememberMe, formData.captcha)
  }

  if (props.isAuth) {
    return <Redirect to={'/profile'} />
  }

  return (
    <div>
      <h1>Login</h1>
      <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
    </div>
  );
};

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
  isAuth: state.auth.isAuth,
  captchaUrl: state.auth.captchaUrl
})

export default connect(mapStateToProps, { login })(Login);
