import React, { useState } from "react";
import { Navbar, Nav, Container, NavDropdown, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Header() {
  // 로그인 여부 (실제로는 토큰이나 redux, context로 관리)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 로그인 / 로그아웃 토글 (예시)
  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

   return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">종겜퀴즈</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/quiz">퀴즈 시작</Nav.Link>
            <Nav.Link as={Link} to="/rank">랭킹</Nav.Link>
            <Nav.Link as={Link} to="/honor">명예의 전당</Nav.Link>

            <NavDropdown title="게임별 퀴즈" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/quiz/lol">롤</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/quiz/maple">메이플</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/quiz/star">스타크래프트</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/quiz/ark">로스트아크</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/quiz/etc">기타</NavDropdown.Item>
            </NavDropdown>
          </Nav>

          <Nav>
            {!isLoggedIn ? (
              <>
                <Nav.Link as={Link} to="/login">로그인</Nav.Link>
                <Nav.Link as={Link} to="/signup">회원가입</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/mypage">마이페이지</Nav.Link>
                <Button variant="outline-light" size="sm" onClick={handleLogout}>
                  로그아웃
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;