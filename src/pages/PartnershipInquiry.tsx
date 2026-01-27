import { useState } from "react";
import styled from "styled-components";
import CheckIcon from "@assets/icons/check.svg";
import SuccessModal from "@components/common/SuccessModal";
import BannerImage from "@assets/imgs/inquiry-banner.png"
import BottomBannerImage from "@assets/imgs/bottom-banner.jpg"
import BottomBannerLogo from "@assets/imgs/bottom-banner-logo.svg"

export default function PartnershipInquiry() {
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
        <>
            <PageBanner>
                <BannerOverlay />
                <BannerContent>
                    <BannerTitle>믿을 수 있는 든든한 파트너</BannerTitle>
                    <BannerColorTitle>스냅링크</BannerColorTitle>
                    <BannerDescription>스냅링크는 다양한 분야의 우수한 파트너들에게 촬영에 대한{'\n'}모든 관리를 대행하는 통합 솔루션을 지원하며 함께 성장합니다.</BannerDescription>
                </BannerContent>
            </PageBanner>

            <InquiryFormContainer>
                <InquiryFormTitleRow>
                    <InquiryFormTitle>스냅링크 제휴 문의</InquiryFormTitle>
                    <InquiryFormDescription>문의 내용을 남겨주시면 제휴 사업 담당자가 내용 확인 후 연락드립니다.</InquiryFormDescription>
                </InquiryFormTitleRow>

                <InquiryFormBackground>
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

                            <InquiryFormRadioButtonWrapper>
                                <InquiryFormRadioButton
                                    type="button"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setTime(0);
                                    }}
                                >
                                    <InquiryFormRadioInput>{time === 0 && <InquiryFormRadioButtonDot />}</InquiryFormRadioInput>
                                    <InquiryFormRadioLabel>오전 09:00 ~ 12:00</InquiryFormRadioLabel>
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
                                    <InquiryFormRadioLabel>오후 13:00 ~ 18:00</InquiryFormRadioLabel>
                                </InquiryFormRadioButton>
                            </InquiryFormRadioButtonWrapper>
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
                </InquiryFormBackground>
                <InquiryFormBottomBanner>
                    <InquiryFormBottomBannerOverlay />
                    <InquiryFormBottomBannerContentWrapper>
                        <div>
                            <InquiryFormBottomBannerCaption>
                                스냅사진을 쉽고 간편하게
                            </InquiryFormBottomBannerCaption>
                            <InquiryFormBottomBannerTitle src={BottomBannerLogo} />
                        </div>
                        <InquiryFormBottomBannerButton>
                            <InquiryFormBottomBannerButtonText>
                                지금 경험하러 가기
                            </InquiryFormBottomBannerButtonText>
                        </InquiryFormBottomBannerButton>
                    </InquiryFormBottomBannerContentWrapper>
                </InquiryFormBottomBanner>
                <SuccessModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    title="제휴 문의가 접수 되었습니다."
                    content={`문의주셔서 감사합니다.\n내용 확인 후 담당자가 빠른 시일 내에 연락드리겠습니다.`}
                />
            </InquiryFormContainer>
        </>
    );
}

const PageBanner = styled.div`
    width: 100%;
    height: 620px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    background: url(${BannerImage}) no-repeat center / cover;

    @media (max-width: 600px) {
        height: 400px;
    }
`;

const BannerOverlay = styled.div`
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.2);
    z-index: 1;
`;

const BannerContent = styled.div`
    position: relative;
    z-index: 2;
    padding-left: clamp(16px, 4vw, 40px);
    padding-right: clamp(16px, 4vw, 40px);
    width: 100%;
    max-width: 902px;
`;

const BannerTitle = styled.h1`
    font-size: clamp(28px, 3.4vw, 48px);
    font-weight: bold;
    color: #fff;
    margin-bottom: 10px;
`;

const BannerColorTitle = styled(BannerTitle)`
    color: #00A980;
    margin-bottom: clamp(20px, 3vw, 50px);
`;

const BannerDescription = styled.p`
    font-size: clamp(16px, 1.8vw, 24px);
    color: #fff;
    font-weight: 400;
    line-height: 40px;
    white-space: pre-line;
`;

const InquiryFormTitleRow = styled.div`
    width: 100%;
    max-width: 902px;
    margin-bottom: clamp(40px, 6vw, 80px);
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
`;

const InquiryFormContainer = styled.form`
    padding-top: clamp(48px, 6vw, 114px);
    padding-bottom: clamp(72px, 8vw, 114px);

    display: flex;
    flex-direction: column;
    align-items: center;

    width: 100%;
    padding-left: clamp(16px, 4vw, 40px);
    padding-right: clamp(16px, 4vw, 40px);
    box-sizing: border-box;
`;

const InquiryFormBackground = styled.div`
    background-color: #FAFAFA;
    padding-top: clamp(48px, 8vw, 90px);
    padding-left: clamp(20px, 6vw, 80px);
    padding-right: clamp(20px, 6vw, 80px);
    box-sizing: border-box;
    max-width: 902px;
    width: 100%;
    padding-bottom: clamp(48px, 8vw, 114px);
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
    line-height: 24px;

    ::placeholder {
        color: #2d2d2d;
    }
`;

const InquiryFormRadioButtonWrapper = styled.div`
    width: auto;
    margin-top: 12px;
`;

const InquiryFormRadioButton = styled.button`
    display: inline-flex;
    align-items: center;
    background: transparent;
    border: none;
    padding: 0;
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
    cursor: pointer;
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

const InquiryFormBottomBanner = styled.div`
    width: 100%;
    height: 248px;
    border-radius: 20px;
    overflow: hidden;
    background: url(${BottomBannerImage}) no-repeat center 10% / cover;
    max-width: 902px;
    margin-top: 40px;
    position: relative;
`

const InquiryFormBottomBannerOverlay = styled.div`
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2);
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 2;
`

const InquiryFormBottomBannerContentWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 71px;
    padding-right: 68px;
    box-sizing: border-box;
    position: absolute;
    z-index: 3;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
`

const InquiryFormBottomBannerCaption = styled.p`
    color: #FFF;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    margin-bottom: 10px;
`

const InquiryFormBottomBannerTitle = styled.img`
    height: 55px;
`

const InquiryFormBottomBannerButton = styled.a`
    width: 178px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    background: rgba(45, 45, 45, 0.90);
    padding: 20px 30px;
`

const InquiryFormBottomBannerButtonText = styled.p`
    color: #FFF;
    font-size: 24px;
    font-weight: 600;
`