import styled from "styled-components";
import GooglePlayIcon from "@assets/icons/download-google-play.svg";
import AppStoreIcon from "@assets/icons/download-app-store.svg";

const APP_STORE_URL = "https://apps.apple.com/app/id6756947156";
const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.revede.snaplink";

/**
 * 웹에서 로그인 시 SIGNUP_REQUIRED 응답을 받은 경우 표시하는 안내 컴포넌트.
 * 스냅링크는 웹 회원가입을 지원하지 않으므로 앱으로 안내한다.
 */
export default function SignupRequired() {
    return (
        <Wrapper>
            <Icon>📱</Icon>
            <Title>앱에서 가입이 필요해요</Title>
            <Description>
                스냅링크는 앱에서만 회원가입이 가능합니다.<br />
                아래 링크에서 앱을 설치한 후 가입을 진행해주세요.
            </Description>
            <DownloadRow>
                <StoreLink href={APP_STORE_URL} target="_blank" rel="noopener noreferrer">
                    <StoreIcon src={AppStoreIcon} alt="App Store" />
                </StoreLink>
                <StoreLink href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer">
                    <StoreIcon src={GooglePlayIcon} alt="Google Play" />
                </StoreLink>
            </DownloadRow>
            <HomeLink href="/">스냅링크 홈으로 가기</HomeLink>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    width: 100%;
`;

const Icon = styled.div`
    font-size: 56px;
    margin-bottom: 20px;
    line-height: 1;
`;

const Title = styled.h2`
    font-size: clamp(20px, 3vw, 26px);
    font-weight: bold;
    color: #000;
    margin-bottom: 16px;
`;

const Description = styled.p`
    font-size: clamp(14px, 1.8vw, 16px);
    color: #555;
    line-height: 1.7;
    margin-bottom: 32px;
`;

const DownloadRow = styled.div`
    display: flex;
    gap: 12px;
    margin-bottom: 28px;
`;

const StoreLink = styled.a`
    display: block;
    transition: opacity 0.2s ease;

    &:hover {
        opacity: 0.85;
    }
`;

const StoreIcon = styled.img`
    height: 44px;
    width: auto;
    display: block;
`;

const HomeLink = styled.a`
    font-size: 14px;
    color: #00a980;
    text-decoration: underline;

    &:hover {
        opacity: 0.8;
    }
`;
