import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import './style.css'

// function Navigation() {

//     return ( 
//                 <div id="nav-div" className="d-flex">
//                 <Navbar collapseOnSelect expand="lg">
//                     <Container id="nav-div-container">
//                         <Navbar.Toggle aria-controls="responsive-navbar-nav" />
//                         <Navbar.Collapse id="responsive-navbar-nav">
//                             <Nav className="me-auto justify-content-end" defaultActiveKey="link-1">
//                                 <Nav.Item>
// 									<Link to='/products'><span className="navagation-links">Products</span></Link>
//                                 </Nav.Item>
//                                 <Nav.Item>
// 									<div>
// 										<a href='/' onClick={() => Auth.logout()}>'><span className="navagation-links">Logout</span></a>
// 									</div>
//                                 </Nav.Item>
//                                 <Nav.Item>                                    
// 									<Link to='/admin'><span className="navagation-links">Admin Page</span></Link>                                    
//                                 </Nav.Item>
//                             </Nav>
//                         </Navbar.Collapse>
//                     </Container>
//                 </Navbar>
//                 </div>
//     )
// }

// export default Navigation












const Navigation = () => {
	function showNavigation() {
		if (Auth.loggedIn()) {
			return (
				<div id="nav-div" className="d-flex">
                <Navbar collapseOnSelect expand="lg">
                    <Container id="nav-div-container">
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto justify-content-end" defaultActiveKey="link-1">
                                <Nav.Item>
									<Link to='/products' className="link-divs"><span className="navagation-links">Products</span></Link>
                                </Nav.Item>
                                <Nav.Item>									
									<Link to='/admin' className="link-divs"><span className="navagation-links">Admin Page</span></Link>								
                                </Nav.Item>
                                <Nav.Item>
									<div>
										<a href='/' onClick={() => Auth.logout()} className="link-divs"><span className="navagation-links">Logout</span></a>
									</div>	                                    
                                </Nav.Item>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                </div>
			);
		} else {
			return (
				<div id="nav-div" className="d-flex">
                <Navbar collapseOnSelect expand="lg">
                    <Container id="nav-div-container">
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto justify-content-end" defaultActiveKey="link-1">
                                <Nav.Item>
									<Link to='/products' className="link-divs"><span className="navagation-links">Products</span></Link>
                                </Nav.Item>
                                <Nav.Item>
									<Link to='/login' className="link-divs"><span className="navagation-links">Login</span></Link>
                                </Nav.Item>
                                <Nav.Item>                                    
									<Link to='/signup' className="link-divs"><span className="navagation-links">Sign-up</span></Link>                                    
                                </Nav.Item>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                </div>
			);
		}
	}

	return (
		<Row id="hero">
			<Col id="title-position" className="header-center" lg={true}>
				<h1>
					<Link to='/' id="page-title" className="link-divs">Epay</Link>	
				</h1>
			</Col>			
			<Col id="nav-bar-position" className="header-center" lg={true}>
				{showNavigation()}
			</Col>
		</Row>
	);
};

export default Navigation;
