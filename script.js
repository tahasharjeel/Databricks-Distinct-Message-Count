function myFunction(){
let map = new Map();
let text = document.getElementById("floatingTextarea").value;

let count = 0;

let textArray = text.split(/[\n\r]+/);

for(let i=0;i<textArray.length;i++){
  let line = textArray[i];
  if(line.includes("distinctMessagesCount") && line.includes("unAcknowledgedCount") && count<24){
    let start = line.indexOf("distinctMessagesCount");
    let end = line.indexOf("unAcknowledgedCount") - 2;
	  let ending = line.substring(start+23,end);
    //csvArray.push(count+","+ending+"\n");
	  map.set(count++,ending);
  }
}

map.set(9,"Replace from cmd 9");
map.set(23,"Replace from cmd 9");

let table = document.getElementById("myTable");

for(let i=1;i<=24;i++){
  table.rows[i].cells[1].innerHTML = map.get(i-1);
}

console.log(map);
//tableToCSV();
document.getElementById("dld").disabled = false;
}

function tableToCSV() {

    // Variable to store the final csv data
    var csv_data = [];

    // Get each row data
    var rows = document.getElementsByTagName('tr');
    for (var i = 0; i < rows.length; i++) {

        // Get each column data
        var cols = rows[i].querySelectorAll('td,th');

        // Stores each csv row data
        var csvrow = [];
        for (var j = 0; j < cols.length; j++) {

            // Get the text data of each cell of
            // a row and push it to csvrow
            csvrow.push(cols[j].innerHTML);
        }

        // Combine each column value with comma
        csv_data.push(csvrow.join(","));
    }
    // combine each row data with new line character
    csv_data = csv_data.join('\n');

    /* We will use this function later to download
    the data in a csv file downloadCSVFile(csv_data);
    */
    downloadCSVFile(csv_data);
}


function downloadCSVFile(csv_data) {

           // Create CSV file object and feed
           // our csv_data into it
           CSVFile = new Blob([csv_data], {
               type: "text/csv"
           });

           // Create to temporary link to initiate
           // download process
           var temp_link = document.createElement('a');

           // Download csv file
           temp_link.download = "DatabricksDistinctMessagesCount.csv";
           var url = window.URL.createObjectURL(CSVFile);
           temp_link.href = url;

           // This link should not be displayed
           temp_link.style.display = "none";
           document.body.appendChild(temp_link);

           // Automatically click the link to
           // trigger download
           temp_link.click();
           document.body.removeChild(temp_link);
       }
