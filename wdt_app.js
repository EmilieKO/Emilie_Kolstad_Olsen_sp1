function startTime() {
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
    setTimeout(startTime, 1000);
}

function checkTime(i) {
    if (i < 10) {i = "0" + i}; 
return i;
}

$.ajax({
    url: 'https://randomuser.me/api/?results=5&inc=picture,name,email',
    type: "GET",
    dataType: 'json',
    success: function (data) {
        console.log(data);
        console.log(data.results[0].email)
    }
})

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

function insertToTable() {
    let newTable = document.getElementById("driverBody")
    let vehicle = document.getElementById("driverVehicle").value;
    let fName = document.getElementById("driverName").value;
    let lName = document.getElementById("driverSurname").value
    let phone = document.getElementById("driverPhone").value
    let address = document.getElementById("driverAddress").value
    let returnTime = document.getElementById("driverReturn").value


    if (fName != "" && lName != "" && phone != "" && address != "" && returnTime != "" && vehicle != "") {
        let addRow = newTable.insertRow(newTable.rows.length)

        let vehicleCell = addRow.insertCell(0)
        let fNameCell = addRow.insertCell(1)
        let lNameCell = addRow.insertCell(2)
        let phoneCell = addRow.insertCell(3)
        let addressCell = addRow.insertCell(4)
        let returnCell = addRow.insertCell(5)
        
        vehicleCell.innerHTML = vehicle;
        fNameCell.innerHTML = fName;
        lNameCell.innerHTML = lName;
        phoneCell.innerHTML = phone;
        addressCell.innerHTML = address;
        returnCell.innerHTML = returnTime;

    } else {
        alert("No input")
    }

    document.getElementById("driverVehicle").value = "";
    document.getElementById("driverName").value = "";
    document.getElementById("driverSurname").value = "";
    document.getElementById("driverPhone").value = "";
    document.getElementById("driverAddress").value = "";
    document.getElementById("driverReturn").value = "";
}

$("document").ready(function () {
    $('#driverBody').on("click", "tr", function () {
        $(this).toggleClass("selected");
    });
    $("#button4").click(function () {
        $("#driverBody .selected").remove();
    });
});

