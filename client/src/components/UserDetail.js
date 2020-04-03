import React,{useEffect} from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Button, Form, Container, Row, Col } from 'react-bootstrap';

function UserDetail(props) {
    console.log(props)
    const {data} =props;

   
    return (
        <Container className="mt-5">
            <Row>
                <Col>
               {
                        data && data.user && data.user.firstName
               }
                </Col>
            </Row>
        </Container>
    )
}

const query = gql`
query User($id:String !) {
  user(id:$id){
    id
    firstName
    age
  }
}
`;

export default graphql(query, { 
    options: (props) => { return { variables: { id: props.match.params.id}}} 
})(UserDetail);