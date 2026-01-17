import styled from "styled-components";

interface SuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    content: string;
}

export default function SuccessModal({ isOpen, onClose, title, content }: SuccessModalProps) {
    if (!isOpen) return null;

    return (
        <Overlay onClick={onClose}>
            <ModalContainer onClick={(e) => e.stopPropagation()}>
                <Title>{title}</Title>
                <Content>{content}</Content>
                <CloseButton onClick={onClose}>확인</CloseButton>
            </ModalContainer>
        </Overlay>
    );
}

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const ModalContainer = styled.div`
    background-color: white;
    padding: 40px 30px;
    border-radius: 16px;
    width: 90%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
    font-size: 20px;
    font-weight: 700;
    color: #000;
    margin-bottom: 16px;
`;

const Content = styled.p`
    font-size: 16px;
    color: #555;
    line-height: 1.5;
    margin-bottom: 32px;
    white-space: pre-wrap;
`;

const CloseButton = styled.button`
    width: 100%;
    padding: 14px;
    background-color: #00a980;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;

    &:hover {
        background-color: #008f6b;
    }
`;
