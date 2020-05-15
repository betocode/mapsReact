import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { uiCloseDialog } from "../ducks";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const ModalCustom = (props) => {
  const dispatch = useDispatch();

  const { dialog } = useSelector((state) => state.ui);

  const handleClose = () => dispatch(uiCloseDialog());

  const handleButtonClick = (onClick) => {
    if (onClick) {
      onClick();
    }

    return handleClose();
  };

  const closeBtn = (
    <button className="close" onClick={handleClose}>
      &times;
    </button>
  );

  const MapButtons = () => {
    if (dialog.buttons.length) {
      return dialog.buttons.map((button) => {
        return (
          <Button
            key={button.name}
            color={button.color}
            onClick={() => handleButtonClick(button.onClick)}
          >
            {button.name}
          </Button>
        );
      });
    }
    return <Button onClick={handleButtonClick}>Ok</Button>;
  };

  return (
    <div>
      <Modal isOpen={dialog.isVisible} toggle={handleClose}>
        <ModalHeader toggle={handleClose} close={closeBtn}>
          {dialog.title}
        </ModalHeader>
        <ModalBody>{dialog.subtitle}</ModalBody>
        <ModalFooter>
          <MapButtons />
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ModalCustom;
