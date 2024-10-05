import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Space, Button, Popconfirm, Input, Tag  } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function TranspostRead() {
    const [transportBookingMethods, setTransportBookingMethods] = useState([]);

    useEffect(() => {
        let isMounted = true; 

        axios.get('http://localhost:4000/api/v1/transports/bookingmethods/transportBookingMethods/')
            .then(response => {
                if (isMounted) { 
                    const data = response.data;
                    if (data.success) {
                        setTransportBookingMethods(data.TransportBookingMethods);
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
            
        },
        {
            title: 'Trạng thái booking',
            dataIndex: ['bookingMethodId', 'method'],
            key: 'bookingMethod',
            render: bookingMethod => (
                <Tag color={bookingMethod === 'Gọi để xác nhận' ? 'magenta' : 'blue'}>
                    {bookingMethod}
                </Tag>
            )
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
                <h1 className='text-xl font-bold mx-[20px] my-[20px]'>Quản lí trạng thái đặt chỗ</h1>
                <div className='flex gap-2 items-center'>
                    <div className='border border-sky-500 rounded-sm px-7 py-2'>
                        <p className='text-sky-500 font-semibold'>Thêm mới</p>
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
                <Table columns={columns} dataSource={transportBookingMethods} rowKey="_id" className="table-striped-rows"/>
                <ToastContainer />
            </div>
        </div>
    );
}
