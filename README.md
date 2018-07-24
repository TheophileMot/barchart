# About

This is a bar chart API written in JavaScript and a bit of jQuery. By default, based on a given background colour, it will try to find a nice colour scheme, i.e., with good contrast and legibility.

# Features

The user can specify a title (at the top) and a caption (at the bottom), along with font size and padding.

One simple animation is included: the bar height grows from 0 to 100%. If the bar height labels are being displayed, the amount showing will grow correspondingly during the animation. In this case, the numbers are rounded off to a level of precision appropriate to the data (e.g., if a given data bar is a multiple of 1,000, then the label will grow in multiploes of 100 during the animation). This effect can be turned off, so that the height label shows the true value from the beginning. The animation can also be set such that the bars grow at different rates; similarly, the height labels can grow at different rates independently from the bars.

If grid lines (called 'tick marks' in the code) are used, the program automatically calculates a reasonable scale: they are neither too close nor too far apart, and the common interval will be a multiple of a simple number: 10^n * (1, 2, 2.5, or 5).

The bars are presented as groups along the x-axis, the number of bars in each group being the number of data series. There are two scales at which the data are spaced: a group ratio at the global level, and a bar ratio within the groups. When the group ratio is 0.5, each group is exactly as wide as the gap separating it from the next group; when the ratio is 1, there is no gap; the bar ratio is similar. By default, the group ratio is 0.7 (so that there is some space between groups, but not too much), while the bar ratio is 1 (so that bars are fully adjacent within groups).

# API

A chart is created within a DOM element by calling `drawBarChart(data, options, element)`. Many of the options are self-explanatory.

     data:
       [ [series 1], [series 2], ..., [series n], ([labels]) ]
       each element of a series should be a number or a two-element array [n, col] with a number and custom colour
       if any series starts with a string, it is assumed to be an array of labels for the data groups
    
     options: an object with any of the following:
       barGroupGapRatio: 0.7,              // ratio of (width of bar group) to (width of bar + gap separating groups)
       barGapRatio: 1,                     // within a group, ratio of (width of bar) to (width of bar + gap separating bars). At 1 there is no space between bars.
       padding: 10,
       backgroundColourInherit: false,
       backgroundColour: 'rgb(60, 120, 180)',
       defaultBarColour: 'auto',
       displayAxes: true,                  // overrides next two options
       displayXAxis: true,
       displayYAxis: true,
       displayTicks: false,
       displayTickLabels: false,
       tickInterval: 'auto',
       displayHeightLabels: true,
       heightLabelPos: 'end',             // 'end', 'middle', or 'axis'
       displayDataLabels: true,
       dataLabelBackgroundColour: 'auto',
       heightLabelColourFunction: 'auto', // user can supply their own function depending on bar colour and chart background: (barCol, bgCol) => labelCol
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
    
     element:
       a DOM element

# Issues

When tick labels are displayed, they take up space inside the chart; they should be right-aligned on the left side of the y-axis so as not to interfere with the first bar.

Labels can stick outside the chart if the padding is too low.

# Known bugs

When the input is all 0, the height labels do not display correctly.

# Future work

There is no end to what could be added. The most pressing issue is to add a **legend**; in the provided real-world example, the data are grouped into July and January measurements, but we don't know what the seven locations are.

The user should be able to choose actual **short tick marks** rather than entire grid lines; as it stands, the term 'tick marks' is a misnomer in the code. There should be the possibility to have the labels appear on both sides, or just the right-hand side.

The program should be able to parse **undefined data points**. Among other things, this would involve rewriting the max/min functions to take into account possible undefined values.

A **logarithmic scale** would be easy to implement (taking some care to rethink the tick mark interval). More laborious would be **statistical box plots** showing quartiles, etc.

It should be easy to specific the **font size of the height and data labels**.

It would be good to allow a **custom function for bar colour**, just as there is one for label colour. (Arguably, the former is far more useful, e.g., colouring based on height).

etc., etc.

# External resources

I consulted Wikipedia for some colour details (e.g., on luminance), and the jQuery API (https://api.jquery.com/) to learn the basics of jQuery.

#    Example Screenshots (embedded within the readme as image tags)
#    List the API functions that you would expect a user to use
#    Describe the function and the parameters to each function
#    A Feature list of your library (options it supports, etc)
#    A list of known issues / bugs
#    A list of features that are on the roadmap but haven't been implemented yet
#    A list of all the external resources (tutorials, docs, example code, etc) that you encountered and used to help you create this #library
