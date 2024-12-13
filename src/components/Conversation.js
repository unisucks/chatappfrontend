import React from "react";
import { Divider, Box } from "@mui/material";

const Conversation = ({ user, onUserClick, onlineUsers }) => {
  return (
    <>
      {user.map((user, index) => {
        const isOnline = onlineUsers.includes(user._id);

        return (
          <Box key={index}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                fontWeight: 500,
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
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <img
                  src={user.profilePic}
                  alt={user.name}
                  width="30px"
                  height="30px"
                  style={{ borderRadius: "50%" }}
                />
                {user.name}
                {isOnline && (
                  <span
                    style={{
                      color: "green",
                      marginLeft: "10px",
                      fontSize: "20px",
                    }}
                  >
                    •
                  </span>
                )}
              </Box>
            </Box>
            <Divider />
          </Box>
        );
      })}
    </>
  );
};

export default Conversation;
