import React from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu, } from 'antd';
const { Header, Content, Sider } = Layout;
import { Outlet, useNavigate, Link } from 'react-router-dom';
const icons = [UserOutlined, LaptopOutlined, NotificationOutlined];    
const menuTags = [
    { transportStation: 'Nhà xe' },
    { transport: 'Xe' }
];
const CRUD = [
    { read: 'Xem xe', path: 'transport-station/transport/read' },
    { read: 'Trạng thái đặt chỗ', path: 'transport-station/transport/transport-booking-method/read' },
    { read: 'Quản lí hành trình ', path: 'transport-station/transport/routes/read' },
];

const menuItem = icons.map((icon, index) => {
    const menuTag = menuTags[index] || {};
    const [key, label] = Object.entries(menuTag)[0] ;

    return {
        key: `sub${key}`,
        icon: React.createElement(icon),
        label: `${label}`,
        children: label === 'Xe' ? CRUD.map((crud, j) => {
            const subKey = index * 4 + j + 1;
            const [crudKey, crudLabel] = Object.entries(crud)[0];
            return {
                key: subKey,
                label: <Link to={`/${crud.path}`}>{crudLabel}</Link>,
            };
        }) : undefined,
    };
});

export default function Root() {
    return (
        <Layout className='w-full h-[1600px]'>
            <Header className='bg-white'>
                <div className='flex items-center mt-2 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]'>
                    <p className='font-semibold text-4xl inline'>vexere</p>
                </div>
            </Header>
            <Content className='h-full'>
                <Layout className='h-full'>
                    <Sider className=' h-full'>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            items={menuItem}
                            className='h-full'
                        />
                    </Sider>
                    <Content className='h-full'>
                        <Outlet />
                    </Content>
                </Layout>
            </Content>
        </Layout>
    );
}
