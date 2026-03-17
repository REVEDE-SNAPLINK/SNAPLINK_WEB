import { useState } from "react";
import styled from "styled-components";

export default function Login() {
    const [loadingProvider, setLoadingProvider] = useState<"kakao" | "naver" | "apple" | null>(null);

    const startOAuth = (provider: "kakao" | "naver" | "apple") => {
        setLoadingProvider(provider);
        window.location.href = `/api/auth/${provider}/start`;
    };

    return (
        <Container>
            <Content>
                <Title>로그인</Title>
                <Description>
                    스냅링크 서비스를 이용하시려면<br />
                    소셜 계정으로 로그인해주세요.
                </Description>

                <ButtonStack>
                    <KakaoButton
                        onClick={() => startOAuth("kakao")}
                        disabled={loadingProvider !== null}
                    >
                        {loadingProvider === "kakao" ? "연결 중..." : "카카오로 로그인"}
                    </KakaoButton>

                    <NaverButton
                        onClick={() => startOAuth("naver")}
                        disabled={loadingProvider !== null}
                    >
                        {loadingProvider === "naver" ? "연결 중..." : "네이버로 로그인"}
                    </NaverButton>

                    <AppleButton
                        onClick={() => startOAuth("apple")}
                        disabled={loadingProvider !== null}
                    >
                        {loadingProvider === "apple" ? "연결 중..." : " Apple로 로그인"}
                    </AppleButton>
                </ButtonStack>

                <InfoText>
                    로그인 시{" "}
                    <PolicyLink href="/terms" target="_blank">
                        이용약관
                    </PolicyLink>
                    {" 및 "}
                    <PolicyLink href="/privacy" target="_blank">
                        개인정보처리방침
                    </PolicyLink>
                    에 동의하게 됩니다.
                </InfoText>
            </Content>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: clamp(48px, 8vw, 80px) clamp(16px, 4vw, 40px);
    box-sizing: border-box;
    min-height: calc(100vh - 200px);
`;

const Content = styled.div`
    width: 100%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
`;

const Title = styled.h1`
    font-size: clamp(28px, 4vw, 40px);
    font-weight: bold;
    color: #000;
    margin-bottom: clamp(16px, 2vw, 24px);
`;

const Description = styled.p`
    font-size: clamp(14px, 2vw, 17px);
    color: #666;
    line-height: 1.6;
    margin-bottom: clamp(36px, 5vw, 56px);
`;

const ButtonStack = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: clamp(24px, 4vw, 40px);
`;

const BaseButton = styled.button`
    width: 100%;
    height: 54px;
    border-radius: 10px;
    font-size: 16px;
    font-weight: bold;
    border: none;
    cursor: pointer;
    transition: opacity 0.2s ease;

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }

    &:hover:not(:disabled) {
        opacity: 0.88;
    }
`;

const KakaoButton = styled(BaseButton)`
    background-color: #fee500;
    color: #191919;
`;

const NaverButton = styled(BaseButton)`
    background-color: #03c75a;
    color: #fff;
`;

const AppleButton = styled(BaseButton)`
    background-color: #000;
    color: #fff;
`;

const InfoText = styled.p`
    font-size: 13px;
    color: #999;
    line-height: 1.6;
`;

const PolicyLink = styled.a`
    color: #00a980;
    text-decoration: underline;

    &:hover {
        opacity: 0.8;
    }
`;
