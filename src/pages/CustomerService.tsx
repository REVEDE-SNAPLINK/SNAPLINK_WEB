import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "@components/common/Header";
import Footer from "@components/common/Footer";
import { useAuthStore } from "@/store/authStore";

export default function CustomerService() {
    const navigate = useNavigate();
    const status = useAuthStore((state) => state.status);
    const userId = useAuthStore((state) => state.userId);
    const userType = useAuthStore((state) => state.userType);
    const signOut = useAuthStore((state) => state.signOut);
    const bootstrapped = useAuthStore((state) => state.bootstrapped);

    useEffect(() => {
        // Bootstrap이 완료될 때까지 대기
        if (!bootstrapped) {
            return;
        }
    }, [bootstrapped]);

    const handleLogin = () => {
        navigate("/auth/kakao");
    };

    const handleLogout = async () => {
        if (confirm("로그아웃 하시겠습니까?")) {
            try {
                await signOut();
                alert("로그아웃되었습니다.");
            } catch (error) {
                console.error(error);
                alert("로그아웃 처리 중 오류가 발생했습니다.");
            }
        }
    };

    const handleWithdraw = () => {
        if (confirm("회원 탈퇴 페이지로 이동하시겠습니까?")) {
            navigate("/withdraw");
        }
    };

    const isLoading = status === "loading" || !bootstrapped;
    const isLoggedIn = status === "authed";

    return (
        <>
            <Header />
            <Container>
                <Content>
                    <Title>회원 고객센터</Title>
                    <Description>
                        스냅링크 회원 서비스를 관리하실 수 있습니다.
                    </Description>

                    {isLoading && (
                        <LoadingSection>
                            <LoadingSpinner />
                            <LoadingText>로딩 중...</LoadingText>
                        </LoadingSection>
                    )}

                    {!isLoading && !isLoggedIn && (
                        <NotLoggedInSection>
                            <InfoBox>
                                <InfoText>
                                    회원 서비스를 이용하시려면 먼저 로그인해주세요.
                                </InfoText>
                            </InfoBox>
                            <ActionButton onClick={handleLogin} $primary>
                                카카오로 로그인
                            </ActionButton>
                        </NotLoggedInSection>
                    )}

                    {!isLoading && isLoggedIn && (
                        <LoggedInSection>
                            <UserInfoBox>
                                <UserInfoTitle>회원 정보</UserInfoTitle>
                                <UserInfoItem>
                                    <UserInfoLabel>회원 ID:</UserInfoLabel>
                                    <UserInfoValue>{userId || "-"}</UserInfoValue>
                                </UserInfoItem>
                                <UserInfoItem>
                                    <UserInfoLabel>회원 유형:</UserInfoLabel>
                                    <UserInfoValue>
                                        {userType === "photographer" ? "작가 회원" : "고객 회원"}
                                    </UserInfoValue>
                                </UserInfoItem>
                            </UserInfoBox>

                            <ActionSection>
                                <ActionButton onClick={handleLogout}>
                                    로그아웃
                                </ActionButton>
                                <ActionButton onClick={handleWithdraw} $danger>
                                    회원 탈퇴
                                </ActionButton>
                            </ActionSection>

                            <WarningBox>
                                <WarningTitle>회원 탈퇴 안내</WarningTitle>
                                <WarningText>
                                    회원 탈퇴를 하시면 모든 회원 정보와 데이터가 삭제되며 복구할 수 없습니다.
                                    탈퇴 전에 꼭 확인해주세요.
                                </WarningText>
                            </WarningBox>
                        </LoggedInSection>
                    )}

                    <ContactSection>
                        <ContactTitle>문의하기</ContactTitle>
                        <ContactList>
                            <ContactItem>
                                <ContactLabel>이메일:</ContactLabel>
                                <ContactLink href="mailto:snapbridge05@gmail.com">
                                    snapbridge05@gmail.com
                                </ContactLink>
                            </ContactItem>
                            <ContactItem>
                                <ContactLabel>카카오톡:</ContactLabel>
                                <ContactLink
                                    href="http://pf.kakao.com/_KasSn"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    채팅 상담하기
                                </ContactLink>
                            </ContactItem>
                        </ContactList>
                    </ContactSection>
                </Content>
            </Container>
            <Footer />
        </>
    );
}

const Container = styled.div`
    min-height: calc(100vh - 200px);
    padding: clamp(48px, 6vw, 80px) clamp(16px, 4vw, 40px);
    box-sizing: border-box;
    display: flex;
    justify-content: center;
`;

const Content = styled.div`
    width: 100%;
    max-width: 600px;
    display: flex;
    flex-direction: column;
    gap: 32px;
`;

const Title = styled.h1`
    font-size: clamp(32px, 4vw, 48px);
    font-weight: bold;
    color: #000;
    margin-bottom: clamp(16px, 2vw, 24px);
    text-align: center;
`;

const Description = styled.p`
    font-size: clamp(16px, 2vw, 18px);
    color: #666;
    margin-bottom: clamp(32px, 4vw, 48px);
    text-align: center;
`;

const LoadingSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    padding: 40px 0;
`;

const LoadingSpinner = styled.div`
    width: 48px;
    height: 48px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid #00a980;
    border-radius: 50%;
    animation: spin 1s linear infinite;

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;

const LoadingText = styled.p`
    font-size: 16px;
    color: #666;
`;

const NotLoggedInSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

const LoggedInSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 32px;
`;

const InfoBox = styled.div`
    padding: 24px;
    background-color: #f5f5f5;
    border-radius: 10px;
    text-align: center;
`;

const InfoText = styled.p`
    font-size: 16px;
    color: #666;
    line-height: 1.6;
`;

const UserInfoBox = styled.div`
    padding: 24px;
    background-color: #fff;
    border: 1px solid #e0e0e0;
    border-radius: 10px;
`;

const UserInfoTitle = styled.h3`
    font-size: 20px;
    font-weight: bold;
    color: #000;
    margin-bottom: 20px;
`;

const UserInfoItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 0;
    border-bottom: 1px solid #f0f0f0;

    &:last-child {
        border-bottom: none;
    }
`;

const UserInfoLabel = styled.span`
    font-size: 16px;
    color: #666;
`;

const UserInfoValue = styled.span`
    font-size: 16px;
    font-weight: 600;
    color: #000;
`;

const ActionSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;

    @media (min-width: 600px) {
        flex-direction: row;
        gap: 16px;
    }
`;

const ActionButton = styled.button<{ $primary?: boolean; $danger?: boolean }>`
    flex: 1;
    height: 54px;
    border-radius: 10px;
    font-size: 18px;
    font-weight: bold;
    border: none;
    cursor: pointer;
    transition: opacity 0.2s ease;

    ${({ $primary, $danger }) => {
        if ($primary) {
            return `
                background-color: #FEE500;
                color: #000;
            `;
        }
        if ($danger) {
            return `
                background-color: #ff4444;
                color: #fff;
            `;
        }
        return `
            background-color: #f5f5f5;
            color: #000;
        `;
    }}

    &:hover {
        opacity: 0.9;
    }

    &:active {
        opacity: 0.8;
    }
`;

const WarningBox = styled.div`
    padding: 20px;
    background-color: #fff4e6;
    border: 1px solid #ffd700;
    border-radius: 10px;
`;

const WarningTitle = styled.h4`
    font-size: 16px;
    font-weight: bold;
    color: #d97706;
    margin-bottom: 8px;
`;

const WarningText = styled.p`
    font-size: 14px;
    color: #666;
    line-height: 1.6;
`;

const ContactSection = styled.div`
    margin-top: 24px;
    padding: 24px;
    background-color: #f9f9f9;
    border-radius: 10px;
`;

const ContactTitle = styled.h3`
    font-size: 20px;
    font-weight: bold;
    color: #000;
    margin-bottom: 16px;
`;

const ContactList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

const ContactItem = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`;

const ContactLabel = styled.span`
    font-size: 16px;
    color: #666;
    min-width: 80px;
`;

const ContactLink = styled.a`
    font-size: 16px;
    color: #00a980;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`;
