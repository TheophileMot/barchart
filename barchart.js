$( document ).ready(function() {
  drawBarChart([[1, 1, 2, 2, 3, 3], [2, 3, 1, 3, 1, 2], [3, 2, 3, 1, 2, 1], ['armadillo', 'barracuda', 'chinchilla', 'dolphin', 'echidna', 'falcon']], {animateBars: false, caption: 'multiple data series'}, '#chart0');
  drawBarChart([[1, 1, 2, 2, 3, 3], [2, 3, 1, 3, 1, 2], [3, 2, 3, 1, 2, 1]], {animateBars: false, caption: 'multiple data series'}, '#chart1');

  drawBarChart([[1, 2, 3]], {caption: 'you won\'t see this'}, '#chart2');  // this chart will get erased by the next one
  drawBarChart([[-8, -13, -5, -2, -19, -3, -1, -4]], {displayHeightLabels: false, displayAxes: false, padding: 5, barGroupGapRatio: 0.000001, caption: '<p>previous chart here was automatically erased (see source)</p><p>and now there are some very slow thin lines: bar-to-gap ratio is <em>almost</em> 0</p>', captionSize: 12, titleSize: 15, titlePadding: 5, animationLength: 20000, randomSpeed: true}, '#chart2');
  drawBarChart([[1, 7, 0, 1, 2, 5, -10, 8, 18, 2]], {barGroupGapRatio: 0.9, backgroundColourInherit: true, displayHeightLabels: false, caption: 'background colour inherited from page CSS (as opposed to bar chart defaults)', animationLength: 500}, '#chart3');
  drawBarChart([[13, -8, 5, -3, 2, -1, 1, 0, 1, 1, 2, 3, 5, 8, 13]], {backgroundColour: 'rgb(162, 152, 112)', displayAxes: false, barGroupGapRatio: 0.8, animateHeightLabels: false, caption: 'these number labels don\'t change during the animation', captionPadding: 0, titleSize: 15, titlePadding: 0, titleColour: 'rgb(0,50,0)'}, '#chart4');
  
  drawBarChart([[1, 2, 3, 2, 3, 1, 3, 2, 3, 1, 2, 1, 3, 1, 3, 2, 3, 1, 2, 1, 2, 3, 2, 1, 3, 1, 2, 1, 3, 1, 3, 2, 3, 1, 2, 1, 2, 3, 2, 1, 2, 3, 1, 3, 2, 3, 2, 1, 3, 1, 2, 1, 2, 3, 2, 1, 3, 1, 2, 1, 3, 1, 3, 2]], {backgroundColour: 'rgb(60, 180, 140)', barGapRatio: 1, barGroupGapRatio: 1, padding: 0, animateBars: false, displayHeightLabels: false}, '#chart5');  
  drawBarChart([[0, 1, 8, 27, 64]], {title: 'whole numbers', caption: 'even though some inputs have 2 sig. figs, all inputs are integers: thus, animated numbers are restricted to integers as well (so we won\'t see 0.9, say, even though it has only 1 sig. fig.)', captionSize: 12, captionPadding: 2, backgroundColour: 'rgb(175, 35, 65)', displayYAxis: false}, '#chart6');
  drawBarChart([[10000, 30000]], {title: 'clean numbers', caption: 'input has 1 sig. fig., so animated labels have only up to 2', backgroundColour: 'rgb(120, 100, 165)', barGroupGapRatio: 0.8}, '#chart7');
  drawBarChart([[10000, 30000.1]], {title: 'messy numbers', caption: 'input has 6 sig. figs, so animated labels have up to 7', backgroundColour: 'rgb(120, 100, 165)', barGroupGapRatio: 0.8}, '#chart8');
  
  drawBarChart([Array(10).fill(100)], {title: 'and they\'re off!', caption: 'Note how the labels and heights of each bar grow at the same random rate. A cute effect.', backgroundColour: 'rgb(162, 146, 122)', displayAxes: false, randomSpeed: true}, '#chart9');
  drawBarChart([Array(10).fill(100)], {title: 'and they\'re off?', caption: 'Note how the labels and heights of each bar grow at different random rates. A precious effect, not to be overused.', backgroundColour: 'rgb(164, 132, 110)', displayAxes: false, randomBarSpeed: true, randomHeightLabelSpeed: true}, '#chart10');
  
  drawBarChart([[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]], {title: 'the perils of user customization', titleColour: 'rgb(250, 0, 0)', titleBackgroundColour: 'rgb(0, 150, 0)', titleSize: 25, caption: 'when in doubt, trust the default settings', captionColour: 'rgb(200,230,240)', captionBackgroundColour: 'rgb(240,230,220)', captionSize: 6, defaultBarColour: 'rgb(0,0,30)', labelColourFunction:()=>'rgb('+Math.random()*255+','+Math.random()*255+','+Math.random()*255+')', backgroundColour: 'rgb(24, 12, 30)', randomBarSpeed: true, randomHeightLabelSpeed: true}, '#chart11');
  drawBarChart([[7, 3, 2, 1, -1], [3, 1, 5, -2, 1], [1, 2, 3, 4, 5]], {backgroundColour: 'rgb(255, 255, 0)', title: 'extreme colours like pure yellow are often hard to work with...', caption: '...but the default settings still do a decent job'}, '#chart12');
});

const BAR_CHART_DEFAULTS = {
  barGroupGapRatio: 0.7,                   // bar groups slightly wider than gaps
  barGapRatio: 1,                          // bars take up full width in their groups
  padding: 10,
  backgroundColourInherit: false,
  backgroundColour: 'rgb(60, 120, 180)',
  defaultBarColour: 'auto',
  displayAxes: true,                  // overrides next two options
  displayXAxis: true,
  displayYAxis: true,
  displayHeightLabels: true,
  displayDataLabels: true,
  labelColourFunction: 'auto',
  animateBars: true,
  animateHeightLabels: true,
  animationLength: 2000,
  randomSpeed: false,                 // when true, bars and height labels grow at same (random) speed...
  randomBarSpeed: false,              // ... whereas this line and the next make independent random speeds
  randomHeightLabelSpeed: false,
  title: '',
  titleSize: 20,
  titleColour: 'auto',
  titleBackgroundColour: 'auto',
  titlePadding: 25,
  caption: '',
  captionSize: 15,
  captionColour: 'auto',
  captionBackgroundColour: 'auto',
  captionPadding: 10,
};

class BarChart {
  constructor(data, options, element) {
    // first destroy DOM child elements previously created by a bar chart
    $( element + '> [id^="barChart"]').remove();

    // generate (very likely) unique id to avoid collisions with other charts on page
    this.id = this.generateId();

    this.data = data;
    this.options = options;
    this.element = element;

    this.numDataSeries = this.calcNumDataSeries();
    this.setOptions();
  }

  calcNumDataSeries() {
    return this.data.length - ((typeof this.data[this.data.length - 1][0] == 'string') ? 1 : 0);  // look at first entry of last array: if it's a string, the last array isn't a data series but labels
  }

  setOptions() {
    let options = this.options;
    let element = this.element;
    
    this.barGroupGapRatio = (options.barGroupGapRatio > 0 && options.barGroupGapRatio <= 1) ? options.barGroupGapRatio : BAR_CHART_DEFAULTS.barGroupGapRatio;
    this.barGapRatio = (options.barGapRatio > 0 && options.barGapRatio <= 1) ? options.barGapRatio : BAR_CHART_DEFAULTS.barGapRatio;
    this.padding = (options.padding >= 0) ? options.padding : BAR_CHART_DEFAULTS.padding;
    if (!BAR_CHART_DEFAULTS.backgroundColourInherit && !options.backgroundColourInherit) {  // if not inheriting, manually set colour (overriding backgroundColour option)
      $( element ).css('background-color', options.backgroundColour || BAR_CHART_DEFAULTS.backgroundColour);
    }
    this.backgroundColour = $( element ).css('background-color');
    this.defaultBarColour = options.defaultBarColour || BAR_CHART_DEFAULTS.defaultBarColour;
    if (this.defaultBarColour == 'auto') { this.defaultBarColour = this.calcAutoBarColour(); }
    if (!Array.isArray(this.defaultBarColour)) { this.defaultBarColour = Array(this.numDataSeries).fill(this.defaultBarColour); }
    this.displayAxes = (typeof options.displayAxes == 'boolean') ? options.displayAxes : BAR_CHART_DEFAULTS.displayAxes;
    this.displayXAxis = this.displayAxes && ((typeof options.displayXAxis == 'boolean') ? options.displayXAxis : BAR_CHART_DEFAULTS.displayXAxis);
    this.displayYAxis = this.displayAxes && ((typeof options.displayYAxis == 'boolean') ? options.displayYAxis : BAR_CHART_DEFAULTS.displayYAxis);
    this.displayHeightLabels = (typeof options.displayHeightLabels == 'boolean') ? options.displayHeightLabels : BAR_CHART_DEFAULTS.displayHeightLabels;
    this.displayDataLabels = (typeof options.displayDataLabels == 'boolean') ? options.displayDataLabels : BAR_CHART_DEFAULTS.displayDataLabels;
    if (this.numDataSeries == this.data.length) { this.displayDataLabels = false; }  // don't display data labels if there aren't any
    this.labelColourFunction = options.labelColourFunction || BAR_CHART_DEFAULTS.labelColourFunction;
    if (this.labelColourFunction == 'auto') { this.labelColourFunction = this.autoLabelColour; }
    
    this.animateBars = (typeof options.animateBars == 'boolean') ? options.animateBars : BAR_CHART_DEFAULTS.animateBars;
    this.animateHeightLabels = (typeof options.animateHeightLabels == 'boolean') ? options.animateHeightLabels : BAR_CHART_DEFAULTS.animateHeightLabels;
    this.animationLength = options.animationLength || BAR_CHART_DEFAULTS.animationLength;
    this.randomSpeed = (typeof options.randomSpeed == 'boolean') ? options.randomSpeed : BAR_CHART_DEFAULTS.randomSpeed;
    this.randomBarSpeed = (typeof options.randomBarSpeed == 'boolean') ? options.randomBarSpeed : BAR_CHART_DEFAULTS.randomBarSpeed;
    this.randomHeightLabelSpeed = (typeof options.randomHeightLabelSpeed == 'boolean') ? options.randomHeightLabelSpeed : BAR_CHART_DEFAULTS.randomHeightLabelSpeed;

    this.title = options.title || BAR_CHART_DEFAULTS.title;
    this.titleSize = options.titleSize || BAR_CHART_DEFAULTS.titleSize;
    this.titleColour = options.titleColour || BAR_CHART_DEFAULTS.titleColour;
    if (this.titleColour == 'auto') { this.titleColour = this.calcAutoBarColour()[0]; }  // choose same colour as bars (from first data series) by default
    this.titleBackgroundColour = options.titleBackgroundColour || BAR_CHART_DEFAULTS.titleBackgroundColour;
    if (this.titleBackgroundColour == 'auto') { this.titleBackgroundColour = this.calcAutoBackgroundColour(this.titleColour);}
    this.titlePadding = this.title ? ((options.titlePadding >= 0) ? options.titlePadding : BAR_CHART_DEFAULTS.titlePadding) : 0;
    
    this.caption = options.caption || BAR_CHART_DEFAULTS.caption;
    this.captionSize = options.captionSize || BAR_CHART_DEFAULTS.captionSize;
    this.captionColour = options.captionColour || BAR_CHART_DEFAULTS.captionColour;
    if (this.captionColour == 'auto') { this.captionColour = this.titleColour; }      // choose same colour as title (which itself will usually be same as bars)
    this.captionBackgroundColour = options.captionBackgroundColour || BAR_CHART_DEFAULTS.captionBackgroundColour;
    if (this.captionBackgroundColour == 'auto') { this.captionBackgroundColour = this.calcAutoBackgroundColour(this.captionColour); }      // choose same colour as title (which itself will usually be same as bars)
    this.captionPadding = this.caption ? ((options.captionPadding >= 0) ? options.captionPadding : BAR_CHART_DEFAULTS.captionPadding) : 0;
  }

  draw() {
    this.drawTitle();
    this.drawCaption();
    this.setDerivedProperties();    //  set properties that depend on how elements are rendered (e.g., because title and caption affect remaining rendering space)

    this.drawBars();
    this.drawAxes();
    this.drawDataLabels();
    this.drawHeightLabels();
    this.animate();
  }
  
  drawTitle() {
    let titleId = this.id + '-title';

    let titleOptions = {
      color: this.titleColour,
      backgroundColor: this.titleBackgroundColour,
      fontSize: this.titleSize,
      position: 'absolute',
      textAlign: 'center',
      left: 0,
      top: 0,
      width: $( this.element ).width(),
      padding: this.titlePadding,
      boxSizing: 'border-box',  // so that padding doesn't make DIV grow
    };
    let contents = this.title;

    this.createRectangle(titleId, titleOptions, contents);
  }

  drawCaption() {
    let captionId = this.id + '-caption';

    let captionOptions = {
      color: this.captionColour,
      backgroundColor: this.captionBackgroundColour,
      fontSize: this.captionSize,
      position: 'absolute',
      textAlign: 'center',
      left: 0,
      bottom: 0,
      width: $( this.element ).width(),
      padding: this.captionPadding,
      boxSizing: 'border-box',  // so that padding doesn't make DIV grow
    };
    let contents = this.caption;

    this.createRectangle(captionId, captionOptions, contents);
  }

  setDerivedProperties() {
    let element = this.element;

    // properties of data itself
    this.dataPrecision = this.precision(this.data); // calculate sig. figs; to be used while animating height labels

    // properties derived from colours
    this.axisBackgroundColour = this.contrastingShade(this.backgroundColour, 0.25);

    // dimensions of title and caption
    this.titleWidth = $( '#' + this.id + '-title').outerWidth();
    this.titleHeight = $( '#' + this.id + '-title').outerHeight();
    this.captionWidth = $( '#' + this.id + '-caption').outerWidth();
    this.captionHeight = $( '#' + this.id + '-caption').outerHeight();

    // dimensions of chart, excluding padding
    this.chartWidth = $( element ).width() - 2 * this.padding;
    this.chartHeight = $( element ).height() - 2 * this.padding - this.titleHeight - this.captionHeight;

    // properties derived from dimensions
    this.barGroupSpacing = this.calcBarGroupSpacing();
    this.barGroupWidth = Math.ceil(Math.max(1, this.barGroupSpacing * this.barGroupGapRatio));
    this.barWidth = this.barGroupWidth * this.barGapRatio / this.numDataSeries;
    this.barSpacing = this.calcBarSpacing();
    this.maxBarYValue = this.calcMaxBarYValue();
    this.minBarYValue = this.calcMinBarYValue();
    this.verticalScale = this.calcVerticalScale();
    this.xAxisFromBottom = this.padding + (-this.minBarYValue) * this.verticalScale + this.captionHeight;
    this.xAxisFromTop = this.padding + this.maxBarYValue * this.verticalScale + this.titleHeight;
  }

  drawBars() {
    for (let i = 0; i < this.numDataSeries; i++) {
      let dataGroup = this.data[i];
      for (let j in dataGroup) {
        let barId = this.id + '-bar' + i + '-' + j;
        let barOptions = {
          backgroundColor: this.defaultBarColour[i],
          position: 'absolute',
          left: this.barLeftPos(i, j),
          width: this.barWidth,
          bottom: (dataGroup[j] >= 0) ? this.xAxisFromBottom : undefined,
          top: (dataGroup[j] < 0) ? this.xAxisFromTop : undefined,
          height: this.animateBars ? 0 : this.heightInPixels(dataGroup[j]),
        };
        this.createRectangle(barId, barOptions);
      }
    }
  }

  drawAxes() {
    const lumDiff = 0.25;
    let axisColour = this.contrastingShade($( this.element ).css('background-color'), lumDiff);
    
    // x-axis
    if (this.displayXAxis) {
      let axisId = this.id + '-xAxis';
      let axisOptions = {
        position: 'absolute',
        left: this.padding,
        width: this.chartWidth,
        bottom: this.yTransform(0), // == this.xAxisFromBottom
        height: 1,
        backgroundColor: axisColour,
      };
      this.createRectangle(axisId, axisOptions);
    }

    // y-axis
    if (this.displayYAxis) {
      let axisId = this.id + '-yAxis';
      let axisOptions = {
        position: 'absolute',
        left: this.padding,
        width: 1,
        bottom: this.yTransform(this.minBarYValue),
        height: this.chartHeight,
        backgroundColor: axisColour,
      };
      this.createRectangle(axisId, axisOptions);
    }
  }

  drawDataLabels() {
    if (this.displayDataLabels) {
      let labels = this.data[this.data.length - 1];
      for (let j in labels) {
        let barColour = $( '#' + this.id + '-bar0-' + j ).css('backgroundColor');
        let labelColour = this.labelColourFunction(barColour, this.backgroundColour);
        let labelBackgroundColour = this.transparentColour(this.backgroundColour, 0.5);  // use semi-transparent background colour for label so that it shows up against bars

        let labelId = this.id + '-dataLabel' + j;
        let labelOptions = {
          fontSize: 15,
          backgroundColor: labelBackgroundColour,
          color: labelColour,
          position: 'absolute',
          bottom: this.xAxisFromBottom - 8,
          textAlign: 'center',
        };
        let rect = this.createRectangle(labelId, labelOptions, labels[j]);
        rect.width(Math.max(rect.width(), this.barGroupWidth)); // if label is short, expand its width to take up whole group
        rect.css('left', this.barLeftPos(0, j) + (this.barGroupWidth - parseFloat(rect.css('width'))) * 0.5);  // wait until here to assign left, since it depends on width (which depends on text)
      }
    }
  }
  
  drawHeightLabels() {
    if (this.displayHeightLabels) {
      for (let i = 0; i < this.numDataSeries; i++) {
        let dataGroup = this.data[i];
        for (let j in dataGroup) {
          let barColour = $( '#' + this.id + '-bar' + i + '-' + j ).css('backgroundColor');
          let labelColour = this.labelColourFunction(barColour, this.backgroundColour);

          let labelId = this.id + '-heightLabel' + i + '-' + j;
          let labelOptions = {
            fontSize: 20,
            color: labelColour,
            position: 'absolute',
            bottom: (dataGroup[j] < 0) ? this.xAxisFromBottom - this.heightInPixels(dataGroup[j]) : undefined,
            top: (dataGroup[j] >= 0) ? this.xAxisFromTop - this.heightInPixels(dataGroup[j]) : undefined,
            textAlign: 'center',
          };
          let rect = this.createRectangle(labelId, labelOptions, dataGroup[j]);
          rect.css('left', this.barLeftPos(i, j) + (this.barWidth - parseFloat(rect.css('width'))) * 0.5);  // wait until here to assign left, since it depends on width (which depends on text)
        }
      }
    }
  }

  yTransform(y, fromTop) {
    if (fromTop) {  // measure downwards
    } else {        // measure upwards (default)
      return y * this.verticalScale + this.xAxisFromBottom;
    }
  }

  animate() {
    if (this.animateBars) {
      for (let i = 0; i < this.numDataSeries; i++) {
        for (let j in this.data[i]) {
          this.animateBar(i, j);
        }
      }
    }
  }

  animateBar(i, j) {
    // store reference to 'this', since scope changes in jQuery animation
    let thisChart = this;
    
    let bar = $( '#' + this.id + '-bar' + i + '-' + j );
    let label = $( '#' + this.id + '-heightLabel' + i + '-' + j );

    let targetHeight = this.heightInPixels(this.data[i][j]);

    let barSpeed = 1;
    let heightLabelSpeed = 1;

    if (this.randomSpeed) {    // same random speed
      barSpeed = 3 * Math.random() + 1;
      if (Math.random() < 0.5) { barSpeed = 1 / barSpeed; }
      heightLabelSpeed = barSpeed;
    }
    if (this.randomBarSpeed) {  // independent random speed
      barSpeed = 3 * Math.random() + 1;
      if (Math.random() < 0.5) { barSpeed = 1 / barSpeed; }
    }
    if (this.randomHeightLabelSpeed) {  // independent random speed
      heightLabelSpeed = 3 * Math.random() + 1;
      if (Math.random() < 0.5) { heightLabelSpeed = 1 / heightLabelSpeed; }
    }

    bar.animate({
      progress: 1,  // fake property that transitions from 0 to 1; use it to calculate height, labels, etc.
    }, {
      duration: this.animationLength,
      step: function() {  // normally the syntax here would be function(now, fx), but since those parameters are unused, ESLint would throw an error
        bar.css('height', Math.pow(this.progress, barSpeed) * targetHeight);

        if (thisChart.displayHeightLabels) {
          if (thisChart.data[i][j] >= 0) {
            label.css('top', thisChart.xAxisFromTop - Math.pow(this.progress, heightLabelSpeed) * targetHeight);
          } else {
            label.css('bottom', thisChart.xAxisFromBottom - Math.pow(this.progress, heightLabelSpeed) * targetHeight);
          }
          // if animating numbers on labels, try to keep roughly same level of information: allow one more significant figure than max in all data, but don't use more decimal places than current bar
          if (thisChart.animateHeightLabels) {
            label.html(thisChart.setPrecisionAndPlaces(this.progress * thisChart.data[i][j], thisChart.dataPrecision + 1, thisChart.decimalPlaces(thisChart.data[i][j])));
          }
        }
      },
      always: function() {
        bar.css('height', targetHeight);
        if (thisChart.displayHeightLabels) {
          if (thisChart.data[i][j] >= 0) {
            label.css('top', thisChart.xAxisFromTop - targetHeight);
          } else {
            label.css('bottom', thisChart.xAxisFromBottom - targetHeight);
          }
          // if animating numbers on labels, try to keep roughly same level of information: allow one more significant figure, but don't use more decimal place
          label.html(thisChart.data[i][j]);
        }
      }
    });
  }


  // determine left side of (i, j)th bar in pixels. If displaying y-axis, account for extra gap that is added before first bar.
  barLeftPos(i, j) {
    let groupLeft = j * this.barGroupSpacing + (this.displayYAxis ? (1 - this.barGroupGapRatio) * this.barGroupSpacing : 0);
    let barLeft = i * this.barSpacing;
    return this.padding + groupLeft + barLeft;
  }

  // given data height, determine bar height in pixels
  // - take absolute value in case bar is negative;
  // - draw at least one pixel (for bars with 0 height), or two if drawing x-axis (which takes up one pixel itself)
  heightInPixels(h) {
    let minHeight = this.displayXAxis ? 2 : 1;
    return Math.ceil(Math.max(minHeight, Math.abs(h) * this.verticalScale));
  }

  // add DIV element to DOM: used for bars and axes
  createRectangle(id, cssOptions, contents) {
    contents = (contents != undefined) ? contents : '';
    $( this.element).append(
      '<div id="' + id + '">' + contents + '</div>'
    );
    let rect = $( '#' + id );
    for (let option in cssOptions) {
      rect.css(option, cssOptions[option]);
    }
    return rect;  // to offer a convenient reference after creation
  }

  // calculate how many significant figures (ignoring trailing zeroes) are in number or array: e.g., -0.03140 has 3 sig. figs
  precision(data) {
    if (typeof data == 'number') {
      let str = data.toString().replace(/[-.]/g,'');  // erase negative sign and decimal point
      str = str.replace(/^0*|0*$/g, '');             // erase leading/trailing zeroes
      return str.length;
    } else if (typeof data == 'string') { // 'precision' of strings (for data labels) is 0, so it won't affect precision of data array
      return 0;
    } else {  // data is an array; return max precision of its elements
      return Math.max(...data.map( x => this.precision(x) ));
    }
  }

  // calculate how many digits are used after decimal point in number or array
  decimalPlaces(data) {
    if (typeof data == 'number') {
      let str = data.toString();
      let decimalPoint = str.indexOf('.');
      if (decimalPoint == -1) {
        return 0;
      } else {
        return str.slice(decimalPoint + 1).length;
      }
    } else if (typeof data == 'string') { // return 0 for data labels
      return 0;
    } else {  // data is an array; return max precision of its elements
      return Math.max(...data.map( x => this.decimalPlaces(x) ));
    }
  }
  
  // round a number to given level of sig. figs, but without exceeding given number of places after decimal point
  setPrecisionAndPlaces(x, precision, decimalPlaces) {
    if  (x == 0) {
      return x;
    } else {
      return parseFloat(parseFloat(x.toPrecision(precision)).toFixed(decimalPlaces));
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
  
  // calculate horizontal spacing ("units") between bar groups:
  //   - each unit is (group + gap), so there are (#groups - 1) units followed by the last group
  //   - if drawing axes, put an extra gap before and after, so (#data) units followed by a gap
  calcBarGroupSpacing() {
    let numData = this.data[0].length;
    if (this.displayYAxis) {
      return this.chartWidth / (numData + 1 - this.barGroupGapRatio);
    } else {
      return this.chartWidth / (numData - 1 + this.barGroupGapRatio);
    }
  }

  // calculate horizontal spacing ("units") between bars within groups:
  //   - each unit is (bar + gap), so there are (#data series - 1) units followed by the last bar
  calcBarSpacing() {
    return this.barGroupWidth / (this.numDataSeries - 1 + this.barGapRatio);
  }

  // calculate maximum y-value of all bars: this could be 0 if all data is negative
  calcMaxBarYValue() {
    return Math.max(0, ...this.data.slice(0, this.numDataSeries).map( a => Math.max(0, ...a) ));
  }

  // calculate minimum y-value of all bars: this could be 0 if all data is positive
  calcMinBarYValue() {
    return Math.min(0, ...this.data.slice(0, this.numDataSeries).map( a => Math.min(0, ...a) ));
  }

  // calculate scale for transforming y values to actual pixels:
  //   - if all bars are positive (resp. negative), the lowest (resp. greatest) height is 0
  calcVerticalScale() {
    let heightDiff = this.maxBarYValue - this.minBarYValue || 1;  // avoid division by zero
    return this.chartHeight / heightDiff;
  }

  // find a nice colour based on background: shift hue (say by 30˚, then an additional 15˚ per data series), choose contrasting luminance (say with a lum. difference of 0.4)
  calcAutoBarColour() {
    const BASE_HUE_DIFF = 30;
    const HUE_DIFF = 15;
    const LUM_DIFF = 0.4;

    let bg = this.RGBStringToArray(this.backgroundColour);

    let barColours = [];
    for (let i in this.data[0]) {
      let shiftedBg = this.shiftHue(bg, BASE_HUE_DIFF + i * HUE_DIFF);

      let lum = this.luminance(bg);
      let lumFactor = 1 - (i % 2) / 2;   // alternate between 1 and 0.5 times LUM_DIFF so that successive bars contrast each other
      let targetLum = lum + lumFactor * LUM_DIFF * ((lum < 0.5) ? 1 : -1);

      barColours.push(this.RGBArrayToString(this.shiftLuminance(shiftedBg, targetLum)));
    }
    return barColours;
  }

  calcAutoBackgroundColour(col) {
    const HUE_DIFF = -30;
    const LUM_DIFF = 0.75;

    let lum = this.luminance(col);
    let targetBgLum =  lum + LUM_DIFF * ((lum < 0.5) ? 1 : -1);
    return this.shiftLuminance(this.shiftHue(this.backgroundColour, HUE_DIFF), targetBgLum);
  }

  // find contrasting colour against bar or chart background (depending on whether label is inside or outside bar)
  //   - by default, find a high contrast to the average luminance of bar and bg
  autoLabelColour(barColour, backgroundColour) {
    const LUM_DIFF = 0.65;
    
    let mixBarBgColour = this.shiftLuminance(barColour, 0.75 * this.luminance(barColour) + 0.25 * this.luminance(backgroundColour));
    return this.contrastingShade(mixBarBgColour, LUM_DIFF);
  }

  clamp(x, min, max) {
    return Math.max(min, Math.min(x, max));
  }

  //  --------------------------
  //       colour functions
  //  --------------------------
  
  // extract RGB array from CSS, e.g., 'rgb(0, 255, 255)' to [0, 255, 255]
  //   - must be in rgb format, i.e., doesn't work with named colours
  RGBStringToArray(str) {
    let rgb = str.replace(/[rgb()]/g, '').split(',');
    rgb = rgb.map(n => parseInt(n));
    return rgb;
  }

  RGBArrayToString(rgb) {
    return 'rgb(' + rgb.map( x => Math.round(x) ).join(',') + ')';
  }

  // convert RGB to RGBA
  transparentColour(str, alpha) {
    let rgb = this.RGBStringToArray(str);
    return 'rgba(' + rgb.map( x => Math.round(x) ).join(',') + ',' + alpha + ')';
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
    if (typeof rgb == 'string') { // input is string: convert to array
      return this.luminance(this.RGBStringToArray(rgb));
    }

    return (0.3 * rgb[0] + 0.59 * rgb[1] + 0.11 * rgb[2]) / 255;
  }

  // find tint or shade with given luminance; retain hue
  shiftLuminance(rgb, targetLum) {
    if (typeof rgb == 'string') { // input and output are strings: convert to array and back
      return this.RGBArrayToString(this.shiftLuminance(this.RGBStringToArray(rgb), targetLum));
    }

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

  // N.B. this will affect luminance
  shiftHue(rgb, hueDiff) {
    if (typeof rgb == 'string') { // input and output are strings: convert to array and back
      return this.RGBArrayToString(this.shiftHue(this.RGBStringToArray(rgb), hueDiff));
    }

    let hsv = this.RGBtoHSV(rgb);
    hsv[0] = (hsv[0] + hueDiff) % 360;

    return this.HSVtoRGB(hsv);
  }

  // find a contrasting tint or shade, retaining hue. In particular, find colour that differs in luminance by lumDiff (between 0 and 1).
  //    - N.B. a difference of greater than 0.5 is not always possible (e.g., if colour is mid-grey); cut off at pure white or pure black
  //    - since we're using a simple linear model of luminance, we have luminance(k * rgb1 + rgb2) = k * luminance(rgb1) + luminance(rgb2)
  contrastingShade(rgb, lumDiff) {
    if (typeof rgb == 'string') { // input and output are strings: convert to array and back
      return this.RGBArrayToString(this.contrastingShade(this.RGBStringToArray(rgb), lumDiff));
    }

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