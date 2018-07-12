$( document ).ready(function() {
  drawBarChart([1, 7, 3, 1, 2, 5, 6, 8, 1, 1, 1, 18], {}, '.chart');
});



function drawBarChart(data, options, element) {
  // data:
  //   [ {x, height, colour}, ... ]
  // options:
  //   {defaultColour, barWidth, }
  
  $( element ).width(determineChartWidth(data, options));
  $( element ).height(determineChartHeight(data, options));


  for (let i in data) {
    let height = data[i];
    let barId = 'bar' + i;
    $( element ).append(
      '<div id="' + barId + '" style="width: 10px; height: 0px; background-color: darkslategrey; position: absolute; bottom: 0px; left: ' + (+i) * 20 + 'px;"></div>'
    );
    $( '#' + barId ).animate({
      height: 10 * height + 'px',
    });
  }
}

function determineChartWidth(data, options) {
  let numBars = data.length;
  let barWidth = options.barWidth || 10;
  let barGap = options.barGap || 10;
  let padding = options.padding || 0;

  return numBars * barWidth + (numBars - 1) * barGap + 2 * padding;
}

function determineChartHeight(data, options) {
  let maxHeight = Math.max(0, ...data);
  let minHeight = Math.min(0, ...data);
  let padding = options.padding || 0;

  console.log(maxHeight);
  console.log(minHeight);
  console.log(10 * (maxHeight - minHeight + padding));
  return 10 * (maxHeight - minHeight + padding);
}