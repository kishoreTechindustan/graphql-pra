import React, { useState } from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { Button, Form, Container, Row, Col } from 'react-bootstrap';

function CreateUser(props) {
  const { data, history } = props;
  const [firstName, setFirstName] = useState("")
  const [age, setAge] = useState("")
  const [company, setCompany] = useState("")

  const handleSubmit = (e) => {

    e.preventDefault();
    props.mutate({
      variables: {
        firstName: firstName,
        age: parseInt(age),
        companyId: company
      },
      refetchQueries: [{ query: queryUsers }]
    }).then(() => history.push('/')).catch((err) => console.log(err))
  }
  return (
    <Container className="mt-5">
      <Row>
        <Col xs lg="12">
          <h3>Create User</h3>
          <Form>
            <Form.Group controlId="firstName">
              <Form.Control type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="age">
              <Form.Control type="text" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="Company.id">
              <Form.Control as="select" custom value={company} onChange={(e) => setCompany(e.target.value)}>
                <option value={""}>Select Company</option>
                {
                  data && data.companies && data.companies.length > 0 && data.companies.map(company => {
                    return (
                      <option key={company.id} value={company.id}>{company.name}</option>
                    )
                  })
                }
              </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit" onClick={handleSubmit} >create user</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

const query = gql`
{
  companies {
    name
    id
    description
  }
}
`;

const queryUsers = gql`
{
    users {
      firstName
      age
      id
      company{
        name
      }
    }
  }
`;

const mutation = gql`
mutation AddUser($firstName:String!,$age:Int!,$companyId:String) {
    addUser(firstName:$firstName,age:$age,companyId:$companyId){
      firstName
      id
    
    }
  }
`;
export default graphql(mutation)(graphql(query)(CreateUser));