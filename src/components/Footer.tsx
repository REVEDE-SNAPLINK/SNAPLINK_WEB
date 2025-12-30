import styled from "styled-components";
import LogoIcon from "@assets/icons/logo-white.svg";

export default function Footer() {
    return (
        <Container>
            <DefaultInfoWrapper>
                <LogoImage src={LogoIcon} alt="snaplink" />
                <ContactInfoWrapper>
                    <ContactInfoText>Revede</ContactInfoText>
                    <ContactInfoText>대표자 : 이관우</ContactInfoText>
                    <ContactInfoText>고객센터 문의 : </ContactInfoText>
                    <ContactInfoText>메일 문의: snapbridge05@gmail.com</ContactInfoText>
                </ContactInfoWrapper>

                <CopyrightWrapper>
                    <Copyright>© Revede 2026</Copyright>
                    <CopyrightLink href="/">서비스 이용약관</CopyrightLink>
                    <CopyrightLink href="/">개인정보 처리방침</CopyrightLink>
                </CopyrightWrapper>
            </DefaultInfoWrapper>

            <SiteMapContainer>
                <SiteMapWrapper>
                    <SiteMapTitle>서비스</SiteMapTitle>
                    <SiteMapLink href="/">공지사항</SiteMapLink>
                    <SiteMapLink href="/">자주 묻는 질문</SiteMapLink>
                    <SiteMapLink href="/">고객센터</SiteMapLink>
                </SiteMapWrapper>

                <SiteMapWrapper>
                    <SiteMapTitle>고객센터</SiteMapTitle>
                    <SiteMapLink href="/">이메일</SiteMapLink>
                    <SiteMapLink href="/">채팅</SiteMapLink>
                    <SiteMapLink href="/">문의</SiteMapLink>
                </SiteMapWrapper>
            </SiteMapContainer>
        </Container>
    );
}

const Container = styled.footer`
    background: #2f3234;
    box-sizing: border-box;

    padding: clamp(40px, 6vw, 70px) clamp(16px, 5vw, 80px);
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 32px;

    @media (max-width: 860px) {
        grid-template-columns: 1fr;
    }
`;

const DefaultInfoWrapper = styled.div`
    width: 100%;
    max-width: 470px;
    display: flex;
    flex-direction: column;
    gap: 18px;
`;

const LogoImage = styled.img`
    width: 152.11px;
    height: 27.73px;
`;

const ContactInfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const ContactInfoText = styled.p`
    width: 100%;
    font-size: 14px;
    color: #fff;
`;

const CopyrightWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 12px 18px;
    width: 100%;
    max-width: 440px;
`;

const Copyright = styled.span`
    font-size: 18px;
    font-weight: 600;
    color: #fff;
`;

const CopyrightLink = styled.a`
    font-size: 18px;
    font-weight: 600;
    color: #fff;
    text-decoration: none;
`;

const SiteMapContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;

    @media (max-width: 860px) {
        justify-content: flex-start;
    }
`;

const SiteMapWrapper = styled.div`
    display: flex;
    flex-direction: column;

    &:not(:first-child) {
        margin-left: 40px;
    }

    @media (max-width: 860px) {
        &:not(:first-child) {
            margin-left: 24px;
        }
    }
`;

const SiteMapTitle = styled.div`
    font-size: 18px;
    font-weight: 600;
    color: #fff;
`;

const SiteMapLink = styled.a`
    font-size: 18px;
    color: #fff;
    margin-top: 20px;
`;