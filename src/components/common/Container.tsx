import styled from "styled-components";

interface SubPageContainerProps {
    title: string;
    children: React.ReactNode;
}

export const SubPageContainer = ({
    title,
    children,
}: SubPageContainerProps) => {
    return (
        <>
            <StyledSubPageContainer>
                <Title>{title}</Title>
                {children}
            </StyledSubPageContainer>
        </>
    )
}

const StyledSubPageContainer = styled.div`
    padding: 112px 125px;
    box-sizing: border-box;
    
    @media (max-width: 720px) {
        padding: 112px 50px;
    }
    min-height: 1778;
`

const Title = styled.h1`
    margin-bottom: 101px;
    font-size: 38px;
    font-weight: bold;
    color: #00A980;
`
