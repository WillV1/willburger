import { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { loadUser } from './actions/auth';
import { Provider } from 'react-redux';

import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import store from './store';

import 'materialize-css/dist/css/materialize.min.css';
import './App.css';

function App() {

  useEffect(() => {
    store.dispatch(loadUser());
  })

  return (
    <Provider store={store}>
      <div>
        <Router>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/register' component={Register} />
            <Route path='/login' component={Login} />
          </Switch>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
