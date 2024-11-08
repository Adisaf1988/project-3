import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Stack from "@mui/material/Stack";
import { editVactionOnApi } from "./service";
import { uploadImage } from "../add-vacation/service";
import AdminGuard from "../../AdminGuard";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function EditVacationPage() {
  const location = useLocation();
  const nav = useNavigate();
  const [formData, setFormData] = useState({
    ...(location.state as {
      id: number;
      vacation_photo: string;
      destination: string;
      description: string;
      start_date: string;
      end_date: string;
      price: number;
    }),
  });

  useEffect(() => {
    if (!location || !location.state) {
      nav("/vacations");
    }
  }, [location]);
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);

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

    try {
      const { filename } = await uploadImage(file);
      const response = await editVactionOnApi({
        ...formData,
        price: Number(formData.price),
        vacation_photo: filename,
      });
      setMessage("Vacation edited successfully!");
      console.log("Vacation edited successfully:", response);
    } catch (error) {
      if (error instanceof Error) {
        setMessage(error.message);
        console.error("Editing vacation failed:", error.message);
      } else {
        setMessage("An unknown error occurred.");
        console.error("Editing vacation failed:", error);
      }
    }
  };
  const formatDate = (d: string) => {
    const dateString = new Date(d).toLocaleDateString().split("/");
    let tmp = dateString[2];

    dateString[2] = dateString[0];
    dateString[0] = tmp;

    tmp = dateString[2];
    dateString[2] = dateString[1];
    dateString[1] = tmp;

    dateString[1] = ("0" + dateString[1]).slice(-2);
    dateString[2] = ("0" + dateString[2]).slice(-2);

    return dateString.join("-");
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
      <Typography variant="h4" component="h1" gutterBottom>
        Edit Vacation
      </Typography>
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
        value={formatDate(formData.start_date)}
        name="start_date"
        type="date"
        onChange={handleChange}
      />
      <TextField
        id="end_date"
        label="End on"
        name="end_date"
        value={formatDate(formData.end_date)}
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
      <BasicButtons />
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

export function BasicButtons() {
  return (
    <Stack spacing={2} direction="row">
      <Button type="submit" variant="contained">
        Save Changes
      </Button>
      <Button variant="outlined">Cancel</Button>
    </Stack>
  );
}

export default AdminGuard(EditVacationPage);
