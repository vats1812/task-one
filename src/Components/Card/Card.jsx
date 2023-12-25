import React from "react";
import phone from "../../Assets/smartphone.png";
import tablet from "../../Assets/tablet.png";
import popularityImg from "../../Assets/popularity.png";
import "./Card.css";

function Card({ subcat, title, price, popularity }) {
  return (
    <>
      <div className="card-body">
        <img src={subcat === "mobile" ? phone : tablet} alt="phone" />
        <div className="title">
          {title.length > 15 ? title.substring(0, 20) + "..." : title}
        </div>
        <div className="price">₹{price}</div>
        <div className="popularity">
          <img src={popularityImg} alt="popularity" /> {popularity}
        </div>
      </div>
    </>
  );
}

export default Card;
