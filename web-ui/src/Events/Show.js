import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

function EventsShow({event}) {
  return (
    <div>
      {events}
    </div>
  );
}

function state2props({events}) {
  return { events };
}

export default connect(state2props)(EventsShow);