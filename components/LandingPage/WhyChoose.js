import React from "react";
import { Container, Grid, Typography, Card, CardContent } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import CompareIcon from "@mui/icons-material/Compare";
import GroupIcon from "@mui/icons-material/Group";

const WhyChoose = () => {
  const reasons = [
    {
      title: "Proven Success Stories",
      description:
        "Hear from real vendors who boosted their sales and credibility using StyleMatch.",
      icon: <GroupIcon fontSize="large" className="text-blue-500" />,
    },
    {
      title: "Better Than Social Media",
      description:
        "Gain SEO advantages, streamlined inventory management, and a professional look.",
      icon: <CompareIcon fontSize="large" className="text-blue-500" />,
    },
    {
      title: "Increased Credibility",
      description:
        "Create a lasting impression on your customers with a reliable, professional store.",
      icon: <StarIcon fontSize="large" className="text-blue-500" />,
    },
  ];

  return (
    <Container maxWidth="lg" className="py-16">
      <Typography variant="h4" className="mb-10 font-bold text-center">
        Why Choose StyleMatch?
      </Typography>
      <Grid container spacing={4}>
        {reasons.map((reason, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card className="shadow-lg h-full">
              <CardContent className="text-center">
                <div className="mb-4">{reason.icon}</div>
                <Typography variant="h6" className="font-bold mb-2">
                  {reason.title}
                </Typography>
                <Typography className="text-gray-600">
                  {reason.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default WhyChoose;
