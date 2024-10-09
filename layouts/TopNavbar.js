import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const TopNavbar = ({ toggleDropdown }) => {
  return (
    <nav className="bg-blue-700 text-white flex justify-between items-center p-4 shadow-lg">
      <div className="text-xl font-bold text-blue-700">StyleMatch</div>
      <button onClick={toggleDropdown}>
        <FontAwesomeIcon icon={faBars} className="text-2xl" />
      </button>
    </nav>
  );
};

export default TopNavbar;
