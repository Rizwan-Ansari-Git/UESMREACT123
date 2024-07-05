import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import './Sidebar.css'; // Import your CSS file for styling if needed

const { SubMenu } = Menu;

const sidebarItems = [
  {
    key: 'sub1',
    label: 'Dashboard',
    icon: <MailOutlined />,
    children: [
      {
        key: '1',
        label: 'Observed Malware Attacks',
        path: '/ObservedMalwareAttacks'
      },
      {
        key: '2',
        label: 'Device Control Dashboard',
        path: '/DeviceControlDashboard'
      },
      {
        key: '3',
        label: 'File Monitoring',
        path: '/FileMonitor'
      },
      {
        key: '4',
        label: 'View File Monitoring Policies',
        path: '/ViewFileMonitoringPolicies'
      },
    ],
  },
  {
    key: 'sub2',
    label: 'End Point Controls',
    icon: <AppstoreOutlined />,
    children: [

      {
        key: '7',
        label: 'Allow Application',
        path: '/AllowApplication'
      },
      {
        key: '8',
        label: 'Prevent Application',
        path: '/PreventApplication'
      },
      {
        key: '9',
        label: 'View WhiteList Application',
        path: '/ViewWhitelist'
      },
      {
        key: '10',
        label: 'Create File Monitoring Policy',
        path: '/CreateFileMonitoringPolicy'
      },
      {
        key: '11',
        label: 'Apply File Monitoring Policy',
        path: '/ApplyFileMonitoringPolicy'
      },

    ],
  },
  {
    key: 'sub3',
    label: 'Web Controls',
    icon: <SettingOutlined />,
    children: [
      {
        key: '14',
        label: 'Reported Application',
        path: '/ReportedApplication'
      },
      {
        key: '15',
        label: 'Quarantined Application List',
        path: '/QuarantinedApplicationList'
      },
      {
        key: '16',
        label: 'View Device',
        path: '/ViewDevice'
      },
    ],
  },

];

// const Sidebar = () => {
//   const [current, setCurrent] = useState('1');
//   const [collapsed, setCollapsed] = useState(false);

//   const onClick = (e) => {
//     console.log('click ', e);
//     setCurrent(e.key);
//   };

const Sidebar = () => {
  const [current, setCurrent] = useState('1');
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const onClick = (e) => {
    setCurrent(e.key);
    const selectedItem = sidebarItems
      .flatMap(item => item.children)
      .find(subItem => subItem.key === e.key);

    if (selectedItem) {
      document.title = selectedItem.label;
      navigate(selectedItem.path);
    }
  };


  return (
    <div className='row'>
     <div className='col-md-12'>
      <Menu
        onClick={onClick}
  defaultOpenKeys={['sub1']}
  selectedKeys={[current]}
  mode="inline"
  inlineCollapsed={collapsed}
  style={{ textDecoration: 'none' }}
      >
        {sidebarItems.map((item) => (
          <SubMenu key={item.key} icon={item.icon} title={item.label}>
            {item.children.map((subItem) => (
              <Menu.Item key={subItem.key}>
                <Link to={subItem.path}>{subItem.label}</Link>
              </Menu.Item>
            ))}
          </SubMenu>
        ))}
      </Menu>
      </div>
    </div>
  );
};

export default Sidebar;
