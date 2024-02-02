// NavigationComponent.js
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { List, ListItem, ListItemText, Box } from "@mui/material";

const NavigationComponent = () => {
  const location = useLocation();

  const isDashboardActive = location.pathname === "/dashboard";
  // const isTaskActive = location.pathname === "/task";
  // const isSummaryActive = location.pathname === "/Summary";

  return (
    <Box style={{ marginTop: "2rem" }}>
      <List>
        <ListItem
          button
          component={Link}
          to="/dashboard"
          style={{
            color: isDashboardActive ? "#637A9F" : "",
            fontSize: "1.2rem", // Adjust the font size as needed
          }}
        >
          <ListItemText primary="Dashboard" />
        </ListItem>
        {/* <ListItem
          button
          component={Link}
          to="/task"
          style={{
            color: isTaskActive ? "#637A9F" : "",
            fontSize: "1.2rem", // Adjust the font size as needed
          }}
        >
          <ListItemText primary="Task/Assign" />
        </ListItem> */}
        {/* <ListItem
          button
          component={Link}
          to="/Summary"
          style={{
            color: isSummaryActive ? "#637A9F" : "",
            fontSize: "1.2rem", // Adjust the font size as needed
          }}
        >
          <ListItemText primary="Report" />
        </ListItem> */}
      </List>
    </Box>
  );
};

export default NavigationComponent;
