import {
  DistanceMatrixService,
  GoogleMap,
  LoadScriptNext,
  Marker,
} from "@react-google-maps/api";
import React, { useMemo, useState } from "react";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  InputGroup,
  Label,
} from "reactstrap";
import styled from "styled-components";

const dropDownObj = [
  {
    travelMode: "DRIVING",
    text: "Dirigindo",
  },
  {
    travelMode: "BICYCLING",
    text: "Bicicleta",
  },
  {
    travelMode: "WALKING",
    text: "Andando",
  },
  {
    travelMode: "TRANSIT",
    text: "Trânsito",
  },
];

const MapComponent = (props) => {
  const {
    markers,
    onClick,
    travelMode,
    setTravelMode,
    setDate,
    date,
    onSubmit,
  } = props;

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const markersWithoutId = useMemo(() => {
    if (markers.length && isLoaded) {
      return markers.map((item) => {
        item = new window.google.maps.LatLng(item.lat, item.lng);
        return item;
      });
    }
    return [];
  }, [markers, isLoaded]);

  const travelText = useMemo(() => {
    return dropDownObj.filter((item) => item.travelMode === travelMode)[0].text;
  }, [travelMode]);

  const handleToggleDropDown = () => setDropdownOpen((prevState) => !prevState);

  const handleTravelMode = (e) => {
    if (setTravelMode) setTravelMode(e);
  };

  const handleDateChange = (e) => {
    if (setDate) setDate(e);
  };

  const handleCb = (e) => {};

  const handleSubmit = () => {
    if (onSubmit) onSubmit();
  };

  const handleClick = (e) => {
    if (onClick) onClick(e);
  };

  const Markers = () => {
    if (markers.length) {
      return markers.map((item, index) => (
        <Marker key={index} position={{ lat: item.lat, lng: item.lng }} />
      ));
    }
    return null;
  };

  return (
    <MapContainer>
      {onSubmit && (
        <TravelContainer>
          <p>Tempo Destino:</p>
          <InputGroup
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <Label for="exampleDate">Data da Entrega</Label>
            <Input
              onChange={(e) => handleDateChange(e.target.value)}
              value={date}
              className="ml-2"
              type="date"
              name="date"
              id="exampleDate"
              placeholder="date placeholder"
            />
          </InputGroup>
          <Dropdown isOpen={dropdownOpen} toggle={handleToggleDropDown}>
            <DropdownToggle color="primary" caret>
              {travelText}
            </DropdownToggle>
            <DropdownMenu>
              {dropDownObj.map((item) => (
                <DropdownItem
                  key={item.travelMode}
                  onClick={() => handleTravelMode(item.travelMode)}
                  active={travelMode === item.travelMode}
                >
                  {item.text}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <Button
            onClick={handleSubmit}
            style={{ position: "absolute", bottom: "2rem", right: "2rem" }}
            color="success"
          >
            SALVAR
          </Button>
        </TravelContainer>
      )}

      <LoadScriptNext
        onLoad={(e) => setIsLoaded(true)}
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY}
      >
        <GoogleMap
          onClick={(e) => handleClick(e)}
          zoom={8}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          defaultZoom={8}
          defaultCenter={{ lat: -22.970722, lng: -43.182365 }}
          center={{ lat: -22.970722, lng: -43.182365 }}
        >
          <DistanceMatrixService
            callback={(e) => handleCb(e)}
            options={{
              travelMode: travelMode,
              origins: [markersWithoutId[0]],
              destinations: [markersWithoutId[1]],
            }}
          />
          {props.isMarkerShown && <Markers />}
        </GoogleMap>
      </LoadScriptNext>
    </MapContainer>
  );
};

const MapContainer = styled.div`
  max-width: 100vw;
  height: 100vh;
  position: relative;
`;

const TravelContainer = styled.div`
  width: 25rem;
  height: 20rem;
  padding: 2rem;
  border-radius: 16px;
  background-color: #fff;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  z-index: 9999;
  position: absolute;
  right: 4%;
  top: 4%;

  @media (max-width: 768px) {
    top: initial;
    bottom: 0%;
    right: 0%;
  }
`;

export default React.memo(MapComponent);
