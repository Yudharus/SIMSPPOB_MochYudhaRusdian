const ToRupiah = (text) => {
    return text.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}

const FixingNumberAmount = (value) => {
    const splitValue = value.split(",")[value.split(",").length - 1].split("").slice(1, 3).join("")
    let result = ""
    let arrResult = value.split(",")

    if(parseInt(splitValue) > 0 && parseInt(splitValue) <= 99) {
        result = `${ parseInt(value.split(",")[value.split(",").length - 1].split("")[0]) + 1 }00`

        if(parseInt(result) >= 1000) {
            result = "000"
            arrResult[arrResult.length - 2] = parseInt(arrResult[arrResult.length - 2]) + 1
        }
    } else {
        result = value.split(",")[value.split(",").length - 1]   
    }

    arrResult[arrResult.length - 1] = result
    arrResult = arrResult.join("")

    return arrResult.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

export {
    ToRupiah,
    FixingNumberAmount
}