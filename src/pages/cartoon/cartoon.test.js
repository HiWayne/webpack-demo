import renderer from "react-test-renderer";
import Cartoon from "./index";

test("Cartoon", () => {
  const component = renderer.create(<Cartoon />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  //   // manually trigger the callback
  //   tree.props.onMouseEnter();
  //   // re-rendering
  //   tree = component.toJSON();
  //   expect(tree).toMatchSnapshot();

  //   // manually trigger the callback
  //   tree.props.onMouseLeave();
  //   // re-rendering
  //   tree = component.toJSON();
  //   expect(tree).toMatchSnapshot();
});
