import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Space, Button, Popconfirm, Input, Tag, Modal } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {  Link } from 'react-router-dom';


export default function TranspostRead() {
    const [routeData, setRouteData] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedRoute, setSelectedRoute] = useState(null);
    useEffect(() => {
        let isMounted = true;

        axios.get('http://localhost:4000/api/v1/transports/routes/')
            .then(response => {
                if (isMounted) {
                    const data = response.data;
                    if (data.success) {
                        console.log(data.Routes)
                        setRouteData(data.Routes);
                        toast.success('🦄 Tải dữ liệu thành công!', {
                            position: "bottom-right",
                            autoClose: 5000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                        });
                    } else {
                        toast.error('🦄 Tải dữ liệu không thành công!', {
                            position: "bottom-right",
                            autoClose: 5000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                        });
                    }
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                toast.error("Đã có lỗi xảy ra khi tải dữ liệu!");
            });

        return () => {
            isMounted = false;
        };
    }, []);

    const handleEdit = (record) => {
        // Handle edit action
        console.log('Edit:', record);
    };

    const handleDelete = (record) => {
        // Handle delete action
        console.log('Delete:', record);
    };
    const handleDetail = (record) => {
        setSelectedRoute(record);
        setIsModalVisible(true);
    };

    const handleModalClose = () => {
        setIsModalVisible(false);
        setSelectedRoute(null);
    };

    const columns = [
        {
            title: 'STT',
            dataIndex: '_id',
            key: 'id',
            render: (text, record, index) => index + 1,
        },
        {
            title: 'Tên xe',
            dataIndex: ['transportId', 'name'],
            key: 'transportName',
            render: (text, record) => text
        },
        {
            title: 'Địa điểm khởi hành',
            dataIndex: ['departureLocation', 'Name'],
            key: 'departureLocation',
        },
        {
            title: 'Địa điểm đến',
            dataIndex: ['destination', 'Name'],
            key: 'destination',

        },
        {
            title: 'Ngày khởi hành',
            dataIndex: 'departureDate',
            key: 'departureDate',
            render: date => new Date(date).toLocaleString(),
        },
        {
            title: 'Ngày trở về',
            dataIndex: 'returnDate',
            key: 'returnDate',
            render: date => new Date(date).toLocaleString(),
        },
        {
            title: 'Điểm đón / trả',
            key: 'detail',
            render: (text, record) => (
                <Tag type="primary" color="cyan" onClick={() => handleDetail(record)}>Xem chi tiết</Tag>
            ),
        },
        {
            title: 'Thao tác',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Button type="primary" icon={<EditOutlined />} onClick={() => handleEdit(record)}>Sửa</Button>
                    <Popconfirm
                        title="Bạn có chắc chắn muốn xoá?"
                        onConfirm={() => handleDelete(record)}
                        okText="Xoá"
                        cancelText="Hủy"
                    >
                        <Button type="danger" icon={<DeleteOutlined />}>Xoá</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div className='mx-[10px] my-[10px]'>
            <div className='flex justify-between items-center'>
                <h1 className='text-xl font-bold mx-[20px] my-[20px]'>Quản lí Hành trình</h1>
                <div className='flex gap-2 items-center'>
                    <div className='border border-sky-500 rounded-sm px-7 py-2'>
                        <Link to="/transport-station/transport/routes/create" className='text-sky-500 font-semibold'>Thêm mới</Link>

                    </div>
                    <div className='border border-red-300 rounded-sm px-7 py-2'>
                        <p className='text-red-500 font-semibold'>Xoá hoàn loạt</p>
                    </div>
                </div>
            </div>
            <div className='w-full bg-white px-2 py-3 rounded-sm my-2'>
                <div className='flex items-center justify-between '>
                    <div className='flex gap-2'>
                        <Input className='p-1 rounded-sm' placeholder="Tìm kiếm"></Input>
                        <Input className='p-1 rounded-sm' placeholder="Tìm kiếm"></Input>
                    </div>
                    <div className='flex gap-2'>
                        <Button type='primary' className='p-4'>Tìm kiếm</Button>
                        <Button type='primary' className='p-4' danger>Tìm kiếm</Button>
                    </div>
                </div>
            </div>
            <div className='bg-white rounded-md'>
                
                    {routeData && (
                    <Table columns={columns} dataSource={routeData} rowKey="_id" className="table-striped-rows"/>
                    )}
                
                <ToastContainer />
            </div>  
            <Modal
                title="Chi tiết hành trình"
                open={isModalVisible}
                onCancel={handleModalClose}
                footer={[
                    <Button key="back" onClick={handleModalClose}>
                        Đóng
                    </Button>
                ]}
            >
                {selectedRoute && (
                    <div>
                        <p><strong>Thời gian đi:</strong> {new Date(selectedRoute.departureDate).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })} {new Date(selectedRoute.departureDate).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}</p>
                        <p><strong>Thời gian đón:</strong> {new Date(selectedRoute.pickUpPointTime).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })} {new Date(selectedRoute.pickUpPointTime).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}</p>
                        <p><strong>Điểm đón:</strong> {selectedRoute.pickUpPoint}</p>
                        <p><strong>Điểm trả:</strong> {selectedRoute.dropOffPoint}</p>
                    </div>
                )}
            </Modal>
        </div>

    );
}
