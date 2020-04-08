import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import {
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  ListGroupItem
} from "react-bootstrap";
import userImage from "../user.svg";

function UserDetail(props) {
  const { data } = props;
  if (!data.user) {
    return <div>Loading</div>
  }
  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src={userImage} />
            <Card.Body>
              <Card.Title>
                First Name : {data && data.user && data.user.firstName}
              </Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroupItem>
                Id: {data && data.user && data.user.id}
              </ListGroupItem>
              <ListGroupItem>
                Age: {data && data.user && data.user.age}
              </ListGroupItem>
              <ListGroupItem>
                Company: {data && data.user && data.user.company.name}
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

const query = gql`
  query User($id: String!) {
    user(id: $id) {
      id
      firstName
      age
      company {
      name
    }
    }
  }
`;

export default graphql(query, {
  options: (props) => { return { variables: { id: props.match.params.id } } }
})(UserDetail);