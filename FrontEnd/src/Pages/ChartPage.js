import React from 'react';

import { getColor } from '../utils/colors';

import { Row, Col, Card, CardHeader, CardBody } from 'reactstrap';

import { Line, Pie, Doughnut, Bar, Radar, Polar } from 'react-chartjs-2';

import Page from './Page';

const YEARS = [2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029];

const genLineData = (moreData = {}, moreData2 = {}) => {
  return {
    labels: YEARS,
    datasets: [
      {
        label: 'Current',
        backgroundColor: getColor('primary'),
        borderColor: getColor('primary'),
        borderWidth: 1,
        data: [
          22.0,
          45.8,
          71.4,
          99.1,
          129.1,
          161.4,
          196.3,
          234.0,
          274.7,
          318.7,
        ],
        ...moreData,
      },
      {
        label: 'Recommended',
        backgroundColor: getColor('secondary'),
        borderColor: getColor('secondary'),
        borderWidth: 1,
        data: [
          22.0,
          47.3,
          76.4,
          109.9,
          148.3,
          192.6,
          243.5,
          302.0,
          369.3,
          446.7,
        ],
        ...moreData2,
      },
    ],
  };
};

const INV = ['Equity', 'Debt', 'Real Estate', 'Fixed Deposits', 'Gold'];

const genPieData = () => {
  return {
    datasets: [
      {
        data: [75, 5, 10, 7, 3],
        backgroundColor: [
          getColor('primary'),
          getColor('secondary'),
          getColor('success'),
          getColor('info'),
          getColor('danger'),
        ],
        label: 'Dataset 1',
      },
    ],
    labels: INV,
  };
};

const ChartPage = () => {
  return (
    <Page title="FPlanner" breadcrumbs={[{ name: 'FPlanner', active: true }]}>
      <Row>
        <Col xl={6} lg={12} md={12}>
          <Card>
            <CardHeader>Financial Planner Portfolio</CardHeader>
            <CardBody>
              <Doughnut data={genPieData()} />
            </CardBody>
          </Card>
        </Col>

        <Col xl={6} lg={12} md={12}>
          <Card>
            <CardHeader>Portfolio Growth</CardHeader>
            <CardBody>
              <Line data={genLineData({ fill: false }, { fill: false })} />
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col xl={8} lg={12} md={12}>
          <Card>
            <CardHeader>Net Worth</CardHeader>
            <CardBody>
              <Line
                data={genLineData()}
                options={{
                  scales: {
                    xAxes: [
                      {
                        scaleLabel: {
                          display: true,
                          labelString: 'Year',
                        },
                      },
                    ],
                    yAxes: [
                      {
                        stacked: true,
                        scaleLabel: {
                          display: true,
                          labelString: 'Value',
                        },
                      },
                    ],
                  },
                }}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Page>
  );
};

export default ChartPage;
