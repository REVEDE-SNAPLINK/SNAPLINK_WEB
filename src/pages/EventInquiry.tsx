import { useState } from "react";
import styled from "styled-components";
import CheckIcon from "@assets/icons/check.svg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import type { Address } from "react-daum-postcode";
import { useDaumPostcodePopup } from "react-daum-postcode";
import SuccessModal from "@components/Common/SuccessModal";


export default function EventInquiry() {
    const [name, setName] = useState<string>("");
    const [time, setTime] = useState<0 | 1 | null>(null);
    const [email, setEmail] = useState<string>("");
    const [contact, setContact] = useState<string>("");
    const [eventDate, setEventDate] = useState<Date | null>(null);
    const [eventLocation, setEventLocation] = useState<string>("");
    const [purpose, setPurpose] = useState<string>("");
    const [reference, setReference] = useState<string>("");
    const [isAgreed, setIsAgreed] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const openPostcode = useDaumPostcodePopup();

    const handlePostcodeComplete = (data: Address) => {
        let fullAddress = data.address;
        let extraAddress = "";

        if (data.addressType === "R") {
            if (data.bname !== "") {
                extraAddress += data.bname;
            }
            if (data.buildingName !== "") {
                extraAddress += extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
            }
            fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
        }
        setEventLocation(fullAddress);
    };

    const handlePostcodeClick = () => {
        openPostcode({ onComplete: handlePostcodeComplete });
    };

    const valid = name !== "" && time !== null && email !== "" && contact !== "" && purpose !== "" && eventDate !== null && eventLocation !== "" && isAgreed;

    const handleSubmit = async () => {
        if (!valid || loading) return;

        try {
            setLoading(true);

            const res = await fetch("/api/send-event-inquiry", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    time: time === 0 ? "오전" : "오후",
                    email,
                    contact,
                    purpose,
                    reference,
                    eventDate: eventDate ? eventDate.toISOString() : "", // Convert Date to string for API
                    eventLocation,
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
            setContact("");
            setPurpose("");
            setEventDate(null);
            setEventLocation("");
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
                <InquiryFormTitle>스냅링크 단체/행사 촬영 문의 </InquiryFormTitle>
                <InquiryFormDescription>전문 촬영 작가가 필요한 순간, 언제 어디서나 스냅링크가 연결해 드리겠습니다.</InquiryFormDescription>
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

            <InquiryFormRow>
                <InquiryFormInputWrapper>
                    <InquiryFormCaption>행사 일정을 입력해주세요*</InquiryFormCaption>
                    <InquiryFormInputWrapper>
                        {/* @ts-ignore */}
                        <StyledDatePicker
                            selected={eventDate}
                            onChange={(date: any) => setEventDate(date)}
                            dateFormat="yyyy.MM.dd"
                            placeholderText="날짜 선택"
                        />
                    </InquiryFormInputWrapper>
                </InquiryFormInputWrapper>

                <InquiryFormInputWrapper>
                    <InquiryFormCaption>행사 장소를 입력해주세요*</InquiryFormCaption>
                    <InquiryFormInput
                        type="text"
                        name="eventLocation"
                        placeholder="장소 검색"
                        value={eventLocation}
                        readOnly
                        onClick={handlePostcodeClick}
                        style={{ cursor: "pointer" }}
                    />
                </InquiryFormInputWrapper>
            </InquiryFormRow>

            <InquiryFormMultilineRow>
                <InquiryFormCaption>촬영 목적을 입력해주세요*</InquiryFormCaption>
                <InquiryFormMultilineInput
                    placeholder={`촬영 목적 및 활용처를 남겨주세요. \n(내부 기록용, 홍보 마케팅용, 보도자료용 등)`}
                    name="purpose"
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                />
            </InquiryFormMultilineRow>

            <InquiryFormMultilineRow>
                <InquiryFormCaption>레퍼런스 및 원하는 컨셉과 스타일을 입력해주세요</InquiryFormCaption>
                <InquiryFormMultilineInput
                    placeholder="밝고 화사한 톤, 인물 중심의 자연스러움 등 상세하고 참고할 만한 링크를 남겨주셔도 좋으니 자세하게 남겨주세요."
                    name="reference"
                    value={reference}
                    onChange={(e) => setReference(e.target.value)}
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
                title="문의가 접수 되었습니다."
                content={`입력해주신 내용에 가장 적합한 전문 작가를 꼼꼼히 검토한 후\n영업일 기준 3일 이내에 담당자가 연락드립니다.`}
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

const StyledDatePicker = styled(DatePicker)`
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