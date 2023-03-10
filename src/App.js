import React from "react";
import { Layout } from "antd";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import JobList from "./pages/JobList";
import Navbar from "./components/Navbar";
import FooterBar from "./components/Footer";

const { Header, Footer } = Layout;

function App() {
  return (
    <>
      <Layout>
        <Router>
          <Header className="mb-15">
            <div className="container">
              <Navbar />
            </div>
          </Header>
          <div className="container">
            <Routes>
              <Route exact path="/">
                <Route path="/" exact element={<JobList />} />
              </Route>
            </Routes>
          </div>
          <Footer>
            <FooterBar />
          </Footer>
        </Router>
      </Layout>
    </>
  );
}

export default App;
