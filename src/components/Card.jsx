import styles from "./card.module.css";

export const Card = ({ data, clickFunc }) => {
  return (
    <>
      {data ? (
        <div className={styles.card} onClick={() => clickFunc(data.id)}>
          <h2 className={styles.card__title}>{data.name}</h2>
          <img className={styles.card__img} src={data.sprites.front_default} alt={data.name} />{" "}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};
