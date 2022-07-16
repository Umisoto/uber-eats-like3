import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

// containers
import {Restaurants} from "./containers/Restaurants";
import {Foods} from "./containers/Foods";
import {Orders} from "./containers/Orders";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/restaurants" element={<Restaurants />} />
        <Route path="/restaurants/:restaurantsId/foods" element={<Foods />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </Router>
  );
}

export default App;
