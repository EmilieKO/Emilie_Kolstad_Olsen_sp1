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
    var table = document.getElementById("table1").getElementsByTagName('tbody')[0];
    for (var i = 0; i < data.results.length; i++){
        var row = table.insertRow(i);
        
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        var cell7 = row.insertCell(6);
        var cell8 = row.insertCell(7);
        
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


staffUserGet().then(result => console.log(result))

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

        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);

        cell1.innerHTML = '<i class=' + vehicleIcon[newDriver.vehicle] + '></i>'
        cell2.innerHTML = newDriver.firstName
        cell3.innerHTML = newDriver.surName;
        cell4.innerHTML = newDriver.phone;
        cell5.innerHTML = newDriver.address;
        cell6.innerHTML = newDriver.returnTime;

        document.getElementById("driverVehicle").value = "";
        document.getElementById("driverName").value = "";
        document.getElementById("driverSurname").value = "";
        document.getElementById("driverPhone").value = "";
        document.getElementById("driverAddress").value = "";
        document.getElementById("driverReturn").value = "";

    deliveryDriverIsLate(returnTime, newDriver)
    function deliveryDriverIsLate(returnTime) {
        const now = new Date();
        const h = now.getHours();
        const m = now.getMinutes();
        const toastContainer = document.querySelector('#toastId');
        const toast = toastContainer.querySelector('.toast');
        const toastHeader = toast.querySelector('.toast-header');
        const toastBody = toast.querySelector('.toast-body');
        const returnTimeDate = new Date(`1970-01-01T${returnTime}:00`);

        if (h > returnTimeDate.getHours() || (h === returnTimeDate.getHours() && m > returnTimeDate.getMinutes())) {
            toastHeader.querySelector('.mr-auto').textContent = 'Your driver is late!';
            toastBody.querySelector('p').textContent = `${newDriver.firstName} ${newDriver.surName} should have returned at ${returnTime}. Their phone number is ${newDriver.phone} and they are at this location: ${newDriver.address}.`;    
            toast.classList.add('show');
        } else {
        setTimeout(() => deliveryDriverIsLate(returnTime), 10000);
        }
    }
}

$("document").ready(function () {
    $('#driverBody').on("click", "tr", function () {
        $(this).toggleClass("selected");
    });
    $("#button4").click(function (e) {
        let result = window.confirm("Are you sure you want to delete this row?")
        if (result == false) {
            e.preventDefault()
        } else {
            $("#driverBody .selected").remove();
        }
    });
    $(".toast .close").on("click", function () {
        $(".toast").toast("hide")
    }) 
    $('#table1').on("click", "tr", function () {
        $(this).toggleClass("selected");
    });
});

function staffIn() {
    jQuery(function () {
        $("#table1 .selected td").eq(4).html("In")
        $("#table1 .selected td").eq(5).html("")
        $("#table1 .selected td").eq(6).html("")
        $("#table1 .selected td").eq(7).html("")
    })
}

function staffOut() {
    const selectedRow = $("#table1 tr.selected")
        if (selectedRow.length === 0) {
            alert("Please select a staff member.")
        } else {
            $("#table1 .selected td").eq(4).html("Out")
            let outTime = prompt("When are they leaving?");
            $("#table1 .selected td").eq(5).html(outTime)
            let expReturn = prompt("When will they return?")
            $("#table1 .selected td").eq(7).html(expReturn)
            let timeStart = new Date(`1970-01-01T${outTime}:00`).getTime()
            let timeEnd = new Date(`1970-01-01T${expReturn}:00`).getTime()
            console.log(timeStart)
            let duration = timeEnd - timeStart
            let hDiff = duration / 3600 / 1000
            $("#table1 .selected td").eq(6).html(hDiff + " hours.")
        }
    }
