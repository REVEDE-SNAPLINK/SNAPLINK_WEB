import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "@components/common/Header";
import Footer from "@components/common/Footer";
import CheckIcon from "@assets/icons/check.svg";
import { useAuthStore } from "@/store/authStore";

export default function Withdraw() {
    const navigate = useNavigate();
    const status = useAuthStore((state) => state.status);
    const bootstrapped = useAuthStore((state) => state.bootstrapped);
    const withdraw = useAuthStore((state) => state.withdraw);
    const [reason, setReason] = useState<string>("");
    const [feedback, setFeedback] = useState<string>("");
    const [isAgreed, setIsAgreed] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    // 로그인 체크 및 리다이렉션
    useEffect(() => {
        if (!bootstrapped) {
            return;
        }

        if (status !== "authed") {
            // 로그인 안되어 있으면 로그인 페이지로 리다이렉션
            navigate("/auth/kakao", { replace: true });
        }
    }, [status, bootstrapped, navigate]);

    const reasons = [
        { value: "service_not_useful", label: "서비스가 유용하지 않아서" },
        { value: "rarely_use", label: "자주 사용하지 않아서" },
        { value: "privacy_concern", label: "개인정보 보호 우려" },
        { value: "service_error", label: "서비스 오류나 버그" },
        { value: "another_service", label: "다른 서비스 이용" },
        { value: "other", label: "기타" },
    ];

    const valid = reason !== "" && isAgreed;

    // 로그인되지 않은 경우 페이지를 렌더링하지 않음
    if (!bootstrapped || status !== "authed") {
        return null;
    }

    const handleSubmit = async () => {
        if (!valid || loading) return;

        if (!confirm("정말로 탈퇴하시겠습니까? 탈퇴 후에는 복구할 수 없습니다.")) {
            return;
        }

        try {
            setLoading(true);

            // authStore의 withdraw 함수 사용
            await withdraw();

            alert("탈퇴 처리가 완료되었습니다. 이용해주셔서 감사합니다.");
            window.location.href = "/customer-service";
        } catch (error) {
            console.error(error);
            alert("탈퇴 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Header />
            <Container>
                <Content>
                    <Title>회원 탈퇴</Title>
                    <Description>
                        탈퇴 전에 아래 내용을 확인해주세요.
                    </Description>

                    <WarningBox>
                        <WarningTitle>⚠️ 탈퇴 시 주의사항</WarningTitle>
                        <WarningList>
                            <li>탈퇴 후에는 모든 회원 정보와 데이터가 삭제됩니다.</li>
                            <li>삭제된 정보는 복구할 수 없습니다.</li>
                            <li>진행 중인 예약이나 거래가 있을 경우 먼저 완료해주세요.</li>
                            <li>탈퇴 후에도 작성된 게시글과 댓글은 삭제되지 않을 수 있습니다.</li>
                        </WarningList>
                    </WarningBox>

                    <FormSection>
                        <FormLabel>
                            탈퇴 사유를 선택해주세요 <Required>*</Required>
                        </FormLabel>
                        <RadioGroup>
                            {reasons.map((item) => (
                                <RadioButtonWrapper key={item.value}>
                                    <RadioButton
                                        type="button"
                                        onClick={() => setReason(item.value)}
                                    >
                                        <RadioInput>
                                            {reason === item.value && <RadioButtonDot />}
                                        </RadioInput>
                                        <RadioLabel>{item.label}</RadioLabel>
                                    </RadioButton>
                                </RadioButtonWrapper>
                            ))}
                        </RadioGroup>
                    </FormSection>

                    <FormSection>
                        <FormLabel>서비스 개선을 위한 의견이 있으시면 남겨주세요 (선택)</FormLabel>
                        <FeedbackTextarea
                            placeholder="의견을 입력해주세요"
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            rows={5}
                        />
                    </FormSection>

                    <FormSection>
                        <AgreementWrapper>
                            <AgreementCheckbox
                                type="button"
                                $isChecked={isAgreed}
                                onClick={() => setIsAgreed(!isAgreed)}
                            >
                                {isAgreed && <AgreementCheckboxIcon src={CheckIcon} alt="check" />}
                            </AgreementCheckbox>
                            <AgreementLabel>
                                위 내용을 모두 확인했으며, 회원 탈퇴에 동의합니다.{" "}
                                <Required>*</Required>
                            </AgreementLabel>
                        </AgreementWrapper>
                    </FormSection>

                    <ButtonGroup>
                        <CancelButton onClick={() => window.history.back()}>
                            취소
                        </CancelButton>
                        <SubmitButton
                            $disabled={!valid || loading}
                            disabled={!valid || loading}
                            onClick={handleSubmit}
                        >
                            {loading ? "처리 중..." : "탈퇴하기"}
                        </SubmitButton>
                    </ButtonGroup>
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

const WarningBox = styled.div`
    background-color: #fff4e6;
    border: 1px solid #ffd700;
    border-radius: 10px;
    padding: 24px;
    margin-bottom: clamp(32px, 4vw, 48px);
`;

const WarningTitle = styled.h3`
    font-size: 18px;
    font-weight: bold;
    color: #d97706;
    margin-bottom: 16px;
`;

const WarningList = styled.ul`
    list-style: disc;
    padding-left: 24px;
    color: #666;
    line-height: 1.8;

    li {
        margin-bottom: 8px;
    }
`;

const FormSection = styled.div`
    margin-bottom: clamp(24px, 3vw, 32px);
`;

const FormLabel = styled.label`
    display: block;
    font-size: 18px;
    font-weight: 600;
    color: #000;
    margin-bottom: 16px;
`;

const Required = styled.span`
    color: #ff4444;
`;

const RadioGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

const RadioButtonWrapper = styled.div`
    width: 100%;
`;

const RadioButton = styled.button`
    display: inline-flex;
    align-items: center;
    background: transparent;
    border: none;
    padding: 0;
    cursor: pointer;
    width: 100%;
`;

const RadioLabel = styled.div`
    font-size: 16px;
    color: #000;
`;

const RadioInput = styled.div`
    outline: none;
    border: 1px solid #e9e9e9;
    width: 25px;
    height: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 12px;
    flex-shrink: 0;
`;

const RadioButtonDot = styled.div`
    width: 15px;
    height: 15px;
    border-radius: 15px;
    background-color: #00a980;
`;

const FeedbackTextarea = styled.textarea`
    width: 100%;
    padding: 16px 20px;
    border-radius: 10px;
    border: 1px solid #d0d0d0;
    box-sizing: border-box;
    font-size: 16px;
    color: #000;
    font-family: inherit;
    resize: vertical;

    ::placeholder {
        color: #999;
    }
`;

const AgreementWrapper = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 12px;
`;

const AgreementCheckbox = styled.button<{ $isChecked: boolean }>`
    background: none;
    width: 25px;
    height: 25px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    flex-shrink: 0;
    margin-top: 2px;
    ${({ $isChecked }) =>
        $isChecked
            ? `background-color: #00A980;`
            : `border: 1px solid #E9E9E9 !important;`}
    display: flex;
    align-items: center;
    justify-content: center;
`;

const AgreementCheckboxIcon = styled.img`
    width: 12px;
    height: 9px;
`;

const AgreementLabel = styled.div`
    font-size: 16px;
    color: #000;
    line-height: 1.6;
`;

const ButtonGroup = styled.div`
    display: flex;
    gap: 16px;
    margin-top: clamp(32px, 4vw, 48px);

    @media (max-width: 600px) {
        flex-direction: column;
    }
`;

const CancelButton = styled.button`
    flex: 1;
    height: 54px;
    border-radius: 10px;
    background-color: #f5f5f5;
    color: #000;
    font-size: 18px;
    font-weight: bold;
    border: none;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
        background-color: #e0e0e0;
    }
`;

const SubmitButton = styled.button<{ $disabled: boolean }>`
    flex: 1;
    height: 54px;
    border-radius: 10px;
    background-color: ${({ $disabled }) => ($disabled ? "#C8C8C8" : "#ff4444")};
    color: #fff;
    font-size: 18px;
    font-weight: bold;
    border: none;
    cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
    transition: opacity 0.2s ease;

    &:hover:not(:disabled) {
        opacity: 0.9;
    }
`;
