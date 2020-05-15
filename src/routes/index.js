import React, { useLayoutEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "../pages/Login";
import OrderList from "../pages/OrderList";
import Order from "../pages/Order";
import SingleOrder from "../pages/SingleOrder";
import ProtectedRoute from "../Hoc/ProtectedRoute";
import { ModalCustom, NavbarCustom } from "../components";
import { useDispatch } from "react-redux";
import { validateUser } from "../ducks";

const Index = () => {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch(validateUser());
  }, []);

  return (
    <>
      <Router>
        <NavbarCustom />
        <ModalCustom />
        <Switch>
          <Route exact path="/" component={Login} />
          <ProtectedRoute exact path="/order-list" component={OrderList} />
          <ProtectedRoute exact path="/order" component={Order} />
          <ProtectedRoute
            exact
            path="/order-info/:id"
            component={SingleOrder}
          />
          <Route path="*" component={() => <h1>error 404</h1>} />
        </Switch>
      </Router>
    </>
  );
};

export default Index;
