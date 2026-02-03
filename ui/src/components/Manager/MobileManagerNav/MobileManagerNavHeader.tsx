import { faArrowLeft, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./MobileManagerNavHeader.module.css";
import ManagerNavContext from "../../../store/manager-nav-context";
import { useContext } from "react";
import { getGroupNameById } from "../ManagerNavItems";
import { Dialog } from "radix-ui";

const MobileManagerNavHeader = () => {
  const { menuId, expanded, currentGroupId, setCurrentGroupId } =
    useContext(ManagerNavContext);

  const closeButton = (
    <Dialog.Close
      aria-controls={menuId}
      aria-expanded={expanded}
      aria-label="Zwiń menu nawigacyjne"
    >
      <FontAwesomeIcon icon={faX} aria-hidden />
    </Dialog.Close>
  );

  const backButton = (
    <button onClick={() => setCurrentGroupId(null)} aria-label="Zamknij grupę">
      <FontAwesomeIcon icon={faArrowLeft} aria-hidden />
    </button>
  );

  return (
    <div className={classes.header}>
      <div
        className={classes["header-content"]}
        data-state={!currentGroupId ? "open" : "closed"}
      >
        {closeButton}
      </div>
      <div
        className={classes["header-content"]}
        data-state={currentGroupId ? "open" : "closed"}
      >
        <>
          {backButton}
          {getGroupNameById(currentGroupId)}
        </>
      </div>
    </div>
  );
};

export default MobileManagerNavHeader;
