import React, { Component } from "react";
import { Container, Segment } from "semantic-ui-react";
import "./portal.css";

class Iportal extends Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    return (
      <Container fluid className='body'>
        <Segment raised inverted color='violet'>
          <p>Welcome to Iregisterkids Portal</p>
        </Segment>
        <div></div>
        {/* <Segment></Segment> */}
      </Container>
    );
  }
}

export default Iportal;
