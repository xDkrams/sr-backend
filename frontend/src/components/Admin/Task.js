import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Box,
  Button,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Task = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state?.data;

  const [status, setStatus] = useState(data?.status || "Processing");

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const convertStringToList = (str) => {
    return str.split(";").map((item) => item.trim());
  };

  const requestForList = data?.requestFor
    ? convertStringToList(data.requestFor)
    : [];

  const handleUpdate = () => {
    if (status !== "Processing" && status !== "Completed") {
      console.log(
        "Invalid status. Status must be 'Processing' or 'Completed'."
      );
      return;
    }
    const updatedData = {
      ...data,
      status: status,
    };

    axios
      .put(
        `http://localhost:5000/api/updateRequests/${Number(updatedData.id)}`,
        updatedData
      )
      .then((res) => {
        if (res.status === 200) {
          alert("data updated");
        }
      });
    navigate("/dashboard");
  };
  return (
    <Grid container style={{ marginTop: "5rem" }}>
      {data && (
        <Card variant="outlined" style={{ width: "50%", padding: "5rem" }}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h4" component="div" gutterBottom>
                  ID: {data.id}
                </Typography>
              </Grid>
              {/* Modified Request For section */}
              <Grid item xs={12} sm={6}>
                <Typography variant="body1" color="textSecondary">
                  Request For:
                  {requestForList.map((item, index) => (
                    <li key={index}>
                      {item}
                      {index !== requestForList.length - 1 && ", "}
                    </li>
                  ))}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1" color="textSecondary">
                  Requesting Office: {data.requestingOffice}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1" color="textSecondary">
                  Requesting Email: {data.requestingEmail}
                </Typography>
              </Grid>
              {/* Removed Assigned To section */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="status-label">Status</InputLabel>
                  <Select
                    labelId="status-label"
                    value={status}
                    onChange={handleStatusChange}
                  >
                    <MenuItem value="Processing">Processing</MenuItem>
                    <MenuItem value="Completed">Completed</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" color="textSecondary">
                  Date: {data.date}
                </Typography>
              </Grid>
            </Grid>
            <Box style={{ padding: "0 15rem", marginTop: "5rem" }}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleUpdate}
              >
                Update
              </Button>
            </Box>
          </CardContent>
        </Card>
      )}
    </Grid>
  );
};

export default Task;
