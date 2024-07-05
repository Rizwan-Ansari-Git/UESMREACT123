
import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { Link, useNavigate } from 'react-router-dom';


const { SubMenu } = Menu;

const sidebarItems = [
  {
    key: 'sub1',
    label: 'Application Whitelisting',
    icon: <MailOutlined />,
    children: [
      {
        key: '1',
        label: 'Set Mode',
        path: '/SetMode'
      },
      {
        key: '2',
        label: 'View Mode',
        path: '/DeviceControlDashboard'
      },
      {
        key: '3',
        label: 'Add Application',
        path: '/FileMonitor'
      },
      {
        key: '4',
        label: 'View Application',
        path: '/ViewFileMonitoringPolicies'
      },

      {
        key: '5',
        label: 'Prevent Application Report',
        path: '/ViewFileMonitoringPolicies'
      },

      {
        key: '6',
        label: 'App Inventory',
        path: '/ViewFileMonitoringPolicies'
      },

      {
        key: '7',
        label: 'Create Policy',
        path: '/ViewFileMonitoringPolicies'
      },

      {
        key: '8',
        label: 'Policy List',
        path: '/ViewFileMonitoringPolicies'
      },

      {
        key: '9',
        label: 'Apply Policy',
        path: '/ViewFileMonitoringPolicies'
      },

      {
        key: '10',
        label: 'Policy Status',
        path: '/ViewFileMonitoringPolicies'
      },

      {
        key: '11',
        label: 'TIP Inventory',
        path: '/ViewFileMonitoringPolicies'
      },
    ],
  },
  {
    key: 'sub2',
    label: 'Application Blacklisting',
    icon: <AppstoreOutlined />,
    children: [

      {
        key: '1',
        label: 'Add Application',
        path: '/AllowApplication'
      },
      {
        key: '2',
        label: 'View Application',
        path: '/PreventApplication'
      },
      {
        key: '3',
        label: 'Prevented Application Application',
        path: '/ViewWhitelist'
      },
    ],
  },
  {
    key: 'sub3',
    label: 'Full HDD Encryption',
    icon: <SettingOutlined />,
    children: [
      {
        key: '1',
        label: 'Add Drive Encryption',
        path: '/ReportedApplication'
      },
      {
        key: '2',
        label: 'Live ATM Config',
        path: '/QuarantinedApplicationList'
      },
      {
        key: '3',
        label: 'Replacement Config',
        path: '/ViewDevice'
      },
      {
        key: '4',
        label: 'FHDE Key Recovery',
        path: '/ViewDevice'
      },
      {
        key: '5',
        label: 'Create Scheduler',
        path: '/ViewDevice'
      },
      {
        key: '6',
        label: 'Apply Scheduler',
        path: '/ViewDevice'
      },
      {
        key: '7',
        label: 'Disable Scheduler',
        path: '/ViewDevice'
      },
      {
        key: '8',
        label: 'View Scheduler',
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

const TSS_SIDEBAR = () => {
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

export default TSS_SIDEBAR;
