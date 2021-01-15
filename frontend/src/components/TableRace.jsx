import React from "react";
import moment from "moment";
import { Table, Button } from "react-bootstrap";

const TableRace = ({
  data,
  removeDataRace,
  setDataRace,
  setEditMode,
  setShow,
}) => {
  const editHandler = (id_data, distance, raceTime, raceDate) => {
    setDataRace({
      id_data: id_data,
      distOld: distance,
      timeOld: raceTime,
      dateOld: raceDate,
    });
    setEditMode(true);
    setShow(true);
  };
  const listItems = data
    ? data.map((el, index) => (
        <tr key={index}>
          <td>{index}</td>
          <td>{el.distance}</td>
          <td>{el.raceTime}</td>
          <td>{moment(el.raceDate).format("YYYY-MM-DD")}</td>
          <td>
            <Button
              variant="warning"
              onClick={() =>
                editHandler(el._id, el.distance, el.raceTime, el.raceDate)
              }>
              edit
            </Button>
            <Button variant="danger" onClick={() => removeDataRace(el._id)}>
              remove
            </Button>
          </td>
        </tr>
      ))
    : "no data";

  const body = (
    <Table bordered hover size="md" variant="dark" responsive>
      <thead>
        <tr>
          <th>Id</th>
          <th>Distance</th>
          <th>Race Time</th>
          <th>Race Date</th>
          <th>Actions </th>
        </tr>
      </thead>
      <tbody>{listItems}</tbody>
    </Table>
  );

  return body;
};
export default TableRace;
