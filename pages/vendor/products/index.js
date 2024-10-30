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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { vendor } = useAuth();

  useEffect(() => {
    if (!vendor) {
      setError("Vendor data is not available. Please log in again.");
      setLoading(false);
      return;
    }

    async function loadProducts() {
      try {
        setLoading(true);
        const data = await fetchProducts(vendor.user_id);

        if (!data || data.length === 0) {
          setError("No products found. Please add new products.");
          setProducts([]);
        } else {
          setProducts(data);
          setError(null);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, [vendor]);

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

      {loading ? (
        <Typography variant="h6" color="textSecondary">
          Loading products...
        </Typography>
      ) : error ? (
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      ) : products.length === 0 ? (
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
