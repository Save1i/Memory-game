import { useContext, useState } from "react";
import { LevelContext } from "./LevelContext";
import styles from "../App.module.css";

export const Levels = () => {
  const { setLevel } = useContext(LevelContext);
  const [isHidden, setIsHidden] = useState(false);

  const handleSelect = (level) => {
    setLevel(level);
    setIsHidden(true);
  };

  if (isHidden) return null; // Если уровень выбран, ничего не рендерим

  return (
    <div className={styles.levels}>
      <div className={styles.levels__inner}>
        <h2 className={styles.levels__title}>Choose a level</h2>
        <button className={styles.levels__btn} onClick={() => handleSelect(6)}>
          Easily
        </button>
        <button className={styles.levels__btn} onClick={() => handleSelect(12)}>
          Normal
        </button>
        <button className={styles.levels__btn} onClick={() => handleSelect(18)}>
          Impossible
        </button>
      </div>
    </div>
  );
};
