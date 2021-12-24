import ReactDom from "react-dom";
import { getData } from "../utils/common";
// import './index.css'

const Content = () => {
  const value = getData();
  return <div>search。{value}</div>;
};

export default Content;

ReactDom.render(<Content />, document.querySelector("#app"));
