import React from "react";
import {Divider} from '@material-ui/core'
import { Pie, Doughnut, Bar, Line } from "react-chartjs-2";
import "./allcharts.css";
import Sidebar from "../../Layout/Sidebar";

let state1 = {
  labels: ["Equity", "Debt", "Real Estate", "Fixed Deposits", "Gold"],
  datasets: [
    {
      backgroundColor: [
        " #d77ef0 ",
        " #78c6f3 ",
        "#f479c9",
        "#95739e",
        " #af3885",
      ],
      hoverBackgroundColor: [
        " #e78efA ",
        " #88d6fD ",
        "#fE89d9",
        "#A583Ae",
        " #bf4895",
      ],
      data: [25, 15, 40, 10, 10],
    },
  ],
};

const state2 = {
  labels: ["Equity", "Debt", "Real Estate", "Fixed Deposits", "Gold"],
  datasets: [
    {
      backgroundColor: [
        " #d77ef0 ",
        " #78c6f3 ",
        "#f479c9",
        "#95739e",
        " #af3885",
      ],
      hoverBackgroundColor: [
        " #e78efA ",
        " #88d6fD ",
        "#fE89d9",
        "#A583Ae",
        " #bf4895",
      ],
      data: [60, 10, 20, 5, 5],
    },
  ],
};

const state3 = {
  labels: [
    "",
    "Inflation",
    "Fixed Deposit",
    "Real Estate",
    "Nifty50",
    "Current Portfolio",
    "FPlan Recommended",
  ],
  datasets: [
    {
      label: "%",
      backgroundColor: [
        "",
        " #af3885",
        " #78c6f3 ",
        "#78c6f3",
        "#78c6f3",
        "#95739e",
        "#f479c9",
      ],
      borderColor: "rgba(0,0,0,1)",
      borderWidth: 2,
      data: [0, 6, 4, 7, 13, 9, 11],
    },
  ],
};

const state4 = {
  labels: [
    "2020",
    "2021",
    "2022",
    "2023",
    "2024",
    "2025",
    "2026",
    "2027",
    "2028",
    "2029",
  ],
  datasets: [
    {
      label: "Current",
      fill: false,
      lineTension: 0.5,
      backgroundColor: "#95739e",
      borderColor: "#95739e",
      borderWidth: 2,
      data: [22.0, 45.8, 71.4, 99.1, 129.1, 161.4, 196.3, 234.0, 274.7, 318.7],
    },
    {
      label: "New",
      fill: false,
      lineTension: 0.5,
      backgroundColor: "#f479c9",
      borderColor: "#f479c9",
      borderWidth: 2,
      data: [22.0, 47.3, 76.4, 109.9, 148.3, 192.6, 243.5, 302.0, 369.3, 446.7],
    },
  ],
};

export default class App extends React.Component {
  constructor(props){
    super(props)
  }
  componentDidMount(){
    let base64 = require('base-64');
    let headers = new Headers();
    headers.append('Authorization',this.props.username[0].username)

    fetch("http://localhost:5000/assets",{
      method: 'get',
      headers: headers,
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
    })
  }
  render() {
    return (
      <div className="parent">
        <Sidebar />
        <div className="Page_Main_Content">
          <div className = "Page_Main_Heading">
            Dashboard
          </div>
          <Divider className = "Dash_Page_Divider" />
          <div className="small chart-wrapper">
            <Pie
              data={state1}
              options={{
                title: {
                  display: true,
                  text: "Current Investment Portfolio",
                  fontSize: 20,
                },
                legend: {
                  display: true,
                  position: "top",
                },
              }}
            />
          </div>

          <div className="small chart-wrapper">
            <Doughnut
              data={state2}
              options={{
                title: {
                  display: true,
                  text: "FPlan Recommended",
                  fontSize: 20,
                },
                legend: {
                  display: true,
                  position: "top",
                },
              }}
            />
          </div>

          <div className="bar chart-wrapper">
            <Bar
              data={state3}
              options={{
                title: {
                  display: true,
                  text: "Expected Annual Return",
                  fontSize: 20,
                },
                legend: {
                  display: false,
                },
              }}
            />
          </div>

          <div className="line chart-wrapper">
            <Line
              data={state4}
              options={{
                title: {
                  display: true,
                  text: "Networth Growth",
                  fontSize: 20,
                },
                legend: {
                  display: true,
                },
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}
