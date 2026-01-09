import { useState } from "react";
import styled from "styled-components";
import Header from "@components/common/Header";
import Footer from "@components/common/Footer";

export default function KakaoLogin() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleKakaoLogin = () => {
        setLoading(true);
        setError(null);

        // 현재 도메인을 기반으로 리다이렉트 URI 설정
        const redirectUri = `${window.location.origin}/auth/kakao/callback`;
        
        const restApiKey = import.meta.env.VITE_KAKAO_REST_API_KEY;

        if (!restApiKey) {
            setError('카카오 API 키가 설정되지 않았습니다.');
            setLoading(false);
            return;
        }

        const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${restApiKey}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code`;
        
        window.location.href = kakaoAuthUrl;
    };

    return (
        <>
            <Header />
            <Container>
                <Content>
                    <Title>카카오 로그인</Title>
                    <Description>
                        스냅링크 서비스를 이용하시려면<br />
                        카카오 계정으로 로그인해주세요.
                    </Description>

                    {error && <ErrorMessage>{error}</ErrorMessage>}

                    <KakaoLoginButton
                        onClick={handleKakaoLogin}
                        disabled={loading}
                        $loading={loading}
                    >
                        {loading ? "연결 중..." : "카카오로 로그인"}
                    </KakaoLoginButton>

                    <InfoText>
                        로그인 시{" "}
                        <Link href="/terms" target="_blank">
                            이용약관
                        </Link>
                        {" 및 "}
                        <Link href="/privacy" target="_blank">
                            개인정보처리방침
                        </Link>
                        에 동의하게 됩니다.
                    </InfoText>
                </Content>
            </Container>
            <Footer />
        </>
    );
}

const Container = styled.div`
    min-height: calc(100vh - 200px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 80px clamp(16px, 4vw, 40px);
    box-sizing: border-box;
`;

const Content = styled.div`
    width: 100%;
    max-width: 480px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
`;

const Title = styled.h1`
    font-size: clamp(32px, 4vw, 48px);
    font-weight: bold;
    color: #000;
    margin-bottom: clamp(20px, 3vw, 32px);
`;

const Description = styled.p`
    font-size: clamp(16px, 2vw, 20px);
    color: #666;
    line-height: 1.6;
    margin-bottom: clamp(40px, 6vw, 60px);
    white-space: pre-line;
`;

const ErrorMessage = styled.div`
    width: 100%;
    padding: 16px;
    background-color: #fee;
    border: 1px solid #fcc;
    border-radius: 10px;
    color: #c00;
    font-size: 14px;
    margin-bottom: 24px;
`;

const KakaoLoginButton = styled.button<{ $loading: boolean }>`
    width: 100%;
    max-width: 400px;
    height: 54px;
    border-radius: 10px;
    background-color: #FEE500;
    color: #000;
    font-size: 18px;
    font-weight: bold;
    border: none;
    cursor: ${({ $loading }) => ($loading ? "wait" : "pointer")};
    margin-bottom: clamp(24px, 4vw, 40px);
    transition: opacity 0.2s ease;

    &:hover:not(:disabled) {
        opacity: 0.9;
    }

    &:disabled {
        opacity: 0.7;
    }
`;

const InfoText = styled.p`
    font-size: 14px;
    color: #999;
    line-height: 1.6;
`;

const Link = styled.a`
    color: #00a980;
    text-decoration: underline;

    &:hover {
        opacity: 0.8;
    }
`;
