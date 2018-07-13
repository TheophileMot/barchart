$( document ).ready(function() {
  drawBarChart([1], {}, '.chart');
  drawBarChart([1, 7, 3, 1, 2, 5, -10, 8, 1, 1, 1, 18, 2], {barGapRatio: 0.9}, '.chart');
});

const BAR_CHART_DEFAULTS = {
  barGapRatio: 0.6, // bars slightly wider than gaps
  padding: 10,
};

class BarChart {
  constructor(data, options, element) {
    // first destroy DOM child elements previously created by a bar chart
    $( element + '> [id^="bar"]').remove();

    this.data = data;
    this.element = element;

    // set options according to user or defaults
    this.padding = (options.padding >= 0) ? options.padding : BAR_CHART_DEFAULTS.padding;
    this.barGapRatio = (options.barGapRatio > 0 && options.barGapRatio <= 1) ? options.barGapRatio : BAR_CHART_DEFAULTS.barGapRatio;

    this.numBars = data.length;

    // set dimensions of chart, excluding padding
    this.width = $( element ).width() - 2 * this.padding;
    this.height = $( element ).height() - 2 * this.padding;

    // set properties derived from dimensions
    this.barSpacing = this.calcBarSpacing();
    this.barWidth = this.barSpacing * this.barGapRatio;
    this.maxHeight = Math.max(0, ...this.data);
    this.minHeight = Math.min(0, ...this.data);
    this.verticalScale = this.calcVerticalScale(element);
    this.xAxisFromBottom = this.padding + (-this.minHeight) * this.verticalScale;
    this.xAxisFromTop = this.padding + this.maxHeight * this.verticalScale;
  }

  draw() {
    for (let i in this.data) {
      let height = this.data[i];
      let barId = 'bar' + i;
      let horizontalPos = 'left: ' + (this.padding + i * this.barSpacing) + 'px; width: ' + this.barWidth + 'px; ';
      let verticalPos;
      if (height >= 0) {
        verticalPos = 'bottom: ' + this.xAxisFromBottom + 'px; height: 0px; ';
      } else {
        verticalPos = 'top: ' + this.xAxisFromTop + 'px; height: 0px; ';
      }      
      $( this.element ).append(
        '<div id="' + barId + '" style="background-color: lightgoldenrodyellow; position: absolute; ' + horizontalPos + verticalPos + '"></div>'
      );
      $( '#' + barId ).animate({
        height: Math.abs(height) * this.verticalScale + 'px', // make sure to take absolute value of height in case bar is negative
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
    let heightDiff = this.maxHeight - this.minHeight || 1;  // avoid division by zero
    return this.height / heightDiff;
  }

  //  transform on y-axis from bar to element, including padding
  verticalTransform(y) {
    return this.padding + y * this.verticalScale - this.minHeight;
  }
}

function drawBarChart(data, options, element) {
  // data:
  //   [ {x, height, colour}, ... ]
  // options:
  //   {defaultColour, barWidth, }
  
  let barChart = new BarChart(data, options, element);
  $( element ).prop('barChart', barChart);

  barChart.draw();
}

