import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuthStore } from "@/store/authStore";

export default function CustomerService() {
    const navigate = useNavigate();
    const status = useAuthStore((state) => state.status);
    const userId = useAuthStore((state) => state.userId);
    const userType = useAuthStore((state) => state.userType);
    const signOut = useAuthStore((state) => state.signOut);
    const bootstrapped = useAuthStore((state) => state.bootstrapped);

    // 로그인 페이지로 리다이렉트 시 현재 경로 보존 (미래 확장 대비)
    useEffect(() => {
        if (bootstrapped && status === "anon") {
            navigate("/auth/login", { replace: true });
        }
    }, [bootstrapped, status, navigate]);

    const handleLogout = async () => {
        if (confirm("로그아웃 하시겠습니까?")) {
            try {
                await signOut();
            } catch (error) {
                console.error(error);
                alert("로그아웃 처리 중 오류가 발생했습니다.");
            }
        }
    };

    const handleWithdraw = () => {
        navigate("/withdraw");
    };

    const isLoading = !bootstrapped || status === "loading";
    const isLoggedIn = status === "authed";

    return (
        <Container>
            <Content>
                <Title>회원 고객센터</Title>
                <Description>스냅링크 회원 서비스를 관리하실 수 있습니다.</Description>

                {isLoading && (
                    <Section>
                        <LoadingSpinner />
                        <LoadingText>로딩 중...</LoadingText>
                    </Section>
                )}

                {!isLoading && isLoggedIn && (
                    <>
                        <UserInfoBox>
                            <UserInfoTitle>회원 정보</UserInfoTitle>
                            <UserInfoItem>
                                <UserInfoLabel>회원 ID</UserInfoLabel>
                                <UserInfoValue>{userId || "-"}</UserInfoValue>
                            </UserInfoItem>
                            <UserInfoItem>
                                <UserInfoLabel>회원 유형</UserInfoLabel>
                                <UserInfoValue>
                                    {userType === "photographer" ? "작가 회원" : "고객 회원"}
                                </UserInfoValue>
                            </UserInfoItem>
                        </UserInfoBox>

                        <ActionSection>
                            <ActionButton onClick={handleLogout}>로그아웃</ActionButton>
                            <ActionButton onClick={handleWithdraw} $danger>
                                회원 탈퇴
                            </ActionButton>
                        </ActionSection>

                        <WarningBox>
                            <WarningTitle>탈퇴 안내</WarningTitle>
                            <WarningText>
                                회원 탈퇴 시 모든 정보와 데이터가 삭제되며 복구할 수 없습니다.
                                탈퇴 전에 진행 중인 예약이나 거래를 먼저 완료해주세요.
                            </WarningText>
                        </WarningBox>
                    </>
                )}

                <ContactSection>
                    <ContactTitle>문의하기</ContactTitle>
                    <ContactList>
                        <ContactItem>
                            <ContactLabel>이메일</ContactLabel>
                            <ContactLink href="mailto:snapbridge05@gmail.com">
                                snapbridge05@gmail.com
                            </ContactLink>
                        </ContactItem>
                        <ContactItem>
                            <ContactLabel>카카오톡</ContactLabel>
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
    );
}

const Container = styled.div`
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
    gap: 24px;
`;

const Title = styled.h1`
    font-size: clamp(28px, 4vw, 40px);
    font-weight: bold;
    color: #000;
    text-align: center;
`;

const Description = styled.p`
    font-size: clamp(15px, 2vw, 17px);
    color: #666;
    text-align: center;
`;

const Section = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    padding: 40px 0;
`;

const LoadingSpinner = styled.div`
    width: 40px;
    height: 40px;
    border: 3px solid #f0f0f0;
    border-top: 3px solid #00a980;
    border-radius: 50%;
    animation: spin 1s linear infinite;

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;

const LoadingText = styled.p`
    font-size: 15px;
    color: #999;
`;

const UserInfoBox = styled.div`
    padding: 24px;
    background-color: #fff;
    border: 1px solid #e8e8e8;
    border-radius: 12px;
`;

const UserInfoTitle = styled.h3`
    font-size: 17px;
    font-weight: 600;
    color: #000;
    margin-bottom: 16px;
`;

const UserInfoItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 0;
    border-bottom: 1px solid #f5f5f5;

    &:last-child {
        border-bottom: none;
        padding-bottom: 0;
    }
`;

const UserInfoLabel = styled.span`
    font-size: 15px;
    color: #888;
`;

const UserInfoValue = styled.span`
    font-size: 15px;
    font-weight: 600;
    color: #000;
`;

const ActionSection = styled.div`
    display: flex;
    gap: 12px;

    @media (max-width: 480px) {
        flex-direction: column;
    }
`;

const ActionButton = styled.button<{ $danger?: boolean }>`
    flex: 1;
    height: 50px;
    border-radius: 10px;
    font-size: 16px;
    font-weight: 600;
    border: none;
    cursor: pointer;
    transition: opacity 0.2s ease;

    background-color: ${({ $danger }) => ($danger ? "#ff4444" : "#f0f0f0")};
    color: ${({ $danger }) => ($danger ? "#fff" : "#333")};

    &:hover {
        opacity: 0.88;
    }
`;

const WarningBox = styled.div`
    padding: 18px 20px;
    background-color: #fff8f0;
    border: 1px solid #ffe0b2;
    border-radius: 10px;
`;

const WarningTitle = styled.h4`
    font-size: 14px;
    font-weight: 600;
    color: #e65100;
    margin-bottom: 6px;
`;

const WarningText = styled.p`
    font-size: 13px;
    color: #777;
    line-height: 1.7;
`;

const ContactSection = styled.div`
    padding: 24px;
    background-color: #f8f8f8;
    border-radius: 12px;
    margin-top: 8px;
`;

const ContactTitle = styled.h3`
    font-size: 17px;
    font-weight: 600;
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
    gap: 16px;
`;

const ContactLabel = styled.span`
    font-size: 15px;
    color: #888;
    min-width: 60px;
`;

const ContactLink = styled.a`
    font-size: 15px;
    color: #00a980;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`;
