import { useState } from "react";
import { Card, CardGroup, Col, Container, Row, Button, Form} from "react-bootstrap";
import { Navigate } from "react-router";

export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  

  // validation of user signup
  const handleSubmit = (event) => {
    
    event.preventDefault(); 
    
    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    }

    fetch(`https://movieapi-9rx2.onrender.com/users`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => {
      if (response.ok) {
        alert("Signup successful");
        window.location.reload();

      } else {
        alert("Signup failed");
      }
    })
      .catch((e) => console.log(e));
      <Navigate to="/login" />
  }; 

  // signup form with submit button
  return (
    // new code: Bootstrap
    // handleSubmit is the callback of onSubmit, tells the login API to validate user and password
    <Container >
      <Row>
        <Col>
          <CardGroup>
            <Card style={{marginTop: 70, backgroundColor: "whitesmoke"}}>
            <Card.Body>
              <Card.Title>Create an account</Card.Title>
              <Form onSubmit={handleSubmit}>  
              <Form.Group controlId="signUpFormUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  minLength="5" 
                  placeholder="username"

                />
              </Form.Group>

              <Form.Group controlId="signUpFormPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="password"
                />
              </Form.Group>

              <Form.Group controlId="signUpFormEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="email"
                />
              </Form.Group>

              <Form.Group controlId="signUpFormBirthday">
                <Form.Label>Birthday:</Form.Label>
                <Form.Control
                  type="date"
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" style={{ margin: '0.7rem'}}>
                Submit
              </Button>
              </Form>
            </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
);
};
   