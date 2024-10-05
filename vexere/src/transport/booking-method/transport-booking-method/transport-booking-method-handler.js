const transportBookingMethodQuery = require('./transport-booking-method-queries')
const TransportBookingMethod = require('./tranport-booking-method-model')
const Transport = require('../../transport-model')
// Lấy Booking Method id hiện thị ra booking method của nhà xe 
// Trường hợp 1: Nếu booking method là Gọi để xác nhận
// Sẽ hiện ra số điện thoại của nhà xe 
// Trường hợp 2: Nếu booking method là Không hỗ trợ chọn trước ghế
// Sẽ hiện ra số ghế mà nhà xe cài đặt
exports.getBookingMethodById = async (req, res) => {

}
// Lấy toàn bộ danh sách nhà xe với trạng thái Valid
exports.getAllTransportByProvince = async (req, res) => {

}

exports.getAll = async (req, res) => {
    try {
        const transportBookingMethodSaved = await transportBookingMethodQuery
                                                    .findAll()
        return res.status(200).json({
            success: true,
            TransportBookingMethods: transportBookingMethodSaved
        })
    }catch(error){
        console.error(error)
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

exports.update = async (req, res) => {
    try {
        const transportFromClient = await req.body.transportId
        const bookingMethodFromClient = await req.body.bookingMethodId
        const transportFromServer = await Transport.findOne({_id: transportFromClient})
        let filters = {
            transportId :transportFromServer._id
        }
        let content = {
            bookingMethodId: bookingMethodFromClient
        }

        const bookingMethodFromServer = await TransportBookingMethod.findOneAndUpdate(filters,content)
        if (bookingMethodFromServer){
            const transportBookingMethodSaved = await transportBookingMethodQuery
                                                    .findAll()
            return res.status(200).json({
                success: true,
                TransportBookingMethods: transportBookingMethodSaved
            })    
        }
        res.status(200).json({
            success: true,
            message: " Cannot Update trạng thái !"
        });
    }catch(error){
        console.error(error)
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}