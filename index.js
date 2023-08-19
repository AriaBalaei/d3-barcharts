
const canvas = d3.select('.canva');

//add an SVG element
const svg = canvas.append('svg')
      .attr('width', '600')
      .attr('height', '600')

//add rect
const rect = svg.selectAll('rect');
    d3.json('test.json').then(data => {

      //scaleLinear
      const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.height)])
        .range([0, 250]);
      
      //scaleBand 
      const x = d3.scaleBand()
                  .domain(data.map(item => item.fill))
                  .range([0, 500])
                  .paddingInner(0.09);

  
      rect.data(data)
          .enter().append('rect')
          .attr('width', (x.bandwidth))
          .attr('height', (d, i) => y(d.height))
          .attr('fill' , (d) => d.fill)
          .attr('x', (d ,i) => x(d.fill))
    });
