import React, { useEffect, useState } from "react";
import { Box, Typography, TextField, Button, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Message from "./Message";
import Conversation from "./Conversation";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await fetch("http://localhost:3005/users", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        if (!res.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        alert("Error in Getting Users", error.message);
      }
    };
    getConversations();
  }, []);
  const navigate = useNavigate();
  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("chat-user");
    navigate("/");
  };
  const handleUserClick = async (user) => {
    setSelectedUser(user);

    // Fetch messages for the selected user
    try {
      const res = await fetch(`http://localhost:3005/messages/${user._id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to fetch messages");
      }
      setMessages(data); // Set messages for the selected conversation
    } catch (error) {
      toast.error(error.message);
    }
  };
  const sendMessage = async () => {
    if (!newMessage.trim()) return;
    try {
      const res = await fetch(
        `http://localhost:3005/messages/send/${selectedUser._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ message: newMessage }),
        }
      );
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setMessages((prevMessages) => [...prevMessages, data]);
      setNewMessage("");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#CBD5CE",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "80%",
          height: "700px",
          maxWidth: 900,
          backgroundColor: "white",
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Box
          sx={{
            width: "25%",
            display: "flex",
            flexDirection: "column",
            borderRight: "1px solid #ddd",
            padding: "16px",
          }}
        >
          {/* <TextField
            variant="outlined"
            placeholder="Search"
            size="small"
            sx={{ marginBottom: "16px" }}
            InputProps={{
              startAdornment: (
                <IconButton>
                  <SearchIcon />
                </IconButton>
              ),
            }}
          /> */}

          <Box sx={{ flex: 1, overflowY: "auto", marginBottom: "16px" }}>
            <Typography variant="h6" sx={{ marginBottom: "8px" }}>
              Conversations
            </Typography>
            <Conversation
              user={users}
              onUserClick={(user) => handleUserClick(user)}
            />
          </Box>

          <Button variant="contained" color="error" fullWidth onClick={logout}>
            Logout
          </Button>
        </Box>

        <Box
          sx={{
            width: "75%",
            display: "flex",
            flexDirection: "column",
            padding: "16px",
          }}
        >
          {selectedUser ? (
            <>
              <Typography variant="h6" sx={{ marginBottom: "16px" }}>
                To {selectedUser.name}
              </Typography>

              <Box
                sx={{
                  flex: 1,
                  backgroundColor: "#f7f7f7",
                  borderRadius: "8px",
                  padding: "16px",
                  marginBottom: "16px",
                  overflowY: "scroll",
                  height: "calc(100% - 90px)",
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "right",
                }}
              >
                <Message message={messages} />
              </Box>

              <Box sx={{ display: "flex", gap: 1 }}>
                <TextField
                  variant="outlined"
                  placeholder="Type your message..."
                  size="small"
                  fullWidth
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={sendMessage}
                >
                  Send
                </Button>
              </Box>
            </>
          ) : (
            <Typography
              variant="h6"
              sx={{
                color: "gray",
                textAlign: "center",
                marginTop: "auto",
                marginBottom: "auto",
              }}
            >
              Select a conversation to start messaging
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
