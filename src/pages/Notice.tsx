import styled from "styled-components";
import {SubPageContainer} from "@components/common/Container.tsx";

export default function Notice() {
    return (
        <>
            <SubPageContainer title="공지사항">
                <NoticeItem>
                    <NoticeItemTitle>개인정보 처리 방침 약관 안내</NoticeItemTitle>
                    <NoticeItemDate>2025. 12. 26</NoticeItemDate>
                </NoticeItem>
                <NoticeItem>
                    <NoticeItemTitle>서비스 이용 약관 안내</NoticeItemTitle>
                    <NoticeItemDate>2025. 12. 26</NoticeItemDate>
                </NoticeItem>
            </SubPageContainer>
        </>
    )
}

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