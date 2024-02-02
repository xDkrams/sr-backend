import React from "react";
import { Grid, Paper, Typography, Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
const Dashboard = () => {
  const navigate = useNavigate();

  const [isHeaderClick, setIsHeaderClick] = useState(false);
  const [request, setRequest] = useState([]);
  const [filteredRequest, setFilteredRequest] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/getRequests/`).then((res) => {
      const data = res.data;

      const mappedResponses = data.map((request) => {
        // Filter properties with value true
        const selectedProperties = Object.entries(request)
          .filter(([key, value]) => value === true)
          .map(([key]) => key);

        // Format properties with value true into a string
        const truePropertiesString = selectedProperties.join("; ");

        return {
          id: request.requestNumber,
          requestingOffice: request.Office,
          requestingEmail: request.email,
          status: request.status,
          date: new Date(request.dateRequest).toLocaleDateString("en-PH", {
            year: "numeric",
            month: "short",
            day: "2-digit",
          }),
          requestFor: truePropertiesString.toLocaleUpperCase(),
          dateFinished: request.date
            ? new Date(request.date).toLocaleDateString("en-PH", {
                year: "numeric",
                month: "short",
                day: "2-digit",
              })
            : "--",
        };
      });

      setRequest(mappedResponses);
    });
  }, []);
  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "requestFor", headerName: "Request", width: 150 },
    { field: "requestingOffice", headerName: "Requesting Office", width: 200 },
    { field: "requestingEmail", headerName: "Requesting Email", width: 200 },
    { field: "status", headerName: "Status", width: 150 },
    { field: "date", headerName: "Date", width: 150 },
    { field: "dateFinished", headerName: "Date Finished", width: 150 },
  ];

  const handleRowClick = (params) => {
    // Redirect to /task when a row is clicked
    navigate("/task", { state: { data: params.row } });
  };
  const handleItemClick = (e) => {
    const filterRequest = request.filter((req) => req.status === e);
    setFilteredRequest(filterRequest);
    setIsHeaderClick(true);
  };
  console.log(request);

  return (
    <Box>
      <Box style={{ marginBottom: "5rem" }}>
        {/* Dashboard Content */}
        <Grid container spacing={2} style={{ marginTop: "5rem" }}>
          {/* Pending Tile */}
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Paper
              elevation={6}
              style={{ padding: "3rem", textAlign: "center" }}
              onClick={(e) => handleItemClick("Pending")}
            >
              <Typography variant="h6">Pending</Typography>
              <Typography>Tasks awaiting action.</Typography>
            </Paper>
          </Grid>

          {/* Assigned Tile */}
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Paper
              elevation={6}
              style={{ padding: "3rem", textAlign: "center" }}
              onClick={(e) => handleItemClick("Processing")}
            >
              <Typography variant="h6">Processing</Typography>
              <Typography>Tasks being process.</Typography>
            </Paper>
          </Grid>

          {/* Completed Tile */}
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Paper
              elevation={6}
              style={{ padding: "3rem", textAlign: "center" }}
              onClick={(e) => handleItemClick("Completed")}
            >
              <Typography variant="h6">Completed</Typography>
              <Typography>Tasks successfully completed.</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
      <Box style={{ width: "75%", paddingTop: "5rem" }}>
        <DataGrid
          rows={isHeaderClick ? filteredRequest : request}
          columns={columns}
          pageSize={5}
          onCellClick={(params) => handleRowClick(params)}
          // checkboxSelection
        />
      </Box>
    </Box>
  );
};

export default Dashboard;
