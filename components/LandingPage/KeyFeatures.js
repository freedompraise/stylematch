import React from "react";
import { Container, Grid, Typography } from "@mui/material";

const features = [
  {
    title: "Inventory Management",
    description: "Keep track of your stock effortlessly.",
    icon: "📦",
  },
  {
    title: "Automated Payments",
    description: "Secure and easy payment options.",
    icon: "💳",
  },
  {
    title: "Customer Insights",
    description: "Understand trends and improve offerings.",
    icon: "📊",
  },
  {
    title: "Delivery Scheduling",
    description: "Organize deliveries effectively.",
    icon: "🚚",
  },
];

const KeyFeatures = () => {
  return (
    <Container maxWidth="lg" className="py-16">
      <Typography variant="h4" className="text-center mb-8 font-bold">
        Key Features
      </Typography>
      <Grid container spacing={4}>
        {features.map((feature, index) => (
          <Grid key={index} item xs={12} sm={6} md={3} className="text-center">
            <div className="text-6xl">{feature.icon}</div>
            <Typography variant="h6" className="font-bold mt-4">
              {feature.title}
            </Typography>
            <Typography>{feature.description}</Typography>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default KeyFeatures;
