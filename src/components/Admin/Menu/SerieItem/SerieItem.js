import React, { useState } from "react";
import { Button, Icon, Confirm } from "semantic-ui-react";
import { BasicModal } from "../../../Shared";
import { Serie } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { SerieForm } from "../SerieForm";
import "./SerieItem.scss";

const serieController = new Serie();

export function SerieItem(props) {
  const { serie, onReload } = props;
  const { accessToken } = useAuth();

  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");

  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [isDelete, setIsDelete] = useState(false);

  const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
  const onOpenCloseConfirm = () => setShowConfirm((prevState) => !prevState);

  const openUpdateSerie = () => {
    setTitleModal(`Actualizar serie: ${serie.title}`);
    onOpenCloseModal();
  };

  const openDesactivateActiveConfirm = () => {
    setIsDelete(false);
    setConfirmMessage(
      serie.active
        ? `Desactivar la serie ${serie.title}`
        : `Activar la serie ${serie.title}`
    );
    onOpenCloseConfirm();
  };

  const onActivateDesactivate = async () => {
    try {
      await serieController.updateSerie(accessToken, serie._id, {
        active: !serie.active,
      });
      onReload();
      onOpenCloseConfirm();
    } catch (error) {
      console.error(error);
    }
  };

  const openDeleteConfirm = () => {
    setIsDelete(true);
    setConfirmMessage(`Eliminar la serie ${serie.title}`);
    onOpenCloseConfirm();
  };

  const onDelete = async () => {
    try {
      await serieController.deleteSerie(accessToken, serie._id);
      onReload();
      onOpenCloseConfirm();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="serie-item">
        <div className="serie-item__info">
          <span className="serie-item__info-title">{serie.title}</span>
          <span className="serie-item__info-path">{serie.path}</span>
        </div>

        <div>
          <Button icon primary onClick={openUpdateSerie}>
            <Icon name="pencil" />
          </Button>
          <Button
            icon
            color={serie.active ? "orange" : "teal"}
            onClick={openDesactivateActiveConfirm}
          >
            <Icon name={serie.active ? "ban" : "check"} />
          </Button>
          <Button icon color="red" onClick={openDeleteConfirm}>
            <Icon name="trash" />
          </Button>
        </div>
      </div>

      <BasicModal show={showModal} close={onOpenCloseModal} title={titleModal}>
        <SerieForm onClose={onOpenCloseModal} onReload={onReload} serie={serie} />
      </BasicModal>

      <Confirm
        open={showConfirm}
        onCancel={onOpenCloseConfirm}
        onConfirm={isDelete ? onDelete : onActivateDesactivate}
        content={confirmMessage}
        size="mini"
      />
    </>
  );
}
