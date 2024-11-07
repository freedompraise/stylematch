import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import HeroSection from "./components/HeroSection";
import ProductCard from "./components/ProductCard";
import ProductDetailModal from "./components/ProductDetailModal";
import ChatPopup from "./components/ChatPopup";
import { getVendorDetails, getVendorProducts } from "@/api/vendor";

const VendorPage = () => {
  const router = useRouter();
  const { companyName } = router.query;
  const [vendor, setVendor] = useState(null);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [delayedMessage, setDelayedMessage] = useState(false);

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
          console.log("vendorData", vendorData);
          if (vendorError || !vendorData) {
            throw new Error("Failed to fetch vendor details");
          }

          const { products: productsData, error: productsError } =
            await getVendorProducts(vendorData.user_id);
          if (productsError) {
            throw new Error("Failed to fetch vendor products");
          }

          setProducts(productsData);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      })();
    }

    return () => clearTimeout(delayedMessageTimer);
  }, [companyName]);

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

  if (error) {
    return (
      <div className="text-center min-h-screen py-8 text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <>
      {vendor ? (
        <>
          <HeroSection
            bannerImage={vendor.bannerImage}
            vendorName={vendor.name}
            bio={vendor.bio}
          />
          <section className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
            {products.length > 0 ? (
              products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onViewDetails={setSelectedProduct}
                />
              ))
            ) : (
              <div className="text-center col-span-full py-8">
                No products available
              </div>
            )}
          </section>
          <ChatPopup vendorPhoneNumber={vendor.phoneNumber} />
          {selectedProduct && (
            <ProductDetailModal
              product={selectedProduct}
              onClose={() => setSelectedProduct(null)}
            />
          )}
        </>
      ) : (
        <div className="text-center h-64 mt-8">Vendor not found</div>
      )}
    </>
  );
};

export default VendorPage;
