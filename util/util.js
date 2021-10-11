
function makeOtp(length, onlyNumbers) {
    var result           = '';
    var characters       = !onlyNumbers ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789' : '0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function randomTime(){
    const time = Math.floor(Math.random() * 12) + 1;
    return Math.floor(Math.random() * 1) ? time + ' AM' : time + ' PM';
}

module.exports = {
    makeOtp,
    randomDate,
    randomTime
}