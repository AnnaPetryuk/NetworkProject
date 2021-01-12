import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import Dialogs from "./components/Dialogs/Dialogs";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";

const App = (props) => {
    console.log(props.store);
    debugger;
    return (
        <BrowserRouter>
            <div className="app-wrapper">
                <Header />
                <Navbar />
                <div className="app-wrapper-content">
                    <Route
                        path="/dialogs"
                        render={() => (
                            <Dialogs store={props.state} dispatch={props.dispatch}/>
                        )}
                    />
                    <Route
                        path="/profile"
                        render={() => (
                            <Profile
                                profilePage={props.state.profilePage}
                                dispatch={props.dispatch}
                            />
                        )}
                    />
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
