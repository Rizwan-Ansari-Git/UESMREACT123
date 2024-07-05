import React from 'react';
import { Menu } from 'antd';
import {
  AppstoreOutlined,
  CalendarOutlined,
  LinkOutlined,
  MailOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { SubMenu } = Menu;

const items = [
  {
    key: '1',
    icon: <MailOutlined />,
    label: 'EDR',
    link: '/EDR_Dashboard',
  },
  {
    key: '2',
    icon: <CalendarOutlined />,
    label: 'TSS',
    link: '/TSS_Dashboard',
  },
  // {
  //   key: 'sub1',
  //   label: 'Navigation Two',
  //   icon: <AppstoreOutlined />,
  //   children: [
  //     {
  //       key: '3',
  //       label: 'Option 3',
  //       link: '/option-3',
  //     },
  //     {
  //       key: '4',
  //       label: 'Option 4',
  //       link: '/option-4',
  //     },
  //     {
  //       key: 'sub1-2',
  //       label: 'Submenu',
  //       children: [
  //         {
  //           key: '5',
  //           label: 'Option 5',
  //           link: '/option-5',
  //         },
  //         {
  //           key: '6',
  //           label: 'Option 6',
  //           link: '/option-6',
  //         },
  //       ],
  //     },

      
  //   ],
  // },
  // {
  //   key: 'sub2',
  //   label: 'Navigation Three',
  //   icon: <SettingOutlined />,
  //   children: [
  //     {
  //       key: '7',
  //       label: 'Option 7',
  //       link: '/option-7',
  //     },
  //     {
  //       key: '8',
  //       label: 'Option 8',
  //       link: '/option-8',
  //     },
  //     {
  //       key: '9',
  //       label: 'Option 9',
  //       link: '/option-9',
  //     },
  //     {
  //       key: '10',
  //       label: 'Option 10',
  //       link: '/option-10',
  //     },
  //   ],
  // },
  // {
  //   key: 'link',
  //   icon: <LinkOutlined />,
  //   label: (
  //     <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
  //       Ant Design
  //     </a>
  //   ),
  // },


];

const UESM_Sidebar = () => {
  const renderMenuItems = (menuData) =>
    menuData.map((item) => {
      if (item.children) {
        return (
          <SubMenu key={item.key} icon={item.icon} title={item.label}>
            {renderMenuItems(item.children)}
          </SubMenu>
        );
      }
      return (
        <Menu.Item key={item.key} icon={item.icon}>
          <Link to={item.link}>{item.label}</Link>
        </Menu.Item>
      );
    });

  return (
    <Menu
      style={{ width: 256 }}
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
    >
      {renderMenuItems(items)}
    </Menu>
  );
};

export default UESM_Sidebar;
