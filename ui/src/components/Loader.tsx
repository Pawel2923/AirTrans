import { faPlaneUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./Loader.module.css";

interface LoaderProps {
  style?: React.CSSProperties;
  className?: string;
  loadingText?: string;
}

const Loader = ({ style, className, loadingText }: LoaderProps) => {
  return (
    <div
      className={`${classes.loading}${className ? ` ${className}` : ""}`}
      style={style}
    >
      {loadingText && <p>{loadingText}</p>}
      <div className={`${classes.spinner}`}>
        <div className={classes.loader}></div>
        <FontAwesomeIcon icon={faPlaneUp} className={classes.plane} />
      </div>
    </div>
  );
};

export default Loader;