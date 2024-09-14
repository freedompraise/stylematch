// pages/[subdomain]/catalog.js
const CatalogPage = ({ products, vendor }) => {
  return (
    <div>
      <h1>{vendor.name} - Catalog</h1>
      {/* <ProductList products={products} /> */}
    </div>
  );
};

export default CatalogPage;
