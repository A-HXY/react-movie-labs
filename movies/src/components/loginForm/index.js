import React, { useState, useEffect } from "react";
import { getRequestToken, createSession } from "../../api/tmdb-api";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

const LoginForm = () => {
  const [requestToken, setRequestToken] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [loading, setLoading] = useState(false);  

  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('request_token');
    if (token) {
      setLoading(true);  
      createSession(token)
        .then((session) => {
          setSessionId(session);
          sessionStorage.setItem('sessionId', session);
          setIsAuthenticated(true);
          navigate("/");
          window.location.reload();
        })
        .catch((error) => {
          setIsAuthenticated(false);
          console.error("Error creating session:", error);
          alert("Failed to create session");
        })
        .finally(() => setLoading(false));  
    }
  }, []);

  const handleGetRequestToken = async () => {
    try {
      setLoading(true);  
      const token = await getRequestToken();
      setRequestToken(token);
      alert("Request token generated. Please authorize the app.");
      window.location.href = `https://www.themoviedb.org/authenticate/${token}?redirect_to=${encodeURIComponent(window.location.href)}`;
    } catch (error) {
      console.error("Error generating request token:", error);
      setLoading(false); 
    }
  };

  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "20px"
      }}
    >
      <Box sx={{ textAlign: "center", marginBottom: "20px" }}>
        <Typography variant="h4" gutterBottom color="primary">
          TMDB Login
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Please log in to access the movie database.
        </Typography>
      </Box>

      {loading ? (
        <CircularProgress size={50} color="primary" />
      ) : (
        <>
          {!isAuthenticated ? (
            <Button
              onClick={handleGetRequestToken}
              variant="contained"
              color="primary"
              sx={{
                padding: "12px 24px",
                fontSize: "16px",
                borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                '&:hover': {
                  backgroundColor: "#0069d9",
                }
              }}
            >
              Get Authorization
            </Button>
          ) : (
            <Alert severity="success" sx={{ width: "100%", marginTop: "20px" }}>
              Session created successfully!
            </Alert>
          )}
        </>
      )}
    </Container>
  );
};

export default LoginForm;
