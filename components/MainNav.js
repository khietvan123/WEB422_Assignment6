import { Container, Nav, Navbar, Form, Button, NavDropdown } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { searchHistoryAtom } from "@/store";
import { addToHistory } from "@/lib/userData";
import { readToken, removeToken } from "@/lib/authenticate";
import { updateSearchHistory } from "@/store";

export default function MainNav() {
  const [searchField, setSearchField] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const [token, setToken] = useState(null);
  const router = useRouter();

useEffect(() => {
  function syncAuth() {
    setToken(readToken());
  }

  syncAuth(); // run once
  window.addEventListener("storage", syncAuth);
  return () => window.removeEventListener("storage", syncAuth);
}, []);

  const userName = token?.userName || "User";

  async function submitForm(e) {
    e.preventDefault();
    if (searchField !== "") {
      const queryString = `title=true&q=${searchField}`;
      updateSearchHistory(setSearchHistory, await addToHistory(queryString));
      router.push(`/artwork?${queryString}`);
      setSearchField("");
      setIsExpanded(false);
    }
  }

  function logout() {
    setIsExpanded(false);
    removeToken();
    setToken(null);
    router.push("/login");
  }

  return (
    <>
      <Navbar expand="lg" className="fixed-top navbar-dark bg-dark" expanded={isExpanded}>
        <Container>
          <Navbar.Brand>Khiet Van Phan</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setIsExpanded((e) => !e)} />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link href="/" passHref legacyBehavior>
                <Nav.Link active={router.pathname === "/"} onClick={() => setIsExpanded(false)}>
                  Home
                </Nav.Link>
              </Link>

              {token && (
                <Link href="/search" passHref legacyBehavior>
                  <Nav.Link active={router.pathname === "/search"} onClick={() => setIsExpanded(false)}>
                    Advanced Search
                  </Nav.Link>
                </Link>
              )}
            </Nav>

            {token && (
              <>
                &nbsp;
                <Form className="d-flex" onSubmit={submitForm}>
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    value={searchField}
                    onChange={(e) => setSearchField(e.target.value)}
                  />
                  <Button type="submit" variant="success">
                    Search
                  </Button>
                </Form>
                &nbsp;
              </>
            )}

            <Nav>
              {token ? (
                <NavDropdown title={userName} id="basic-nav-dropdown">
                  <Link href="/favourites" passHref legacyBehavior>
                    <NavDropdown.Item onClick={() => setIsExpanded(false)}>Favourites</NavDropdown.Item>
                  </Link>
                  <Link href="/history" passHref legacyBehavior>
                    <NavDropdown.Item onClick={() => setIsExpanded(false)}>Search History</NavDropdown.Item>
                  </Link>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav>
                  <Link href="/register" passHref legacyBehavior>
                    <Nav.Link active={router.pathname === "/register"} onClick={() => setIsExpanded(false)}>
                      Register
                    </Nav.Link>
                  </Link>
                  <Link href="/login" passHref legacyBehavior>
                    <Nav.Link active={router.pathname === "/login"} onClick={() => setIsExpanded(false)}>
                      Login
                    </Nav.Link>
                  </Link>
                </Nav>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <br />
      <br />
    </>
  );
}
