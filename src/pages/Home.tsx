import Header from "@components/Header";
import styled from "styled-components";
import GooglePlayIcon from '@assets/icons/download-google-play.svg';
import AppStoreIcon from '@assets/icons/download-app-store.svg';

export default function Home() {

    return (
        <>
            <Header />
            <Banner>
                {/*<BannerImage alt="Banner" />*/}
                <BannerText>
                    스냅사진을{'\n'}손 안에서 쉽고 간편하게
                </BannerText>
                <DownloadLinkContainer>
                    <DownloadLinkWrapper>
                        <GooglePlayDownloadLink href="/">
                            <DownloadLinkImage src={GooglePlayIcon} alt="GooglePlay" />
                        </GooglePlayDownloadLink>
                        <AppStoreDownloadLink href="/">
                            <DownloadLinkImage src={AppStoreIcon} alt="GooglePlay" />
                        </AppStoreDownloadLink>
                    </DownloadLinkWrapper>
                </DownloadLinkContainer>
            </Banner>
        </>
    )
}

const Banner = styled.div`
    width: 100%;
    height: 620px;
    background-color: #D9D9D9;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
`
//
// const BannerImage = styled.img`
//     width: 100%;
//     height: 100%;
//     position: absolute;
//     top: 0;
//     left: 0;
//     right: 0;
//     bottom: 0;
//     z-index: 1;
// `

const BannerText = styled.p`
    font-size: 48px;
    font-weight: bold;
    color: #000;
    white-space: pre-line;
    text-align: center;
    line-height: 60px;
`

const DownloadLinkContainer = styled.div`
    width: 100%;
    position: absolute;
    bottom: 154px;
    display: flex;
    justify-content: center;
    left: 0;
    right: 0;
    z-index: 3;
`

const DownloadLinkWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    width: 409px;
`

const GooglePlayDownloadLink = styled.a`
    display: block;
    width: 183px;
    height: 54px;
`

const AppStoreDownloadLink = styled.a`
    display: block;
    width: 176px;
    height: 54px;
`

const DownloadLinkImage = styled.img`
    width: 100%;
    height: 100%;
`
