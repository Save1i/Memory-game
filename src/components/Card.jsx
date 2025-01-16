export const Card = ({ data, clickFunc }) => {
  return (
    <div>
      {data ? (
        <div onClick={() => clickFunc(data.id)}>
          <h2>{data.name}</h2>
          <p>{data.id}</p>
          <img src={data.sprites.front_default} alt={data.name} />{" "}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
