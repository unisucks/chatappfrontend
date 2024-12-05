import React from "react";
import { Divider, Box } from "@mui/material";

const Conversation = ({ user, onUserClick }) => {
  return (
    <>
      {user.map((user, index) => (
        <Box>
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: "8px",
              p: "16px",
              backgroundColor: "white",
              borderRadius: "8px",
              transition: "background-color 0.3s ease",
              ":hover": {
                backgroundColor: "#f0f0f0",
              },
            }}
            onClick={() => onUserClick(user)}
          >
            {user.name}
            <img src={user.profilePic} width="30px" height="30px"></img>
          </Box>
          <Divider />
        </Box>
      ))}
    </>
  );
};

export default Conversation;
