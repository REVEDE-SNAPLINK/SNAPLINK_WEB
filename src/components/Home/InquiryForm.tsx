import { useState } from "react";
import styled from "styled-components";
import CheckIcon from "@assets/icons/check.svg";
import SuccessModal from "@components/common/SuccessModal";

export default function InquiryForm() {
    const [name, setName] = useState<string>("");
    const [time, setTime] = useState<0 | 1 | null>(null);
    const [email, setEmail] = useState<string>("");
    const [contact, setContact] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [isAgreed, setIsAgreed] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const valid = name !== "" && time !== null && email !== "" && contact !== "" && message !== "" && isAgreed;

    const handleSubmit = async () => {
        if (!valid || loading) return;

        try {
            setLoading(true);

            const res = await fetch("/api/send-inquiry", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    time: time === 0 ? "오전" : "오후",
                    email,
                    contact,
                    message,
                }),
            });

            if (!res.ok) {
                throw new Error("Failed to send inquiry");
            }

            setIsModalOpen(true);

            setName("");
            setTime(null);
            setEmail("");
            setContact("");
            setMessage("");
            setIsAgreed(false);
        } catch (error) {
            console.error(error);
            alert("전송에 실패했습니다. 잠시 후 다시 시도해주세요.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <InquiryFormContainer>
            <InquiryFormMultilineRow>
                <InquiryFormTitle>스냅링크 제휴 문의</InquiryFormTitle>
                <InquiryFormDescription>문의 내용을 남겨주시면 제휴 사업 담당자가 내용 확인 후 연락드립니다.</InquiryFormDescription>
            </InquiryFormMultilineRow>

            <InquiryFormRow>
                <InquiryFormInputWrapper>
                    <InquiryFormCaption>이름(기업명 또는 단체명)을 입력해주세요*</InquiryFormCaption>
                    <InquiryFormInput
                        type="text"
                        name="name"
                        placeholder="이름"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </InquiryFormInputWrapper>

                <InquiryFormInputWrapper>
                    <InquiryFormCaption>연락 가능한 시간을 선택해주세요*</InquiryFormCaption>

                    <InquiryFormRadioWrapper>
                        <InquiryFormRadioButtonWrapper>
                            <InquiryFormRadioButton
                                type="button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setTime(0);
                                }}
                            >
                                <InquiryFormRadioInput>{time === 0 && <InquiryFormRadioButtonDot />}</InquiryFormRadioInput>
                                <InquiryFormRadioLabel>오전</InquiryFormRadioLabel>
                            </InquiryFormRadioButton>
                        </InquiryFormRadioButtonWrapper>

                        <InquiryFormRadioButtonWrapper>
                            <InquiryFormRadioButton
                                type="button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setTime(1);
                                }}
                            >
                                <InquiryFormRadioInput>{time === 1 && <InquiryFormRadioButtonDot />}</InquiryFormRadioInput>
                                <InquiryFormRadioLabel>오후</InquiryFormRadioLabel>
                            </InquiryFormRadioButton>
                        </InquiryFormRadioButtonWrapper>
                    </InquiryFormRadioWrapper>
                </InquiryFormInputWrapper>
            </InquiryFormRow>

            <InquiryFormRow>
                <InquiryFormInputWrapper>
                    <InquiryFormCaption>이메일을 입력해주세요*</InquiryFormCaption>
                    <InquiryFormInput
                        type="text"
                        name="email"
                        placeholder="이메일"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </InquiryFormInputWrapper>

                <InquiryFormInputWrapper>
                    <InquiryFormCaption>연락처를 입력해주세요*</InquiryFormCaption>
                    <InquiryFormInput
                        type="text"
                        name="contact"
                        placeholder="연락처"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                    />
                </InquiryFormInputWrapper>
            </InquiryFormRow>

            <InquiryFormMultilineRow>
                <InquiryFormCaption>문의 내용을 입력해주세요*</InquiryFormCaption>
                <InquiryFormMultilineInput
                    placeholder="내용"
                    name="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
            </InquiryFormMultilineRow>

            <InquiryFormMultilineRow>
                <InquiryFormCheckboxWrapper>
                    <InquiryFormCheckbox
                        type="button"
                        $isChecked={isAgreed}
                        onClick={(e) => {
                            e.preventDefault();
                            setIsAgreed(!isAgreed);
                        }}
                    >
                        <InquiryFormCheckboxIcon src={CheckIcon} alt="check" />
                    </InquiryFormCheckbox>

                    <InquiryFormCheckboxLabel href="/privacy">개인정보 수집 및 이용에 동의합니다.</InquiryFormCheckboxLabel>
                </InquiryFormCheckboxWrapper>
            </InquiryFormMultilineRow>

            <InquiryFormSubmitButtonWrapper>
                <InquiryFormSubmitButton
                    $disabled={!valid || loading}
                    disabled={!valid || loading}
                    type="button"
                    onClick={(e) => {
                        e.preventDefault();
                        handleSubmit();
                    }}
                >
                    {loading ? "전송 중..." : "제출하기"}
                </InquiryFormSubmitButton>
            </InquiryFormSubmitButtonWrapper>
            <SuccessModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="제휴 문의가 접수 되었습니다."
                content={`문의주셔서 감사합니다.\n내용 확인 후 담당자가 빠른 시일 내에 연락드리겠습니다.`}
            />
        </InquiryFormContainer>
    );
}

const InquiryFormContainer = styled.form`
    padding-top: clamp(48px, 6vw, 65px);
    padding-bottom: clamp(72px, 8vw, 114px);

    display: flex;
    flex-direction: column;
    align-items: center;

    width: 100%;
    padding-left: clamp(16px, 4vw, 40px);
    padding-right: clamp(16px, 4vw, 40px);
    box-sizing: border-box;
`;

const InquiryFormTitle = styled.h2`
    font-size: clamp(24px, 2.6vw, 45px);
    font-weight: 600;
    color: #000;
    margin-bottom: clamp(28px, 5vw, 35px);
`;

const InquiryFormDescription = styled.p`
    font-size: clamp(16px, 1.8vw, 26px);
    color: #000;
    margin-bottom: clamp(40px, 6vw, 80px);
`;

const InquiryFormRow = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 22px;

    width: 100%;
    max-width: 902px;
    margin-bottom: 35px;

    @media (max-width: 820px) {
        grid-template-columns: 1fr;
    }
`;

const InquiryFormMultilineRow = styled.div`
    width: 100%;
    max-width: 902px;
    margin-top: 50px;
`;

const InquiryFormInputWrapper = styled.div`
    width: 100%;
`;

const InquiryFormCaption = styled.p`
    font-size: 20px;
    font-weight: 600;
    color: #000;
    margin-bottom: 14px;

    @media (max-width: 600px) {
        font-size: 16px;
    }
`;

const InquiryFormInput = styled.input`
    width: 100%;
    height: 54px;
    border-radius: 10px;
    border: 1px solid #d0d0d0;
    padding: 0 20px;
    box-sizing: border-box;
    font-size: 16px;
    color: #000;

    ::placeholder {
        color: #2d2d2d;
    }
`;

const InquiryFormMultilineInput = styled.textarea`
    resize: none;
    width: 100%;
    padding: 16px 20px;
    height: 176px;
    border-radius: 10px;
    border: 1px solid #d0d0d0;
    box-sizing: border-box;
    font-size: 16px;
    color: #000;

    ::placeholder {
        color: #2d2d2d;
    }
`;

const InquiryFormRadioWrapper = styled.div`
    width: 100%;
    display: flex;
    gap: 14px;
`;

const InquiryFormRadioButtonWrapper = styled.div`
    width: auto;
`;

const InquiryFormRadioButton = styled.button`
    display: inline-flex;
    align-items: center;
    background: transparent;
    border: none;
    padding: 0;
    cursor: pointer;
`;

const InquiryFormRadioLabel = styled.div`
    font-size: 14px;
    color: #737373;
`;

const InquiryFormRadioInput = styled.div`
    outline: none;
    border: 1px solid #e9e9e9;
    width: 25px;
    height: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 6px;
`;

const InquiryFormRadioButtonDot = styled.div`
    width: 15px;
    height: 15px;
    border-radius: 15px;
    background-color: #00a980;
`;

const InquiryFormCheckboxWrapper = styled.div`
    display: flex;
    align-items: center;
`;

const InquiryFormCheckbox = styled.button<{ $isChecked: boolean }>`
    background: none;
    width: 25px;
    height: 25px;
    border-radius: 5px;
    border: none;
    margin-right: 10px;
    cursor: pointer;

    ${({ $isChecked }) => ($isChecked ? `background-color: #00A980;` : `border: 1px solid #E9E9E9 !important;`)}
`;

const InquiryFormCheckboxIcon = styled.img`
    width: 12px;
    height: 9px;
`;

const InquiryFormCheckboxLabel = styled.a`
    font-size: 12px;
    color: #000;
    text-decoration: underline;
`;

const InquiryFormSubmitButtonWrapper = styled.div`
    margin-top: 57px;
    display: flex;
    justify-content: center;
    width: 100%;
    max-width: 902px;
`;

const InquiryFormSubmitButton = styled.button<{ $disabled: boolean }>`
    width: min(320px, 100%);
    height: 54px;
    border-radius: 10px;
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    background: ${({ $disabled }) => ($disabled ? "#C8C8C8" : "#00A980")};
    color: ${({ $disabled }) => ($disabled ? "#000" : "#fff")};
    border: none;
    cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
`;