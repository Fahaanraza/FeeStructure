import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Row, Button, Col } from 'antd';

import "bootstrap/dist/css/bootstrap.min.css";
import MainPage from "./components/mainPage";
import './App.css'

export default function App() {
    return (
      <div  className='overlay'>
      <Router>
        <div  style={{ marginLeft: '30%', marginTop: '20%' }}>
          <Row>
            <Col>
            <h1>Welcome to Deep Springs College</h1>
            </Col>
          </Row>
          <Row style={{ marginTop: '2%' }}>
            <Col>
              <MainPage/>
            </Col>
          </Row>
        </div>
      </Router>
      </div>
    );
}