import React from 'react';
import {Line as LineChart} from 'react-chartjs-2'


function createLabels(limit) {
  const labelArr = []
  for (let u = 0; u < limit; u++) {
    labelArr.push(u)
  }
  return labelArr
}

function chartData(graphDataArr) {
  return {
    labels: createLabels(30),
    datasets: [
      {
        label: 'Currency Chart',
        fillColor: 'rgba(220,220,220,0.2)',
        strokeColor: 'rgba(220,220,220,1)',
        pointColor: 'rgba(220,220,220,1)',
        pointStrokeColor: '#fff',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(220,220,220,1)',
        data: graphDataArr
      }
    ]
  }
}

const options = {
  scaleShowGridLines: true,
  scaleGridLineColor: 'rgba(0,0,0,.05)',
  scaleGridLineWidth: 1,
  scaleShowHorizontalLines: true,
  scaleShowVerticalLines: true,
  bezierCurve: false,
  bezierCurveTension: 0.4,
  pointDot: true,
  pointDotRadius: 4,
  pointDotStrokeWidth: 1,
  pointHitDetectionRadius: 20,
  datasetStroke: true,
  datasetStrokeWidth: 2,
  datasetFill: true,
  legendTemplate: '<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>',
}

const styles = {
  graphContainer: {
  }
}

class LineChartExample extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      data: chartData(this.props.graphDataArr)
    }
  }

  render() {
    return (
      <div style={styles.graphContainer}>
        <LineChart data={this.state.data}
          options={options}
          width={600} height={220}/>
      </div>
    )
  }
}

export default LineChartExample
