import React, { useState } from "react";
import {
  UserOutlined,
  EditOutlined,
  LogoutOutlined,
  MenuOutlined,
} from "@ant-design/icons";
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
    <nav className="menubar">
      <div className="logo">
        <img width={48} src="/images/logo.png" />
      </div>
      <div className="menu-con">
        <div className="left-menu wrap-menu">
          <Menu mode="horizontal" items={leftMenuItem} />
        </div>
        <div className="right-menu wrap-menu">
          <Menu
            mode="horizontal"
            items={rightMenuItem}
            style={{ flexDirection: "end" }}
          />
        </div>
        <Button className="mobile-menu-drawer" onClick={showDrawer}>
          <MenuOutlined />
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
