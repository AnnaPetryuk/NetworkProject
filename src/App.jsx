import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, withRouter } from "react-router-dom";
import { compose } from 'redux';
import "./App.css";
import Preloader from './components/common/Preloader/Preloader';
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import Navbar from "./components/Navbar/Navbar";
import ProfileContainer from './components/Profile/ProfileContainer';
import UsersContainer from './components/Users/UsersContainer';
import { initializeApp } from './redux/app-reducer';

class App extends React.Component {
    componentDidMount() {
        this.props.initializeApp();
    }

    render() {
        if(!this.props.initialized) {
            return <Preloader/>
        }
        return (
            <BrowserRouter>
                <div className="app-wrapper">
                    <HeaderContainer />
                    <Navbar />
                    <div className="app-wrapper-content">
                        <Route
                            path="/dialogs"
                            render={() => <DialogsContainer />}
                        />
                        <Route
                            path="/profile/:userId?"
                            render={() => <ProfileContainer />}
                        />
                        <Route
                            path="/users"
                            render={() => <UsersContainer />}
                        />
                        <Route
                            path="/login"
                            render={() => <Login />}
                        />
                    </div>
                </div>
            </BrowserRouter>
        )
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
});

export default compose(
    // withRouter,
    connect(mapStateToProps, { initializeApp })
)(App);
