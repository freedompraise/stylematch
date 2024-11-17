import Link from "next/link";

const Breadcrumb = ({ links = [] }) => {
  return (
    <nav className="mb-4 flex items-center space-x-2" aria-label="breadcrumb">
      {links.map((link, index) => (
        <span key={index} className="flex items-center space-x-2">
          {index !== links.length - 1 ? (
            <>
              <Link
                href={link.href}
                className="text-blue-600 hover:underline font-medium"
              >
                {link.label}
              </Link>
              <span className="text-gray-400">›</span>
            </>
          ) : (
            <span className="text-gray-600 font-semibold">{link.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumb;
