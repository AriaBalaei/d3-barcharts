
const canvas = d3.select('.canva');

//add an SVG element
const svg = canvas.append('svg')
      .attr('width', '600')
      .attr('height', '600')

//margin
const margin =
  {
    top: 20,
    right: 20,
    bottom: 70,
    left: 70
  };

  var duration = 3000
  var delay = 0;
  col_rel = '/test.json'

const graphWidth = 600 - margin.left - margin.right;
const graphHeight = 600 - margin.top - margin.bottom;

//creating group
const graph = svg.append('g')
                .attr('width', graphWidth)
                .attr('height', graphHeight)
                .attr('transform', `translate(${margin.left} 
                  ${margin.top})`)

//add rect
const rect = graph.selectAll('rect');

//create axes group
const xAxisGroup = graph.append('g')
                    .attr('transform', `translate(0, ${graphHeight})`)
const yAxisGroup = graph.append('g')

    d3.json('test.json').then(data => {
      var nameOfCountry = data.map(d => d.name)
      
      //scaleLinear
      const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.height)])
        .range([graphHeight, 0]);
      
      //scaleBand 
      const x = d3.scaleBand()
                  .domain(data.map(item => item.fill))
                  .range([0, 500])
                  .paddingInner(0.15)
                  .paddingOuter(0.15)
      
      const yAxis = d3.axisLeft(y);
      const xAxis = d3.axisBottom(x)
                .tickFormat((d,i) => nameOfCountry[i])
      
         xAxisGroup.call(xAxis);
         yAxisGroup.call(yAxis);             
      //add data to rect
      rect.data(data)
          .enter().append('rect')
          //animation
          .attr('y', d => graphHeight)
          .attr('x', (d ,i) => x(d.fill))  
          .attr('height', 0)
          .attr('width', (x.bandwidth))
          .attr('stroke', 'gray')
          .attr('fill' , (d) => d.fill)    
          .transition()
          .duration(duration)
          .delay(function(d ,i) {
            delay += i*50
            return i*50
          })
          .ease(d3.easeElasticOut)
          .attr('height', (d, i) => graphHeight - y(d.height))
          .attr('y', (d ,i) => y(d.height)) 
          .on("end", function(){
            addMouseEvent(d3.select(this))
          })

          const flagImage = graph
          .selectAll("image")
          .data(data)
          .enter()
          .append("image")
          .call(selection => addMouseEvent(selection))
          .attr("xlink:href", d=> d.image)
          .attr("x", (d)=> x(d.fill))
          .attr("y", d => y(d.height) + 5)
          .attr("width", x.bandwidth)

          function addMouseEvent(selection){
            selection
              .on('mouseover',function(event){
                d3.select(event.target)
                    .transition()
                    .duration(200)
                    .style('opacity', '0.5')
              })
              .on('mouseout',function(event){
                d3.select(event.target)
                    .transition()
                    .duration(200)
                    .style('opacity', '1')
              })
          }
    });