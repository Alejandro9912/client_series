import React, { useState } from "react";
import { Tab, Button } from "semantic-ui-react";
import { BasicModal } from "../../../components/Shared";
import { ListSerie, SerieForm } from "../../../components/Admin/Menu";
import "./Series.scss";

export function Series() {
  const [showModal, setShowModal] = useState(false);
  const [reload, setReload] = useState(false);

  const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
  const onReload = () => setReload((prevStata) => !prevStata);

  const panes = [
    {
      menuItem: "Series activas",
      render: () => (
        <Tab.Pane attached={false}>
          <ListSerie active={true} reload={reload} onReload={onReload} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Series inactivas",
      render: () => (
        <Tab.Pane attached={false}>
          <ListSerie active={false} reload={reload} onReload={onReload} />
        </Tab.Pane>
      ),
    },
  ];

  return (
    <>
      <div className="menu-page">
        <Button className="menu-page__add" primary onClick={onOpenCloseModal}>
          Nueva Serie
        </Button>
        <Tab menu={{ secondary: true }} panes={panes} />
      </div>

      <BasicModal show={showModal} close={onOpenCloseModal} title="Crear serie">
        <SerieForm onClose={onOpenCloseModal} onReload={onReload} />
      </BasicModal>
    </>
  );
}
