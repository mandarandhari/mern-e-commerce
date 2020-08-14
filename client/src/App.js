import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/@fortawesome/fontawesome-free/css/fontawesome.min.css';
import '../node_modules/@fortawesome/fontawesome-free/css/solid.min.css';
import '../node_modules/@fortawesome/fontawesome-free/css/regular.min.css';
import '../node_modules/@fortawesome/fontawesome-free/css/brands.min.css';
import './utils/css/custom-font.css';
import '../node_modules/owl.carousel/dist/assets/owl.carousel.css';
import '../node_modules/owl.carousel/dist/assets/owl.theme.default.css';
import '../node_modules/bootstrap-select/dist/css/bootstrap-select.css';
import '../node_modules/lightbox2/dist/css/lightbox.css';
import './utils/css/style.default.css';

import Main from './components/Main';
import AuthState from './context/authContext/AuthState';

function App() {
  return (
    <>
      <AuthState>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/about-us" component={Main} />
            <Route exact path="/cart" component={Main} />
          </Switch>
        </BrowserRouter>
      </AuthState>
    </>
  );
}

export default App;
