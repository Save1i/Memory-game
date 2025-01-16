export const Score = ({ nowScore, bestScore }) => {
  return (
    <div className="score">
      <p className="score__now">{nowScore}</p>
      <p className="score__best">{bestScore}</p>
    </div>
  );
};
