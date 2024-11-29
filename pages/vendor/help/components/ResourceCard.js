import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faHeadset,
  faLightbulb,
} from "@fortawesome/free-solid-svg-icons";

const icons = {
  faBook,
  faHeadset,
  faLightbulb,
};

const ResourceCard = ({ resource, onCardClick }) => {
  const icon = icons[resource.icon] || faBook;
  return (
    <Card
      className="shadow-lg hover:shadow-xl transition duration-300 border-t-4 border-blue-500 cursor-pointer"
      onClick={onCardClick}
    >
      <CardContent className="flex flex-col items-center text-center">
        <FontAwesomeIcon icon={icon} className="text-4xl text-blue-500 mb-4" />
        <Typography variant="h6" className="font-semibold text-gray-700">
          {resource.title}
        </Typography>
        <Typography variant="body2" className="text-gray-600 mt-2">
          {resource.description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ResourceCard;
