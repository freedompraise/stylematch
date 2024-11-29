import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import HeroSection from "./components/HeroSection";
import ProductCard from "./components/ProductCard";
import ProductDetailModal from "./components/ProductDetailModal";
import ErrorDisplay from "./components/ErrorDisplay";
import ChatPopup from "./components/ChatPopup";
import SuccessPopup from "./components/SuccessPopup";
import { getVendorDetails, getVendorProducts } from "@/api/buy";
import Head from "next/head";

const VendorPage = ({ searchQuery }) => {
  const router = useRouter();
  const { companyName } = router.query;
  const [vendor, setVendor] = useState(null);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [delayedMessage, setDelayedMessage] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  useEffect(() => {
    const delayedMessageTimer = setTimeout(() => {
      if (loading) setDelayedMessage(true);
    }, 10000);

    if (companyName) {
      (async () => {
        try {
          setLoading(true);
          setError(null);
          setDelayedMessage(false);

          const { vendor: vendorData, error: vendorError } =
            await getVendorDetails(companyName);
          setVendor(vendorData);

          if (vendorError || !vendorData) {
            throw new Error("Failed to fetch vendor details");
          }

          const { products: productsData, error: productsError } =
            await getVendorProducts(vendorData.user_id);
          if (productsError) {
            throw new Error("Failed to fetch vendor products");
          }

          setProducts(productsData);
          setFilteredProducts(productsData);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      })();
    }

    return () => clearTimeout(delayedMessageTimer);
  }, [companyName]);

  // Filter products based on searchQuery
  useEffect(() => {
    if (searchQuery) {
      setFilteredProducts(
        products.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredProducts(products);
    }
  }, [searchQuery, products]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="loader animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-50"></div>
        <p className="mt-4 text-gray-600">Loading vendor information...</p>
        {delayedMessage && (
          <p className="mt-4 text-yellow-500">
            This is taking longer than expected. Please check the link or try
            refreshing the page.
          </p>
        )}
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>
          {vendor
            ? `Store Home of ${vendor.name} | StyleMatch`
            : "Vendor not found | StyleMatch"}
        </title>
        <meta
          name="description"
          content={
            vendor
              ? `Discover amazing products from ${vendor.name}'s catalogue!`
              : "Shop from your favorite vendors on StyleMatch"
          }
        />
      </Head>
      {vendor ? (
        <section className="container mx-auto lg:px-16 sm:px-4 my-8 min-h-screen">
          <HeroSection vendor={vendor} />
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onViewDetails={setSelectedProduct}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <p className="text-2xl font-semibold">Oooops.....</p>
              <p className="text-lg">This vendor has no products available</p>
            </div>
          )}

          <ChatPopup vendorPhoneNumber={vendor.phone} />
          {selectedProduct && (
            <ProductDetailModal
              product={selectedProduct}
              bankDetails={vendor.bank_details}
              onClose={() => setSelectedProduct(null)}
              onOrderSuccess={() => {
                setSelectedProduct(null);
                setShowSuccessPopup(true);
              }}
            />
          )}
          {showSuccessPopup && (
            <SuccessPopup onClose={() => setShowSuccessPopup(false)} />
          )}
        </section>
      ) : (
        <ErrorDisplay message={error} />
      )}
    </>
  );
};

export default VendorPage;
