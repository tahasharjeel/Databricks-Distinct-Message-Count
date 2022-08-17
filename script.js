function myFunction(){

  let map = new Map();
  let text = document.getElementById("floatingTextarea").value;
  let textcmd9 = document.getElementById("floatingTextarea2").value;

  if(text != "" && textcmd9 != ""){
    let count = 0;
    let textArray = text.split(/[\n\r]+/);

    for(let j=0;j<textArray.length;j++){
      let line = textArray[j];
      if(line.includes("distinctMessagesCount") && line.includes("unAcknowledgedCount") && count<24){
        let start = line.indexOf("distinctMessagesCount");
        let end = line.indexOf("unAcknowledgedCount") - 2;
	      let ending = line.substring(start+23,end);
	      map.set(count++,ending);
      }
    }

    let start2 = textcmd9.indexOf("distinctMessagesCount");
    let end2 = textcmd9.indexOf("unAcknowledgedCount") - 2;
	  let ending2 = textcmd9.substring(start2+23,end2);

	  map.set(9,ending2);
    map.set(23,"Replace from cmd 9");

    let table = document.getElementById("myTable");

    for(let i=1;i<=24;i++){
      table.rows[i].cells[1].innerHTML = map.get(i-1);
    }

    document.getElementById("dld").disabled = false;

  }
  else{
    alert("Please enter both cmd 9 and cmd 10");
  }
}

function tableToCSV() {

  var csv_data = [];
  var rows = document.getElementsByTagName('tr');

  for(var i = 0; i < rows.length; i++){
        var cols = rows[i].querySelectorAll('td,th');
        var csvrow = [];
        for(var j = 0; j < cols.length; j++){
          csvrow.push(cols[j].innerHTML);
        }
        csv_data.push(csvrow.join(","));
  }

  csv_data = csv_data.join('\n');

  downloadCSVFile(csv_data);
}

function downloadCSVFile(csv_data){

  CSVFile = new Blob([csv_data], {
    type: "text/csv"
  });

  var temp_link = document.createElement('a');
  temp_link.download = "DatabricksDistinctMessagesCount.csv";
  var url = window.URL.createObjectURL(CSVFile);
  temp_link.href = url;
  temp_link.style.display = "none";
  document.body.appendChild(temp_link);
  temp_link.click();
  document.body.removeChild(temp_link);
}
