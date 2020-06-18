import React from "react";
import { Pie, Doughnut, Bar, Line } from "react-chartjs-2";
import "./allcharts.css";
import Sidebar from "../../Layout/Sidebar";


//fixed rates
const inflation = 0.06;
const EquityR = 0.12;
const DebtR = 0.06;
const GoldR = 0.05;
const FDR = 0.04;
const RER = 0.07;

//these are the user entered amounts
const curEquity = 25;
const curDebt = 15;
const curRE = 40;
const curFD = 10;
const curGold = 10;

const invType = 2; //1 is defensive, 2 is aggressive
const invAmount = 100;

var recAPR;
if (invType == 1) {
  recAPR = 0.07;
} else {
  recAPR = 0.11;
}

var curAPR = 0.05;

var sumCur = 0;
var sumRec = 0;
var NWcur = [];
var NWrec = [];
var i = 0;
while (i < 20) {
  sumCur = sumCur + sumCur * curAPR + invAmount;
  sumRec = sumRec + sumRec * recAPR + invAmount;

  NWcur[i] = sumCur;
  NWrec[i] = sumRec;
  i++;
}

var recportdata = [];
if (invType == 1) {
  recportdata = [60, 10, 20, 5, 5];
} else {
  recportdata = [30, 20, 20, 25, 5];
}

const assetTypes = ["Equity", "Debt", "Real Estate", "Fixed Deposits", "Gold"];
const next20 = [
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
  "2030",
  "2031",
  "2032",
  "2033",
  "2034",
  "2035",
  "2036",
  "2037",
  "2038",
  "2039",
];

const currentPortfolio = {
  labels: assetTypes,
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
      data: [curEquity, curDebt, curRE, curFD, curGold],
    },
  ],
};

const recPortfolio = {
  labels: assetTypes,
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
      data: recportdata,
    },
  ],
};

const returnAssets = {
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
      data: [0, inflation, FDR, RER, EquityR, curAPR, recAPR],
    },
  ],
};

const networthgrowth = {
  labels: next20,
  datasets: [
    {
      label: "Current",
      fill: false,
      lineTension: 0.5,
      backgroundColor: "#95739e",
      borderColor: "#95739e",
      borderWidth: 2,
      data: NWcur,
    },
    {
      label: "New",
      fill: false,
      lineTension: 0.5,
      backgroundColor: "#f479c9",
      borderColor: "#f479c9",
      borderWidth: 2,
      data: NWrec,
    },
  ],
};

export default class App extends React.Component {
  
  componentDidMount(){
    console.log(this.props.username[0].username)
    fetch("http://localhost:5000/assets",{
      method: 'get',
      headers: {
        Authorization: this.props.username[0].username
      }
    })
    .then(response => response.json())
    .then(data => {
      let arr = [0,0,0,0,0]
      for (let set of data){
        console.log(set)
        // ["Equity", "Debt", "Real Estate", "Fixed Deposits", "Gold"],
      if(set.name_asset === "Equity"){
        arr[0] = set.value_asset
      }
      else if(set.name_asset == "Real Estate"){
        arr[2] = set.value_asset
      }
      else if(set.name_asset == "Fixed Deposits"){
        arr[3] = set.value_asset
      }
      else if(set.name_asset == "Gold"){
        arr[4] = set.value_asset
      }
    }
    currentPortfolio.datasets[0].data = arr
    })

    fetch("http://localhost:5000/totaldebt",{
      method: 'get',
      headers: {
        Authorization: this.props.username[0].username
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
    })

    sumCur = 0;
    sumRec = 0;
    NWcur = [];
    NWrec = [];
    i = 0;
    while (i < 20) {
    sumCur = sumCur + sumCur * curAPR + invAmount;
    sumRec = sumRec + sumRec * recAPR + invAmount;

    NWcur[i] = sumCur;
    NWrec[i] = sumRec;
    i++;  
  }
  }
  render() {
    return (
      <div className="parent">
        <Sidebar />
        <div className="Page_Main_Content">
          <div className="small chart-wrapper">
            <Pie
              data={currentPortfolio}
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
              data={recPortfolio}
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
              data={returnAssets}
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

          <div className="big chart-wrapper">
            <Line
              data={networthgrowth}
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
