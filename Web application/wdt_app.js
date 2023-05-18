
function digitalClock() {
    const today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    let d = today.getDate()
    let month = today.getMonth()+1;
    let year = today.getFullYear();
    m = checkTime(m);
    s = checkTime(s);
    h = checkTime(h)
    month = checkTime(month)
    d = checkTime(d);
    year = checkTime(year);
    document.getElementById('txt').innerHTML = `${d}/${month}/${year} ${h}:${m}:${s}`
    setTimeout(digitalClock, 1000);
}

function checkTime(i) {
    if (i < 10) {i = "0" + i}; 
return i;
}

let staffMembers = []

window.onload = staffUserGet()

//API request and processing results
async function staffUserGet() {
    const response = await fetch('https://randomuser.me/api/?results=5&inc=picture,name,email');
    const data = await response.json()
    const staffMembers = data.results.map(result => new StaffMember(
        result.picture.medium,
        result.name.first,
        result.name.last,
        result.email,
        '',
        '',
        '',
        '',
    )) 
    var table1 = document.getElementById("employeeBody")

    //Inserts cells to table
    for (var i = 0; i < data.results.length; i++){
        var row = table1.insertRow(i);
        
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        var cell7 = row.insertCell(6);
        var cell8 = row.insertCell(7);
        
        //Fills table with data
        cell1.innerHTML = '<img src="' + data.results[i].picture.medium + '">';
        cell2.innerHTML = data.results[i].name.first;
        cell3.innerHTML = data.results[i].name.last;
        cell4.innerHTML = data.results[i].email;
        cell5.innerHTML = '';
        cell6.innerHTML = '';
        cell7.innerHTML = '';
        cell8.innerHTML = '';
    }
    return staffMembers
    }



//Clear the table row
function clearTable() {
    document.getElementById("driverVehicle").value = "";
    document.getElementById("driverName").value = "";
    document.getElementById("driverSurname").value = "";
    document.getElementById("driverPhone").value = "";
    document.getElementById("driverAddress").value = "";
    document.getElementById("driverReturn").value = "";
}

class Employee {
    constructor(firstName, surName) {
        this.firstName = firstName;
        this.surName = surName;
    }
}

class StaffMember extends Employee {
    constructor(firstName, surName, picture, email, status, outTime, duration, expectedReturnTime) {
        super(firstName, surName)
        this.picture = picture;
        this.email = email;
        this.status = status;
        this.outTime = outTime;
        this.duration = duration;
        this.expectedReturnTime = expectedReturnTime;
    }
}

class DeliveryDriver extends Employee {
    constructor(vehicle, firstName, surName, phone, address, returnTime) {
        super(firstName, surName)
        this.vehicle = vehicle;
        this.phone = phone;
        this.address = address;
        this.returnTime = returnTime;
    }
}

class CarDriver extends DeliveryDriver {
    constructor(firstName, surName, phone, address, returnTime) {
        super("car", firstName, surName, phone, address, returnTime)
    }
}

class BikeDriver extends DeliveryDriver {
    constructor(firstName, surName, phone, address, returnTime) {
        super("bike",firstName, surName, phone, address, returnTime)
    }
}

//Bootstrap icons 
const vehicleIcon = {
    car: '"bi bi-car-front-fill"',
    bike: '"bi bi-bicycle"'
}

var returnTime = {}
var newDriver = {}

function validateDelivery() {
    let firstName = document.getElementById("driverName").value;
    let surName = document.getElementById("driverSurname").value
    let phone = document.getElementById("driverPhone").value
    let address = document.getElementById("driverAddress").value
    let returnTime = document.getElementById("driverReturn").value

    if (!firstName || !surName || !phone || !address || !returnTime) {
        alert("Please fill in all fields.")
        return false;
    } else if (isNaN(phone)) {
        alert("Please enter a valid phone number")
        return false;
    }
    return true;
}

function addDelivery() {
    if (!validateDelivery()) {
        return;
    }
    let vehicle = document.getElementById("driverVehicle").value;
    let firstName = document.getElementById("driverName").value;
    let surName = document.getElementById("driverSurname").value
    let phone = document.getElementById("driverPhone").value
    let address = document.getElementById("driverAddress").value
    let returnTime = document.getElementById("driverReturn").value

    // Determine the vehicle icon
    if (vehicle == "car") {
        newDriver = new CarDriver(firstName, surName, phone, address, returnTime);
    } else if (vehicle == "bike") {
        newDriver = new BikeDriver(firstName, surName, phone, address, returnTime)
    } else {
        alert("Please clarify car or bike");
        return;
    }

    
        let newTable = document.getElementById("driverBody");
        let row = newTable.insertRow();

    // Insert cells to table
        var newCell1 = row.insertCell(0);
        var newCell2 = row.insertCell(1);
        var newCell3 = row.insertCell(2);
        var newCell4 = row.insertCell(3);
        var newCell5 = row.insertCell(4);
        var newCell6 = row.insertCell(5);

    //Fill table with user data
        newCell1.innerHTML = '<i class=' + vehicleIcon[newDriver.vehicle] + '></i>'
        newCell2.innerHTML = newDriver.firstName
        newCell3.innerHTML = newDriver.surName;
        newCell4.innerHTML = newDriver.phone;
        newCell5.innerHTML = newDriver.address;
        newCell6.innerHTML = newDriver.returnTime;

        document.getElementById("driverVehicle").value = "";
        document.getElementById("driverName").value = "";
        document.getElementById("driverSurname").value = "";
        document.getElementById("driverPhone").value = "";
        document.getElementById("driverAddress").value = "";
        document.getElementById("driverReturn").value = "";

    deliveryDriverIsLate(returnTime, newDriver)
}
function deliveryDriverIsLate(returnTime, newDriver) {
    const now = new Date();
    const h = now.getHours();
    const m = now.getMinutes();
    const toastContainer = document.querySelector('#toastId');
    const toastBody = toastContainer.querySelector('.toast-body');
    const returnTimeDate = new Date(`1970-01-01T${returnTime}:00`);

    //Compare current time, and user input
    if (h > returnTimeDate.getHours() || (h === returnTimeDate.getHours() && m > returnTimeDate.getMinutes())) {
        toastBody.querySelector('p').textContent = `${newDriver.firstName} ${newDriver.surName} should have returned at ${returnTime}. Their phone number is ${newDriver.phone} and they are at this location: ${newDriver.address}.`;    
        toastContainer.classList.add('show');
    } else {
    setTimeout(() => deliveryDriverIsLate(returnTime, newDriver), 10000);
    }
}

$("document").ready(function () {
    //For selecting table rows
    // $('#tabl').on("click", "tr", function () {
    //     $(this).toggleClass("selected");
    // });
    $("#button4").click(function (e) {
    //Deleting table row
    const selectedRow = $("#driverBody tr.selected")
        if (selectedRow.length === 0) {
            alert("Please select delivery driver.")
        } else {
            let result = window.confirm("Are you sure you want to delete this row?")
            if (result == false) {
                e.preventDefault()
            } else {
                $("#driverBody .selected").remove();
            }
        }
    });

//close the toast notifications
    $("#close1").on("click", function () {
        $("#toastId").toast("hide")
    }) 
    $("#close2").on("click", function () {
        $("#toastId2").toast("hide")
        const image = document.querySelector('#toastId2 .toast-header img');
        if (image) {
            image.remove();
        }
    }) 
    //Only have one selected row at a time
    $('#employeeBody').on("click", "tr", function () {
        $("#employeeBody tr").not(this).removeClass("selected")
        $(this).toggleClass("selected");
    });
    $('#driverBody').on("click", "tr", function () {
        $("#driverBody tr").not(this).removeClass("selected")
        $(this).toggleClass("selected");
    });
});

function staffIn() {
    jQuery(function () {
        $("#table1 .selected td").eq(4).html("In")
        $("#table1 .selected td").eq(5).html("")
        $("#table1 .selected td").eq(6).html("")
        $("#table1 .selected td").eq(7).html("")
        $("#table1 tr.selected").removeClass("selected")
    })
}   

function staffOut() {
    const selectedRow = $("#table1 tr.selected")
        if (selectedRow.length === 0) {
            alert("Please select a staff member.")
        } else {
            $("#table1 .selected td").eq(4).html("Out")
            let outTime = prompt("When are they leaving? Please use the hh:mm format.");
            $("#table1 .selected td").eq(5).html(outTime)
            let expReturn = prompt("When will they return? Please use the hh:mm format.")
            $("#table1 .selected td").eq(7).html(expReturn)
            
            // Calculate duration
            let timeStart = new Date(`1970-01-01T${outTime}:00`)
            let timeEnd = new Date(`1970-01-01T${expReturn}:00`)
            
            let durationM = Math.round((timeEnd - timeStart) / 1000 / 60)
            let durationH = Math.floor(durationM / 60)
            let durationMleft = durationM % 60

            $("#table1 .selected td").eq(6).html(`${durationH}h : ${durationMleft}m`)

            //Find relevant data in the cells
            let picture = $("#table1 .selected td").eq(0).find("img").attr("src")
            let fName = $("#table1 .selected td").eq(1).text()
            let lName = $("#table1 .selected td").eq(2).text()
            let email = $("#table1 .selected td").eq(3).text()
            let timeOut = $("#table1 .selected td").eq(6).text()
            selectedRow.removeClass("selected")
            staffMemberIsLate(picture, fName, lName, email, timeOut, timeEnd)
        }
    }
    function staffMemberIsLate(picture, fName, lName, email, timeOut,timeEnd) {
        let now = new Date()
        let h = now.getHours()
        let m = now.getMinutes()

        const toastContainer = document.querySelector('#toastId2');
        const toastHeader = toastContainer.querySelector('.toast-header');

        let timeEndH = timeEnd.getHours()
        let timeEndM = timeEnd.getMinutes()

        let image = document.createElement("img")
        image.src = picture
        
        //compare user input to current time
        if (h > timeEndH || (h === timeEndH && m > timeEndM)) {
            
            toastHeader.appendChild(image)
            $("#toastId2 p").text(`${fName} ${lName} is currently late. Their email is ${email} and they have been gone ${timeOut}. `)
            console.log(fName)
            toastContainer.classList.add('show');
        } else {
            //Continously check if they're late
            setTimeout(() => staffMemberIsLate(picture,fName, lName, email, timeOut, timeEnd), 10000);
        }
    }   