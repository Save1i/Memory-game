import "./App.css";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { Card } from "./components/Card";

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const numArr = useRef([]);
  const clickArr = useRef([]);
  const [clickState, setClickState] = useState(null);
  const [score, setScore] = useState(0);
  const bestScore = useRef(0);

  const randNum = useCallback(() => {
    let id;
    do {
      id = Math.floor(Math.random() * 6) + 1;
    } while (numArr.current.includes(id) && numArr.current.length < 6);
    numArr.current.push(id);
    return id;
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      const tempData = [];

      while (tempData.length < 6) {
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
  }, [randNum, clickState]);

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

  return (
    <div>
      <div>
        <p>{score}</p>
        <p>{bestScore.current}</p>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        data.map((el) => <Card key={el.id} data={el} clickFunc={() => handleClik(el.id)} />)
      )}
    </div>
  );
};

export default App;
