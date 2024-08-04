import { Typography,Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const GoBack = () => {
  return (
    <Typography sx={{ mb: 2 }}>
    <Button variant='contained'> <Link to="/" style={{textDecoration:'none',color:'white'}}> &lt;&lt; Go back to posts</Link></Button> 
    </Typography>
  );
};

export default GoBack;
