import React, { useState } from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { Upload, message } from 'antd';

const { Dragger } = Upload;

const FileUploader = ({ setFileList }) => {
    const [previewList, setPreviewList] = useState([]);

    const props = {
        name: 'file',
        multiple: true,
        beforeUpload: (file) => {
            const reader = new FileReader();
            reader.onload = () => {
                setPreviewList(prev => [...prev, reader.result]);
            };
            reader.readAsDataURL(file);

            setFileList(prev => [...prev, file]);
            return false; 
        },
        onChange(info) {
            const { status } = info.file;
            if (status === 'removed') {
                setFileList(prev => prev.filter(item => item.uid !== info.file.uid));
                setPreviewList(prev => prev.filter((_, index) => index !== info.fileList.length));
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };

    return (
        <div>
            <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">Nhấn đúp chuột hoặc thả Tệp vào đây để tải lên</p>
                <p className="ant-upload-hint">
                    Support for a single or bulk upload. Strictly prohibited from uploading company data or other banned files.
                </p>
            </Dragger>
            <div className="preview-container">
                {previewList.map((url, index) => (
                    <img key={index} src={url} alt={`preview ${index}`} className="preview-image" />
                ))}
            </div>
        </div>
    );
};

export default FileUploader;
