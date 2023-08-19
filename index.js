
const canvas = d3.select('.canva');

//add an SVG element
const svg = canvas.append('svg')
      .attr('width', '600')
      .attr('height', '600')

//add rect
const rect = svg.selectAll('rect');
    d3.json('test.json').then(data => {
      console.log(data)
      rect.data(data)
          .enter().append('rect')
          .attr('width', (d, i) => d.width)
          .attr('height', (d, i) => d.height)
          .attr('fill' , (d) => d.fill)
          .attr('x', (d ,i) => i*35)
    });
