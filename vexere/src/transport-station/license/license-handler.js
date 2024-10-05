const licenseQuery= require('./license-queries')
const licenseService= require('./license-service')
const ccmQuery = require('./company-certificates/ccm-queries')
exports.getAll = async (req, res, next) => {
    try {
        const ccm = await ccmQuery.getAll()
        return res.status(200).json({
            ccm
        })
    } catch(error){
        console.log(error)
        res.status(500).json({
            error
        })
    }
}

exports.init = async (req, res, next) => {
    try {
        let licenses_data = [
            {
                name: "Giấy phép chứng nhận phòng cháy chữa cháy",
                purpose: "1",
            },
            {
                name: "Giấy phép vận tải bằng ô tô",
                purpose: "2",
            },
            {
                name: "Giấy phép lữ hành quốc tế",
                purpose: "3",
            },
            {
                name: "Giấy phép kinh doanh",
                purpose: "4",
            }
        ];
        const licenses = await licenseService.init(licenses_data);
        return res.status(200).json({
            licenses: licenses
        })
    } catch(error){
        console.log(error)
        res.status(500).json({
            error
        })
    }
}