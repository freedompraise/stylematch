import { useState } from "react";
import { createProduct } from "@/api/product";
import CustomToast from "@/CustomToast";

const ImportProductsPage = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleImport = async () => {
    if (!file) {
      CustomToast.error("Please select a file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      const content = e.target.result;
      try {
        const products = JSON.parse(content); // Ensure proper formatting
        await Promise.all(products.map((product) => createProduct(product)));
        CustomToast.success("Products imported successfully!");
      } catch (error) {
        CustomToast.error("Error importing products. Check the file format.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="p-6 bg-gray-100 rounded-md shadow-md">
      <h2 className="text-lg font-bold mb-4">Import Products</h2>
      <input
        type="file"
        accept=".txt"
        onChange={handleFileChange}
        className="mb-4"
      />
      <button
        onClick={handleImport}
        className="w-full bg-blue-600 text-white py-2 rounded-md"
      >
        Import Products
      </button>
    </div>
  );
};

export default ImportProductsPage;
