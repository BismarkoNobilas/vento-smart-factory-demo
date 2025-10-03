import FusionCharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";

// Resolves charts dependancy
charts(FusionCharts);

const dataSource = {
  chart: {
    caption: "Nordstorm's Customer Satisfaction Score for 2017",
    lowerlimit: "0",
    upperlimit: "100",
    showvalue: "1",
    numbersuffix: "%",
    theme: "candy",
    showtooltip: "0",
  },
  colorrange: {
    color: [
      {
        minvalue: "0",
        maxvalue: "50",
        code: "#F2726F",
      },
      {
        minvalue: "50",
        maxvalue: "75",
        code: "#FFC533",
      },
      {
        minvalue: "75",
        maxvalue: "100",
        code: "#62B58F",
      },
    ],
  },
  dials: {
    dial: [
      {
        value: "81",
      },
    ],
  },
};

class MyComponent extends React.Component {
  render() {
    return (
      <ReactFusioncharts
        type="angulargauge"
        width="100%"
        height="100%"
        dataFormat="JSON"
        dataSource={dataSource}
      />
    );
  }
}
