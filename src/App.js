import React, { useEffect, useState } from "react";
// import "./styles-cards.css";
import CardComponent from "./components/CardComponent/CardComponent";
import data from "./data/quotes.json";
import styled from "styled-components";

const Div = styled.div`
  @media (max-width: 800px) {
    .card {
      bottom: 10vh !important;
      #text {
        line-height: 25px;
        font-size: 1.2rem;
      }
    }
  }

  @media (max-width: 500px) {
    grid-template-columns: 0px 100% 0px;

    .card {
      width: 80% !important;
      /* width: 80vw !important; */
      height: 50vh !important;
      /* max-height: 50vh; */
      margin: 0;
      bottom: 0vh !important;
    }
  }
`;

function App() {
  let [cards, setCards] = useState([]);
  let [nextClicked, setNextClicked] = useState(false);
  let [currentQuote, setCurrentQuote] = useState("");
  let [currentAuthor, setCurrentAuthor] = useState("");

  //Load 10 random cards from JSON "data";
  // console.log("Cards before PUSH", cards);

  //Push new cards only when it's empty
  if (cards.length === 0) {
    for (let i = 0; i < 10; i++) {
      cards.push(data[Math.floor(Math.random() * data.length)]);
      cards[i].angle = (Math.random() * 2 - 1) * 15;
    }
    // console.log("Cards", cards);
  }

  useEffect(() => {
    // console.log("redrawn");
    currentQuote = setCurrentQuote(document.querySelector("#text").innerHTML);
    currentAuthor = setCurrentAuthor(
      document.querySelector("#author").innerHTML
    );
    console.log(currentQuote, currentAuthor);
  }, [cards, nextClicked]);

  const onCardDelete = () => {
    cards.pop();
    setCards([...cards]);
    console.log("Card deleted", cards);
  };

  const handleNextClicked = () => {
    console.log("handle Next called");
    setNextClicked(true);
  };

  const unsetNextClicked = () => {
    console.log("Unset Called");

    setNextClicked(false);
  };

  return (
    <Div className="wrapper" id="quote-box">
      <div className="header">
        <div className="pause" />
      </div>
      <div className="cards">
        {cards.map((card, i) => (
          <CardComponent
            key={i}
            text={cards[i].quoteText}
            author={cards[i].quoteAuthor}
            zIndex={i + 1}
            top={cards[i + 1] === undefined ? true : false}
            onCardDelete={onCardDelete}
            angle={cards[i].angle}
            nextClicked={nextClicked && cards[i + 1] === undefined}
            unsetNextClicked={unsetNextClicked}
          />
        ))}
      </div>
      <div className="footer">
        <div href="http://facebook.com" className="facebook" />
        <div href="http://facebook.com" className="tumbler" />
        <a
          href={`https://twitter.com/intent/tweet?text="${currentQuote}" - ${currentAuthor} `}
          target="_blank"
          id="tweet-quote"
          className="twitter"
        />
        <div className="NEXT" id="new-quote" onClick={handleNextClicked} />
      </div>
    </Div>
  );
}

export default App;
