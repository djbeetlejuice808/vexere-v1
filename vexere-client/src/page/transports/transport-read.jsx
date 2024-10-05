import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import axios from 'axios';
import { Table, Tag, Space, Button, Popconfirm, Input } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function TranspostRead() {


    const [transports, setTransports] = useState([]);

    useEffect(() => {
        let isMounted = true; 

        axios.get('http://localhost:4000/api/v1/transports/')
            .then(response => {
                if (isMounted) {
                    const data = response.data;
                    if (data.success) {
                        setTransports(data.transport);
                        toast.success('🦄 Tải dữ liệu thành công !', {
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
                        toast.error('🦄Tải dữ liệu không thành công!', {
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
                toast.error("Đã có lỗi xảy ra khi tải dữ liệu !");
            });

        return () => {
            isMounted = false; 
        };
    }, []); 


    const columns = [
        {
            title: 'STT',
            dataIndex: '_id',
            key: 'id',
            render: (text, record, index) => index + 1,
        },
        {
            title: 'Tên xe',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Chỗ ngồi',
            dataIndex: 'seats',
            key: 'seats',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: status => (
                <Tag color={status === 'Chưa được thông qua' ? 'red' : 'green'}>
                    {status}
                </Tag>
            ),
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: createdAt => new Date(createdAt).toLocaleDateString(),
        },
        {
            title: 'Hình xe',
            dataIndex: 'images',
            key: 'images',
            render: images => (
                <Space>
                    {images.map((image, index) => (
                        <img
                            key={index}
                            src={`http://localhost:4000/api/v1/images/${image.path}`}
                            alt={`Transport Image ${index + 1}`}
                            style={{ width: '50px', height: 'auto' }}
                        />
                    ))}
                </Space>
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

    const handleEdit = (record) => {
        console.log('Edit:', record);
    };

    const handleDelete = (record) => {
        console.log('Delete:', record);
    };

    return (
        <div className='mx-[10px] my-[10px]'>
            <div className='flex justify-between items-center'>
                <h1 className='text-xl font-bold mx-[20px] my-[20px]'>Quản lí thông tin xe</h1>
                <div className='flex gap-2 items-center'>
                    <div className=' border border-sky-500 rounded-sm px-7 py-2'>
                        <p className='text-sky-500 font-semibold'>Thêm mới</p>

                    </div>
                    <div className=' border border-red-300 rounded-sm px-7 py-2'>
                        <p className='text-red-500 font-semibold'>Xoá hoàn loạt</p>
                    </div>
                </div>
            </div>
            <div className='w-full bg-white px-2 py-3 rounded-sm my-2'>
                <div className='flex items-center justify-between '>
                    <div className='flex gap-2'>
                        <Input className='p-1 rounded-sm'></Input>
                        <Input className='p-1 rounded-sm'></Input>
                    </div>
                    <div className='flex gap-2'>
                        <Button type='primary' className='p-4'>Tìm kiếm</Button>
                        <Button type='primary' className='p-4' danger>Tìm kiếm</Button>
                    </div>
                </div>
            </div>
            <div className=' bg-white rounded-md'>
                
                <Table columns={columns} dataSource={transports} rowKey="_id" className="table-striped-rows"/>
                <ToastContainer />
            </div>
            
        </div>
    );
}
