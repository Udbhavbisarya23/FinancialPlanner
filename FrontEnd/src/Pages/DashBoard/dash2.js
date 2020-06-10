import React from "react";
import { Pie, Doughnut, Bar, Line } from "react-chartjs-2";
import "./allcharts.css";
import Sidebar from "../../Layout/Sidebar";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

//user entered
let income = 100;
let expenses = 70;
let invAmount = 20;

let avgExp = 80;
let avgInv = 25;

let recExp = 0.45 * income;
let recInv = 0.3 * income;

const Expenses = {
  labels: [ "","Average", "You", "Recommended"],
  datasets: [
    {
      label: "Expenses",
      backgroundColor: ["", " #af3885", " #78c6f3 ", "#f479c9"],
      borderColor: "rgba(0,0,0,1)",
      borderWidth: 2,
      data: [0,avgExp, expenses, recExp],
    },
  ],
};

const Invested = {
  labels: ["","Average", "You", "Recommended"],
  datasets: [
    {
      label: "Invested",
      backgroundColor: ["", " #af3885", " #78c6f3 ", "#f479c9"],
      borderColor: "rgba(0,0,0,1)",
      borderWidth: 2,
      data: [0,avgInv, invAmount, recInv],
    },
  ],
};

const EquityPortfolio = {
  labels: ["Small Cap", "Mid Cap", "Large Cap"],
  datasets: [
    {
      backgroundColor: [" #d77ef0 ", " #78c6f3 ", "#f479c9"],
      hoverBackgroundColor: [" #e78efA ", " #88d6fD ", "#fE89d9"],
      data: [15, 15, 70],
    },
  ],
};

export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      emergency: '',
      no_of_kids: '',
      ret_age: ''
    }
  }
  componentDidMount(){
    fetch("http://localhost:5000/plans",{
      method: 'get',
      headers: {
        Authorization: this.props.username[0].username
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      this.setState({
        emergency: data[data.length-1].emergency,
        no_of_kids: data[data.length-1].no_of_kids,
        ret_age: data[data.length - 1].ret_age
      })
    })
    income = this.props.username[0].income
    expenses = this.props.username[0].expenses
    recExp = 0.8 * expenses;
    recInv = 0.9 * (income - expenses);
    avgExp = 0.4 * income;
    avgInv = 0.2 * income;
    invAmount = 0.55*(income-expenses);
    Expenses.datasets[0].data = [0,avgExp,expenses,recExp]
    Invested.datasets[0].data = [0,avgInv,invAmount,recInv]
    console.log(this.props.username[0])
    

  }
  render() {
    return (
      <div className="parent">
        <Sidebar />
        <div className="Page_Main_Content">
          <div className="small chart-wrapper">
            <Bar
              data={Expenses}
              options={{
                title: {
                  display: true,
                  text: "Expenses",
                  fontSize: 20,
                },
                legend: {
                  display: false,
                },
              }}
            />
          </div>

          <div className="small chart-wrapper">
            <Bar
              data={Invested}
              options={{
                title: {
                  display: true,
                  text: "Invested",
                  fontSize: 20,
                },
                legend: {
                  display: false,
                },
              }}
            />
          </div>
          <Card  variant="outlined" className = "Plans_Card_Dashboard">
      <CardContent>
        <Typography  color="textSecondary" gutterBottom>
          Main Plan
        </Typography>
        <div className = "plan_card_attributes">
              <p>Number of Kids:- </p>
              <p className = "spacer">{this.state.no_of_kids}</p>
        </div>
        <div className = "plan_card_attributes">
              <p>Retirement Age:- </p>
              <p className = "spacer">{this.state.ret_age}</p>
        </div>
        <div className = "plan_card_attributes">
              <p>Emergency Fund:- </p>
              <p className = "spacer">{this.state.emergency}</p>
        </div>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>

          <div className="big chart-wrapper">
            <Pie
              data={EquityPortfolio}
              options={{
                title: {
                  display: true,
                  text: "Equity Portfolio Recommendation",
                  fontSize: 20,
                },
                legend: {
                  display: true,
                  position: "top",
                },
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}
