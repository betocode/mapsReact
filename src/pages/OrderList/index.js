import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Spinner } from "reactstrap";
import { fetchOrders } from "../../ducks";
import { CardContainer, ItemCard, SpinnerContainer } from "./styles";

const Index = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.order);
  const { isLoading } = useSelector((state) => state.ui);

  useEffect(() => {
    const fetchOrdersAsync = async () => {
      await dispatch(fetchOrders());
    };
    fetchOrdersAsync();
  }, []);

  if (isLoading) {
    return (
      <SpinnerContainer>
        <Spinner style={{ width: "5rem", height: "5rem" }} />
      </SpinnerContainer>
    );
  }

  return (
    <div>
      {!orders.length && (
        <div className="mt-5">
          <h2 className="text-warning text-center">
            Você não possui nenhuma entrega cadastrada
          </h2>
          <Link className="btn btn-warning btn-block w-25 mx-auto" to="/order">
            Criar Entrega
          </Link>
        </div>
      )}
      <CardContainer>
        {orders.map((item) => (
          <SingleItem key={item.IdEntrega} item={item} />
        ))}
      </CardContainer>
    </div>
  );
};

const SingleItem = (props) => {
  const { item } = props;
  return (
    <Link to={`/order-info/${item.IdEntrega}`}>
      <ItemCard>
        <p className="text-dark text-center">
          <b>Identificação de destino:</b> {item.IdEntrega}
        </p>
        <p className="text-dark text-center">
          <b>Usuario: </b>
          {item.Usuario.Nome}
        </p>
        <p className="text-dark text-center">
          <b>Ponto de Partida</b>: lat: {item.PontoDestinoLat} - long:
          {item.PontoDestinoLong}
        </p>
        <p className="text-dark text-center">
          <b>Ponto de partida:</b> lat: {item.PontoPartidaLat} - long:
          {item.PontoPartidaLong}
        </p>

        <p className="text-dark text-center">
          <b>Data da entrega:</b>{" "}
          {moment(item.DataEntrega).format("DD/MM/YYYY")}
        </p>
      </ItemCard>
    </Link>
  );
};

export default Index;
