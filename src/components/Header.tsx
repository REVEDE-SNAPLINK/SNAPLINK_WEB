import styled from "styled-components";
import logo from "@assets/icons/logo.svg";

export default function Header () {
    return (
        <Container>
            <a href="/">
                <LogoImage src={logo} alt="logo" />
            </a>
            <Nav>
                <NavLink href="/">공지사항</NavLink>
                <NavLink href="/">자주 묻는 질문</NavLink>
                <NavLink href="/">고객센터</NavLink>
            </Nav>
        </Container>
    )
}

const Container = styled.header`
    width: 100%;
    height: 100px;
    padding: 0 71px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    box-sizing: border-box;
`


const LogoImage = styled.img`
    width: 152px;
    height: 27px;
`

const Nav = styled.nav`
    display: flex;
    align-items: center;
    width: 329px;
    justify-content: space-between;
`

const NavLink = styled.a`
    font-size: 18px;
    color: #000;
`