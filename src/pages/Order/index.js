import React, { useState } from "react";
import { MapComponent } from "../../components";
import { uiOpenDialog, uiCloseDialog, createOrder } from "../../ducks";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Spinner } from "reactstrap";
import { SpinnerContainer } from "./styles";

const Index = (props) => {
  const { history } = props;
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.ui);
  const [markers, setMarkers] = useState([]);
  const [date, setDate] = useState();
  const [travelMode, setTravelMode] = useState("DRIVING");

  const handleClick = async (e) => {
    const obj = { lat: e.latLng.lat(), lng: e.latLng.lng() };

    if (markers.length === 2) {
      setMarkers((prevState) => {
        prevState.pop();
        return [obj, ...prevState];
      });
      return;
    }

    setMarkers((prevState) => [...prevState, obj]);
  };

  const handleSubmit = async () => {
    if (!date) return dispatch(uiOpenDialog(modalDataFail));
    if (markers.length < 1) {
      return dispatch(uiOpenDialog(modalPlacesFail));
    }
    let obj = {
      DataEntrega: moment(date).format("MM-DD-YYYY"),
      PontoPartidaLat: markers[0].lat,
      PontoPartidaLong: markers[0].lng,
      PontoDestinoLat: markers[1].lat,
      PontoDestinoLong: markers[1].lng,
      TipoViagem: travelMode,
    };
    try {
      await dispatch(createOrder(obj));
      return dispatch(uiOpenDialog(modalSuccess));
    } catch (error) {
      return dispatch(uiOpenDialog(modalFailure));
    }
  };

  const modalFailure = {
    title: "Não foi possivel cadastrar a entrega",
    subtitle: "Tente novamente",
    buttons: [
      {
        name: "Tentar novamente",
        color: "primary",
      },
    ],
  };

  const modalSuccess = {
    title: "Entrega Cadastrada",
    subtitle: "Confira o item na lista",
    buttons: [
      {
        name: "Continuar",
        color: "primary",
      },
      {
        name: "Ir para lista",
        color: "primary",
        onClick: () => history.push("/order-list"),
      },
    ],
  };

  const modalDataFail = {
    title: "Preencha Data",
    subtitle: "Preencha Data",
    buttons: [
      {
        name: "Continuar",
        color: "primary",
      },
    ],
  };

  const modalPlacesFail = {
    title: "Escolha os 2 lugares",
    subtitle: "é necessário escolher um ponto de partida e um ponto de destino",
    buttons: [
      {
        name: "Continuar",
        color: "primary",
      },
    ],
  };

  return (
    <div>
      {isLoading ? (
        <SpinnerContainer>
          <Spinner style={{ width: "4rem", height: "4rem" }} />{" "}
        </SpinnerContainer>
      ) : (
        <MapComponent
          setTravelMode={(e) => setTravelMode(e)}
          travelMode={travelMode}
          onClick={(e) => handleClick(e)}
          markers={markers}
          date={date}
          setDate={(e) => setDate(e)}
          onSubmit={handleSubmit}
          isMarkerShown
        />
      )}
    </div>
  );
};

export default Index;
