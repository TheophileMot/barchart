$( document ).ready(function() {
  drawBarChart([1, 7, 3, 1, 2, 5, 6, 8, 1, 1, 1, 18, 2], {}, '.chart');
});

const BAR_CHART_DEFAULTS = {
  barGapRatio: 0.6, // bars slightly wider than gaps
  padding: 15,
};

class BarChart {
  constructor(data, options, element) {
    this.data = data;
    this.element = element;

    // set options according to user or defaults
    this.padding = (options.padding >= 0) ? options.padding : BAR_CHART_DEFAULTS.padding;
    this.barGapRatio = (options.barGapRatio > 0 && this.barGapRatio <= 1) ? options.barGapRatio : BAR_CHART_DEFAULTS.barGapRatio;

    // set dimensions of chart, excluding padding
    this.width = $( element ).width() - 2 * this.padding;
    this.height = $( element ).height() - 2 * this.padding;

    this.numBars = data.length;

    this.barSpacing = this.calcBarSpacing();
    this.barWidth = this.barSpacing * this.barGapRatio;
    this.verticalScale = this.calcVerticalScale(element);
  }

  draw() {
    for (let i in this.data) {
      let height = this.data[i];
      let barId = 'bar' + i;
      let leftPos = this.padding + i * this.barSpacing;
      $( this.element ).append(
        '<div id="' + barId + '" style="width: ' + this.barWidth + 'px; height: 0px; background-color: darkslategrey; position: absolute; bottom: 0px; left: ' + leftPos + 'px;"></div>'
      );
      $( '#' + barId ).animate({
        height: 10 * height + 'px',
      });
    }  
  }
  
  //  calculate horizontal spacing ("units") between bars:
  //    each unit is (bar + gap), so there are (#bars - 1) units followed by the last bar
  calcBarSpacing() {
    return this.width / (this.numBars - 1 + this.barGapRatio);
  }

  //  calculate scale for transforming y values to actual pixels:
  //    this depends on the heights of the bars; if all bars are positive (resp. negative), the lowest (resp. greatest) height is 0
  calcVerticalScale() {
    let maxHeight = Math.max(0, ...this.data);
    let minHeight = Math.min(0, ...this.data);
    let heightDiff = maxHeight - minHeight || 1;  // avoid division by zero

    return this.height / heightDiff;
  }
}

function drawBarChart(data, options, element) {
  // data:
  //   [ {x, height, colour}, ... ]
  // options:
  //   {defaultColour, barWidth, }
  
  //$( element ).width(determineChartWidth(data, options));
  //$( element ).height(determineChartHeight(data, options));

  let barChart = new BarChart(data, options, element);
  $( element ).prop('barChart', barChart);

  barChart.draw();
}

