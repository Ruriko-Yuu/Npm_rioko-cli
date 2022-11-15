import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import config from "./router.conf";
import { Component } from "react";
const render = (config: any[]) => {
  return config.map((item, index) => {
    return (
      <Route
        key={index}
        // exact
        path={item.path}
        element={
          <>
            {item.element.type !== void 0 ? item.element : <item.element/>}
          </>
        }
      >
        {item.children ? render(item.children) : ""}
      </Route>
    );
  });
};
class MainRoute extends Component {
  render() {
    return (
      <>
        <BrowserRouter>
          <Routes>
            {render(config)}
            <Route path="*" element={404} />
          </Routes>
        </BrowserRouter>
        {/* <KanbanGirl /> */}
      </>
    );
  }
  componentDidMount() {
    console.log('componentDidMount:',this);
  }
}
export default MainRoute;