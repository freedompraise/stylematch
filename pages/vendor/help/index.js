import { useState } from "react";
import { Container, Typography } from "@mui/material";
import ResourceCard from "./components/ResourceCard";
import ResourceDialog from "./components/ResourceDialog";

const HelpPage = () => {
  const adminPhone = "2349074577147";
  const [openDialog, setOpenDialog] = useState(null);

  const resources = [
    {
      id: 1,
      icon: "faBook",
      title: "Getting Started Guide",
      description: "Step-by-step instructions to set up your vendor account.",
      content: (
        <div>
          <Typography variant="body1" gutterBottom>
            Welcome to the platform! Here’s how to get started:
          </Typography>
          <ul>
            <li>Sign up and log in to your account.</li>
            <li>Customize your profile with store details.</li>
            <li>Start adding products with details like price and image.</li>
            <li>Share your unique store link with buyers.</li>
          </ul>
        </div>
      ),
    },
    {
      id: 2,
      icon: "faLightbulb",
      title: "Best Practices",
      description: "Learn tips to optimize your store and attract customers.",
      content: (
        <div>
          <Typography variant="body1" gutterBottom>
            Follow these tips for success:
          </Typography>
          <ul>
            <li>Create an eye-catching banner and bio.</li>
            <li>
              Use high-quality product images and compelling descriptions.
            </li>
            <li>Keep your stock and delivery times updated.</li>
          </ul>
        </div>
      ),
    },
    {
      id: 3,
      icon: "faHeadset",
      title: "Customer Support",
      description: "Need help? Contact us on WhatsApp.",
      content: (
        <Typography variant="body1" gutterBottom>
          Reach out to us directly on WhatsApp for support:{" "}
          <a
            href={`https://wa.me/${adminPhone}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500"
          >
            Click Here to Chat
          </a>
        </Typography>
      ),
    },
  ];

  const handleDialogOpen = (id) => setOpenDialog(id);
  const handleDialogClose = () => setOpenDialog(null);

  return (
    <Container maxWidth="md" className="mt-10">
      <Typography
        variant="h4"
        className="text-center font-bold text-gray-800 mb-8"
      >
        Vendor Help Center
      </Typography>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {resources.map((resource) => (
          <ResourceCard
            key={resource.id}
            resource={resource}
            onCardClick={() => handleDialogOpen(resource.id)}
          />
        ))}
      </div>
      {resources.map(
        (resource) =>
          openDialog === resource.id && (
            <ResourceDialog
              key={resource.id}
              resource={resource}
              open={openDialog === resource.id}
              onClose={handleDialogClose}
            />
          )
      )}
    </Container>
  );
};

export default HelpPage;
