import React, { useEffect, useState, useRef } from "react";
import { Draggable } from "gsap/all";
import gsap from "gsap";
import styled from "styled-components";

const CardComponent = props => {
  const Div = styled.div`
    ${!props.top ? "transform: rotate(" + props.angle + "deg) !important" : ""};
    z-index: ${props.zIndex};
    ${props.top ? "box-shadow: 5px 5px 5px 1px rgba(94, 94, 94, 0.4)" : null};
  `;

  const [show, setShow] = useState(true);
  const cardRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(Draggable);

    Draggable.create(cardRef.current, {
      type: "x,y",
      onDrag: function() {
        gsap.to(cardRef.current, 0.8, {
          rotationZ: this.deltaX * 1.2 + this.deltaY * 1,
          rotationX: this.deltaY * 0
        });
      },
      onRelease: function() {
        if (this.endX < window.innerWidth / 5) {
          gsap.to(cardRef.current, 0.8, { x: 0, y: 0, rotation: 0 });
        } else if (this.endX === undefined) {
          //do nothing
        } else {
          gsap
            .to(cardRef.current, 0.4, { x: window.innerWidth / 2 + 300 })
            .eventCallback("onComplete", () => setShow(false))
            .eventCallback("onComplete", () => props.onCardDelete());
        }
      }
    });
  }, [props.top]);

  useEffect(() => {
    if (props.nextClicked) {
      gsap
        .to(cardRef.current, 0.8, { x: window.innerWidth / 2 + 300 })
        .eventCallback("onComplete", () => {
          props.unsetNextClicked();
          props.onCardDelete();
        });
    }
  }, [props.nextClicked, show]);

  const handleMouseOver = e => {
    gsap.to(cardRef.current, 0.2, {
      scale: 1.1,
      transformPerspective: 800,
      rotationX: "-8deg",
      boxShadow: "15px 15px 10px 1px rgba(94, 94, 94, 0.4)"
    });
    gsap.to(cardRef.current, 0.8, {
      rotationX: 0,
      delay: 0.3
    });
  };

  const handleMouseLeave = e => {
    gsap.to(cardRef.current, 0.2, {
      // scale: 0.91,
      scale: 1.0,
      rotationX: 0,
      rotationZ: 0,
      boxShadow: "5px 5px 5px 1px rgba(94, 94, 94, 0.4)"
    });
  };

  return (
    show && (
      <Div
        className="card draggable"
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
        ref={cardRef}
      >
        <div className="quote" id={props.top ? "text" : null}>
          {props.text}
        </div>
        <div className="author" id={props.top ? "author" : null}>
          {props.author}
        </div>
      </Div>
    )
  );
};

export default CardComponent;
