import React from "react";
import { Container, Grid, Typography } from "@mui/material";

const steps = [
  {
    title: "Import Your Catalog",
    description: "From social media or spreadsheets.",
    icon: "📤",
  },
  {
    title: "Customize Your Store",
    description: "Use our easy-to-use tools.",
    icon: "🎨",
  },
  {
    title: "Start Selling",
    description: "Manage orders seamlessly.",
    icon: "🛒",
  },
];

const HowItWorks = () => {
  return (
    <Container maxWidth="lg" className="py-16">
      <Typography variant="h4" className="text-center mb-8 font-bold">
        How It Works
      </Typography>
      <Grid container spacing={4}>
        {steps.map((step, index) => (
          <Grid key={index} item xs={12} sm={4} className="text-center">
            <div className="text-6xl">{step.icon}</div>
            <Typography variant="h6" className="font-bold mt-4">
              {step.title}
            </Typography>
            <Typography>{step.description}</Typography>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HowItWorks;
