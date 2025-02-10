import styles from "./App.module.css";
import React, { useState, useEffect, useCallback, useRef, useContext } from "react";
import { Card } from "./components/Card";
import { Score } from "./components/Score";
import { Levels } from "./components/Levels";
import { LevelContext } from "./components/LevelContext";

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const numArr = useRef([]);
  const clickArr = useRef([]);
  const [clickState, setClickState] = useState(null);
  const [score, setScore] = useState(0);
  const bestScore = useRef(0);

  const { level } = useContext(LevelContext);

  const randNum = useCallback(() => {
    if (numArr.current.length >= level) {
      return null;
    }

    let id;
    do {
      id = Math.floor(Math.random() * level) + 1;
    } while (numArr.current.includes(id));

    numArr.current.push(id);
    return id;
  }, [level]);

  useEffect(() => {
    const fetchData = async () => {
      const tempData = [];

      while (tempData.length < level) {
        const id = randNum();

        if (id === null) break;
        try {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
          if (!response.ok) throw new Error("Failed to fetch");
          const result = await response.json();
          tempData.push(result);
        } catch (error) {
          console.error("Error fetching data:", error);
          break;
        }
      }
      setData(tempData);
      setLoading(false);
    };

    fetchData();
  }, [randNum, clickState, level]);

  function setBestScore() {
    if (clickArr.current.length > bestScore.current) {
      bestScore.current = clickArr.current.length;
    }
  }

  const handleClik = (id) => {
    if (!clickArr.current.includes(id)) {
      clickArr.current.push(id);
      numArr.current = [];
      setClickState(id);
      setScore(clickArr.current.length);
    } else {
      setBestScore();
      numArr.current = [];
      setClickState(id + 1);
      setScore(0);
      clickArr.current = [];
    }

    console.log(clickArr);
    console.log(numArr);
  };

  if (level === 0) return <Levels />;

  return (
    <div className={styles.main}>
      <Score nowScore={score} bestScore={bestScore.current} />

      <div className={styles.cards}>
        <div className={styles.cards__contain}>
          {loading ? (
            <p>Loading...</p>
          ) : (
            data.map((el) => <Card key={el.id} data={el} clickFunc={() => handleClik(el.id)} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
