import React, { useState, useEffect } from "react";
import { LoginBg, LoginContainer, ButtonContainer } from "./styles";
import { Button, Form, FormGroup, Input, Spinner } from "reactstrap";
import { authUser, uiOpenDialog, createUser } from "../../ducks";
import { useDispatch, useSelector } from "react-redux";

const submitEnum = {
  1: "Login",
  2: "Registrar",
};

const Index = (props) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.ui);
  const [form, setForm] = useState({ Nome: String, Senha: String });
  const [submitType, setSubmitType] = useState(1);

  useEffect(() => {
    let auth = localStorage.getItem("authToken");
    if (!!auth) {
      props.history.push("/order-list");
    }
  }, []);

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmitType = () => {
    if (submitType === 1) return setSubmitType(2);
    return setSubmitType(1);
  };

  const handleSubmit = async (e) => {
    if (isLoading) return;
    e.preventDefault();
    if (submitType === 1) {
      try {
        await dispatch(authUser(form));
        props.history.push("/order-list");
      } catch (error) {
        console.log(error);
        dispatch(uiOpenDialog(modalFailure));
      }
    }
    if (submitType === 2) {
      try {
        await dispatch(createUser(form));
        dispatch(uiOpenDialog(registroSuccess));
        setSubmitType(1);
      } catch (error) {
        console.log(error);
        dispatch(uiOpenDialog(registroFailure));
      }
    }
  };

  const modalFailure = {
    title: "Conta não encontrada",
    subtitle: "Não foi possível encontrar sua conta com os dados inseridos",
    buttons: [
      {
        name: "Tentar novamente",
        color: "primary",
      },
    ],
  };

  const registroFailure = {
    title: "Não foi possivel cadastrar",
    subtitle: "Tente novamente",
    buttons: [
      {
        name: "Tentar novamente",
        color: "primary",
      },
    ],
  };

  const registroSuccess = {
    title: "Conta Cadastrada",
    subtitle: "Faça o login com os dados inseridos",
    buttons: [
      {
        name: "Ok",
        color: "primary",
      },
    ],
  };

  return (
    <LoginBg>
      <LoginContainer>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <FormGroup>
            <Input
              name="Nome"
              value={form.Nome}
              onChange={(e) => handleChange(e)}
              placeholder="Nome"
            />
          </FormGroup>
          <FormGroup>
            <Input
              name="Senha"
              type="password"
              value={form.Senha}
              onChange={(e) => handleChange(e)}
              placeholder="Senha"
            />
          </FormGroup>
          <ButtonContainer>
            <Button color="primary" block type="submit">
              {isLoading ? (
                <Spinner size="sm" color="light" />
              ) : (
                submitEnum[submitType]
              )}
            </Button>
            {submitType === 1 && (
              <Button
                color="success"
                block
                onClick={() => handleSubmitType()}
                type="button"
              >
                Registrar
              </Button>
            )}
          </ButtonContainer>
        </Form>
      </LoginContainer>
    </LoginBg>
  );
};

export default Index;
