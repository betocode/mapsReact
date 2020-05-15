import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "reactstrap";
import { MapComponent } from "../../components";
import { fetchSingleOrder } from "../../ducks";
import { SpinnerContainer } from "./styles";

const Index = (props) => {
  const dispatch = useDispatch();
  const { order } = useSelector((state) => state.order);

  const [markers, setMarkers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        await dispatch(fetchSingleOrder(props.match.params.id));
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [dispatch, props.match.params.id]);

  useEffect(() => {
    let arr = [];
    if (!!Object.keys(order).length) {
      arr[0] = {
        lat: parseFloat(order.PontoPartidaLat),
        lng: parseFloat(order.PontoPartidaLong),
      };
      arr[1] = {
        lat: parseFloat(order.PontoDestinoLat),
        lng: parseFloat(order.PontoDestinoLong),
      };
    }
    setMarkers(arr);
  }, [order]);

  return (
    <div>
      {loading ? (
        <SpinnerContainer>
          <Spinner style={{ width: "4rem", height: "4rem" }} />
        </SpinnerContainer>
      ) : (
        <MapComponent
          travelMode={order.TipoViagem}
          markers={markers}
          date={order.DataEntrega}
          isMarkerShown
        />
      )}
    </div>
  );
};

export default Index;
