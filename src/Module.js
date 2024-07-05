import React from 'react';
import { Menu } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { SubMenu } = Menu;

// Example data structure
const data = [
    {
        "username": "Pooja",
        "projectName": "TSS",
        "modules": [
            {
                "name": "Application Whitelisting",
                "submodules": [
                    { "name": "SetMode" },
                    { "name": "View Mode" }
                ]
            },
            {
                "name": "Application Blacklisting",
                "submodules": [
                    { "name": "SetModeBlacklist" }
                ]
            }
        ]
    },
    {
        "username": "Pariii",
        "projectName": "TSS",
        "modules": [
            {
                "name": "Application Whitelisting",
                "submodules": [
                    { "name": "SetMode" },
                    { "name": "View Mode" }
                ]
            },
            {
                "name": "Application Blacklisting",
                "submodules": [
                    { "name": "SetModeBlacklist" }
                ]
            }
        ]
    },
    {
        "username": "Pankaj",
        "projectName": "EDR",
        "modules": [
            {
                "name": "Dashboard",
                "submodules": [
                    { "name": "EDRDashboard" }
                ]
            }
        ]
    },
    {
        "username": "Pari",
        "projectName": "EDR",
        "modules": [
            {
                "name": "Dashboard",
                "submodules": [
                    { "name": "EDRDashboard" }
                ]
            }
        ]
    }
];

const Module = () => {
  // Retrieve username from localStorage
  const username = localStorage.getItem('username'); // Assuming the key is 'username'

  // Filter data based on the username
  const filteredProjects = data.filter(project => project.username === username);

  const renderMenuItems = (projects) =>
    projects.map((project, index) => (
      <Menu.Item key={`project-${index}`} icon={<MailOutlined />}>
        <Link to={`/project/${index}`}>{project.projectName}</Link>
      </Menu.Item>
    ));

  return (
    <Menu
      style={{ width: 256 }}
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
    >
      {renderMenuItems(filteredProjects)}
    </Menu>
  );
};

export default Module;
