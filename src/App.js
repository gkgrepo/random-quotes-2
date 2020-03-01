import React, { useEffect } from "react";
// import "./styles-cards.css";
import CardComponent from "./components/CardComponent/CardComponent";
import data from "./data/quotes.json";
import styled from "styled-components";

const Div = styled.div`
  @media (max-width: 500px) {
    grid-template-columns: 0px 100% 0px;

    .card {
      width: 80% !important;
      /* width: 80vw !important; */
      height: 50vh !important;
      /* max-height: 50vh; */
      margin: 0;
      bottom: 30vh;

      #text {
        line-height: 25px;
        font-size: 1.2rem;
      }
    }
  }

  @media (max-width: 800px) {
  }
`;

function App() {
  let cards = [];

  //Load 10 random cards from JSON "data";

  for (let i = 0; i < 10; i++) {
    cards.push(data[Math.floor(Math.random() * data.length)]);
  }

  useEffect(() => {
    // data =
  }, []);

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
          />
        ))}
      </div>
      <div className="footer">
        <div href="http://facebook.com" className="facebook" />
        <div href="http://facebook.com" className="tumbler" />
        <div href="http://facebook.com" id="tweet-quote" className="twitter" />
        <div className="NEXT" id="new-quote" />
      </div>
    </Div>
  );
}

export default App;
