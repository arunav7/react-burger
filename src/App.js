import React from 'react';
import {Route, Switch} from 'react-router-dom'

import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './container/BurgerBuilder/BurgerBuilder';
import Checkout from './container/Checkout/Checkout';
import Orders from './container/Orders/Orders'

function App() {
  return (
    <div>
      <Layout>
        <Switch>
          <Route path='/' component={BurgerBuilder} exact/>
          <Route path='/checkout' component={Checkout} />
          <Route path='/orders' component={Orders} /> 
        </Switch>
      </Layout>
    </div>
  );
}

export default App;