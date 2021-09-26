import React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from '../pages/Home/Home'
import Ticket from '../pages/Home/Ticket'
import TicketNew from '../pages/Ticket/ProductCampaignById'





function Routers()
{

  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route exact path="/ticket" component={ Ticket } />
          <Route exact path="/ticketNew" component={ TicketNew } />
        </Switch>
      </Router>
    </div>

  );
}

export default Routers;
