import React, { useEffect, useRef } from "react";
import { Box, Typography, Avatar } from "@mui/material";

const Message = ({ message }) => {
  const currentUser = JSON.parse(localStorage.getItem("chat-user"));

  const messagesEndRef = useRef(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);
  return (
    <>
      {message.map((msg, index) => (
        <Box
          key={index}
          sx={{
            mb: "16px",
            textAlign: "left",
            alignSelf:
              msg.senderId != currentUser._id ? "flex-start" : "flex-end",
            maxWidth: "70%",
            backgroundColor:
              msg.senderId === currentUser._id ? "#DCF8C6" : "#FFFFFF",
            padding: "8px 12px",
            borderRadius:
              msg.senderId != currentUser._id
                ? "12px 12px 12px 0px "
                : " 12px 12px 0px 12px",
            boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
          }}
        >
          {/* <img
            src={
              msg.senderId === currentUser._id
                ? currentUser.profilePic
                : msg.profilePic
            }
            sx={{ width: 30, height: 30, margin: "0 8px" }}
          /> */}
          <Typography variant="body2">{msg.message}</Typography>
          <Typography
            variant="caption"
            sx={{
              display: "block",
              color: "gray",
              textAlign: "right",
              mt: "4px",
            }}
          >
            {new Date(msg.createdAt).toLocaleString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Typography>
        </Box>
      ))}
      <div ref={messagesEndRef} />
    </>
  );
};

export default Message;
