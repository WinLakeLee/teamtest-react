import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container, NavDropdown, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Header({ auth, setAuth, userInfo, setUserInfo }) {
  const logout = () => {
    sessionStorage.removeItem('jwt');
    setAuth(false);
    setUserInfo('');
  }
  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">종겜퀴즈</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/market">상점</Nav.Link>
            <Nav.Link as={Link} to="/ranking">랭킹</Nav.Link>
            <Nav.Link as={Link} to="/honor">명예의 전당</Nav.Link>
            <NavDropdown title="게임별 퀴즈" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/quiz/lol">롤</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/quiz/ms">메이플</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/quiz/sc">스타크래프트</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/quiz/bg">배틀그라운드</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/quiz/loa">로스트아크</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/quiz/etc">기타</NavDropdown.Item>
            </NavDropdown>
          </Nav>

          <Nav>
            {!auth ? (
              <>
                <Nav.Link as={Link} to="/login">로그인</Nav.Link>
                <Nav.Link as={Link} to="/signup">회원가입</Nav.Link>
              </>
            ) : (
              <>
                <div style={{ color: "white", marginTop: "15px", marginRight: "25px" }}>
                  내 포인트: {userInfo ? userInfo.point : "불러오는 중..."}
                </div>
                <Button variant="outline-light" onClick={logout} style={{ height: "30px", margin: "auto", padding:"0 12px 0 12px" }}>
                  로그아웃
                </Button>
                <Nav.Link as={Link} to="/mypage" style={{ marginLeft: "30px", marginTop: "8px" }}>마이페이지</Nav.Link>
                {/* 닉네임 + 등급이미지 */}
                <div style={{ display: "flex", alignItems: "center", marginLeft: "10px" }}>
                  {userInfo?.grade && (
                    <img
                      src={`../images/rank/티어이미지/${userInfo.grade}.jpg`}
                      alt={userInfo.grade}
                      style={{ width: "30px", height: "30px", marginLeft: "10px" }}
                    />
                  )}
                  <div style={{
                    color: "white",
                    padding: "5px",
                    fontSize: "30px"
                  }}
                  >
                    {userInfo?.nickname || "불러오는 중..."}
                  </div>
                </div>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;