"use client";

import { SortResponseResultInterface } from "@/dao/SortResponse";
import { sortStore } from "@/store/authStore/set-sort";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";

import { SyntheticEvent, useState } from "react";
import {
  Alert,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Box,
} from "@mui/material";

export default function GenerateLink() {
  const [error, setError] = useState("");
  const [submit, setSubmit] = useState(false);
  const [longUrl, setLongUrl] = useState<string>("");
  const [shortUrl, setShortUrl] = useState<string | null>(null);
  const [data, setData] = useState<SortResponseResultInterface | null>(null);

  const insertLink = sortStore((state) => state.insertLink);

  const generateLink = async (e: SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSubmit(true);
    setError("");
    setShortUrl(null);

    try {
      await insertLink(longUrl).then((res) => {
        if (res.status === 200 || res.status === 201) {
          setData(res.data);
          setShortUrl(res.data.link);
        }
      });
    } catch (error) {
      setError("Failed to generate short link. Please try again.");
      setSubmit(false);
    } finally {
      setSubmit(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Card
        elevation={3}
        sx={{
          p: 2,
          borderRadius: 3,
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        <CardContent>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
            Generate Short URL
          </Typography>

          {error && (
            <Alert
              severity="error"
              onClose={() => setError("")}
              sx={{ mb: 2 }}
            >
              {error}
            </Alert>
          )}

          {shortUrl && (
            <Alert severity="success" sx={{ mb: 2 }}>
              <strong>Short URL:</strong>{" "}
              <a href={shortUrl} target="_blank" rel="noopener noreferrer">
                {shortUrl}
              </a>
            </Alert>
          )}

          <form onSubmit={generateLink}>
            <TextField
              name="longUrl"
              required
              disabled={submit}
              placeholder="Insert link"
              label="Insert link"
              fullWidth
              variant="outlined"
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton edge="start">
                      <FontAwesomeIcon icon={faLink} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                mb: 3,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  "&:hover fieldset": {
                    borderColor: "primary.main",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "primary.main",
                  },
                },
              }}
            />

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                variant="contained"
                type="submit"
                color="primary"
                disabled={submit}
                sx={{
                  px: 5,
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: "bold",
                  textTransform: "none",
                  transition: "background-color 0.3s",
                  "&:hover": {
                    backgroundColor: "primary.dark",
                  },
                }}
              >
                {submit ? <CircularProgress size={24} /> : "Generate!"}
              </Button>
            </Box>
          </form>

          {data && (
            <Box
              sx={{
                mt: 4,
                textAlign: "center",
                transition: "opacity 0.3s ease-in-out",
                opacity: data ? 1 : 0,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Your shortened URL:
              </Typography>
              <Typography variant="body1">
                <a href={data.link} target="_blank" rel="noopener noreferrer">
                  {data.link}
                </a>
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    </Container>
  );
}
