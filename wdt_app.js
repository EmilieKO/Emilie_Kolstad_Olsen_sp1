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

// $.ajax({
//     url: 'https://randomuser.me/api/?results=5&inc=picture,name,email',
//     type: "GET",
//     dataType: 'json',
//     success: function (data) {
//         console.log(data);
//         console.log(data.results[0].email)
//     }
// })

// async function staffUserGet() {
//     const response = await fetch('https://randomuser.me/api/?results=5&inc=picture,name,email');
//     let data = await response.parse(response)
//     console.log(data);
// }

function clearTable() {
    document.getElementById("driverVehicle").value = "";
    document.getElementById("driverName").value = "";
    document.getElementById("driverSurname").value = "";
    document.getElementById("driverPhone").value = "";
    document.getElementById("driverAddress").value = "";
    document.getElementById("driverReturn").value = "";
}

class Employee {
    constructor(fName, lName) {
        this.fName = fName;
        this.lName = lName;
    }
}

class StaffMember extends Employee {
    constructor(fName, lName, picture, email, status, outTime, duration, expectedReturnTime) {
        super(fName, lName)
        this.picture = picture;
        this.email = email;
        this.status = status;
        this.outTime = outTime;
        this.duration = duration;
        this.expectedReturnTime = expectedReturnTime;
    }
}

class DeliveryDriver extends Employee {
    constructor(vehicle, fName, lName, phone, address, returnTime) {
        super(fName, lName)
        this.vehicle = vehicle;
        this.phone = phone;
        this.address = address;
        this.returnTime = returnTime;
    }
}

class CarDriver extends DeliveryDriver {
    constructor(fName, lName, phone, address, returnTime) {
        super("car", fName, lName, phone, address, returnTime)
    }
}

class BikeDriver extends DeliveryDriver {
    constructor(fName, lName, phone, address, returnTime) {
        super("bike",fName, lName, phone, address, returnTime)
    }
}

const vehicleIcon = {
    car: '"bi bi-car-front-fill"',
    bike: '"bi bi-bicycle"'
}

var returnTime = {}
var newDriver = {}
function validateDelivery() {
    let fName = document.getElementById("driverName").value;
    let lName = document.getElementById("driverSurname").value
    let phone = document.getElementById("driverPhone").value
    let address = document.getElementById("driverAddress").value
    let returnTime = document.getElementById("driverReturn").value

    if (!fName || !lName || !phone || !address || !returnTime) {
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
    let fName = document.getElementById("driverName").value;
    let lName = document.getElementById("driverSurname").value
    let phone = document.getElementById("driverPhone").value
    let address = document.getElementById("driverAddress").value
    let returnTime = document.getElementById("driverReturn").value


    if (vehicle == "car") {
        newDriver = new CarDriver(fName, lName, phone, address, returnTime);
    } else if (vehicle == "bike") {
        newDriver = new BikeDriver(fName, lName, phone, address, returnTime)
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
        cell2.innerHTML = newDriver.fName
        cell3.innerHTML = newDriver.lName;
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

    function deliveryDriverIsLate() {
        const now = new Date()
        let h = now.getHours()
        let m = now.getMinutes()
        let time = h + ":" + m 
        const toastContainer = document.querySelector('#toastId');
        const toast = toastContainer.querySelector('.toast');
        const toastHeader = toast.querySelector('.toast-header');
        const toastBody = toast.querySelector('.toast-body');
        if (time > returnTime) {
            toastHeader.querySelector('.mr-auto').textContent = 'Your driver is late!';
            toastBody.querySelector('p').textContent = `${newDriver.fName} ${newDriver.lName} should have returned at ${returnTime}. Their phone number is ${newDriver.phone} and they are at this location: ${newDriver.address}.`;    
            toast.classList.add('show');
        } else if (time < returnTime) {
            setTimeout(deliveryDriverIsLate, 10000)
        } else {
            console.log("error")
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
});

