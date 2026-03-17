import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { useAuthStore } from "@/store/authStore";

export default function NaverCallback() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const signInWithProviderToken = useAuthStore((state) => state.signInWithProviderToken);
    const [status, setStatus] = useState<"loading" | "success" | "error" | "needs_signup">("loading");
    const [message, setMessage] = useState("네이버 로그인 처리 중...");

    useEffect(() => {
        const code = searchParams.get("code");
        const state = searchParams.get("state");
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

        const handleLogin = async () => {
            try {
                const response = await fetch("/api/auth/naver", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ code, state }),
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || "로그인에 실패했습니다.");
                }

                const naverToken = data.accessToken;
                if (!naverToken) {
                    throw new Error("네이버 토큰을 받을 수 없었습니다.");
                }

                const signInResult = await signInWithProviderToken("NAVER", naverToken);

                if (signInResult === "SIGNUP_REQUIRED") {
                    setStatus("needs_signup");
                    setMessage("회원가입이 필요합니다. 앱에서 회원가입을 진행해주세요.");
                    setTimeout(() => {
                        alert("회원가입이 필요합니다. 앱에서 회원가입을 진행해주세요.");
                        window.location.href = "/";
                    }, 3000);
                } else {
                    setStatus("success");
                    setMessage("로그인 성공! 잠시 후 이동합니다...");
                    setTimeout(() => {
                        window.location.href = "/customer-service";
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
                        <InfoBox>앱에서 회원가입을 완료한 후 다시 로그인해주세요.</InfoBox>
                    </>
                )}
                {status === "error" && (
                    <>
                        <ErrorIcon>✕</ErrorIcon>
                        <Message $error>{message}</Message>
                        <RetryButton onClick={() => navigate("/auth/login")}>
                            다시 시도
                        </RetryButton>
                    </>
                )}
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
    border-top: 4px solid #03c75a;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 24px;

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;

const IconBase = styled.div`
    width: 64px;
    height: 64px;
    border-radius: 50%;
    color: #fff;
    font-size: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 24px;
`;

const SuccessIcon = styled(IconBase)`background-color: #00a980;`;
const ErrorIcon = styled(IconBase)`background-color: #ff4444;`;
const WarningIcon = styled(IconBase)`background-color: #ff9800;`;

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
