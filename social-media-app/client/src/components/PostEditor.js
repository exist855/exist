import {
  Button,
  Card,
  Link,
  Stack,
  TextField,
  Typography,
IconButton
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../api/posts";
import ErrorAlert from "./ErrorAlert";
import { BiImages, BiSolidVideo, BiSolidFileGif } from 'react-icons/bi';
import { isLoggedIn } from "../helpers/authHelper";
import HorizontalStack from "./util/HorizontalStack";
import UserAvatar from "./UserAvatar";

const PostEditor = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const [serverError, setServerError] = useState("");
  const [errors, setErrors] = useState({});
  const user = isLoggedIn();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    const errors = validate();
    setErrors(errors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    const data = await createPost(formData, isLoggedIn());
    setLoading(false);
    if (data && data.error) {
      setServerError(data.error);
    } else {
      navigate("/posts/" + data._id);
    }
  };

  const validate = () => {
    const errors = {};

    return errors;
  };

  return (
    <Card>
      <Stack spacing={1}>
        {user && (
          <HorizontalStack spacing={2}>
            <UserAvatar width={50} height={50} username={user.username} />
            <Typography variant="h5">
              What would you like to post today {user.username}?
            </Typography>
          </HorizontalStack>
        )}

        <Typography>
          <a href="https://commonmark.org/help/" target="_blank">
            Markdown Help
          </a>
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Title"
            required
            name="title"
            margin="normal"
            onChange={handleChange}
            error={errors.title !== undefined}
            helperText={errors.title}
          />
          
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ py: 1}}>
          <label htmlFor='imgUpload'>
            <input
              type='file'
              onChange={(e) => setFile(e.target.files[0])}
              style={{ display: 'none' }}
              id='imgUpload'
              data-max-size='5120'
              accept='.jpg, .png, .jpeg'
            />
            <IconButton component="span">
              <BiImages />
              <Typography variant="body2">Image</Typography>
            </IconButton>
            </label>
            <label htmlFor='videoUpload'>
            <input
              type='file'
              onChange={(e) => setFile(e.target.files[0])}
              style={{ display: 'none' }}
              id='videoUpload'
              data-max-size='5120'
              accept='.mp4, .wav'
            />
            <IconButton component="span">
              <BiSolidVideo />
              <Typography variant="body2">Video</Typography>
            </IconButton>
          </label>
          <label htmlFor='gifUpload'>
            <input
              type='file'
              onChange={(e) => setFile(e.target.files[0])}
              style={{ display: 'none' }}
              id='gifUpload'
              data-max-size='5120'
              accept='.gif'
            />
            <IconButton component="span">
              <BiSolidFileGif />
              <Typography variant="body2">Gif</Typography>
            </IconButton>
          </label>
        </Stack>
          <TextField
            fullWidth
            label="Content"
            multiline
            rows={10}
            name="content"
            margin="normal"
            onChange={handleChange}
            error={errors.content !== undefined}
            helperText={errors.content}
            required
          />
          <ErrorAlert error={serverError} />
          <Button
            variant="contained"
            type="submit"
            fullWidth
            disabled={loading}
            sx={{
              mt: 2,
            }}
          >
            {loading ? <>Submitting</> : <>Submit</>}
          </Button>
        </Box>
      </Stack>
    </Card>
  );
};

export default PostEditor;
