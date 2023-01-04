import React from "react";
import { Layout } from "antd";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import JobList from "./pages/JobList";
import Navbar from "./components/Navbar";
import FooterBar from "./components/Footer";

const { Header, Footer, Sider, Content } = Layout;

function App() {
  return (
    <>
      <Layout>
        <Router>
          <Header>
            <div className="container">
              <Navbar />
            </div>
          </Header>
          <div className="container">
            <Layout className="main">
              <Sider width={250}></Sider>
              <Content className="content-main">
                <Routes>
                  <Route exact path="/">
                    <Route path="/" exact element={<JobList />} />
                  </Route>
                </Routes>
              </Content>
            </Layout>
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
