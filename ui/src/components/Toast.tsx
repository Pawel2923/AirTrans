import React, { useState, useEffect, CSSProperties, useCallback } from "react";
import classes from "./Toast.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition, faTimes } from "@fortawesome/free-solid-svg-icons";

interface ToastProps {
  message: string;
  onClose: () => void;
  type?: "primary" | "alt" | "warning" | "danger";
  icon?: IconDefinition;
  action?: {
    label: string;
    onClick: () => void;
  };
  timeout?: number;
}

const slideOutAnimation: CSSProperties = {
  animation: `${classes.slideOut} 0.5s forwards`,
};

const Toast: React.FC<ToastProps> = ({
  message,
  onClose,
  type,
  icon,
  action,
  timeout = 5000,
}: ToastProps) => {
  const [open, setOpen] = useState<boolean>(true);
  const [styles, setStyles] = useState<CSSProperties>({});

  const closeHandler = useCallback(async () => {
    await new Promise((resolve) => {
      setStyles(slideOutAnimation);
      setTimeout(() => {
        setOpen(false);
        resolve(true);
      }, 500);
    })
      .then(() => {
        setStyles({});
      })
      .finally(() => {
        onClose();
      });
  }, [onClose]);

  useEffect(() => {
    const timer = setTimeout(() => {
      closeHandler();
    }, timeout);

    return () => {
      clearTimeout(timer);
    };
  }, [closeHandler, timeout]);

  const animationDuration = timeout ? `${timeout}ms` : "5s";

  return (
    open && (
      <div className={classes.toast} style={styles}>
        <div
          className={`${classes["toast-container"]} ${
            type ? classes[type] : ""
          }`}
        >
          <div className={classes["toast-body"]}>
            {icon && <FontAwesomeIcon icon={icon} />}
            <p>{message}</p>
            {action && (
              <button
                className={`btn ${
                  type ? `btn-outline-${type}` : ""
                } ${classes["toast-btn"]}`}
                onClick={action.onClick}
              >
                {action.label}
              </button>
            )}
            <span className={classes.close} onClick={closeHandler}>
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </div>
          <div
            className={classes["progress-bar"]}
            style={{ animationDuration: animationDuration }}
          ></div>
        </div>
      </div>
    )
  );
};

export default Toast;
