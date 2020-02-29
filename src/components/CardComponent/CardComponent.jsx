import React, { useEffect, useState } from "react";
import { Draggable } from "gsap/all";
import gsap from "gsap";
import styled from "styled-components";

const Div = styled.div`
  @media (max-width: 500px) {
    /* border: 2px solid red !important; */
    width: 80vw !important;
    height: auto !important;
    max-height: 60vh;

    #text {
      font-size: 1.2rem;
    }
  }
`;

const CardComponent = props => {
  const [show, setShow] = useState(true);
  useEffect(() => {
    gsap.registerPlugin(Draggable);
    Draggable.create(".draggable", {
      type: "x,y",
      onPress: function() {
        //  alert("clicked");
      },
      onDrag: function() {
        gsap.to(".draggable", 0.8, {
          //   tranformOrigin: "bottom 50%",
          rotationZ: this.deltaX * 1.2 + this.deltaY * 1,
          rotationX: this.deltaY * 0
        });
      },
      onRelease: function() {
        if (this.endX < window.innerWidth / 3) {
          //   gsap.to(".draggable", 0.4, {
          //     tranformOrigin: "top left",
          //     rotationX: 0,
          //     rotationY: 0,
          //     rotationZ: 0
          //   });
          gsap.to(".draggable", 0.8, { x: 0, y: 0, rotation: 0 });
        } else {
          gsap
            .to(".draggable", 3.4, { x: 4500 })
            .eventCallback("onComplete", () => setShow(false));
        }
      }
    });
  }, []);

  const handleMouseOver = e => {
    gsap.to(".draggable", 0.2, {
      scale: 1.1,
      transformPerspective: 800,
      rotationX: "-8deg",
      boxShadow: "15px 15px 10px 1px rgba(94, 94, 94, 0.8)"
    });
    gsap.to(".draggable", 0.8, {
      rotationX: 0,
      delay: 0.3
    });
  };

  const handleMouseLeave = e => {
    gsap.to(".draggable", 0.2, {
      scale: 0.91,
      rotationX: 0,
      rotationZ: 0,
      boxShadow: "5px 5px 5px 1px rgba(94, 94, 94, 0.8)"
    });
  };

  //   render() {
  return (
    show && (
      <Div
        className="card draggable"
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
      >
        <div className="quote" id="text">
          {/* We can only learn to love by loving. */}
          {props.text}
        </div>
        <div className="author" id="author">
          {/* Iris Murdoch */}
          {props.author}
        </div>
      </Div>
    )
  );
  //   }
};

export default CardComponent;
