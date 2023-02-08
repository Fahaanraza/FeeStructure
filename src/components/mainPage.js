import React, { useState, useEffect } from 'react';
import { Row, Col, Select, Space } from 'antd';
import '../App.css'

const { Option } = Select;

const data = {"Exam Fee":{
  "INDIAN":{
  "ALL_COURSES":{
  "ALL_LEVEL":{
  "amount":400
  }
  }
  },
  "FOREIGN":{
  "ALL_COURSES":{
  "ALL_LEVEL":{
  "amount":100
  }
  }
  },
  "NRI":{
  "ALL_COURSES":{
  "ALL_LEVEL":{
  "amount":600
 }
  }
  },
  "SAARC":{
  "ALL_COURSES":{
  "ALL_LEVEL":{
  "amount":600
  }
  }
  }
  },
  "Application Fee":{
  "INDIAN":{
  "ALL_COURSES":{
  "UG":{
  "amount":200
  },
  "UG-DIPLOMA":{
  "amount":300
  },
  "PG":{
  "amount":500
  }
  }
  },
  "FOREIGN":{
  "ALL_COURSES":{
  "UG":{
  "amount":400
  },
  "UG-DIPLOMA":{
  "amount":400
  },
  "PG":{
  "amount":700
 }
  }
  }
  }
 };

export default function MainPage() {
  const [feeType, setfeeType] = useState(null);
  const [allNationalities, setallNationalities] = useState([]);
  const [selectedNationality, setselectedNationality] = useState(null);
  const [allCourses, setallCourses] = useState([]);
  const [selectedCourse, setselectedCourse] = useState(null);
  const [allLevels, setallLevels] = useState([]);
  const [selectedLevel, setselectedLevel] = useState(null);
  const [fee, setFee] = useState(null);

  const fetchNationality = () => {
    const selectedNationality = data[feeType];
    const allNationality = Object.keys(selectedNationality);
    setallNationalities(allNationality);
    setselectedCourse(null);
    setselectedNationality(null);
    setFee(null);
    setselectedLevel(null);
    setallCourses([]);
    setallLevels([]);
  };

  const fetchCourses = () => {
    const courseToCheck = data[feeType][selectedNationality];
    const selectedCourses = Object.keys(courseToCheck);
    if(selectedCourses && selectedCourses.length>0){
      if(selectedCourses[0] === 'ALL_COURSES'){
        setallCourses(['Medical', 'Dental', 'Ayurveda']);
      }
    }
    setselectedCourse(null);
    setselectedLevel(null);
    setFee(null);
    setallLevels([]);
  };
  
  const fetchLevels = () => {
    const courseToCheck = data[feeType][selectedNationality]['ALL_COURSES'];
    const level = Object.keys(courseToCheck);
    if(level && level.length>0){
      if(level[0] === 'ALL_LEVEL'){
        setallLevels(['UG', 'PG', 'DIPLOMA', 'Ph.D']);
      }
      else{
        setallLevels(level);
      }
    }
    setFee(null);
  };

  const fetchFees = () => {
    let level = selectedLevel;
    if (feeType === 'Exam Fee'){
      level = 'ALL_LEVEL';
    }
    const res = data[feeType][selectedNationality]['ALL_COURSES'][level];
    setFee(res.amount);
  };

  useEffect(()=>{
    if(feeType){
      fetchNationality();
    }
  },[feeType]);

  useEffect(()=>{
    if(selectedNationality){
      fetchCourses();
    }
  },[selectedNationality]);

  useEffect(()=>{
    if(selectedCourse){
      fetchLevels();
    }
  },[selectedCourse]);


  useEffect(()=>{
    if(feeType && selectedNationality && selectedCourse && selectedLevel){
      fetchFees();
    }
  },[selectedCourse, selectedLevel]);

  return (
    <div >
    <Row className='row'>

      <Col className='column1'>
        <Select
          value={feeType}
          placeholder='select fee type'
          onChange={(e) => setfeeType(e)}>
          <Option value="Exam Fee">Exam Fee</Option>
          <Option value="Application Fee">Application Fee</Option>
        </Select>
      </Col>

      <Col className='column2'>
        <Select
          value={selectedNationality}
          placeholder='select Nationality'
          onChange={(e) => setselectedNationality(e)}>
          {
            allNationalities && allNationalities.length>0 && allNationalities.map((nation) => {
              return (
                <Option key={nation} value={nation}>{nation}</Option>
              );
            })
          }
        </Select>
      </Col>

      <Col className='column3'>
        <Select
          value={selectedCourse}
          placeholder='select Course'
          onChange={(e) => setselectedCourse(e)}>
          {
            allCourses && allCourses.length>0 && allCourses.map((course) => {
              return (
                <Option key={course} value={course}>{course}</Option>
              );
            })
          }
        </Select>
      </Col>

      <Col className='column4'>
        <Select
          value={selectedLevel}
          placeholder='select Level'
          onChange={(e) => setselectedLevel(e)}>
          {
            allLevels && allLevels.length>0 && allLevels.map((level) => {
              return (
                <Option key={level} value={level}>{level}</Option>
              );
            })
          }
        </Select>
      </Col>


    </Row>

    <br/>
    <br/>
    <br/>
    {fee &&<Row>
      <h2>
        The Fee for Selected Course is: {fee} only.
      </h2>
    </Row>}
    </div>
  )
}
