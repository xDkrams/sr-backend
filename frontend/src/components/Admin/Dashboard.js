import React, { useState, useEffect } from "react";
import { Grid, Paper, Typography, Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TASK_STATUSES = {
  PENDING: "Pending",
  PROCESSING: "Processing",
  COMPLETED: "Completed",
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isHeaderClick, setIsHeaderClick] = useState(false);
  const [request, setRequest] = useState([]);
  const [filteredRequest, setFilteredRequest] = useState([]);
  const [activeStatus, setActiveStatus] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`http://localhost:5000/api/getRequests/`)
      .then((res) => {
        const data = res.data;

        const mappedResponses = data.map((request) => {
          const selectedProperties = Object.entries(request)
            .filter(([key, value]) => value === true)
            .map(([key]) => key);
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
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  }, []);

  const handleItemClick = (status) => {
    const filterRequest = request.filter((req) => req.status === status);
    setFilteredRequest(filterRequest);
    setIsHeaderClick(true);
    setActiveStatus(status);
  };

  const handleRowClick = (params) => {
    navigate("/task", { state: { data: params.row } });
  };

  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "requestFor", headerName: "Request", width: 150 },
    { field: "requestingOffice", headerName: "Requesting Office", width: 200 },
    { field: "requestingEmail", headerName: "Requesting Email", width: 200 },
    { field: "status", headerName: "Status", width: 150 },
    { field: "date", headerName: "Date", width: 150 },
    { field: "dateFinished", headerName: "Date Finished", width: 150 },
  ];

  return (
    <Box>
      <Box style={{ marginBottom: "5rem" }}>
        <Grid container spacing={2} style={{ marginTop: "5rem" }}>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Paper
              elevation={6}
              style={{
                padding: "3rem",
                textAlign: "center",
                cursor: "pointer",
                backgroundColor:
                  activeStatus === TASK_STATUSES.PENDING
                    ? "#e0e0e0"
                    : "initial",
              }}
              onClick={(e) => handleItemClick(TASK_STATUSES.PENDING)}
            >
              <Typography variant="h6">Pending</Typography>
              <Typography>Tasks awaiting action.</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Paper
              elevation={6}
              style={{
                padding: "3rem",
                textAlign: "center",
                cursor: "pointer",
                backgroundColor:
                  activeStatus === TASK_STATUSES.PROCESSING
                    ? "#e0e0e0"
                    : "initial",
              }}
              onClick={(e) => handleItemClick(TASK_STATUSES.PROCESSING)}
            >
              <Typography variant="h6">Processing</Typography>
              <Typography>Tasks being processed.</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Paper
              elevation={6}
              style={{
                padding: "3rem",
                textAlign: "center",
                cursor: "pointer",
                backgroundColor:
                  activeStatus === TASK_STATUSES.COMPLETED
                    ? "#e0e0e0"
                    : "initial",
              }}
              onClick={(e) => handleItemClick(TASK_STATUSES.COMPLETED)}
            >
              <Typography variant="h6">Completed</Typography>
              <Typography>Tasks successfully completed.</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
      <Box style={{ width: "75%", paddingTop: "5rem" }}>
        {isLoading ? (
          <Typography>Loading...</Typography>
        ) : (
          <DataGrid
            style={{ height: "500px" }}
            rows={isHeaderClick ? filteredRequest : request}
            columns={columns}
            pageSize={5}
            onCellClick={(params) => handleRowClick(params)}
          />
        )}
      </Box>
    </Box>
  );
};

export default Dashboard;
