//import { response } from 'express';
import { useEffect } from 'react';
//import { useState } from "react";

import { Card, Container, Row, Col, Button} from 'react-bootstrap';
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import './movie-view.scss';

export const MovieView = ({ user, movies}) => {
  const { movieId } = useParams();
  const movie = movies.find((b) => b.id === movieId); 
  const token = localStorage.getItem("token");
  
  //code workaround for storedUser error
  const storedUser = null;
  const storedstoredUser = localStorage.getItem("user");
  if (storedstoredUser) {
    try {
      storedUser = JSON.parse(storedstoredUser);
  } catch (e) {}
  }   
  console.log ("this is the user passed from the profile view", user);
  console.log ("stored username", storedstoredUser.Username);

  // trying to add favorite button and function
  const addFavoriteMovie = () => {
  
    
      fetch(`https://movieapi-9rx2.onrender.com/users/${user.Username}/movies/${movie.id}`, {
          
          method: "POST",
          headers: {
          Authorization : `Bearer ${token}`,
          "Content-Type": "application/json"  
          },
          body: JSON.stringify({movieId})
         
        }).then((response)=>response.json())
          .then((data)=> {
          
          console.log('user', user); 
          console.log('data', data);  

          localStorage.setItem("user", JSON.stringify(data));
          alert('Movie added!')
          
       
        }) .catch((error)=>{
        alert("Something went wrong!");
        console.log(error);
        console.log(storedstoredUser.Username);
        })
    }; 
    
// movie view render
    return (
      <Container > 
        <Row> 
          <Col md={12}> 
            <Card style={{marginTop: 30, backgroundColor: "whitesmoke"}}>
              <Card.Img variant="top" src={movie.image} className="w-100" />
              <Card.Body >
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>
                <div>
                <div>
                  <span>Description: </span>
                  <span>{movie.description}</span>
                </div>
                <div>
                  <span>Genre: </span>
                  <span>{movie.genre}</span>
                </div>
                <div>
                  <span>Director: </span>
                  <span>{movie.director}</span>
                </div>
                <div>
                  <span>Release: </span>
                  <span>{movie.release}</span>
                </div>
                <Link to={`/`}>
                  <Button className="back-button" style={{ cursor: "pointer" }}>Back</Button>
                </Link>
                
                <Button onClick={addFavoriteMovie} className="fav-button" variant="secondary" type="submit" style={{ cursor: "pointer" }} > favorite</Button>
                
                </div>
                </Card.Text>
              </Card.Body> 
            </Card>
          </Col>
        </Row> 
      </Container> 
    );
  };
 