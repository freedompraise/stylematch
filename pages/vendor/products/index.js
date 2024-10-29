// ProductList.js
import { useState, useEffect } from "react";
import { Grid, Typography, Button } from "@mui/material";
import { fetchProducts } from "../../api/product";
import ProductCard from "./components/ProductCard";
import { useRouter } from "next/router";
import { Add } from "@mui/icons-material";
import { useAuth } from "context/useAuthContext";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const router = useRouter();
  const { vendor } = useAuth();

  useEffect(() => {
    async function loadProducts() {
      console.log("Vendor", vendor);
      const data = await fetchProducts();
      setProducts(data);
    }
    loadProducts();
  }, []);

  const handleAddProduct = () => {
    router.push("/vendor/products/add");
  };

  return (
    <div className="container p-4 main-content">
      <div className="flex justify-between mb-4">
        <Typography variant="h4">Products</Typography>
        <Button
          variant="contained"
          color="primary"
          size="small"
          startIcon={<Add />}
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
        <>
          <Typography variant="h4" className="mb-4" align="center">
            Product List
          </Typography>
          <Grid container spacing={3}>
            {products.map((product) => (
              <Grid item xs={6} sm={4} md={3} key={product.id}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </div>
  );
};

export default ProductList;
