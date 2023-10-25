import React, { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";
import { size, map } from "lodash";
import { Serie } from "../../../../api";
import { SerieItem } from "../SerieItem";

const serieController = new Serie();

export function ListSerie(props) {
  const { director, reload, onReload } = props;
  const [series, setSeries] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setSeries(null);
        const repsonse = await serieController.getSerie(director);
        setSeries(repsonse);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [director, reload]);

  if (!series) return <Loader active inline="centered" />;
  if (size(series) === 0) return "No hay ninguna serie";

  return map(series, (serie) => (
    <SerieItem key={serie._id} serie={serie} onReload={onReload} />
  ));
}
