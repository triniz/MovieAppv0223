import React from 'react';
import {Button} from 'react-bootstrap';
import { Link } from "react-router-dom";

export const UserInfo = ({email, username, handleDeregister}) =>{
    return(
    <>
    <h4>My Information</h4>
    <p>Name: {username}</p>
    <p>e-mail: {email}</p>
        <Link to="/login">
        <Button variant = "danger" type ="submit" size="sm" onClick={handleDeregister}> Delete Account </Button> 
        </Link>
    </>
    );
};