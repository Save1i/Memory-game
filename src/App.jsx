import styles from "./App.module.css";
import React, { useState, useEffect, useCallback, useRef, useContext } from "react";
import { Card } from "./components/Card";
import { Score } from "./components/Score";
import { Levels } from "./components/Levels";
import { LevelContext } from "./components/LevelContext";

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const numArr = useRef(new Set());
  const clickArr = useRef(new Set());
  const [score, setScore] = useState(0);
  const bestScore = useRef(0);
  const [load, setLoad] = useState(true);

  const { level } = useContext(LevelContext);

  const randNum = useCallback(() => {
    if (numArr.current.length >= level) {
      return null;
    }

    let id;

    do {
      id = Math.floor(Math.random() * level) + 1;
    } while (numArr.current.has(id));

    numArr.current.add(id);
    return id;
  }, [level]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const tempData = [];

    numArr.current.clear(); // отчистка

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
    setTimeout(() => {
      setLoad(false);
    }, 500);

    setData(tempData);
    setLoading(false);
  }, [randNum, level]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  function setBestScore() {
    if (clickArr.current.size > bestScore.current) {
      bestScore.current = clickArr.current.size;
    }
  }

  const handleClik = (id) => {
    if (!clickArr.current.has(id) && !load) {
      clickArr.current.add(id);
      setScore(clickArr.current.size);
      setLoad(true);
    } else {
      setBestScore();
      setScore(0);
      clickArr.current.clear();
    }

    setLoad(true);
    fetchData();
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
