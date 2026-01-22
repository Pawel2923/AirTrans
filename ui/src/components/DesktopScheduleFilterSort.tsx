import styles from "./DesktopScheduleFilterSort.module.css";

interface DesktopScheduleFilterSortProps {
  setIsFilterModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSortModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DesktopScheduleFilterSort = ({
  setIsFilterModalOpen,
  setIsSortModalOpen,
}: DesktopScheduleFilterSortProps) => {
  return (
    <div className={styles["desktop-filter-sort"]}>
      <button
        className="btn btn-primary"
        onClick={() => setIsFilterModalOpen(true)}
      >
        Filtruj
      </button>
      <button
        className="btn btn-primary"
        onClick={() => setIsSortModalOpen(true)}
      >
        Sortuj
      </button>
    </div>
  );
};

export default DesktopScheduleFilterSort;
