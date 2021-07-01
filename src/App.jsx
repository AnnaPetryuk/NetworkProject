import React from 'react';
import { connect, Provider } from 'react-redux';
import { BrowserRouter, Route, withRouter, Redirect } from "react-router-dom";
import { compose } from 'redux';
import "./App.css";
import Preloader from './components/common/Preloader/Preloader';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import Navbar from "./components/Navbar/Navbar";
import UsersContainer from './components/Users/UsersContainer';
import { withSuspence } from './hoc/withSuspence';
import { initializeApp } from './redux/app-reducer';
import store from './redux/redux-store';

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))

class App extends React.Component {

    catchAllUnhandledErrors = (reason, promise) => {
        alert('Error');
    }
    
    componentDidMount() {
        this.props.initializeApp();
        window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors)
    }

    componentWillUnmount() {
        window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors)
    }

    render() {
        if(!this.props.initialized) {
            return <Preloader/>
        }
        return (
            <div className="app-wrapper">
                <HeaderContainer />
                <Navbar />
                <div className="app-wrapper-content">
                {/* <Switch></Switch> */}
                    <Route
                        exact
                        path="/"
                        render={() => <Redirect to="/profile"/>}
                    />
                    <Route
                        path="/dialogs"
                        render={withSuspence(DialogsContainer)}
                    />
                    <Route
                        path="/profile/:userId?"
                        render={withSuspence(ProfileContainer)}
                    />
                    <Route
                        path="/users"
                        render={() => <UsersContainer pageTitle={"Samuraii"}/>}
                    />
                    <Route
                        path="/login"
                        render={() => <Login />}
                    />
                    <Route
                        path ="*"
                        render={() => <div>404 ERROR</div>}/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
});

let AppContainer = compose(
    withRouter,
    connect(mapStateToProps, { initializeApp })
)(App);

const SamuraiJsApp = (props) => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <AppContainer/>
            </Provider>
        </BrowserRouter>
    )
}

export default SamuraiJsApp;
