import { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import { Provider } from 'react-redux';

import NavBar from './components/NavBar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Main from './pages/Main';

import Alert from './components/Alert';

import store from './store';

import 'materialize-css/dist/css/materialize.min.css';
import './App.css';

if(localStorage.token) {
  setAuthToken(localStorage.token)
}

function App() {

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <div>
        <Router>
          <NavBar />
          <Alert />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/main' component={Main} />
            <Route path='/register' component={Register} />
            <Route path='/login' component={Login} />
          </Switch>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
