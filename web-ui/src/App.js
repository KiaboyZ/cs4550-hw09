import { Container } from 'react-bootstrap';
import { Switch, Route } from 'react-router-dom';
import "./App.scss";
import Nav from './Nav';
import Feed from './Feed';
import UsersList from './Users/List';
import UsersNew from './Users/New';
import EventsNew from './Events/New';
import EventsList from './Events/List';

function App() {
  return (
    <Container>
      <Nav />
      <Switch>
        <Route path="/" exact>
          <Feed />
        </Route>
        <Route path="/users" exact>
          <UsersList />
        </Route>
        <Route path="/users/new">
          <UsersNew />
        </Route>
        <Route path="/events/list">
          <EventsList />
        </Route>
        <Route path="/events/new">
          <EventsNew />
        </Route>
      </Switch>
    </Container>
  );
}

export default App;