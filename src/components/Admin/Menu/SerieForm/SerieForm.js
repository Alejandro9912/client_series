import React from "react";
import { Form, Dropdown, Input } from "semantic-ui-react";
import { useFormik } from "formik";
import { Serie } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { initialValues, validationSchema } from "./SerieForm.form";

const serieController = new Serie();

export function SerieForm(props) {
  const { onClose, onReload, serie } = props;
  const { accessToken } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(serie),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const data = {
          title: formValue.title,
          path: `${formValue.protocol}${formValue.path}`,
          order: formValue.order,
          active: formValue.active,
        };

        if (serie) {
          data.path = formValue.path;
          await serieController.updateSerie(accessToken, serie._id, data);
        } else {
          await serieController.createSerie(accessToken, data);
        }

        onReload();
        onClose();
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group widths="equal">
        <Form.Input
          name="title"
          placeholder="Titulo"
          onChange={formik.handleChange}
          value={formik.values.title}
          error={formik.errors.title}
        />
        <Form.Input
          name="order"
          type="number"
          placeholder="order"
          onChange={formik.handleChange}
          value={formik.values.order}
          error={formik.errors.order}
        />
      </Form.Group>

      <Input
        name="path"
        placeholder="URL"
        fluid
        onChange={formik.handleChange}
        value={formik.values.path}
        error={formik.errors.path}
        label={
          !serie ? (
            <Dropdown
              options={options}
              onChange={(_, data) =>
                formik.setFieldValue("protocol", data.value)
              }
              value={formik.values.protocol}
              error={formik.errors.protocol}
            />
          ) : null
        }
      />

      <Form.Group />

      <Form.Button type="submit" primary fluid loading={formik.isSubmitting}>
        {serie ? "Actualizar serie" : "Crear serie"}
      </Form.Button>
    </Form>
  );
}

const options = [
  { key: "https://", text: "https://", value: "https://" },
  { key: "http://", text: "http://", value: "http://" },
  { key: "/", text: "/", value: "/" },
];
