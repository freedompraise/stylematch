import React from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faVideo,
  faHeadset,
  faLightbulb,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const HelpPage = () => {
  const resources = [
    {
      icon: faBook,
      title: "Getting Started Guide",
      description:
        "Step-by-step instructions to help you set up your vendor account and start selling.",
      link: "/docs/getting-started",
    },
    {
      icon: faVideo,
      title: "Tutorial Videos",
      description:
        "Watch detailed video tutorials to learn how to use our platform effectively.",
      link: "/tutorials",
    },
    {
      icon: faHeadset,
      title: "Customer Support",
      description: "Need help? Reach out to our support team for assistance.",
      link: "/support",
    },
    {
      icon: faLightbulb,
      title: "Best Practices",
      description:
        "Learn tips and tricks to optimize your store and attract more customers.",
      link: "/best-practices",
    },
  ];

  return (
    <Container maxWidth="md" className="mt-10">
      <Typography
        variant="h4"
        className="text-center font-bold text-gray-800 mb-8"
      >
        Vendor Help Center
      </Typography>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {resources.map((resource, index) => (
          <Card
            key={index}
            className="shadow-lg hover:shadow-xl transition duration-300 border-t-4 border-blue-500"
          >
            <CardContent className="flex flex-col items-center text-center">
              <FontAwesomeIcon
                icon={resource.icon}
                className="text-4xl text-blue-500 mb-4"
              />
              <Typography variant="h6" className="font-semibold text-gray-700">
                {resource.title}
              </Typography>
              <Typography variant="body2" className="text-gray-600 mt-2 mb-4">
                {resource.description}
              </Typography>
              <Link href={resource.link}>
                <Button
                  variant="contained"
                  color="primary"
                  className="text-white bg-blue-500 hover:bg-blue-600"
                >
                  Learn More
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </Container>
  );
};

export default HelpPage;
