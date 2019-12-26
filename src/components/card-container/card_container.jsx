import React, { Fragment } from "react";
import { Grid, Card, Menu, Responsive, Segment } from "semantic-ui-react";
import "./cardcontainer.css";
import logo from "../assets/imgs/logo.png";

const Footer = () => {
  return (
    <Menu
      inverted
      fixed="bottom"
      text
      style={{ justifyContent: "center", alignItems: "center" }}
    >
      <h4>* iGeeksNG Design Team. All rights reserved * </h4>
    </Menu>
  );
};

const CardContainer = ({ header, description, children, ...others }) => {
  return (
    <Fragment>
      <Responsive as={Segment}>
        <div className="cardContainer">
          <div style={{ padding: 20 }}>
            <img src={logo} alt="iRegisterKids" height="40" width="200" />
          </div>

          <Grid>
            <Grid.Column>
              <Card style={{ width: "auto", minWidth: "400px" }}>
                <Card.Content>
                  <Card.Header textAlign="center">
                    <h2 style={{ color: "#4a0072" }}>{header} </h2>
                  </Card.Header>
                  <Card.Description textAlign="center">
                    <b> {description} </b>
                  </Card.Description>
                  {children}
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid>
          <Footer />
        </div>
      </Responsive>
    </Fragment>
  );
};

export default CardContainer;
