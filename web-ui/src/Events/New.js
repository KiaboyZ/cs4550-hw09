import { Row, Col, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import flatpickr from "flatpickr";
import { useHistory } from 'react-router-dom';
import pick from 'lodash/pick';
import { create_event, fetch_events } from '../api';

export default function EventsNew() {
  let history = useHistory();
  let [event, setEvent] = useState({});

  function onSubmit(ev) {
    ev.preventDefault();
    console.log(event);

    let data = pick(event, ['name', 'time', 'description']);
    create_event(data).then(() => {
      fetch_events();
      history.push("/events");
    });
  }

  function updateName(ev) {
    let p1 = Object.assign({}, event);
    p1["name"] = ev.target.value;
    setEvent(p1);
  }

  function updateTime(ev) {
    let p1 = Object.assign({}, event);
    p1["time"] = ev.target.value;
    setEvent(p1);
  }

  function updateDescription(ev) {
    let p1 = Object.assign({}, event);
    p1["description"] = ev.target.value;
    setEvent(p1);
  }

  let time_picker = flatpickr("#pick_time", { enableTime: true, minDate: "today" });

  return (
    <Row>
      <Col>
        <h2>New Event</h2>
        <Form onSubmit={onSubmit}>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control as="text"
                          rows={4}
                          onChange={updateName}
                          value={event.name}
                          required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Time</Form.Label>
            <Form.Control as="text"
                          rows={4}
                          onChange={updateTime}
                          value={event.time}
                          id="pick_time"
                          required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea"
                          rows={4}
                          onChange={updateDescription}
                          value={event.description}
                          required />
          </Form.Group>
          <Button variant="primary" type="submit">
            Save
          </Button>
        </Form>
      </Col>
    </Row>
  );
}