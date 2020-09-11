import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

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
import AuthState from './context/auth/AuthState';
import ProductState from './context/product/ProductState';
import CartState from './context/cart/CartState';
import OrderState from './context/order/OrderState';
import PrivateRoute from './components/PrivateRoutes';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

function App() {
  return (
    <>
      <AuthState>
        <ProductState>
          <CartState>
            <OrderState>
              <Elements stripe={stripePromise}>
                <BrowserRouter>
                  <Switch>
                    <Route exact path="/" component={Main} />
                    <Route exact path="/about-us" component={Main} />
                    <Route exact path="/cart" component={Main} />
                    <PrivateRoute exact path="/checkout" component={Main} />
                    <PrivateRoute exact path="/payment" component={Main} />
                    <PrivateRoute exact path="/my-orders" component={Main} />
                    <PrivateRoute exact path="/order/:id" component={Main} />
                  </Switch>
                </BrowserRouter>
              </Elements>
            </OrderState>
          </CartState>
        </ProductState>
      </AuthState>
    </>
  );
}

export default App;
