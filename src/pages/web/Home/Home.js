import React from "react";
import { Container, Header, Icon, Button } from "semantic-ui-react";
import { Link } from "react-router-dom"; // Importa Link de react-router-dom

export function Home() {
  return (
    <div className="App">
      <Container textAlign="center">
        <Header as="h1" icon>
          <Icon name="film" />
          Bienvenido a la API de Series
          <Header.Subheader>
            ¡Explora nuestras series favoritas!
          </Header.Subheader>
        </Header>
        <div style={{ marginTop: "20px" }}>
          {" "}
          {/* Agregamos un margen superior para separar el botón */}
          <Link to="/admin/">
            <Button primary>Ir a Admin</Button>
          </Link>
        </div>
      </Container>
      {/* Resto de tu aplicación */}
    </div>
  );
}