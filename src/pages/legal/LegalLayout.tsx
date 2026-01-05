import styled from "styled-components";

export function LegalLayout({
                                title,
                                children,
                            }: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <Container>
            <Title>{title}</Title>
            <Content>{children}</Content>
        </Container>
    );
}

const Container = styled.main`
  max-width: 1080px;
  margin: 0 auto;
  padding: 112px 120px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 96px 24px;
  }
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: 800;
  margin-bottom: 72px;
  color: #00a980;
`;

const Content = styled.section`
  display: flex;
  flex-direction: column;
  gap: 56px;
`;