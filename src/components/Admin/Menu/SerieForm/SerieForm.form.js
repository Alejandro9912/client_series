import * as Yup from "yup";

export function initialValues(serie) {
  return {
    nombre: serie?.nombre || "",
    fechaLanzamiento: serie?.fechaLanzamiento || "",
    director: serie?.director || "",
    temporadas: serie?.temporadas || undefined,
    cantidadEpisodios: serie?.cantidadEpisodios || undefined,
    active: serie?.active || true,
  };
}

export function validationSchema() {
  return Yup.object({
    nombre: Yup.string().required(true),
    fechaLanzamiento: Yup.string().required(true),
    director: Yup.number().required(true),
  });
}
