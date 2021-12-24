import { getData } from "../../utils/common";
// import "../../index.less";

const Content = () => {
  const value = getData();
  return <div>search。{value}</div>;
};

export default Content;
