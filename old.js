// $("document").ready(function () {
//     $("thead").css({
//         "background-color": "#0E8EA8",
//         "font-family": "Consolas",
//         "color": "#fff"
//     })
    // $("table").css({
    //     "border": "#212529",
    //     "border-radius": "10px",
    //     "border-width": "1px",
    //     "width": "75%",
    //     "margin-bottom": "2px"
    // })
    // $("h1").css({
    //     "font-family": "Calibri",
    //     "color": "#212529"
    // })
    // $("h2").css({
    //     "font-family": "Calibri",
    //     "color": "#212529"
    // })
    // $("tbody").css({
    //     "font-family": "Calibri",
    //     "background-color": "#83D1E1",
    //     "color": "#212529"
//     })
//     $("#button1").css({
//         "margin-left": "170px",
//     })
//     $("#button2").css({
//         "margin-right": "170px",
//     })
//     $("#button3").css({
//         "margin-right": "100px"
//     })
//     $("#button4").css({
//         "margin-right": "100px"
//     })
//     $("body").css({
//         "height": "95vh"
//     })
//     $(".navbar").css({
//         "overflow": "hidden",
//         "background-color": "#333"
//     });
//     $('body').css({
//         'font-family': 'Arial, Helvetica, sans-serif'
//     });
// })

// function startTime() {
//     const today = new Date();
//     let h = today.getHours();
//     let m = today.getMinutes();
//     let s = today.getSeconds();
//     let d = today.getDate()
//     let month = today.getMonth();
//     let year = today.getFullYear();
//     m = checkTime(m);
//     s = checkTime(s);
//     h = checkTime(h)
//     month = checkTime(month)
//     d = checkTime(d);
//     year = checkTime(year);
//     document.getElementById('txt').innerHTML = `${d}/${month}/${year} ${h}:${m}:${s}`
//     setTimeout(startTime, 1000);
// }

// function checkTime(i) {
//     if (i < 10) {i = "0" + i}; 
// return i;
// }

// // $.ajax({
// //     url: 'https://randomuser.me/api/?results=5&inc=picture,name,email',
// //     dataType: 'json',
// //     success: function (data) {
// //         console.log(data);
// //         console.log(data.results[0].email)
// //         var table = document.getElementById("table1").getElementsByTagName('tbody')[0];

// //         for (var i = 0; i < data.results.length; i++) {
// //             var row = table.insertRow(i);

// //             var cell1 = row.insertCell(0);
// //             var cell2 = row.insertCell(1);
// //             var cell3 = row.insertCell(2);
// //             var cell4 = row.insertCell(3);
// //             var cell5 = row.insertCell(4);
// //             var cell6 = row.insertCell(5);
// //             var cell7 = row.insertCell(6);
// //             var cell8 = row.insertCell(7);

// //             cell1.innerHTML = '<img src="' + data.results[i].picture.medium + '">';
// //             cell2.innerHTML = data.results[i].name.first;
// //             cell3.innerHTML = data.results[i].name.last;
// //             cell4.innerHTML = data.results[i].email;
// //             cell5.innerHTML = '';
// //             cell6.innerHTML = '';
// //             cell7.innerHTML = '';
// //             cell8.innerHTML = '';
// //         }
// //     }
// // });

