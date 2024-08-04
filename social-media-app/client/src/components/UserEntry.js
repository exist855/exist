import React from "react";
import HorizontalStack from "./util/HorizontalStack";
import UserAvatar from "./UserAvatar";
import { Typography,Button } from "@mui/material";
import { Link } from "react-router-dom";

const UserEntry = ({ username }) => {
  return (
    <HorizontalStack justifyContent="space-between" key={username}>
      <HorizontalStack>
        <UserAvatar width={30} height={30} username={username} />
        <Typography>{username}</Typography>
      </HorizontalStack>
     <Button variant='contained'><Link to={"/users/" + username} style={{'textDecoration':'none',color:'white'}}>View</Link></Button> 
    </HorizontalStack>
  );
};

export default UserEntry;
