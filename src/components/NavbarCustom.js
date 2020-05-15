import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Collapse,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
} from "reactstrap";
import { destroySession } from "../ducks";
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";

const NavbarCustom = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { user, isAuth } = useSelector((state) => state.auth);

  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => setIsOpen(!isOpen);
  const handleLogout = () => {
    dispatch(destroySession());
    history.push("/");
  };
  return (
    <div>
      {isAuth && (
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Olá {user.Nome}</NavbarBrand>
          <NavbarToggler onClick={handleToggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink
                  className="nav-link"
                  activeClassName="active"
                  to="/order"
                >
                  Criar Entrega
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className="nav-link"
                  activeClassName="active"
                  to="/order-list"
                >
                  Lista de Entrega
                </NavLink>
              </NavItem>
            </Nav>

            <Button
              color=""
              onClick={handleLogout}
              className="btn-primary-outline"
            >
              Logout
            </Button>
          </Collapse>
        </Navbar>
      )}
    </div>
  );
};

export default NavbarCustom;
