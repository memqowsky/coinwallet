function prepareChart(timeArray, priceArray){

  // Get the canvas element
  const canvas = document.getElementById('bnbChart');
  // Create the chart context
  const ctx = canvas.getContext('2d');

  // Define the chart data
  const data = {
    labels: timeArray,
    datasets: [{
      label: 'BNB Price',
      data: priceArray,
      borderColor: 'rgba(0, 123, 255, 1)', // Set the line color
      backgroundColor: 'rgba(0, 123, 255, 1)', // Set the fill color
    }]
  };

  // Configure the chart options
  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          color: 'rgb(255, 255, 255)' // Change the font color of the y-axis ticks
        }
      },
      x: {
          ticks: {
              color: 'rgb(255, 255, 255)' // Change the font color of the x-axis ticks
          }
      }
    },
  };

  // Create the line chart
  const lineChart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: options
  });
}

function convertUnixTimeStampArrayToDateArray(timeStampArray){

  let dateArray = [];

  for(let i=0; i<timeStampArray.length; ++i){
    let tempString = new Date(timeStampArray[i] * 1000).toISOString().slice(0, 19).replace('T', ' ');
    dateArray.push(tempString.slice(0, tempString.length - 8));
  }

  return dateArray;
}

function parseData(bnbData){

  console.log(bnbData.Data.Data[0].time)
  console.log(bnbData.Data.Data)

  let timeArray = [];
  let priceArray = [];

  bnbData.Data.Data.forEach(data => {
    timeArray.push(data.time);
    priceArray.push(data.high)
  });

  console.log(convertUnixTimeStampArrayToDateArray(timeArray));
  console.log(priceArray);

  prepareChart(convertUnixTimeStampArrayToDateArray(timeArray), priceArray);
}

async function getBnbDataFromApi(){
  const BNB_URL = "https://min-api.cryptocompare.com/data/v2/histoday?fsym=BNB&tsym=USD&limit=30";
  const BNBresponse = await fetch(BNB_URL);
  var bnbData = await BNBresponse.json();

  parseData(bnbData);
}

getBnbDataFromApi();
