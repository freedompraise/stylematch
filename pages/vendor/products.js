import React, { useState, useEffect } from "react";
import { getProducts, uploadProduct, updateProduct } from "../api/vendor";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: "", price: "" });
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const fetchedProducts = await getProducts();
    setProducts(fetchedProducts);
  };

  const handleUpload = async () => {
    await uploadProduct(newProduct);
    setNewProduct({ name: "", price: "" });
    fetchProducts();
  };

  const handleUpdate = async (product) => {
    await updateProduct(product);
    setEditingProduct(null);
    fetchProducts();
  };

  return (
    <div>
      <h1>Products</h1>

      <div>
        <h2>Upload New Product</h2>
        <input
          type="text"
          placeholder="Name"
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct({ ...newProduct, name: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: e.target.value })
          }
        />
        <button onClick={handleUpload}>Upload</button>
      </div>

      <div>
        <h2>Existing Products</h2>
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              {editingProduct === product.id ? (
                <div>
                  <input
                    type="text"
                    value={product.name}
                    onChange={(e) =>
                      setEditingProduct({ ...product, name: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    value={product.price}
                    onChange={(e) =>
                      setEditingProduct({ ...product, price: e.target.value })
                    }
                  />
                  <button onClick={() => handleUpdate(editingProduct)}>
                    Save
                  </button>
                </div>
              ) : (
                <div>
                  {product.name} - ${product.price}
                  <button onClick={() => setEditingProduct(product.id)}>
                    Edit
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductsPage;
