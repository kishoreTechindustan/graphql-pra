import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Container, Row, Col, ListGroup, Button } from "react-bootstrap";
import { Link } from 'react-router-dom'

function UserList(props) {
  const { data, history, mutate } = props;


  const handleDelete = (id) => {
    mutate({
      variables: {
        id: id
      },
      // refetchQueries:[{query}]
    }).then(() => data.refetch())
  }

  const handleEdit = (id) => {
    history.push(`/user/edit/${id}`)
  }

  if (!data.users) {
    return <div>Loading</div>
  }
  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col
          xs
          lg="12"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <h3>Users List</h3>
          <Button
            variant="outline-primary"
            onClick={() => history.push("/addUser")}
          >
            Add User
          </Button>
        </Col>
      </Row>
      <Row className="mt-2">
        {/* <Button variant="primary" onClick={handleShow}>
          Launch demo modal
        </Button> */}
        <Col xs lg="12">
          <ListGroup>
            {data &&
              data.users &&
              data.users.length > 0 &&
              data.users.map(user => {
                return (
                  <ListGroup.Item key={user.id}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between"
                      }}
                    >
                      <Link to={`/user/${user.id}`}>
                        <span>{user.firstName}</span>{" "}
                      </Link>
                      <div className="buttons">
                        <Button
                          variant="dark"
                          onClick={() => handleEdit(user.id)}
                          style={{ marginRight: "5px" }}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => handleDelete(user.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </ListGroup.Item>
                );
              })}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}


const query = gql`
  {
    users {
      firstName
      age
      id
   company {
    name
    }
    }
  }
`;

const mutation = gql`
mutation DeleteUser($id:String !) {
  deleteUser(id:$id){
    id
    firstName
  }
}
`;


export default graphql(mutation)(graphql(query)(UserList));