// Your code here
let createEmployeeRecord = function([firstName, familyName, title, payPerHour]) {
    return {
        firstName,
        familyName,
        title,
        payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployeeRecords = function(arrayOfRecords) {
    return arrayOfRecords.map(function(recordArray) {
        return createEmployeeRecord(recordArray);
    });
};

let createTimeInEvent = function(employee, dateTime) {
    // const hour = dateTime.split(" ")[0]
    // const date = dateTime.split(" ")[1]
    let [date, hour] = dateTime.split(' ');

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour),
        date: date
    })
    return employee;
}

let createTimeOutEvent = function(employee, dateTime) {
    let [date, hour] = dateTime.split(' ');

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour),
        date: date
    })
    return employee;
}

let hoursWorkedOnDate = function(employee, dateWorked) {
    let timeIn = employee.timeInEvents.find(event => event.date === dateWorked);
    let timeOut = employee.timeOutEvents.find(event => event.date === dateWorked);
    return (timeOut.hour - timeIn.hour) / 100;
}

let wagesEarnedOnDate = function(employee, dateWorked) {
    let hours = hoursWorkedOnDate(employee, dateWorked);
    let rate = employee.payPerHour;
    return hours * rate;
}

let allWagesFor = function(employee) {
    const datesWorked =  employee.timeOutEvents.map(function(event){
        return event.date
    });
    return  datesWorked.reduce(function(wagesOwed, date){
        return wagesOwed + wagesEarnedOnDate(employee, date)
    }, 0)
}

let findEmployeeByFirstName = function (srcArray, firstName)  {
    return srcArray.find(employee => employee.firstName === firstName);
}

let calculatePayroll = function(employees) {
    return employees.reduce(function(wages, employee) {
        return wages + allWagesFor(employee)
    }, 0);
}