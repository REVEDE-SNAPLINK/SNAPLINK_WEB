import styled from "styled-components";
import Header from "@components/Header.tsx";
import Footer from "@components/Footer.tsx";

export default function Notice() {
    return (
        <>
            <Header />
            <Container>
                <Title>공지사항</Title>
                <NoticeItem>
                    <NoticeItemTitle>개인정보 처리 방침 약관 안내</NoticeItemTitle>
                    <NoticeItemDate>2025. 12. 26</NoticeItemDate>
                </NoticeItem>
                <NoticeItem>
                    <NoticeItemTitle>서비스 이용 약관 안내</NoticeItemTitle>
                    <NoticeItemDate>2025. 12. 26</NoticeItemDate>
                </NoticeItem>
            </Container>
            <Footer />
        </>
    )
}

const Container = styled.div`
    padding: 112px 125px;
    box-sizing: border-box;
    
    @media (max-width: 720px) {
        padding: 112px 50px;
    }
`

const Title = styled.h1`
    margin-bottom: 101px;
    font-size: 38px;
    font-weight: bold;
    color: #00A980;
`

const NoticeItem = styled.a`
    display: block;
    width: 100%;
    height: 94px;
    border-bottom: 1px #8F8F8F solid;
    margin-bottom: 30px;
`

const NoticeItemTitle = styled.h2`
    font-size: 24px;
    font-weight: bold;
    color: #000;
    margin-bottom: 10px;
`

const NoticeItemDate = styled.p`
    font-size: 18px;
    color: #8F8F8F;
`