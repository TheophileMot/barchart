$( document ).ready(function() {
  drawBarChart([1, 7, 3, 1, 2, 5, 6, 8, 1, 1, 1, 18, 2], {}, '.chart');
});

const BAR_CHART_DEFAULTS = {
  barGapRatio: 0.6, // bars slightly wider than gaps
  padding: 15,
};

function drawBarChart(data, options, element) {
  // data:
  //   [ {x, height, colour}, ... ]
  // options:
  //   {defaultColour, barWidth, }
  
  //$( element ).width(determineChartWidth(data, options));
  //$( element ).height(determineChartHeight(data, options));

  $( element ).prop('verticalScale', calcVerticalScale(data, options, element));

  let barGapRatio = options.barGapRatio || BAR_CHART_DEFAULTS.barGapRatio;
  let barSpacing = calcBarSpacing(data, options, element);
  let barWidth = barSpacing * barGapRatio;
  let padding = options.padding || BAR_CHART_DEFAULTS.padding;

  for (let i in data) {
    let height = data[i];
    let barId = 'bar' + i;
    let leftPos = padding + i * barSpacing;
    $( element ).append(
      '<div id="' + barId + '" style="width: ' + barWidth + 'px; height: 0px; background-color: darkslategrey; position: absolute; bottom: 0px; left: ' + leftPos + 'px;"></div>'
    );
    $( '#' + barId ).animate({
      height: 10 * height + 'px',
    });
  }
}

//  calculate scale for transforming y values to actual pixels:
//    this depends on the heights of the bars; if all bars are positive (resp. negative), the lowest (resp. greatest) height is 0
function calcVerticalScale(data, options, element) {
  let padding = $.isNumeric(options.padding) ? options.padding : BAR_CHART_DEFAULTS.padding;
  let maxHeight = Math.max(0, ...data);
  let minHeight = Math.min(0, ...data);
  let heightDiff = maxHeight - minHeight || 1;  // avoid division by zero

  return ($( element ).height() - 2 * padding) / heightDiff;
}

//  calculate horizontal spacing ("units") between bars:
//    total available width is (element width - 2 * padding)
//    each unit is (bar + gap), so there are (#bars - 1) units followed by the last bar
function calcBarSpacing(data, options, element) {
  let numBars = data.length;
  let barGapRatio = options.barGapRatio || BAR_CHART_DEFAULTS.barGapRatio;
  let padding = options.padding || BAR_CHART_DEFAULTS.padding;

  return ($( element ).width() - 2 * padding) / (numBars - 1 + barGapRatio);
}

/*function determineChartWidth(data, options) {
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

  return 10 * (maxHeight - minHeight + padding);
}*/