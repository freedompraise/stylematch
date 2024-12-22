import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";
import { Menu as MenuIcon, Close as CloseIcon } from "@mui/icons-material";
import Image from "next/image";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleDrawer = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div>
      {/* Navbar for Desktop and Mobile */}
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#ffffff", //
          color: "#333333",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Toolbar className="flex justify-between items-center container mx-auto px-6">
          {/* Logo */}
          <div className="text-2xl font-bold text-blue-600">
            <Image src="/logo.png" width={120} height={40} alt="StyleMatch" />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            <a
              href="#features"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Features
            </a>
            <a
              href="#pricing"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Pricing
            </a>
            <a
              href="#whychooseus"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Why Choose Us
            </a>
            <a
              href="#contact"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Contact Us
            </a>
            <Button
              href="/auth?mode=signup"
              variant="contained"
              className="bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <IconButton
            edge="end"
            className="md:hidden text-gray-700"
            onClick={toggleDrawer}
          >
            <MenuIcon fontSize="large" />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={mobileOpen} onClose={toggleDrawer}>
        <div className="w-64 h-full flex flex-col bg-white shadow-lg">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-xl font-semibold text-blue-600">StyleMatch</h2>
            <IconButton onClick={toggleDrawer}>
              <CloseIcon />
            </IconButton>
          </div>
          <List className="flex-grow">
            <ListItem
              button
              onClick={toggleDrawer}
              component="a"
              href="#features"
            >
              <ListItemText
                primary="Features"
                className="text-gray-700 hover:text-blue-600"
              />
            </ListItem>
            <ListItem
              button
              onClick={toggleDrawer}
              component="a"
              href="#pricing"
            >
              <ListItemText
                primary="Pricing"
                className="text-gray-700 hover:text-blue-600"
              />
            </ListItem>
            <ListItem
              button
              onClick={toggleDrawer}
              component="a"
              href="#whychooseus"
            >
              <ListItemText
                primary="Why Choose Us"
                className="text-gray-700 hover:text-blue-600"
              />
            </ListItem>
            <ListItem
              button
              onClick={toggleDrawer}
              component="a"
              href="#contact"
            >
              <ListItemText
                primary="Contact Us"
                className="text-gray-700 hover:text-blue-600"
              />
            </ListItem>
          </List>
          <div className="p-4">
            <Button
              href="/auth?mode=signup"
              variant="contained"
              className="w-full bg-blue-600 text-white hover:bg-blue-700 transition"
              onClick={toggleDrawer}
            >
              Get Started
            </Button>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default Navbar;
