// import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';

// better since Webpack / Vite will create a smaller build with explicit imports (tree-shaking)
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink } from 'react-router-dom';

// whichever component needs to dispatch actions has to use the useDispatch hook
import { useAppDispatch } from '../../../store';

import { toggleTheme } from '../../../features/themeSlice';

import './Menu.scss';

// <Link to="/workshops">List of Workshops</Link>

const Menu = () => {
    const dispatch = useAppDispatch();

    return (
        <Navbar collapseOnSelect expand="lg" className="bg-light">
            <Container>
                <Navbar.Brand as={NavLink} to="/" end>Workshops App</Navbar.Brand>

                <Navbar.Toggle aria-controls="responsive-navbar-nav" />

                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={NavLink} to="/home">Home</Nav.Link>
                        <Nav.Link as={NavLink} to="/workshops" end>List of workshops</Nav.Link>
                        <Nav.Link as={NavLink} to="/workshops/add" end>Add a workshop</Nav.Link>
                    </Nav>
                    <NavDropdown title="Personalize" id="basic-nav-dropdown">
                        <NavDropdown.Item as={NavLink} to="/workshops/favorites" end>
                            Favorites
                        </NavDropdown.Item>
                        <NavDropdown.Item href="#" onClick={() => dispatch( toggleTheme() )}>
                            Change Theme
                        </NavDropdown.Item>
                    </NavDropdown>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Menu;