export const formatAddress = (addr) => {
    return addr.substring(0, 5) + '...' + addr.substring(addr.length - 4);
}

export const formatTokenValue = (value) => {
    let val = String(value);
    let bd = val.slice(0, -18);
    let ad = val.slice(bd.length, -15);
    return bd + '.' + ad;
}

export const formatMobileNumber = (number) => {
    return number.slice(0, 5) + '-' + number.slice(5);
}

export const formatNumber = (value) => {
    if(value/ 1000 < 1){
        return value;
    }
    if(value/1000000 < 1) {
        return String(value/1000) + ' K';
    }
    else{
        return String(value/1000000) + ' M';
    }
}