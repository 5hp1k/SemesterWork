class Record {
    constructor(outcome, playerScore, dealerScore) {
      this.outcome = outcome;
      this.playerScore = playerScore;
      this.dealerScore = dealerScore;
      this.timestamp = getCurrentTimestamp();
    }
  }
  
  const tableDataArray = [];
  
  export default async function writeTableData(outcome, playerScore, dealerScore) {
    const timestamp = getCurrentTimestamp();
    tableDataArray.push(new Record(outcome, playerScore, dealerScore, timestamp));
    updateTableData();
  }
  
  function updateTableData() {
    const tableBody = document.getElementById("gameTableBody");
  
    tableBody.innerHTML = "";
  
    while (tableDataArray.length > 20) {
      tableDataArray.shift();
    }
  
    tableDataArray.forEach(record => {
      const row = document.createElement("tr");
  
      const outcomeCell = document.createElement("td");
      outcomeCell.textContent = record.outcome;
      row.appendChild(outcomeCell);
  
      const playerScoreCell = document.createElement("td");
      playerScoreCell.textContent = record.playerScore;
      row.appendChild(playerScoreCell);
  
      const dealerScoreCell = document.createElement("td");
      dealerScoreCell.textContent = record.dealerScore;
      row.appendChild(dealerScoreCell);
  
      const timestampCell = document.createElement("td");
      timestampCell.textContent = record.timestamp;
      row.appendChild(timestampCell);
  
    
      if (record.outcome === "Поражение") {
        row.classList.add("outcome-lose");
      } else if (record.outcome === "Победа") {
        row.classList.add("outcome-win");
      } else if (record.outcome === "Ничья") {
        row.classList.add("outcome-tie");
      }

      tableBody.appendChild(row);
      console.log("Added a record");
    });
  }
  
  function getCurrentTimestamp() {
    const now = new Date();
    const timestamp = now.toLocaleString();

    return timestamp;
  }
  