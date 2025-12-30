// src/pages/Home.tsx
import Header from "@components/Header";
import styled from "styled-components";
import GooglePlayIcon from "@assets/icons/download-google-play.svg";
import AppStoreIcon from "@assets/icons/download-app-store.svg";
import InquiryForm from "@components/Home/InquiryForm.tsx";
import Footer from "@components/Footer.tsx";

export default function Home() {
    return (
        <>
            <Header />

            <Banner>
                <BannerText>
                    스냅사진을{"\n"}손 안에서 쉽고 간편하게
                </BannerText>

                <DownloadLinkContainer>
                    <DownloadLinkWrapper>
                        <GooglePlayDownloadLink href="/">
                            <DownloadLinkImage src={GooglePlayIcon} alt="GooglePlay" />
                        </GooglePlayDownloadLink>
                        <AppStoreDownloadLink href="/">
                            <DownloadLinkImage src={AppStoreIcon} alt="AppStore" />
                        </AppStoreDownloadLink>
                    </DownloadLinkWrapper>
                </DownloadLinkContainer>
            </Banner>

            <AppDescriptionContainer>
                <AppDescriptionInner>
                    {/* 1 */}
                    <AppDescriptionWrapper>
                        <AppDescriptionTextWrapper>
                            <AppDescriptionTitle>
                                나의 스냅촬영 작가님을{"\n"}
                                <AppDescriptionHighlight>원하는 일시에 예약해 보세요</AppDescriptionHighlight>
                            </AppDescriptionTitle>
                            <AppDescriptionText>
                                SNS 계정에서 DM 더 이상 기다릴 필요없이 내가 원하는 날짜와 시간에 원하는 사진작가님과
                                예약하고 간편한 스냅사진 촬영을 경험해보세요.
                            </AppDescriptionText>
                        </AppDescriptionTextWrapper>
                        <AppDescriptionImageWrapper />
                    </AppDescriptionWrapper>

                    {/* 2 (reverse) */}
                    <AppDescriptionWrapper $reverse>
                        <AppDescriptionTextWrapper>
                            <AppDescriptionTitle>
                                원하는 스타일과 콘셉트를{"\n"}
                                <AppDescriptionHighlight>한 페이지에서 한 눈에 확인하세요</AppDescriptionHighlight>
                            </AppDescriptionTitle>
                            <AppDescriptionText>
                                내가 원하는 작가님은 어디있을까? 스냅링크의 검증된 작가 라인업을 통해 퀄리티
                                걱정없이 원하는 스타일과 콘셉트에 맞는 작가님을 한 눈에 보여드립니다.
                            </AppDescriptionText>
                        </AppDescriptionTextWrapper>
                        <AppDescriptionImageWrapper />
                    </AppDescriptionWrapper>

                    {/* 3 */}
                    <AppDescriptionWrapper>
                        <AppDescriptionTextWrapper>
                            <AppDescriptionTitle>
                                일상부터 촬영꿀팁까지{"\n"}
                                <AppDescriptionHighlight>커뮤니티에 공유해 보세요</AppDescriptionHighlight>
                            </AppDescriptionTitle>
                            <AppDescriptionText>
                                SNS에서 하나하나 알아보느라 번거로우셨죠? 이제는 스냅링크를 통해 간편하게 정보
                                공유하고 고민을 해결해보세요.
                            </AppDescriptionText>
                        </AppDescriptionTextWrapper>
                        <AppDescriptionImageWrapper />
                    </AppDescriptionWrapper>
                </AppDescriptionInner>
            </AppDescriptionContainer>

            <WelcomeContainer>
                <WelcomeTitle>
                    지금, 스냅링크와 함께{"\n"}
                    사진작가 커리어를 시작해 보세요.
                </WelcomeTitle>
                <WelcomeImage />
                <WelcomeText>
                    스냅촬영 예약부터 관리까지{"\n"}
                    스냅링크 함께 하세요.
                </WelcomeText>
            </WelcomeContainer>

            <InquiryForm />
            <Footer />
        </>
    );
}

const Banner = styled.div`
    width: 100%;
    height: 620px;
    background-color: #d9d9d9;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    padding: 0 clamp(16px, 4vw, 80px);
    box-sizing: border-box;

    @media (max-width: 600px) {
        height: 520px;
    }
`;

const BannerText = styled.p`
    font-size: clamp(28px, 3.4vw, 48px);
    font-weight: bold;
    color: #000;
    white-space: pre-line;
    text-align: center;
    line-height: 1.25;
`;

const DownloadLinkContainer = styled.div`
    width: 100%;
    position: absolute;
    bottom: clamp(90px, 12vw, 154px);
    display: flex;
    justify-content: center;
    left: 0;
    right: 0;
    z-index: 3;

    padding: 0 clamp(16px, 4vw, 80px);
    box-sizing: border-box;
`;

const DownloadLinkWrapper = styled.div`
    display: flex;
    gap: 14px;
    justify-content: center;
    width: min(420px, 100%);

    @media (max-width: 420px) {
        flex-direction: column;
        align-items: center;
    }
`;

const GooglePlayDownloadLink = styled.a`
    display: block;
    width: 183px;
    height: 54px;

    @media (max-width: 420px) {
        width: min(260px, 100%);
    }
`;

const AppStoreDownloadLink = styled.a`
    display: block;
    width: 176px;
    height: 54px;

    @media (max-width: 420px) {
        width: min(260px, 100%);
    }
`;

const DownloadLinkImage = styled.img`
    width: 100%;
    height: 100%;
`;

const AppDescriptionContainer = styled.section`
    width: 100%;
    padding: clamp(48px, 6vw, 75px) 0;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
`;

const AppDescriptionInner = styled.div`
    width: 100%;
    max-width: 1100px;
    padding: 0 clamp(16px, 4vw, 80px);
    box-sizing: border-box;

    display: flex;
    flex-direction: column;
    gap: clamp(44px, 6vw, 80px);
`;

/**
 * reverse는 grid-area로 해결 (styled 컴포넌트 참조 X)
 * - 기본: "text image"
 * - reverse: "image text"
 * 모바일(<=900): 1열로 스택
 */
const AppDescriptionWrapper = styled.div<{ $reverse?: boolean }>`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr min(444px, 100%);
    grid-template-areas: "text image";
    align-items: center;
    gap: clamp(18px, 3vw, 48px);

    ${({ $reverse }) =>
        $reverse &&  `grid-template-areas: "image text";
    `};

    @media (max-width: 900px) {
        grid-template-columns: 1fr;
        grid-template-areas:
          "text"
          "image";
        justify-items: center;
        text-align: center;
    }
`;

const AppDescriptionTextWrapper = styled.div`
    grid-area: text;
    width: 100%;
    max-width: 520px;
`;

const AppDescriptionImageWrapper = styled.div<{ url?: string }>`
    grid-area: image;
    width: min(444px, 100%);
    aspect-ratio: 444 / 272;
    border-radius: 10px;
    background: ${({ url }) => (url ? `url(${url}) no-repeat center / cover` : "#aaa")};
`;

const AppDescriptionTitle = styled.h2`
    font-weight: bold;
    font-size: clamp(24px, 2.6vw, 38px);
    color: #000;
    margin-bottom: clamp(18px, 3vw, 39px);
    white-space: pre-line;
    line-height: 1.2;
`;

const AppDescriptionHighlight = styled.span`
    color: #00a980;
`;

const AppDescriptionText = styled.p`
    font-size: clamp(16px, 1.8vw, 24px);
    color: #000;
    line-height: 1.35;
`;

const WelcomeContainer = styled.section`
    background: #00a980;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: clamp(72px, 10vw, 168px);
    padding-bottom: clamp(72px, 8vw, 111px);
    text-align: center;

    padding-left: clamp(16px, 4vw, 40px);
    padding-right: clamp(16px, 4vw, 40px);
    box-sizing: border-box;
`;

const WelcomeTitle = styled.h2`
    font-size: clamp(26px, 3.4vw, 48px);
    font-weight: bold;
    color: #fff;
    white-space: pre-line;
    line-height: 1.2;
`;

const WelcomeImage = styled.div`
    width: min(400px, 100%);
    height: 100px;
    margin: 40px 0;
    background: rgba(255, 255, 255, 0.15);
    border-radius: 12px;
`;

const WelcomeText = styled.p`
    font-size: clamp(18px, 2.4vw, 32px);
    font-weight: 600;
    color: #fff;
    white-space: pre-line;
    line-height: 1.25;
`;