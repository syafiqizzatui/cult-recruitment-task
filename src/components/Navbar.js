import React, { useState } from "react";
import { UserOutlined, EditOutlined, LogoutOutlined } from "@ant-design/icons";
import { Drawer, Button, Menu, Avatar } from "antd";

function Navbar() {
  const leftMenuItem = [
    {
      label: "Find Job",
      key: "find",
    },
    {
      label: "Future List 2023",
      key: "future",
    },
    {
      label: "Resources",
      key: "resources",
    },
    {
      label: "Community",
      key: "community",
    },
  ];

  const rightMenuItem = [
    {
      label: ["Profile ", <Avatar shape="square" icon={<UserOutlined />} />],
      key: "app",
      children: [
        {
          label: "Edit Profile",
          key: "edit",
          icon: <EditOutlined />,
        },
        {
          label: "Logout",
          key: "logout",
          icon: <LogoutOutlined />,
        },
      ],
    },
  ];

  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <nav className="menuBar">
      <div className="logo">
        <img width={45} src="/images/logo.png" />
      </div>
      <div className="menuCon">
        <div className="leftMenu wrapMenu">
          <Menu mode="horizontal" items={leftMenuItem} />
        </div>
        <div className="rightMenu wrapMenu">
          <Menu
            mode="horizontal"
            items={rightMenuItem}
            style={{ flexDirection: "end" }}
          />
        </div>
        <Button className="barsMenu" type="primary" onClick={showDrawer}>
          <span className="barsBtn"></span>
        </Button>
        <Drawer placement="right" onClose={onClose} open={open}>
          <Menu mode="inline" items={leftMenuItem} />
          <Menu mode="inline" items={rightMenuItem} />
        </Drawer>
      </div>
    </nav>
  );
}

export default Navbar;
