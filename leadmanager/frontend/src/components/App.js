import React, {Fragment} from 'react';
import ReactDom from 'react-dom';
import { Provider as AlertProvider} from "react-alert";
import AlertTemplate from 'react-alert-template-basic';
import NavBar from './layout/Header';
import Dashboard from './leads/Dashboard';
import Alerts from './layout/Alerts';
import {Provider} from 'react-redux';
import store from '../store';
import Login from './accounts/Login';
import Register from './accounts/Register';
import PrivateRoute from './common/PrivateRoute';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { loadUser } from "../actions/auth";
// Alert Options
const alertOptions = {
    timeout: 3000,
    position: "top center",
};
class App extends React.Component{
    componentDidMount() {
        store.dispatch(loadUser());
    }

    render() {
        return (
            <Provider store={store}>
                <AlertProvider template={AlertTemplate} {...alertOptions}>
                    <Router>
                        <Fragment>
                            <NavBar />
                            <Alerts />
                            <div className='container'>
                                <Switch>
                                    <PrivateRoute exact path='/' component={Dashboard}/>
                                    <Route exact path='/register' component={Register}/>
                                    <Route exact path='/login' component={Login}/>
                                </Switch>

                            </div>
                        </Fragment>
                    </Router>
                </AlertProvider>
            </Provider>

        )
    }
}
ReactDom.render(<App />, document.getElementById('app'));