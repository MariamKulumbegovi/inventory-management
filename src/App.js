import { Switch, Route } from "react-router-dom";
import "./App.css";
import { AddNewItem } from "./Pages/AddNewItem/AddNewItem";
import { HomePage } from "./Pages/HomePage/HomePage";
import * as path from "./constants/paths";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path={path.HOME_PATH} component={HomePage} />
        <Route path={path.ADD_PATH} component={AddNewItem} />
      </Switch>
    </div>
  );
}

export default App;
