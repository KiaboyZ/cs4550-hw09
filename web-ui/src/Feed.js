import { Row, Col, Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

function Feed({events}) {
  let rows = events.map((event) => (
    <tr key={event.id}>
      <td>{event.name}</td>
      <td>{event.time}</td>
      <td><Link to="/events/show">
              View
            </Link></td>
    </tr>
  ));

  return (
    <div>
      <Row>
        <Col>
          <h2>List Events</h2>
          <p>
            <Link to="/events/new">
              New Event
            </Link>
          </p>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Time</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              { rows }
            </tbody>
          </table>
        </Col>
      </Row>
    </div>
  );
}

export default connect(({events}) => ({events}))(Feed);