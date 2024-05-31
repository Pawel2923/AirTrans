import React from "react";
import { Gates } from "../assets/Data";
import styles from "./tabelkaGates.module.css";

type GatesTableProps = {
  gates: Gates[];
  onEdit: (gate: Gates) => void;
  onDelete: (id: number) => void;
};

const TabelkaGates: React.FC<GatesTableProps> = ({
  gates,
  onDelete,
  onEdit,
}) => {
  const handleEditClick = (gate: Gates) => {
    onEdit(gate);
  };
  return (
    <div className={styles.container}>
      {gates.map((gate) => (
        <div key={gate.id} className={styles.gateCard}>
          <div className={styles.gateName}>{gate.name}</div>
          <div className={styles.gateId}>ID: {gate.id}</div>
          <div className={styles.gateStatus}>Status: {gate.status}</div>
          <hr className={styles.separator} />
          <div className={styles.actions}>
            <button
              className="btn btn-primary me-3"
              onClick={() => handleEditClick(gate)}
            >
              Edytuj
            </button>
            <button
              className="btn btn-danger"
              onClick={() => onDelete(gate.id ?? 0)}
            >
              Usuń
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TabelkaGates;
