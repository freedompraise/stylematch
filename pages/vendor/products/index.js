import { useState, useEffect } from "react";
import { Grid, Typography, Button } from "@mui/material";
import { fetchProducts } from "../../api/product";
import ProductCard from "./components/ProductCard";
import { useRouter } from "next/router";
import { Add } from "@mui/icons-material";
import { useAuth } from "context/useAuthContext";
import Breadcrumb from "@/Breadcrumb";
import PreLoader from "@/Preloader";

const ProductList = () => {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { vendor } = useAuth();

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        const data = await fetchProducts(vendor.user_id);
        setProducts(data || []);
      } catch (err) {
        console.error("Error fetching products:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, [vendor]);

  const handleAddProduct = () => {
    router.push("/vendor/products/add");
  };

  if (loading) {
    return <PreLoader />;
  }

  return (
    <div className="container p-4 main-content">
      <div className="flex justify-between mb-4">
        <Breadcrumb
          links={[
            { href: "/vendor", label: "Dashboard" },
            { label: "Products" },
          ]}
        />
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

      {products && products.length > 0 ? (
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={6} sm={4} md={3} key={product.id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <div className="text-center mt-6">
          <Typography variant="h6" color="textSecondary" gutterBottom>
            No products found.
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={handleAddProduct}
          >
            Add Your First Product
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductList;
