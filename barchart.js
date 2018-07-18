$( document ).ready(function() {
  drawBarChart([1, 2, 3], {}, '#chart1');  // this chart will get erased by the next one
  drawBarChart([-1, -3, -5, -2], {padding: 50, barGapRatio: 0.000001}, '#chart1');

  drawBarChart([1, 7, 3, 1, 2, 5, -10, 8, 1, 1, 1, 18, 2], {barGapRatio: 0.95, backgroundColourInherit: true}, '#chart2');

  drawBarChart([13, -8, 5, -3, 2, -1, 1, 0, 1, 1, 2, 3, 5, 8, 13], {backgroundColour: 'rgb(125, 200, 237)', displayXAxis: false}, '#chart3');
  
  drawBarChart([0, 1, 8, 27, 64], {backgroundColour: 'rgb(175, 35, 65)', displayXAxis: false, displayYAxis: false}, '#chart4');

  drawBarChart([1, 2, 3, 2, 3, 1, 3, 2, 3, 1, 2, 1, 3, 1, 3, 2, 3, 1, 2, 1, 2, 3, 2, 1, 3, 1, 2, 1, 3, 1, 3, 2], {backgroundColour: 'rgb(60, 180, 140)', padding: 25}, '#chart5');

  drawBarChart([1, 3], {backgroundColour: 'rgb(200, 100, 5)', barGapRatio: 0.4}, '#chart6');
});

const BAR_CHART_DEFAULTS = {
  barGapRatio: 0.6,                   // bars slightly wider than gaps
  padding: 10,
  backgroundColour: 'darkslategrey',
  defaultBarColour: 'auto',
  displayXAxis: true,
  displayYAxis: true,
};

class BarChart {
  constructor(data, options, element) {
    // first destroy DOM child elements previously created by a bar chart
    $( element + '> [id^="barChart"]').remove();

    // generate (very likely) unique id to avoid collisions with other charts on page
    this.id = this.generateId();

    this.data = data;
    this.numBars = data.length;
    this.element = element;

    // set options according to user or defaults
    if (!options.backgroundColourInherit) { $( element ).css('background-color', options.backgroundColour || BAR_CHART_DEFAULTS.backgroundColour); }
    this.defaultBarColour = options.defaultBarColour || BAR_CHART_DEFAULTS.defaultBarColour;
    this.backgroundColour = $( element ).css('background-color');
    if (this.defaultBarColour == 'auto') { this.defaultBarColour = this.calcAutoBarColour(); }
    this.padding = (options.padding >= 0) ? options.padding : BAR_CHART_DEFAULTS.padding;
    this.barGapRatio = (options.barGapRatio > 0 && options.barGapRatio <= 1) ? options.barGapRatio : BAR_CHART_DEFAULTS.barGapRatio;
    this.displayXAxis = (typeof options.displayXAxis == 'boolean') ? options.displayXAxis : BAR_CHART_DEFAULTS.displayXAxis;
    this.displayYAxis = (typeof options.displayYAxis == 'boolean') ? options.displayYAxis : BAR_CHART_DEFAULTS.displayYAxis;
    
    // set properties derived from colours
    this.axisBackgroundColour = this.RGBArrayToString(this.contrastingShade(this.RGBStringToArray(this.backgroundColour), 0.25));

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
    this.drawBars();
    this.drawAxes();
  }

  drawBars() {
    for (let i in this.data) {
      // set left side
      let leftPx = this.padding + i * this.barSpacing;
      if (this.displayYAxis) { leftPx += (1 - this.barGapRatio) * this.barSpacing; }
      // set width
      let widthPx = Math.ceil(Math.max(1, this.barWidth));
      let horizontalPos = 'left: ' + leftPx + 'px; width: ' + widthPx + 'px; ';

      // set height
      let height = this.data[i];
      let verticalPos;
      if (height >= 0) {
        verticalPos = 'bottom: ' + this.xAxisFromBottom + 'px; height: 0px; ';
      } else {
        verticalPos = 'top: ' + this.xAxisFromTop + 'px; height: 0px; ';
      }

      // create DOM element
      let barId = this.id + '-bar' + i;
      let barColour = this.defaultBarColour;
      $( this.element ).append(
        '<div id="' + barId + '" style="background-color: ' + barColour + '; position: absolute; ' + horizontalPos + verticalPos + '"></div>'
      );
      // determine height of bar in pixels: take absolute value in case bar is negative;
      //   - also make sure to draw at least one pixel (for bars with 0 height), or two if drawing axis (which takes up one pixel itself)
      let minHeight = this.displayXAxis ? 2 : 1;
      let heightPx = Math.ceil(Math.max(minHeight, Math.abs(height) * this.verticalScale));
      $( '#' + barId ).animate({
        height: heightPx + 'px',
      });
    }
  }

  drawAxes() {
    let axisWidth, axisHeight, axisId, axisBackgroundColour;

    // x-axis
    if (this.displayXAxis) {
      axisWidth = this.width;
      axisHeight = 1;
      axisId = this.id + '-yAxis';
      axisBackgroundColour = this.RGBArrayToString(this.contrastingShade(this.RGBStringToArray($( this.element ).css('background-color')), 0.25));
      $( this.element ).append(
        '<div id="' + axisId + '" style="background-color:' + axisBackgroundColour +'; position: absolute; left:' + this.padding + 'px; bottom:' + this.xAxisFromBottom + 'px; width: ' + axisWidth + 'px; height: ' + axisHeight + 'px;"></div>'
      );
    }

    // y-axis
    if (this.displayYAxis) {
      axisWidth = 1;
      axisHeight = this.height;
      axisId = this.id + '-yAxis';
      axisBackgroundColour = this.RGBArrayToString(this.contrastingShade(this.RGBStringToArray($( this.element ).css('background-color')), 0.25));
      $( this.element ).append(
        '<div id="' + axisId + '" style="background-color:' + axisBackgroundColour +'; position: absolute; left:' + this.padding + 'px; bottom:' + this.padding + 'px; width: ' + axisWidth + 'px; height: ' + axisHeight + 'px;"></div>'
      );
    }
  }

  // create ID using random string of hexadecimal characters
  generateId() {
    return 'barChart-' + this.randomHexString(10);
  }

  randomHexString(length) {
    let s = '';
    for (let i = 0; i < length; i++) {
      s += this.randomHexChar();
    }
    return s;
  }
  
  randomHexChar() {
    let r = Math.floor(Math.random() * 16);
    return (r < 10) ? r : String.fromCharCode(97 + r);
  }
  
  //  calculate horizontal spacing ("units") between bars:
  //    - each unit is (bar + gap), so there are (#bars - 1) units followed by the last bar
  //    - if drawing axes, put an extra gap before and after, so (#bars) units followed by a gap
  calcBarSpacing() {
    if (this.displayYAxis) {
      return this.width / (this.numBars + 1 - this.barGapRatio);
    } else {
      return this.width / (this.numBars - 1 + this.barGapRatio);
    }
  }

  //  calculate scale for transforming y values to actual pixels:
  //    - if all bars are positive (resp. negative), the lowest (resp. greatest) height is 0
  calcVerticalScale() {
    let heightDiff = this.maxHeight - this.minHeight || 1;  // avoid division by zero
    return this.height / heightDiff;
  }

  //  find a nice colour based on background: shift hue (say by 60˚), choose contrasting luminance (say with a lum. difference of 0.5)
  calcAutoBarColour() {
    let hueShift = 30;
    let lumDiff = 0.5;

    let bg = this.RGBStringToArray(this.backgroundColour);
    let hsv = this.RGBtoHSV(bg);
    hsv[0] = (hsv[0] + hueShift) % 360;

    let lum = this.luminance(bg);
    let targetLum = lum + lumDiff * ((lum < 0.5) ? 1 : -1);
    return this.RGBArrayToString(this.shiftLuminance(this.HSVtoRGB(hsv), targetLum));
  }

  clamp(x, min, max) {
    return Math.max(min, Math.min(x, max));
  }

  //  --------------------------
  //       colour functions
  //  --------------------------
  
  // extract RGB array from CSS, e.g., 'rgb(0, 255, 255)' to [0, 255, 255]
  RGBStringToArray(str) {
    let rgb = str.replace(/[rgb()]/g, '').split(', ');
    rgb = rgb.map(n => parseInt(n));
    return rgb;
  }

  RGBArrayToString(rgb) {
    return 'rgb(' + rgb.map( x => Math.round(x) ).join(',') + ')';
  }

  // see e.g. Wikipedia article on HSV
  RGBtoHSV(rgb) {
    let [r, g, b] = rgb.map( n => n / 255 );
    let M = Math.max(r, g, b);
    let m = Math.min(r, g, b);
    let c = M - m;
    let h6 = 0;    // default 0 in case c = 0
    if (c > 0) {
      if (M == r) {
        h6 = ((g - b) / c + 6) % 6;
      } else if (M == g) {
        h6 = (b - r) / c + 2;
      } else {  // M == b
        h6 = (r - g) / c + 4;
      }
    }
    let h360 = h6 * 60;
    let s = (M > 0) ? c / M : 0;
    let v = M;

    return [h360, s, v];
  }

  // see e.g. Wikipedia article on HSV
  HSVtoRGB(hsv) {
    let rgb;

    let [h360, s, v] = hsv;
    let c = s * v;
    let h6 = h360 / 60;   // scale down from [0, 360) to [0, 6)
    let x = c * (1 - Math.abs(h6 % 2 - 1));
    if (h6 <= 1) {
      rgb = [c, x, 0];
    } else if (h6 <= 2) {
      rgb = [x, c, 0];
    } else if (h6 <= 3) {
      rgb = [0, c, x];
    } else if (h6 <= 4) {
      rgb = [0, x, c];
    } else if (h6 <= 5) {
      rgb = [x, 0, c];
    } else {  // h <= 6
      rgb = [c, 0, x];
    }
    rgb = rgb.map( n => Math.floor((n + v - c) * 255) );

    return rgb;
  }

  // calculate luminance on scale of 0 to 1. Luminance can be approximated as 0.30r + 0.59g + 0.11b (the human eye is sensitive to green but not blue)
  luminance(rgb) {
    return (0.3 * rgb[0] + 0.59 * rgb[1] + 0.11 * rgb[2]) / 255;
  }

  // find tint or shade with given luminance; retain hue
  shiftLuminance(rgb, targetLum) {
    let shiftedRGB;

    targetLum = this.clamp(targetLum, 0, 1);
    let lum = this.luminance(rgb);
    if (targetLum < lum) {  // we need to darken, i.e., k * rgb + (1 - k) * black
      let k = targetLum / lum;
      shiftedRGB = rgb.map( x => k * x);
    } else {                // we need to lighten, i.e., k * rgb + (1 - k) * white
      let k = (lum == 1) ? 1 : (targetLum - 1) / (lum - 1);
      shiftedRGB = rgb.map( x => k * x + (1 - k) * 255);
    }
    shiftedRGB = shiftedRGB.map( x => this.clamp(x, 0, 255) );

    return shiftedRGB;
  }

  // find a contrasting tint or shade, retaining hue. In particular, find colour that differs in luminance by lumDiff (between 0 and 1).
  //    - N.B. a difference of greater than 0.5 is not always possible (e.g., if colour is mid-grey); cut off at pure white or pure black
  //    - since we're using a simple linear model of luminance, we have luminance(k * rgb1 + rgb2) = k * luminance(rgb1) + luminance(rgb2)
  contrastingShade(rgb, lumDiff) {
    lumDiff = this.clamp(lumDiff, 0, 1);
    let lum = this.luminance(rgb);
    let targetLum = lum + lumDiff * ((lum < 0.5) ? 1 : -1); // if rgb is dark, target light colour, and vice-versa
    
    return this.shiftLuminance(rgb, targetLum);
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

