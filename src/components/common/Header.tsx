import { useEffect, useState } from "react";
import styled from "styled-components";
import logo from "@assets/icons/logo.svg";

export default function Header() {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    return (
        <>
            <Container>
                <LogoLink href="/">
                    <LogoImage src={logo} alt="logo" />
                </LogoLink>

                {/* Desktop Nav */}
                <Nav>
                    <NavLink href="/notice">공지사항</NavLink>
                    <NavLink href="/faq">자주 묻는 질문</NavLink>
                    <NavLink href="/event-inquiry">행사 촬영 문의</NavLink>
                    <NavLink href="http://pf.kakao.com/_KasSn">고객센터</NavLink>
                </Nav>

                {/* Mobile Hamburger */}
                <HamburgerButton
                    aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
                    onClick={() => setOpen((v) => !v)}
                >
                    <HamburgerIcon $open={open} />
                </HamburgerButton>
            </Container>

            {/* Overlay */}
            <Overlay $open={open} onClick={() => setOpen(false)} />

            {/* Slide Menu */}
            <SideMenu $open={open}>
                <SideNav>
                    <SideNavLink href="/notice" onClick={() => setOpen(false)}>
                        공지사항
                    </SideNavLink>
                    <SideNavLink href="/faq" onClick={() => setOpen(false)}>
                        자주 묻는 질문
                    </SideNavLink>
                    <SideNavLink href="/event-inquiry" onClick={() => setOpen(false)}>
                        행사 촬영 문의
                    </SideNavLink>
                    <SideNavLink href="http://pf.kakao.com/_KasSn" onClick={() => setOpen(false)}>
                        고객센터
                    </SideNavLink>
                </SideNav>
            </SideMenu>
        </>
    );
}

/* ===================== layout ===================== */

const Container = styled.header`
    width: 100%;
    height: 100px;
    padding: 0 clamp(16px, 4vw, 71px);

    display: flex;
    align-items: center;
    justify-content: space-between;

    background-color: #fff;
    box-sizing: border-box;

    position: sticky;
    top: 0;
    z-index: 50;
`;

const LogoLink = styled.a``;

const LogoImage = styled.img`
    width: 152px;
    height: 27px;

    @media (max-width: 480px) {
        width: 132px;
        height: auto;
    }
`;

/* ===================== desktop nav ===================== */

const Nav = styled.nav`
    display: flex;
    gap: 28px;

    @media (max-width: 900px) {
        display: none;
    }
`;

const NavLink = styled.a`
    font-size: 18px;
    color: #000;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`;

/* ===================== hamburger ===================== */

const HamburgerButton = styled.button`
    display: none;

    @media (max-width: 900px) {
        display: flex;
        align-items: center;
        justify-content: center;

        width: 40px;
        height: 40px;

        background: none;
        border: none;
        cursor: pointer;
    }
`;

const HamburgerIcon = styled.div<{ $open: boolean }>`
    position: relative;
    width: 22px;
    height: 2px;
    background: ${({ $open }) => ($open ? "transparent" : "#000")};
    transition: background 0.2s ease;

    &::before,
    &::after {
        content: "";
        position: absolute;
        left: 0;
        width: 22px;
        height: 2px;
        background: #000;
        transition: transform 0.25s ease, top 0.25s ease;
    }

    &::before {
        top: ${({ $open }) => ($open ? "0" : "-7px")};
        transform: ${({ $open }) => ($open ? "rotate(45deg)" : "none")};
    }

    &::after {
        top: ${({ $open }) => ($open ? "0" : "7px")};
        transform: ${({ $open }) => ($open ? "rotate(-45deg)" : "none")};
    }
`;

/* ===================== slide menu ===================== */

const Overlay = styled.div<{ $open: boolean }>`
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.35);
    opacity: ${({ $open }) => ($open ? 1 : 0)};
    pointer-events: ${({ $open }) => ($open ? "auto" : "none")};
    transition: opacity 200ms ease;
    z-index: 60;

    @media (min-width: 901px) {
        display: none;
    }
`;

const SideMenu = styled.aside<{ $open: boolean }>`
    position: fixed;
    top: 0;
    right: 0;
    width: min(80vw, 320px);
    height: 100dvh;

    background: #fff;
    transform: translateX(${({ $open }) => ($open ? "0" : "100%")});
    transition: transform 240ms ease;
    z-index: 70;

    padding: 120px 32px 32px;

    @media (min-width: 901px) {
        display: none;
    }
`;

const SideNav = styled.nav`
    display: flex;
    flex-direction: column;
    gap: 32px;
`;

const SideNavLink = styled.a`
    font-size: 22px;
    font-weight: 600;
    color: #000;
    text-decoration: none;

    /* 담백하게 */
    border: none;
    background: none;
    padding: 0;

    &:hover {
        opacity: 0.7;
    }
`;