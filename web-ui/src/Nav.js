import { useState } from 'react';
import { Row, Col, Alert, Button, Nav, Form } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import store from './store';
import { api_login } from './api';

function LoginForm() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  function on_submit(ev) {
    ev.preventDefault();
    api_login(email, pass);
  }

  return (
    <Form onSubmit={on_submit} inline>
      <Form.Control name="email"
                    type="email"
                    onChange={(ev) => setEmail(ev.target.value)}
                    value={email}
                    placeholder="email" />
      <Form.Control name="password"
                    type="password"
                    onChange={(ev) => setPass(ev.target.value)}
                    value={pass}
                    placeholder="password" />
      <Button variant="primary" type="submit">
        Login
      </Button>
    </Form>
  );
}

function LOI({session}) {
  if (session) {
    return <SessionInfo session={session} />;
  }
  else {
    return <LoginForm />;
  }
}

const LoginOrInfo = connect(({session}) => ({session}))(LOI);

function Link({to, children}) {
  return (
    <Nav.Item>
      <NavLink to={to} exact className="nav-link" activeClassName="active">
        {children}
      </NavLink>
    </Nav.Item>
  );
}

function AppNav({error}) {
  let error_row = null;

  if (error) {
    error_row = (
      <Row>
        <Col>
          <Alert variant="danger">{error}</Alert>
        </Col>
      </Row>
    );
  }

  return (
    <div>
      <Row>
        <Col>
          <Nav variant="pills">
            <Link to="/">Feed</Link>
          <Link to="/users">Users</Link>
        </Nav>
        </Col>
        <Col>
          <LoginOrInfo />
        </Col>
      </Row>
      { error_row }
    </div>
  );
}

function SessionInfo({session}) {
  function logout(ev) {
    ev.preventDefault();
    store.dispatch({ type: 'session/clear' });
  }

  return (
    <p>
      Logged in as {session.name}
      <Button onClick={logout}>Logout</Button>
    </p>
  );

  
}

export default connect(({error})=>({error}))(AppNav);