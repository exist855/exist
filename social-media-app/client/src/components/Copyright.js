import { Typography,Button } from "@mui/material";
import React from "react";
import { useTheme } from "@emotion/react";
import { Link } from "react-router-dom";

const Copyright = () => {
  const theme = useTheme();
  return (
    <Typography variant="subtitle1" color="text.secondary">
      Copyright © 2024{" "}
      <Button variant='text'><Link to="/" color={theme.palette.primary.main} style={{textDecoration:'none'}}>
        Exist!
      </Link>
      </Button>
    </Typography>
  );
};

export default Copyright;
