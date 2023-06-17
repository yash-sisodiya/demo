import logo from "./logo.svg";
import "./App.css";
import Button from "@mui/material/Button";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";

function App() {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <div className="App">
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained">Hello World</Button>
    </div>
  );
}

export default App;
