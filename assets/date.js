const moment = require('moment');

function formateDate(){
    let day = moment().format('dddd');
    return day
}

module.exports = formateDate;