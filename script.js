var div = d3.select("body").append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);

L.mapbox.accessToken = 'pk.eyJ1IjoibWRlc2hwYTQiLCJhIjoiY2pxcjRuYTN5MGo5NDQybXRkZHJpeW1hOCJ9.z_e14qRmdEX8qVNuJB41ag';
var mapToken = L.mapbox.accessToken
var mapboxTiles = L.tileLayer('https://api.mapbox.com/styles/v1/mdeshpa4/cjr6tiems2w6r2slgazt1recp/tiles/256/{z}/{x}/{y}@2x?access_token='
   + mapToken, { attribution: 'Data source: <a href="https://citybik.es/">B-Cycle</a>' });
  // 'L' is Leaflet's library. By L.map('map'), we create a map object from the Leaflet library and we assign it to the div we created earlier with ID='map'
  //.setView([35.227, -80.838], 12);

var map = L.map('map')
  .addLayer(mapboxTiles)
  .setView([35.227, -80.838], 14);

$.getJSON("http://api.citybik.es/charlotte.json", function(stations) {
  for (station in stations){
    var circle_options = {
        color: 'rgb(162,31,8)',      // Stroke color
        opacity: 1,         // Stroke opacity
        weight: 1,         // Stroke weight
        fillColor: 'rgb(162,31,8)',  // Fill color
        fillOpacity: stations[station].free / (stations[station].free+stations[station].free)
    };
    var xCor = stations[station].lat/1000000;
    var yCor = stations[station].lng/1000000;
    var radius = 2.2 * (stations[station].free + stations[station].free);
    // L.circleMarker([stations[station].lat/1000000, stations[station].lng/1000000],circle_options).addTo(map3);
    L.circle([xCor, yCor],radius,circle_options).addTo(map);
  }
});


// Given sample data
 d3.json("http://api.citybik.es/charlotte.json", function(data){

      // Creating new arrays from the data, separating id from the numbers
      var id  = data.map(function(d){ return d.id; });
      var bikes = data.map(function(d){ return d.bikes; });

      // Setting the margin and dimensions of the work area
      var margin = {top: 50, right: 20, bottom: 30, left: 30},
          width = 760 - margin.left - margin.right,
          height = 380 - margin.top - margin.bottom;

      // Creating the scale variables and setting the ranges
      var xScale = d3.scaleBand().rangeRound([0, width]).padding(0.1),
          yScale = d3.scaleLinear().rangeRound([height, 0]);

      // Adjusting data by assigning domain to the range of the scale
      xScale.domain(id);
      yScale.domain([0, d3.max(bikes)]);

      // Appending the svg object to the div on the page
      var svg = d3.select('#viz').append('svg')
          .attr('width', width + margin.left + margin.right)
          .attr('height', height + margin.top + margin.bottom);

      // Appending the 'group' element to the svg
      // Moving the 'group' element to the top left margin
      var g = svg.append('g')
          .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

      // Adding header to the chart
      g.attr('class', 'headerText')
         .append('text')
         .attr('transform', 'translate(' + (width / 2) + ',' + (-margin.top / 2) + ')')
         .attr('text-anchor', 'middle')
         .attr('font-weight', 600)
         .text('B-Cycle Bikes in Stations');

      // Appending X axis and formatting the text
      g.append('g')
          .attr('class', 'axisX')
          .attr('transform', 'translate(0,' + height + ')')
          .call(d3.axisBottom(xScale))
          .attr('font-weight', 'bold');

      // Appending Y axis
      g.append('g')
          .attr('class', 'axisY')
          .call(d3.axisLeft(yScale).ticks(10));

      // Creating chart
      var chart = g.selectAll('bar')
          .data(data)
          .enter().append('g')

      // Appending bar chart to the chart
      chart.append('rect')
          .attr('class', 'bar')
          .attr('x', function(d) { return xScale(d.id); })
          .attr('height', function(d) { return height - yScale(d.bikes); })
          .attr('y', function(d) { return yScale(d.bikes); })
          .attr('width', xScale.bandwidth());

      // Appending text to each bar chart
      chart.append('text')
          .attr('class', 'barText')
          .attr('x', function(d) { return xScale(d.id); })
          .attr('y', function(d) { return yScale(d.bikes); })
          .attr('dx', xScale.bandwidth()/2)
          .attr('dy', 20)
          .attr('text-anchor', 'middle')
          .text(function(d){ return d.bikes; });

      // Adding mouseover and mouseout functions to the chart
      chart.on('mouseover', function(d){
            d3.select(this).attr('opacity', 0.7);
            })
          .on('mouseout', function(d){
            d3.select(this)
              .attr('opacity', 1)});
});

d3.json("http://api.citybik.es/charlotte.json", function(data){

     // Creating new arrays from the data, separating id from the numbers
     var id  = data.map(function(d){ return d.id; });
     var free = data.map(function(d){ return d.free; });

     // Setting the margin and dimensions of the work area
     var margin = {top: 50, right: 20, bottom: 30, left: 30},
         width = 760 - margin.left - margin.right,
         height = 380 - margin.top - margin.bottom;

     // Creating the scale variables and setting the ranges
     var xScale = d3.scaleBand().rangeRound([0, width]).padding(0.1),
         yScale = d3.scaleLinear().rangeRound([height, 0]);

     // Adjusting data by assigning domain to the range of the scale
     xScale.domain(id);
     yScale.domain([0, d3.max(free)]);

     // Appending the svg object to the div on the page
     var svg = d3.select('#viz2').append('svg')
         .attr('width', width + margin.left + margin.right)
         .attr('height', height + margin.top + margin.bottom);

     // Appending the 'group' element to the svg
     // Moving the 'group' element to the top left margin
     var g = svg.append('g')
         .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

     // Adding header to the chart
     g.attr('class', 'headerText')
        .append('text')
        .attr('transform', 'translate(' + (width / 2) + ',' + (-margin.top / 2) + ')')
        .attr('text-anchor', 'middle')
        .attr('font-weight', 600)
        .text('B-Cycle Free Slots at Stations');

     // Appending X axis and formatting the text
     g.append('g')
         .attr('class', 'axisX')
         .attr('transform', 'translate(0,' + height + ')')
         .call(d3.axisBottom(xScale))
         .attr('font-weight', 'bold');

     // Appending Y axis
     g.append('g')
         .attr('class', 'axisY')
         .call(d3.axisLeft(yScale).ticks(10));

     // Creating chart
     var chart = g.selectAll('bar')
         .data(data)
         .enter().append('g')

     // Appending bar chart to the chart
     chart.append('rect')
         .attr('class', 'bar')
         .attr('x', function(d) { return xScale(d.id); })
         .attr('height', function(d) { return height - yScale(d.free); })
         .attr('y', function(d) { return yScale(d.free); })
         .attr('width', xScale.bandwidth());

     // Appending text to each bar chart
     chart.append('text')
         .attr('class', 'barText')
         .attr('x', function(d) { return xScale(d.id); })
         .attr('y', function(d) { return yScale(d.free); })
         .attr('dx', xScale.bandwidth()/2)
         .attr('dy', 20)
         .attr('text-anchor', 'middle')
         .text(function(d){ return d.free; });

     // Adding mouseover and mouseout functions to the chart
     chart.on('mouseover', function(d){
           d3.select(this).attr('opacity', 0.7);
           })
         .on('mouseout', function(d){
           d3.select(this)
             .attr('opacity', 1)});
});


d3.json("system_pricing_plans.json", function(data){

     // Creating new arrays from the data, separating name from the numbers
     var name  = data.map(function(d){ return d.name; });
     var price = data.map(function(d){ return d.price; });

     // Setting the margin and dimensions of the work area
     var margin = {top: 50, right: 20, bottom: 30, left: 30},
         width = 760 - margin.left - margin.right,
         height = 380 - margin.top - margin.bottom;

     // Creating the scale variables and setting the ranges
     var xScale = d3.scaleBand().rangeRound([0, width]).padding(0.8),
         yScale = d3.scaleLinear().rangeRound([height, 0]);

     // Adjusting data by assigning domain to the range of the scale
     xScale.domain(name);
     yScale.domain([0, d3.max(price)]);

     // Appending the svg object to the div on the page
     var svg = d3.select('#viz3').append('svg')
         .attr('width', width + margin.left + margin.right)
         .attr('height', height + margin.top + margin.bottom);

     // Appending the 'group' element to the svg
     // Moving the 'group' element to the top left margin
     var g = svg.append('g')
         .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

     // Adding header to the chart
     g.attr('class', 'headerText')
        .append('text')
        .attr('transform', 'translate(' + (width / 2) + ',' + (-margin.top / 2) + ')')
        .attr('text-anchor', 'middleprice')
        .attr('font-weight', 600)
        .text('B-Cycle System Pricing');

     // Appending X axis and formatting the text
     g.append('g')
         .attr('class', 'axisX')
         .attr('transform', 'translate(0,' + height + ')')
         .call(d3.axisBottom(xScale))
         .attr('font-weight', 'bold');

     // Appending Y axis
     g.append('g')
         .attr('class', 'axisY')
         .call(d3.axisLeft(yScale).ticks(10));

     // Creating chart
     var chart = g.selectAll('bar')
         .data(data)
         .enter().append('g')

     // Appending bar chart to the chart
     chart.append('rect')
         .attr('class', 'bar')
         .attr('x', function(d) { return xScale(d.name); })
         .attr('height', function(d) { return height - yScale(d.price); })
         .attr('y', function(d) { return yScale(d.price); })
         .attr('width', xScale.bandwidth());
         // xScale.bandwidth() xScale(d.name);

     // Appending text to each bar chart
     chart.append('text')
         .attr('class', 'barText')
         .attr('x', function(d) { return xScale(d.name); })
         .attr('y', function(d) { return yScale(d.price); })
         .attr('dx', xScale.bandwidth()/2)
         .attr('dy', 20)
         .attr('text-anchor', 'middle')
         .text(function(d){ return d.price; });

     // Adding mouseover and mouseout functions to the chart
     chart.on('mouseover', function(d){
           d3.select(this).attr('opacity', 0.7);
           })
         .on('mouseout', function(d){
           d3.select(this)
             .attr('opacity', 1)});
});
