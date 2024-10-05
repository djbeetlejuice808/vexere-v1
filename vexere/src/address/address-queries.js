const address = require('./address-model')

exports.createAddress = (provinceId, districtId, wardId) => {
    try{
        const addressSaved = new address({
            provinceId: provinceId, 
            districtId: districtId, 
            wardId: wardId, 
        })
        console.log(addressSaved)
        return addressSaved.save()
    }catch(error){
        console.log(error)
        throw error
    }
}

exports.updateUserIdInAddress = async (addressId, userId) => {
    try {
        const updatedAddress = await address.findByIdAndUpdate(
            addressId,
            { userId: userId },
            { new: true } // This option returns the modified document rather than the original
        )
        return updatedAddress != null ? updatedAddress : null
    } catch (error) {
        console.log(error)
        throw "Cannot update user ID in address"
    }
}