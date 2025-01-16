export const Card = ({ data, clickFunc }) => {
  return (
    <>
      {data ? (
        <div className="card" onClick={() => clickFunc(data.id)}>
          <h2 className="card__title">{data.name}</h2>
          <p>{data.id}</p>
          <img className="card__img" src={data.sprites.front_default} alt={data.name} />{" "}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};
