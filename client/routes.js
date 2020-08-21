import React from 'react';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import Homepage from './components/pages/homepage';
import NotFound from './components/pages/not-found';

class Routes extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' component={Homepage} />
          <Route path='/not-found' component={NotFound} />

          {/* redirects all not found paths to notfound component */}
          <Redirect to='/not-found' />
        </Switch>
      </div>
    );
  }
}

export default withRouter(Routes);
