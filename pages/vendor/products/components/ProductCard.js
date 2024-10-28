// ProductCard.js
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
} from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import ProductActions from "./ProductActions";
import { useState } from "react";

const ProductCard = ({ product }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card>
      <CardMedia
        component="img"
        alt={product.name}
        height="150"
        image={product.image_url || "/placeholder.jpg"}
        title={product.name}
      />
      <CardContent>
        <Typography variant="h6" className="font-bold mb-2">
          {product.name}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          NGN {product.price}
        </Typography>
        <IconButton
          aria-label="more options"
          onClick={handleMenuOpen}
          className="float-right"
        >
          <MoreVert />
        </IconButton>
      </CardContent>
      <ProductActions
        product={product}
        anchorEl={anchorEl}
        handleClose={handleMenuClose}
      />
    </Card>
  );
};

export default ProductCard;
