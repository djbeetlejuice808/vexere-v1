import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Input, Button, Divider, Select } from 'antd';
import FileUploader from "../../component/upload";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function TransportRead() {
    const [brands, setBrands] = useState([]);
    const [transportsType, setTransportType] = useState([]);
    const [transportData, setTransportData] = useState({
        name: '',
        seats: '',
        transportStationId: '668ee9272c1bb889df82b34b',
        transportTypeId: '',
        brandId: '',
    });
    const [fileList, setFileList] = useState([]);

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/v1/transports/brands');
                setBrands(response.data.brand);
            } catch (error) {
                console.error('Error fetching brands:', error);
            }
        };
        fetchBrands();
    }, []);

    useEffect(() => {
        const fetchTransportType = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/v1/transports/transportTypes/');
                setTransportType(response.data.transportsType);
            } catch (error) {
                console.error('Error fetching transportTypes:', error);
            }
        };
        fetchTransportType();
    }, []);

    const handleBrandChange = (value) => {
        setTransportData({
            ...transportData,
            brandId: value
        });
    };

    const handleTransportTypeChange = (value) => {
        setTransportData({
            ...transportData,
            transportTypeId: value
        });
    };

    const handleChange = (e) => {
        setTransportData({
            ...transportData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('name', transportData.name);
        formData.append('seats', transportData.seats);
        formData.append('transportStationId', transportData.transportStationId);
        formData.append('transportTypeId', transportData.transportTypeId);
        formData.append('brandId', transportData.brandId);

        fileList.forEach(file => {
            formData.append('images', file);
        });

        try {
            const response = await axios.post('http://localhost:4000/api/v1/transports/createTransport', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data.success) {
                toast.success('🦄 Tạo xe thành công!', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                console.log("Transport created successfully:", response.data.transport);
            }
        } catch (error) {
            toast.error('🦄 Không thể tạo xe!', {
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
    };

    return (
        <div className="px-[20px] py-[20px] bg-slate-50 ">
            <p className="font-bold text-2xl mb-[15px]">Thêm xe</p>
            <div className="mr-[50%]">
                <div className="flex justify-start gap-4 bg-white p-5 rounded-md shadow-md">
                    <div className="flex flex-col gap-3">
                        <p className="font-semibold">ID</p>
                        <div className="underline bg-blue-50 rounded-sm pl-1">
                            01
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <p className="font-semibold">Ngày tạo</p>
                        <div className="underline bg-blue-50 rounded-sm pl-1">
                            01/01/2024
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <p className="font-semibold">Ngày cập nhập</p>
                        <div className="underline bg-blue-50 rounded-sm pl-1">
                            01/01/2025
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-md shadow-md">
                    <div className="mt-5 p-5 ">
                        <div className="mb-5">
                            <p className="font-bold text-lg">Thông tin cơ bản</p>
                            <p>Một số thông tin chung</p>
                        </div>
                        <div className="mb-5 flex flex-col gap-2">
                            <label htmlFor="">Tên xe</label>
                            <Input name="name" value={transportData.name} onChange={handleChange} />
                        </div>
                        <div className="mb-5 flex flex-col gap-2">
                            <label htmlFor="">Số chỗ</label>
                            <Input name="seats" value={transportData.seats} onChange={handleChange} />
                        </div>
                        <div className="mb-5 flex flex-col gap-2">
                            <label htmlFor="" className="">Hình xe</label>
                            <FileUploader setFileList={setFileList} />
                        </div>
                        
                        <div className="mb-5 w-full flex  gap-2">
                            <div className='w-1/2 flex flex-col gap-4'>
                                <label htmlFor="">Hãng của xe</label>
                                <Select name="brandId" value={transportData.brandId} onChange={handleBrandChange}>
                                    {brands.map(brand => (
                                        <Select.Option key={brand._id} value={brand._id}>
                                            <div className="flex items-center justify-between">
                                                {brand.name}
                                                <img src={`http://localhost:4000/api/v1/images/${brand.image.path}`} alt={brand.name} className="w-6 h-6 mr-2 rounded-full" />
                                            </div>
                                        </Select.Option>
                                    ))}
                                </Select>
                            </div>
                            <div className='w-1/2 flex flex-col gap-4'>
                                <label htmlFor="">Loại của xe</label>
                                <Select name="transportTypeId" value={transportData.transportTypeId} onChange={handleTransportTypeChange}>
                                    {transportsType.map(transportsType => (
                                        <Select.Option key={transportsType._id} value={transportsType._id}>
                                            <div className="flex items-center justify-between">
                                                {transportsType.type}
                                            </div>
                                        </Select.Option>
                                    ))}
                                </Select>
                            </div>
                        </div>
                    </div>
                    <Divider className="m-0" />
                    <div className="flex justify-between px-5 py-3">
                        <Button type="default" className="px-5 font-semibold">Mặc định</Button>
                        <Button type="primary" className="px-5 font-semibold" onClick={handleSubmit}>Thêm</Button>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}
