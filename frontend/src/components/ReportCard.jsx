import React, { useEffect, useState } from "react";
import { Container, Col, Row, Card, Button, ListGroup } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const ReportCard = ({startDate,setStartDate,endDate,setEndDate,getReport}) => {
  const body = (
    <Card>
      <Card.Header>Report Week AVG</Card.Header>
      <ListGroup variant="flush">
        <ListGroup.Item>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
          />
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
          />
          <Button style={{margin:"10px"}} onClick={getReport}> Report</Button>
        </ListGroup.Item>
       
      </ListGroup>
    </Card>
  );

  return body;
};

export default ReportCard;
