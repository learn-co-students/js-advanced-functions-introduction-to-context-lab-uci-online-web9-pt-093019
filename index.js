// Your code here

function createEmployeeRecord(emplArry) {
    return {
        firstName: emplArry[0],
        familyName: emplArry[1],
        title: emplArry[2],
        payPerHour: emplArry[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(arry) {
    return arry.map(el => {
        return createEmployeeRecord(el)
    })


}

function createTimeInEvent(empRecord, dateStamp) {
    const dateSplit = dateStamp.split(" ")
    // const timeConstr = dateSplit[1].substring(0,2)
    // const dateFmt = dateSplit[0] + 'T' + `${timeConstr}:00:00-08:00`
    // const dateObj = new Date(dateFmt)

    empRecord.timeInEvents.push({
        type: 'TimeIn',
        hour: parseInt(dateSplit[1]),
        date: dateSplit[0]
    })

    return empRecord
}

function createTimeOutEvent(empRecord, dateStamp) {
    const dateSplit = dateStamp.split(" ")
    
    empRecord.timeOutEvents.push({
        type: 'TimeOut',
        hour: parseInt(dateSplit[1]),
        date: dateSplit[0]
    })

    return empRecord
}

function hoursWorkedOnDate(empRecord, formDate) {
    const timeOut = empRecord.timeOutEvents.find(event => event.date === formDate).hour
    const timeIn = empRecord.timeInEvents.find(event => event.date === formDate).hour
    
    return (timeOut - timeIn) / 100
}

function wagesEarnedOnDate(empRecord, formDate) {
    const hours = hoursWorkedOnDate(empRecord, formDate)
    return hours * empRecord.payPerHour
}

function allWagesFor(empRecord) {
    let wagesArry = []

    for (const el of empRecord.timeInEvents) {
        wagesArry.push(wagesEarnedOnDate(empRecord, el.date))
    }
    return wagesArry.reduce((total, wage) => {
        return total += wage
    }, 0)
}

function findEmployeeByFirstName(empRecordsArry, firstName) {
    return empRecordsArry.find(record => record.firstName === firstName)
}

function calculatePayroll(empRecordsArry) {
    let wagesArry = []

    for (const record of empRecordsArry) {
        wagesArry.push(allWagesFor(record))
    }

    return wagesArry.reduce((total, wage) => {
        return total += wage
    })
}

// work on adding map function where possible?

// work on adding challenges:
//    exception handling
//    date handling and errors



let twoRows = [
    ["moe", "sizlak", "barkeep", 2],
    ["bartholomew", "simpson", "scamp", 3]
  ]

createEmployeeRecords(twoRows)
createEmployeeRecord(['Andrew', 'Capp', 'DOF', 15.00])
let empRecord = createEmployeeRecord(['Andrew', 'Capp', 'DOF', 15.00])
createTimeInEvent(empRecord, "2014-02-28 0800")
createTimeOutEvent(empRecord, "2014-02-28 1400")
hoursWorkedOnDate(empRecord, "2014-02-28")
wagesEarnedOnDate(empRecord, "2014-02-28")

console.log(allWagesFor(empRecord))