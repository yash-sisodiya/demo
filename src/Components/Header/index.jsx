import React from "react";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
export default function Header() {
  const navigate = useNavigate();
  const navItems = [
    { label: "Login", path: "/login" },
    { label: "Register", path: "/register" },
    { label: "Loan Calculator", path: "/personal-loan-emi-calculator" },
    { label: "Currency Converter", path: "/currency-converter" },
  ];
  return (
    <AppBar component="nav" color={"transparent"} position="relative">
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            color: "#06836C",
            fontWeight: 700,
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        >
          Demo
        </Typography>
        <Box>
          {navItems.map((item) => (
            <Button
              key={item}
              sx={{ color: "#066251" }}
              onClick={() => navigate(item.path)}
            >
              {item.label}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
