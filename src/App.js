import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './scss/style.scss';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'font-awesome/css/font-awesome.min.css'
import "./scss/etkb.css";
import Toastr from "./views/custom/Toastr";
import PageLoader from "./views/custom/PageLoader";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'));

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Suspense fallback={loading}>
          <Switch>
            <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>}/>
            <Route path="/" name="Home" render={props => <TheLayout {...props}/>}/>
            {/*<Route path="/admin" type="private" render={props => <TheLayout {...props} />}/>*/}
            {/*<Redirect from="/" to="/Login"/>*/}
          </Switch>
        </React.Suspense>
        <Toastr/>
        <PageLoader/>
      </BrowserRouter>
    );
  }
}

export default App;

