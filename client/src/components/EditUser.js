import React, { useState, useEffect } from 'react'
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { Container, Row, Col, Button, Form } from "react-bootstrap";

function EditUser(props) {
  const { data, data: { companies }, data: { user } } = props;
  const [detail, setDetail] = useState({
    id: "",
    firstName: "",
    age: "",
    companyId: ""
  })

  useEffect(() => {
    if (user) {
       setDetail(user)
    }
  }, [user])

  const handleSubmit = e => {
    e.preventDefault();
    const { id, firstName, age, companyId } = detail
    props.mutate({
      variables: {
        id,
        firstName,
        age: parseInt(age),
        companyId
      },
      refetchQueries: [{ query: queryUsers }]
    }).then(() => props.history.push('/')).catch((err) => console.log(err))
  };

  if (!user && !companies && data.loading) {
    return <div>loading</div>
  }
  return (
    <Container>
      <Row>
        <Col xs lg="12">
          <h3>Edit User</h3>
          <Form>
            <Form.Group controlId="firstName">
              <Form.Control
                type="text"
                placeholder="First Name"
                name="firstName"
                value={detail.firstName}
                onChange={e => setDetail({ ...detail, firstName: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="age">
              <Form.Control
                type="text"
                placeholder="Age"
                name="age"
                value={detail.age}
                onChange={e => setDetail({ ...detail, age: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="Company.id">
              <Form.Control
                as="select"
                custom
                value={detail.companyId}
                name="company"
                onChange={e => setDetail({ ...detail, companyId: e.target.value })}
              >
                <option value={""}>Select Company</option>
                {
                  companies &&
                  companies.length > 0 &&
                  companies.map(company => {
                    return (
                      <option key={company.id} value={company.id}>
                        {company.name}
                      </option>
                    );
                  })}
              </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit" onClick={handleSubmit}>
              Upate
              </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

const queryUsers = gql`
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



const query = gql`
  query User($id: String !) {
    user: user(id: $id) {
      firstName
      companyId
      id
      age
      company {
        name
      }
    }
    companies: companies {
      name
      id
    }
  }
`;

const mutation = gql`
 mutation UpdateUser($id: String !,$firstName: String,$age: Int,$companyId: String) {
    editUser(id: $id, firstName: $firstName, age: $age, companyId: $companyId) {
      id
      firstName
      age
      companyId
    }
  }
`;

export default graphql(mutation)(
  graphql(query, {
    options: props => {
      return { variables: { id: props.match.params.id } };
    }
  })(EditUser)
);
