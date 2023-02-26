import { useState } from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import './movie-card.scss';


export const MovieCard = ({movie }) => {
  
  
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  //console.log("user", user);


  //check if the movie is already in the favorite list of the user
  const alreadyFavorite = user.FavoriteMovies.find(id => id === movie.id);
  
  //console.log ("Favorite ?", alreadyFavorite);
  const [favorite, setFavorite] = useState(alreadyFavorite? true : false);
  
  //console.log(favorite);
  const toggleFavorite = () => {
    if (!token) return;

    const url = `https://movieapi-9rx2.onrender.com/users/${user.Username}/movies/${movie.id}`;

    let requestOptions = {
      method: '',
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  
    if (alreadyFavorite) {
      requestOptions.method = 'DELETE';
      alert("Movie deleted from your favorite list");
      setFavorite (false);
    } else {
      requestOptions.method = 'POST';
      alert("Movie added from your favorite list");
      setFavorite (true);
    }

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        //setFavorite = (!alreadyFavorite);
        //console.log ("data", data);
        //console.log("user post favorite clic", user);
        localStorage.setItem('user', JSON.stringify(data));
        window.location.reload(false);
      })
      .catch((e) => {
        alert('Something went wrong');
      });

  };

  console.log("user post favorite clic 2", user);

  return (
    <Card className="h-100" style={{marginTop: 20, backgroundColor: "whitesmoke"}}>
      <Card.Img className="card-image" variant="top" src={movie.image} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text className="card-text">{movie.description}</Card.Text>
          <Button variant="link" className="open-button" style={{ cursor: "pointer" }}>See more</Button>
          {favorite ? (
          <Button variant="danger" size="sm" className="remove-fav-button"  onClick={() => toggleFavorite()}> Remove from favorites</Button>) : (
          <Button variant="success" size="sm" className="remove-fav-button" onClick={() => toggleFavorite()}> Add to favorites</Button>)
          }
      </Card.Body>
    </Card>
  );
};


  // validation of data types between prop and component
  MovieCard.propTypes = {
    movie: PropTypes.shape({
      title: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      genre: PropTypes.string,
      director: PropTypes.string,
      release: PropTypes.string
    }).isRequired
  };