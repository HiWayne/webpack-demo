import { getData } from "../../utils/common";
import "../../cartoon/index.less";
import cute_fencing from "public/images/cute_fencing.jpeg";
import cute_tom from "public/images/cute_tom.jpeg";
import cute_jerry from "public/images/cute_jerry.jpeg";
import bells from "public/images/bells.png";
import candle from "public/images/candle.png";
import candy from "public/images/candy.png";
import christmas_gift from "public/images/christmas_gift.png";
import christmas_tree from "public/images/christmas_tree.png";
import snowflake from "public/images/snowflake.png";
import snowman from "public/images/snowman.png";
import socks from "public/images/socks.png";

const images = [cute_fencing, cute_tom, cute_jerry];

const icons = [
  bells,
  candle,
  candy,
  christmas_gift,
  christmas_tree,
  snowflake,
  snowman,
  socks,
];

const Content = ({ name }) => {
  const value = getData();
  return (
    <section className="container">
      <div className="content">这是cartoon的{value}</div>
      <div>{name}</div>
      <p style={{ fontFamily: "keAi1", fontSize: "24px" }}>猫和老鼠</p>
      <p style={{ fontFamily: "keAi2", fontSize: "36px" }}> —— 汤姆和杰瑞</p>
      <p style={{ fontFamily: "keAi3", fontSize: "48px" }}>可可爱爱的朋友</p>
      <div className="flex-row mt-50">
        {images.map((image, index) => (
          <img key={index} className="image" src={image} />
        ))}
      </div>
      <div className="flex-row mt-50">
        {icons.map((icon, index) => (
          <img key={index} className="icon" src={icon} />
        ))}
      </div>
    </section>
  );
};

Content.getInitialProps = async (context) => {
  return { name: "test" };
};

export default Content;
