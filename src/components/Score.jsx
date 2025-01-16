import styles from "./score.module.css";

export const Score = ({ nowScore, bestScore }) => {
  return (
    <div className={styles.score}>
      <div className={styles.score__title}>
        <h2 className={styles.title}>Pokemon Memory Game</h2>
        <p className={styles.text}>
          Get points by clicking on an image but don't click on any more than once!
        </p>
      </div>
      <div className={styles.score__container}>
        <p className={styles.score__now}>Score: {nowScore}</p>
        <p className={styles.score__best}>Best score: {bestScore}</p>
      </div>
    </div>
  );
};
