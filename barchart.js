$( document ).ready(function() {
  drawBarChart([1, 7, 3, 1, 2, 5, 6, 8], {}, '.chart');
});

function drawBarChart(data, options, element) {
  // data:
  //   [ {x, height, colour}, ... ]
  // options:
  //   {defaultColour, barWidth, }

  /*let barWidth = options.barWidth || 10;*/

  for (let i in data) {
    let height = data[i];
    let barId = 'bar' + i;
    $( element ).append(
      '<div id="' + barId + '" style="width: 10px; height: 0px; background-color: darkslategrey; position: absolute; bottom: 10px; left: ' + (+i + 1) * 20 + 'px;"></div>'
    );
    $( '#' + barId ).animate({
      height: 10 * height + 'px',
    });
  }
}
