import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import Header from "@components/common/Header";
import Footer from "@components/common/Footer";
import { useAuthStore } from "@/store/authStore";

export default function KakaoCallback() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const signInWithProviderToken = useAuthStore((state) => state.signInWithProviderToken);
    const [status, setStatus] = useState<"loading" | "success" | "error" | "needs_signup">("loading");
    const [message, setMessage] = useState("카카오 로그인 처리 중...");

    useEffect(() => {
        const code = searchParams.get("code");
        const error = searchParams.get("error");

        if (error) {
            setStatus("error");
            setMessage("로그인에 실패했습니다. 다시 시도해주세요.");
            return;
        }

        if (!code) {
            setStatus("error");
            setMessage("인증 코드를 받을 수 없었습니다.");
            return;
        }

        // 서버로 인증 코드 전송하여 카카오 토큰 받기
        const handleLogin = async () => {
            try {
                // 1. 카카오 인증 코드로 카카오 토큰 받기
                const response = await fetch("/api/auth/kakao", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ code }),
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || "로그인에 실패했습니다.");
                }

                // 2. 받은 카카오 토큰으로 백엔드에 로그인 요청
                const kakaoToken = data.accessToken;
                if (!kakaoToken) {
                    throw new Error("카카오 토큰을 받을 수 없었습니다.");
                }

                const signInResult = await signInWithProviderToken("KAKAO", kakaoToken);

                if (signInResult === "SIGNUP_REQUIRED") {
                    setStatus("needs_signup");
                    setMessage("회원가입이 필요합니다. 앱에서 회원가입을 진행해주세요.");
                    
                    // 회원가입 필요 시 앱으로 리다이렉트 또는 안내 페이지로
                    setTimeout(() => {
                        alert("회원가입이 필요합니다. 앱에서 회원가입을 진행해주세요.");
                        window.location.href = "/";
                    }, 3000);
                } else {
                    setStatus("success");
                    setMessage("로그인 성공! 잠시 후 이동합니다...");

                    // 로그인 성공 후 홈으로 리다이렉트
                    setTimeout(() => {
                        window.location.href = "/";
                    }, 2000);
                }
            } catch (err) {
                console.error(err);
                setStatus("error");
                setMessage(err instanceof Error ? err.message : "로그인 처리 중 오류가 발생했습니다.");
            }
        };

        handleLogin();
    }, [searchParams, navigate, signInWithProviderToken]);

    return (
        <>
            <Header />
            <Container>
                <Content>
                    {status === "loading" && (
                        <>
                            <LoadingSpinner />
                            <Message>{message}</Message>
                        </>
                    )}
                    {status === "success" && (
                        <>
                            <SuccessIcon>✓</SuccessIcon>
                            <Message $success>{message}</Message>
                        </>
                    )}
                    {status === "needs_signup" && (
                        <>
                            <WarningIcon>⚠</WarningIcon>
                            <Message $warning>{message}</Message>
                            <InfoBox>
                                앱에서 회원가입을 완료한 후 다시 로그인해주세요.
                            </InfoBox>
                        </>
                    )}
                    {status === "error" && (
                        <>
                            <ErrorIcon>✕</ErrorIcon>
                            <Message $error>{message}</Message>
                            <RetryButton onClick={() => navigate("/auth/kakao")}>
                                다시 시도
                            </RetryButton>
                        </>
                    )}
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

const LoadingSpinner = styled.div`
    width: 48px;
    height: 48px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid #00a980;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 24px;

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;

const SuccessIcon = styled.div`
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background-color: #00a980;
    color: #fff;
    font-size: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 24px;
`;

const ErrorIcon = styled.div`
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background-color: #ff4444;
    color: #fff;
    font-size: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 24px;
`;

const WarningIcon = styled.div`
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background-color: #ff9800;
    color: #fff;
    font-size: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 24px;
`;

const Message = styled.p<{ $success?: boolean; $error?: boolean; $warning?: boolean }>`
    font-size: clamp(16px, 2vw, 20px);
    color: ${({ $success, $error, $warning }) =>
        $success ? "#00a980" : $error ? "#ff4444" : $warning ? "#ff9800" : "#666"};
    line-height: 1.6;
    margin-bottom: 24px;
`;

const InfoBox = styled.div`
    padding: 16px;
    background-color: #fff4e6;
    border: 1px solid #ffd700;
    border-radius: 10px;
    color: #666;
    font-size: 14px;
    line-height: 1.6;
    margin-top: 16px;
`;

const RetryButton = styled.button`
    padding: 12px 32px;
    border-radius: 10px;
    background-color: #00a980;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    border: none;
    cursor: pointer;
    transition: opacity 0.2s ease;

    &:hover {
        opacity: 0.9;
    }
`;
