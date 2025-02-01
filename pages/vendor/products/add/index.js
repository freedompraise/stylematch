import { useRouter } from "next/router";

const ProductsUploadIndex = () => {
  const router = useRouter();

  const navigateTo = (path) => {
    router.push(`/vendor/products/add/${path}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Product Upload Options</h1>
      <div className="grid gap-4">
        <button
          onClick={() => navigateTo("single")}
          className="w-64 px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-md"
        >
          Single Product Upload
        </button>
        <button
          onClick={() => navigateTo("multiple")}
          className="w-64 px-6 py-3 text-white bg-green-600 hover:bg-green-700 rounded-md shadow-md"
        >
          Multiple Products Upload
        </button>
        <button
          onClick={() => navigateTo("import")}
          className="w-64 px-6 py-3 text-white bg-purple-600 hover:bg-purple-700 rounded-md shadow-md"
        >
          Import from Text File
        </button>
      </div>
    </div>
  );
};

export default ProductsUploadIndex;
