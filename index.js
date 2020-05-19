function createEmployeeRecord(employeeArray) {
    return {
        firstName: employeeArray[0],
        familyName: employeeArray[1],
        title: employeeArray[2],
        payPerHour: employeeArray[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(arrays) {
    return arrays.map(createEmployeeRecord)
}

function createTimeInEvent(empObj, timeStamp) {
    empObj.timeInEvents.push({
        type: "TimeIn",
        hour: Number(timeStamp.slice(11, 15)),
        date: timeStamp.slice(0, 10)
    })
    return empObj 
}

function createTimeOutEvent(empObj, timeStamp) {
    empObj.timeOutEvents.push({
        type: "TimeOut",
        hour: Number(timeStamp.slice(11, 15)),
        date: timeStamp.slice(0, 10)
    })
    return empObj 
}

function hoursWorkedOnDate(empObj, date) {
    const timeO = empObj.timeOutEvents.find(x => x.date == date) 
    const timeI = empObj.timeInEvents.find(x => x.date == date)
    return (timeO.hour - timeI.hour)/100
}

function wagesEarnedOnDate(empObj, date) {
    return empObj.payPerHour * hoursWorkedOnDate(empObj, date)     
}

function allWagesFor(empObj) {
    const dates = empObj.timeInEvents.map(x => x.date)
    return dates.map(x => wagesEarnedOnDate(empObj, x)).reduce(function(total, current) {
        return total += current 
    })
}

function findEmployeeByFirstName(empArray, name) {
    return empArray.find(x => x.firstName == name)
}

function calculatePayroll(empArray) {
    return empArray.reduce(function(total, current) {
        return total += allWagesFor(current)
    }, 0)
}