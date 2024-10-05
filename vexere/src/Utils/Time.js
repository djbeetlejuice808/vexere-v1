exports.Time = () => {
    const now = new Date()
    let hours = now.getHours()
    let minutes = now.getMinutes()
    let day = now.getDate()
    const month = now.getMonth() + 1 
    const year = now.getFullYear()
    return  `${day}/${month}/${year} ${hours}:${minutes}`
}


