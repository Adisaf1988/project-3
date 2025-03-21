import React, { useState } from "react";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import { addVacationToApi, uploadImage } from "./service";

import AdminGuard from "../../AdminGuard";

function AddVacationPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    destination: "",
    description: "",
    start_date: "",
    end_date: "",
    price: "",
  });

  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false); // State for loading

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setMessage("Please upload a cover image.");
      return;
    }

    setLoading(true);

    try {
      const { filename } = await uploadImage(file);
      const response = await addVacationToApi({
        ...formData,
        price: Number(formData.price),
        vacation_photo: filename,
      });
      setMessage("Vacation added successfully!");
      navigate("/vacations");
      console.log("Vacation added successfully:", response);
    } catch (error) {
      if (error instanceof Error) {
        setMessage(error.message);
        console.error("Adding vacation failed:", error.message);
      } else {
        setMessage("An unknown error occurred.");
        console.error("Adding vacation failed:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        height: "100vh",
        paddingTop: 2,
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <TextField
        id="destination"
        label="Destination"
        name="destination"
        value={formData.destination}
        onChange={handleChange}
        multiline
        maxRows={4}
      />
      <TextField
        id="description"
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        multiline
        rows={4}
      />
      <TextField
        id="start_date"
        label="Start on"
        name="start_date"
        type="date"
        onChange={handleChange}
      />
      <TextField
        id="end_date"
        label="End on"
        name="end_date"
        type="date"
        onChange={handleChange}
      />
      <TextField
        id="price"
        label="Price"
        name="price"
        value={formData.price}
        onChange={handleChange}
        multiline
        maxRows={4}
        variant="standard"
      />
      <Box sx={{ height: 16 }} />
      <InputFileUpload handleFileChange={handleFileChange} />
      <Box sx={{ height: 16 }} />
      <BasicButtons loading={loading} /> {loading && <CircularProgress />}
      {message && <Typography variant="body1">{message}</Typography>}
    </Box>
  );
}

export function InputFileUpload({
  handleFileChange,
}: {
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <Button
      component="label"
      variant="contained"
      startIcon={<CloudUploadIcon />}
    >
      Upload Cover Image
      <input
        style={{ display: "none" }}
        onChange={handleFileChange}
        type="file"
      />
    </Button>
  );
}

export function BasicButtons({ loading }: { loading: boolean }) {
  const navigate = useNavigate();
  return (
    <Stack spacing={2} direction="row">
      <Button type="submit" variant="contained" disabled={loading}>
        {loading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          "Add vacation"
        )}
      </Button>
      <Button variant="outlined" onClick={() => navigate("/vacations")}>
        Cancel
      </Button>
    </Stack>
  );
}

export default AdminGuard(AddVacationPage);
