import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import JobList from "./pages/JobList";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/">
          <Route path="/" exact element={<JobList />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
