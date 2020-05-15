import React, { useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ModalCustom, NavbarCustom } from "../components";
import { validateUser } from "../ducks";
import ProtectedRoute from "../Hoc/ProtectedRoute";
import Login from "../pages/Login";
import Order from "../pages/Order";
import OrderList from "../pages/OrderList";
import SingleOrder from "../pages/SingleOrder";

const Index = () => {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch(validateUser());
  }, [dispatch]);

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
