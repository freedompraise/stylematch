import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const TopNavbar = ({ toggleDropdown }) => {
  return (
    <nav className="bg-blue-500 text-white flex justify-between items-center p-4 shadow-lg">
      <div className="text-xl font-bold">StyleMatch</div>
      <button onClick={toggleDropdown}>
        <FontAwesomeIcon
          icon={faBars}
          className="text-2xl hover:text-gray-300"
        />
      </button>
    </nav>
  );
};

export default TopNavbar;
