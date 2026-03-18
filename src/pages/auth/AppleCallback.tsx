import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { useAuthStore } from "@/store/authStore";
import SignupRequired from "@components/auth/SignupRequired";

function getInitialState(searchParams: URLSearchParams): {
    status: "loading" | "error";
    message: string;
} {
    const error = searchParams.get("error");
    const token = searchParams.get("token");

    if (error) {
        return {
            status: "error",
            message: error === "access_denied" ? "로그인이 취소되었습니다." : "로그인에 실패했습니다. 다시 시도해주세요.",
        };
    }
    if (!token) {
        return { status: "error", message: "인증 토큰을 받을 수 없었습니다." };
    }
    return { status: "loading", message: "Apple 로그인 처리 중..." };
}

export default function AppleCallback() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const signInWithProviderToken = useAuthStore((state) => state.signInWithProviderToken);

    const initial = getInitialState(searchParams);
    const [status, setStatus] = useState<"loading" | "success" | "error" | "needs_signup">(initial.status);
    const [message, setMessage] = useState(initial.message);

    const token = searchParams.get("token");

    useEffect(() => {
        if (!token) return;

        const handleLogin = async () => {
            try {
                const signInResult = await signInWithProviderToken("APPLE", token);

                if (signInResult === "SIGNUP_REQUIRED") {
                    setStatus("needs_signup");
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
    }, [token, signInWithProviderToken]);

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
                {status === "needs_signup" && <SignupRequired />}
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
    border-top: 4px solid #000;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 24px;

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
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

const Message = styled.p<{ $success?: boolean; $error?: boolean }>`
    font-size: clamp(16px, 2vw, 20px);
    color: ${({ $success, $error }) =>
        $success ? "#00a980" : $error ? "#ff4444" : "#666"};
    line-height: 1.6;
    margin-bottom: 24px;
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
