var functions = {};

functions.getCurrentDate = function() {
    var currentDate = new Date();

    // var date = currentDate.getDate();
    // var month = currentDate.getMonth(); //January is 0 not 1
    // var year = currentDate.getFullYear();

    // var dateString = (month + 1) + "/" + date + "/" + year;
    return currentDate;
}

exports.data = functions;