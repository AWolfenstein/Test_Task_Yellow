import React, { useEffect, useState } from "react";
import { Container, Col, Row, Card, Button, ListGroup } from "react-bootstrap";

const CardImg = ({ url }) => {
  return url.map((el, index) => (
    <Card key={index} style={{ width: "12rem" }}>
      <Card.Img variant="top" src={el.imageUrl} />
      <Card.Body>
        <Card.Text>{el.imageUrl}</Card.Text>
      </Card.Body>
    </Card>
  ));
};
export default CardImg;
