import styled from "styled-components";
import BannerImage from '@assets/imgs/service-banner.png'

export default function Service() {
    return (
        <>
            <PageBanner>
                <BannerOverlay />
                <BannerContent>
                    <BannerTitle>내 손 안에서 쉽고 간편한</BannerTitle>
                    <BannerColorTitle>최고의 서비스</BannerColorTitle>
                    <BannerDescription>스냅링크는 촬영 작가와 모델이 더 쉽고 편하게 연결되고{'\n'}그 이상의 가치를 경험할 수 있도록 고객 중심 서비스를 만들고 있습니다.</BannerDescription>
                </BannerContent>
            </PageBanner>

            <ServiceContainer>
                <ServiceContent>
                    <ServiceTitle>서비스 준비 중입니다.</ServiceTitle>
                    <ServiceDescription>더 나은 서비스로 곧 찾아뵙겠습니다.</ServiceDescription>
                </ServiceContent>
            </ServiceContainer>
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

const ServiceContainer = styled.section`
    width: 100%;
    padding: clamp(80px, 10vw, 160px) clamp(16px, 4vw, 40px);
    box-sizing: border-box;
    display: flex;
    justify-content: center;
`;

const ServiceContent = styled.div`
    text-align: center;
    max-width: 800px;
`;

const ServiceTitle = styled.h2`
    font-size: clamp(24px, 2.6vw, 36px);
    font-weight: 600;
    color: #000;
    margin-bottom: 20px;
`;

const ServiceDescription = styled.p`
    font-size: clamp(16px, 1.8vw, 20px);
    color: #666;
    line-height: 1.5;
`;
