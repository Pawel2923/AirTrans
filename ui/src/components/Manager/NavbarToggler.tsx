import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./NavbarToggler.module.css";

interface NavbarTogglerProps {
  menuId: string;
  expanded: boolean;
  onExpandedChange: () => void;
  className?: string;
}

const NavbarToggler = ({
  menuId,
  expanded,
  onExpandedChange,
  className,
}: NavbarTogglerProps) => {
  return (
    <button
      className={`${classes["navbar-toggler"]} ${className ? className : ""}`}
      onClick={() => onExpandedChange()}
      title={`${expanded ? "Zwiń" : "Rozwiń"} menu nawigacyjne`}
      aria-expanded={expanded}
      aria-controls={menuId}
      aria-label={`${expanded ? "Zwiń" : "Rozwiń"} menu nawigacyjne`}
    >
      <FontAwesomeIcon className="navbar-toggler-icon" icon={faBars} />
    </button>
  );
};

export default NavbarToggler;
