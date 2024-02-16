import fillUpBG from "../assets/fillupBg.png";
import teal from "../assets/tealBG.png";

import { useState } from "react";
import {
  Container,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
  InputLabel,
  Box,
  Grid,
} from "@mui/material";
import axios from "axios";
import { SnackbarProvider, useSnackbar } from "notistack";

const Form = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [formData, setFormData] = useState({
    "First Name": "",
    "Last Name": "",
    Email: "",
    Office: "", // Default value for the Office field
  });

  // Ensure initial state for checkboxes is defined
  const [request, setRequest] = useState({
    coe: false,
    payslip: false,
    COEWithCompensation: false,
    ServiceRecord: false,
  });

  const handleChange = (field) => (event) => {
    const value = event.target.value;
    setFormData((prevData) => ({
      ...prevData,
      [field]: value || "", // Ensure it's always defined
    }));
  };

  const handleCheckboxChange = (field) => (event) => {
    // Ensure request[field] is initialized to false if undefined
    setRequest((prevRequest) => ({
      ...prevRequest,
      [field]: event.target.checked,
    }));
  };

  const handleVariant = (variant, message) => {
    enqueueSnackbar(message, { variant });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const requestData = { ...formData, ...request, status: "Pending" };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/postRequests",
        requestData
      );

      if (response.status === 200) {
        handleVariant("success", response.data.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      // Show the error message from console.error in a snackbar
      handleVariant("error", `Error submitting form: ${error}`);
      // if (
      //   error.response &&
      //   error.response.data &&
      //   error.response.data.message
      // ) {
      //   handleVariant("error", error.response.data.message);
      // } else {
      //   handleVariant(
      //     "error",
      //     "Error submitting form. Please try again later."
      //   );
      // }
    }
  };

  const fields = ["First Name", "Last Name", "Email"];
  const checkboxes = [
    { label: "COE", field: "coe" },
    { label: "COE with Compensation", field: "COEwithCompensation" },
    { label: "Payslip", field: "payslip" },
    { label: "Service Record", field: "ServiceRecord" },
  ];
  const offices = {
    CSI: "CSI",
    CSLO: "CSLO",
    ERPO: "ERPO",
    HRPSO: "HRPSO",
    HRRO: "HRRO",
    IRMO: "IRMO",
    IAS: "IAS",
    OFAM: "OFAM",
    OHRMD: "OHRMD",
    OLA: "OLA",
    OSM: "OSM",
    OAM: "OAM",
    "OAC-SAS": "OAC-SAS",
    "OAC-HRG": "OAC-HRG",
    OCH: "OCH",
    OCOMM: "OCOMM",
    OCA: "OCA",
    OCL: "OCL",
    PAIO: "PAIO",
    "OAC-PaC": "OAC-PaC",
    "OAC-L": "OAC-L",
    OED: "OED",
    ICTO: "ICTO",
  };

  return (
    <Container
      maxWidth="sm"
      style={{
        marginTop: "50px",
        border: "gray 1px solid",
        padding: "2rem",
        borderRadius: "2rem",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        // backgroundImage: `url(${teal})`,
        backgroundColor: "white",
      }}
    >
      <form onSubmit={handleSubmit}>
        <Box style={{ paddingBottom: "1rem", textAlign: "center" }}>
          <h2> OHRMD TSSD REQUEST FORM </h2>
        </Box>
        {fields.map((field) => (
          <TextField
            key={field}
            label={field.charAt(0).toUpperCase() + field.slice(1)}
            variant="outlined"
            fullWidth
            multiline={field === "message"}
            rows={field === "message" ? 4 : undefined}
            type={field === "email" ? "email" : undefined}
            value={formData[field] || ""} // Ensure it's always defined
            onChange={handleChange(field)}
            required
            style={{ marginBottom: "3rem" }}
          />
        ))}

        <InputLabel htmlFor="office">Requesting Office</InputLabel>
        <Select
          id="office"
          fullWidth
          variant="outlined"
          value={formData.Office || ""}
          onChange={handleChange("Office")}
        >
          <MenuItem value="" disabled>
            Select Office
          </MenuItem>
          {Object.keys(offices).map((ofc) => (
            <MenuItem key={ofc} value={ofc}>
              {offices[ofc]}
            </MenuItem>
          ))}
        </Select>
        <Box>
          <Grid container spacing={2} style={{ paddingTop: "2rem" }}>
            {checkboxes.map(({ label, field }) => (
              <Grid item xs={6} key={field}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={request[field] || false} // Ensure it's always defined
                      onChange={handleCheckboxChange(field)}
                    />
                  }
                  label={label}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box style={{ textAlign: "right" }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{
              marginTop: "2rem",
              borderRadius: "5rem",
              fontSize: "1.1rem",
            }}
          >
            Submit
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default Form;
