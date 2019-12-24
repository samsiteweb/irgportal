import React, { Component } from "react";
import { Container, Segment, Grid, GridColumn } from "semantic-ui-react";
import "./portal.css";
import SideMenu from "../portalcomponents/menu_component";

class Iportal extends Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    return (
      <div>
        <Container fluid>
          <Segment raised inverted color='violet'>
            <p>Welcome to Iregisterkids Portal</p>
          </Segment>
        </Container>
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column width={2}>
              <SideMenu />
            </Grid.Column>
            <GridColumn width={4}></GridColumn>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default Iportal;
