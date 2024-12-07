import React from "react";
import { Divider, Box } from "@mui/material";

const Conversation = ({ user, onUserClick }) => {
  return (
    <>
      {user.map((user, index) => (
        <Box>
          <Box
            key={user._id}
            sx={{
              display: "flex",
              alignItems: "center",
              fontWeight: 500,
              justifyContent: "center",
              mb: "8px",
              p: "16px",
              gap: "50px",
              backgroundColor: "white",
              borderRadius: "8px",
              transition: "background-color 0.3s ease",
              ":hover": {
                backgroundColor: "#f0f0f0",
              },
            }}
            onClick={() => onUserClick(user)}
          >
            <img src={user.profilePic} width="30px" height="30px"></img>
            {user.name}
          </Box>
          <Divider />
        </Box>
      ))}
    </>
  );
};

export default Conversation;
