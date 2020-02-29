import React, { useEffect } from "react";
// import "./styles-cards.css";
import CardComponent from "./components/CardComponent/CardComponent";
import data from "./data/quotes.json";

function App() {
  // const data = useState(null);
  console.log("Json lenght is: ", data.length, data[0]);

  let cards = [];

  //Load 10 random cards from JSON "data";

  for (let i = 0; i < 10; i++) {
    cards.push(data[Math.floor(Math.random() * data.length)]);
  }

  console.log(cards);

  useEffect(() => {
    // data =
  }, []);

  return (
    <div className="wrapper" id="quote-box">
      <div className="header">
        <div className="pause" />
        {/* <div href='#' class="theme"></div> */}
      </div>
      <div className="cards">
        <CardComponent
          text={cards[0].quoteText}
          author={cards[0].quoteAuthor}
        />
      </div>
      <div className="footer">
        <div href="http://facebook.com" className="facebook" />
        <div href="http://facebook.com" className="tumbler" />
        <div href="http://facebook.com" id="tweet-quote" className="twitter" />
        <div className="NEXT" id="new-quote" />
      </div>
    </div>
  );
}

export default App;
