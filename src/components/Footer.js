import React from "react";
import {
  InstagramOutlined,
  FacebookOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";
import { Col, Row, Menu } from "antd";

function Footer() {
  const footerLeftMenuItem = [
    {
      label: "Contact",
      key: "contact",
    },
    {
      label: "Who's In The Cult?",
      key: "owl",
    },
    {
      label: "FAQ",
      key: "faq",
    },
    {
      label: "App Community Guidelines",
      key: "guidelines",
    },
    {
      label: "Privacy Policy",
      key: "helloPolis",
    },
  ];

  const footerRightMenuItem = [
    {
      label: <FacebookOutlined />,
      key: "fb",
    },
    {
      label: <InstagramOutlined />,
      key: "ig",
    },
    {
      label: <LinkedinOutlined />,
      key: "in",
    },
  ];

  return (
    <div className="container">
      <Row>
        <Col span={12}>
          <Menu mode="horizontal" items={footerLeftMenuItem} />
        </Col>
        <Col span={12} className="footerRight">
          <Menu mode="horizontal" items={footerRightMenuItem} />
        </Col>
      </Row>
    </div>
  );
}

export default Footer;
