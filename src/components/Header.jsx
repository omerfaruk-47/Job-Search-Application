import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <h2>Job Center</h2>
      <nav>
        <NavLink to={"/"}>Job List</NavLink>
        <NavLink to={"/add"}>Add a Job</NavLink>
      </nav>
    </header>
  );
};

export default Header;
