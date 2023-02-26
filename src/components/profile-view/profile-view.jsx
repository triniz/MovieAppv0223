import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { UserInfo } from "./user-info";
import { useParams } from "react-router";
import { Card, Container, Col, Row, Button, Form } from "react-bootstrap";
import './profile-view.scss';



export const ProfileView = ({ movies }) => {
    //const [updatedUser, setUpdatedUser] = useState(false);
    const { movieId } = useParams();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");
    const token = localStorage.getItem("token");
    //const storedUser = null;
    const storedUser = JSON.parse(localStorage.getItem("user"))
    console.log ("user profile view", storedUser);


    // apply filter to favorite movie list
    const favMovies = movies.filter((movie) => storedUser.FavoriteMovies.includes(movie.id));
    console.log ("movies profile view", favMovies);


    // handle for updating user info
    const handleUpdate = (e) => {
    
      e.preventDefault(); 
      
      const data = {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
      };

      fetch(`https://movieapi-9rx2.onrender.com/users/${user.Username}`, {
          
          method: "PUT",
          
          headers: {
          Authorization : `Bearer ${localStorage.getItem('token')}`,
          "Content-Type": "application/json"
          },
          body: JSON.stringify(data)

        }).then((response)=>response.json())
          .then((data)=> { 
          console.log(data);
          localStorage.setItem("user", JSON.stringify(data.user));
          alert('Update successful!')
          window.location.reload(); 
       
        }).catch((e)=>{
        alert("Something went wrong!");
        console.log(e);
        })
    };

    
  
    // handle for deleting user account
    const handleDeregister = () => { 
    
        fetch(`https://movieapi-9rx2.onrender.com/users/${user.Username}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          }
        }).then((response) => {
           if (response.ok) {
            localStorage.clear();
            alert("Account successfully deleted");
            <Navigate to="/signup" /> // replace window reload with navigate
           }
            else {
            alert("Deletion failed!")
            window.location.reload();
          }
        }).catch((e)=>{
          alert("Something went wrong")
          window.location.reload();
          console.log(e);

      })
    };

// returns 1. rendered userinfo component, 2. update form, 3. rendered favorites list
  return (
    <Container >
      <Row>
        <Col xs={12} sm={4}>
          <Card style={{marginTop: 30, backgroundColor: "whitesmoke"}}>
            <Card.Body>
              <UserInfo username={storedUser.Username} email={storedUser.Email} handleDeregister={handleDeregister} /> 
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} sm={8}>
          <Card style={{marginTop: 30, backgroundColor: "whitesmoke", marginBottom: 30}}>
          <Card.Body>
              <Card.Title>Update Information</Card.Title>
              <Form className="w-100" onSubmit={handleUpdate}> 
              <Form.Group controlId="updateFormUsername">
                <Form.Label>New Username:</Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  onChange={event => setUsername(event.target.value)} 
                  minLength="5" 
                  placeholder="Enter username (min 5 characters)"

                />
              </Form.Group>

              <Form.Group controlId="updatePassword">
                <Form.Label>New Password:</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={event => setPassword(event.target.value)}
                  placeholder="Password"

                />
              </Form.Group>

              <Form.Group controlId="updateFormEmail">
                <Form.Label>New Email:</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={event => setEmail(event.target.value)}
                  placeholder="Enter email"
                />
              </Form.Group>

              <Form.Group controlId="updateFormBirthday">
                <Form.Label>New Birthday:</Form.Label>
                <Form.Control
                  type="date"
                  value={birthday}
                  onChange={event => setBirthday(event.target.value)}
                />
              </Form.Group>

              <Button variant="primary" type="submit" style={{ margin: '0.7rem'}} onClick={handleUpdate}>
                Save Changes
              </Button>
              </Form>

            </Card.Body>
          </Card>
        </Col>

      </Row>
      <>
        <Row>
          {favMovies.length === 0 ? ( 
          <h4>You haven't added any movies! </h4>
          ) : (
          <>  
            <h4>Favorite Movies</h4>
            {favMovies.map((movie)=>( 
              <Col xs={12} md={6} lg={3} key={movie.id} className="fav-movie">
                  <MovieCard 
                    movie = {movie}
                    />
              </Col>
            ))}              
          </>
          )}  
        </Row>
                
      </>
  </Container>
  );
};




 

