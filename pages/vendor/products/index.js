import { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardContent,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { MoreVert, Add, Delete, Edit } from "@mui/icons-material";
import {
  fetchProducts,
  deleteProduct,
  updateProductDiscount,
} from "../../api/product";
import { toast } from "sonner";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    async function loadProducts() {
      const data = await fetchProducts();
      setProducts(data);
    }
    loadProducts();
  }, []);

  const handleMenuClick = (event, product) => {
    setAnchorEl(event.currentTarget);
    setSelectedProduct(product);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedProduct(null);
  };

  const handleDelete = async (productId) => {
    await deleteProduct(productId);
    setProducts(products.filter((p) => p.id !== productId));
    toast.success("Product deleted successfully");
    handleMenuClose();
  };

  const handleDiscountChange = async (productId, discountValue) => {
    await updateProductDiscount(productId, discountValue);
    toast.success("Discount updated successfully");
    handleMenuClose();
  };

  const handleAddProduct = () => {
    // Redirect to Add Product Page
  };

  return (
    <div className="p-4 main-content">
      <div className="flex justify-between mb-4">
        <Typography variant="h4">Product List</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          color="primary"
          onClick={handleAddProduct}
        >
          Add Product
        </Button>
      </div>

      {products.length === 0 ? (
        <Typography variant="h6" color="textSecondary">
          No products found. Please add new products.
        </Typography>
      ) : (
        products.map((product) => (
          <Card key={product.id} className="mb-4">
            <CardContent className="flex justify-between items-center">
              <div>
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  Price: ${product.price}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Stock: {product.stock_quantity}
                </Typography>
              </div>

              <div>
                <IconButton onClick={(e) => handleMenuClick(e, product)}>
                  <MoreVert />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl && selectedProduct?.id === product.id)}
                  onClose={handleMenuClose}
                >
                  <MenuItem
                    onClick={() => handleDiscountChange(product.id, 10)}
                  >
                    <Edit fontSize="small" /> Set 10% Discount
                  </MenuItem>
                  <MenuItem onClick={() => handleDelete(product.id)}>
                    <Delete fontSize="small" /> Delete
                  </MenuItem>
                </Menu>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default ProductList;
