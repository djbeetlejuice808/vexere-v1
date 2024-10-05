import { useState, useEffect } from 'react';
import { Button, Select, DatePicker, Divider, ConfigProvider, Modal, Steps, Table, TimePicker } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import locale from 'antd/es/locale/vi_VN';
import PickupMap from '../../../../component/pickupmap'; // Adjust the path to your component

dayjs.extend(customParseFormat);
dayjs.locale('vi');

const { Step } = Steps;

const format = 'YYYY-MM-DD HH:mm:ss';
const disabledDate = (current) => current && current < dayjs().endOf('day');

export default function RouteCreate() {
    const [pickupAddress, setPickupAddress] = useState('');
    const [pickupTime, setPickupTime] = useState(null);
    const [dropoffAddress, setDropoffAddress] = useState('');
    const [dropoffTime, setDropoffTime] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/v1/transports/routes/locations/');
                setData(response.data.locations); 
                console.error('Error fetching locations:', error);
                toast.error('Error fetching locations');
            }
        };
        fetchData();
    }, []);

    const handleTimeChange = (time, type) => {
        const formattedTime = time ? dayjs(time).format(format) : null;
        if (type === 'pickup') {
            setPickupTime(formattedTime);
        } else {
            setDropoffTime(formattedTime);
        }
    };
    const showModal = () => setIsModalVisible(true);
    const handleCancel = () => setIsModalVisible(false);

    const handleNext = () => setCurrentStep(currentStep + 1);
    const handlePrev = () => setCurrentStep(currentStep - 1);


    const postLocation = async () => {
        setLoading(true);
        try {
            const payload = {
                pickUpPoint: pickupAddress,
                pickUpPointTime: pickupTime,
                dropOffPoint: dropoffAddress,
                dropOffPointTime: dropoffTime,
            };
            const response = await axios.post('http://localhost:4000/api/v1/transports/routes/locations/', payload);
            if (response.data.success) {
    setData(prevData => [...(prevData || []), response.data.location]);
    toast.success('Location created successfully!');
    setIsModalVisible(false);
    setCurrentStep(0);
} else {
    throw new Error('Failed to create location');
}
        } catch (error) {
            console.error('Error posting location:', error);
            toast.error(error.response?.data?.message || 'Error posting location');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = () => {
        if (!pickupAddress || !pickupTime || !dropoffAddress || !dropoffTime) {
            toast.error('Please fill all required fields.');
            return;
        }
        postLocation();
    };

    const steps = [
        {
            title: 'Chọn vị trí đón',
            content: <PickupMap setAddress={setPickupAddress} />,
        },
        {
            title: 'Chọn thời gian đón',
            content: <TimePicker format={format} size="large" onChange={(time) => handleTimeChange(time, 'pickup')} />,
        },
        {
            title: 'Chọn vị trí trả',
            content: <PickupMap setAddress={setDropoffAddress} />,
        },
        {
            title: 'Chọn thời gian trả',
            content: <TimePicker format={format} size="large" onChange={(time) => handleTimeChange(time, 'dropoff')} />,
        },
    ];

    const columns = [
        {
            title: 'Vị trí đón',
            dataIndex: 'pickUpPoint',
            key: 'pickUpPoint',
        },
        {
            title: 'Thời gian đón',
            dataIndex: 'pickUpPointTime',
            key: 'pickUpPointTime',
            render: text => text || "Thời gian không xác định",
        },
        {
            title: 'Vị trí trả',
            dataIndex: 'dropOffPoint',
            key: 'dropOffPoint',
        },
        {
            title: 'Thời gian trả',
            dataIndex: 'dropOffPointTime',
            key: 'dropOffPointTime',
            render: text => text || "Thời gian không xác định",
        },
    ];

    return (
        <ConfigProvider locale={locale}>
            <div className="px-20 py-20 bg-slate-50">
                <p className="font-bold text-2xl mb-4">Thêm xe</p>
                <div>
                    <div className="bg-white rounded-md shadow-md p-5">
                        <div>
                            <p className="font-bold text-lg">Thông tin cơ bản</p>
                            <p>Một số thông tin chung</p>
                        </div>
                        <Button type="primary" onClick={showModal}>Chọn địa điểm đón</Button>
                        <Modal
                            title="Chọn địa điểm đón"
                            visible={isModalVisible}
                            onCancel={handleCancel}
                            width={1200}
                            footer={[
                                currentStep > 0 && <Button key="back" onClick={handlePrev}>Trở về</Button>,
                                currentStep < steps.length - 1 && <Button key="next" type="primary" onClick={handleNext}>Tiếp tục</Button>,
                                currentStep === steps.length - 1 && <Button key="submit" type="primary" loading={loading} onClick={handleSave}>Lưu</Button>,
                            ]}
                        >
                            <Steps current={currentStep}>
                                {steps.map((item, index) => <Step key={index} title={item.title} />)}
                            </Steps>
                            <div className="steps-content">{steps[currentStep].content}</div>
                        </Modal>
                        <Table columns={columns} dataSource={data} />
                    </div>
                </div>
                <ToastContainer />
            </div>
        </ConfigProvider>
    );
}
