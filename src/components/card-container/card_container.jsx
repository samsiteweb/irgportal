import React from "react";
import { Grid, Card } from "semantic-ui-react";
import "./card.css";

const CardContainer = ({ header, description, children, ...others }) => {
  return (
    <Grid className='flex-item'>
      <Grid.Column>
        <Card style={{ width: 450, maxWidth: 450 }}>
          <Card.Content>
            <Card.Header textAlign='center'>
              <h2 style={{ color: "#4a0072" }}>{header} </h2>
            </Card.Header>
            <Card.Description textAlign='center'>
              <b> {description} </b>
            </Card.Description>
            {children}
          </Card.Content>
        </Card>
      </Grid.Column>
    </Grid>
  );
};

export default CardContainer;
