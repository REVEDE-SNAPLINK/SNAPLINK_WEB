import { LegalLayout } from "./LegalLayout";
import { Article, ArticleTitle, ArticleText } from "./LegalStyles";

export default function OptionalInfoConsent() {
    return (
        <LegalLayout title="선택정보 수집 및 이용 동의">
            <Article>
                <ArticleText>
                    회사는 작가님의 원활한 활동 지원 및 맞춤형 서비스 제공을 위해
                    아래와 같은 정보를 추가로 수집할 수 있습니다. 동의하지 않으셔도 서비스 가입 및 기본적인 채팅 이용은 가능합니다.
                </ArticleText>
            </Article>

            <Article>
                <ArticleTitle>1) 수집 및 이용 목적</ArticleTitle>
                <ArticleText>
                    작가 프로필 구성: 작가님의 전문성 확인 및 고객에게 풍부한 포트폴리오 정보 제공.{"\n\n"}
                    맞춤형 매칭: 고객의 선호 지역 및 촬영 컨셉에 기반한 작가 추천 서비스 제공.
                </ArticleText>
            </Article>

            <Article>
                <ArticleTitle>2) 수집하는 개인정보 항목</ArticleTitle>
                <ArticleText>
                    선택 수집 항목: 활동 지역, 작가 포트폴리오(이미지/링크), 경력 사항, SNS 주소.
                </ArticleText>
            </Article>

            <Article>
                <ArticleTitle>3) 수집 방법</ArticleTitle>
                <ArticleText>
                    어플리케이션 내 프로필 설정 및 콘텐츠 등록 페이지를 통한 이용자 직접 입력.{"\n\n"}
                    자발적 제공에 의한 동의: 가입 시 본 항목에 동의하지 않았더라도, 이용자가 서비스 이용 과정에서 프로필 정보(활동 지역, 포트폴리오 등)를 직접 입력하여 저장하는 경우 해당 정보를 수집 및 이용하는 것에 동의한 것으로 간주합니다.
                </ArticleText>
            </Article>

            <Article>
                <ArticleTitle>4) 개인정보의 보유 및 이용 기간</ArticleTitle>
                <ArticleText>
                    원칙: 회원 탈퇴 시까지 보유 및 이용하며, 필수 항목의 보유 정책을 따릅니다.
                </ArticleText>
            </Article>
        </LegalLayout>
    );
}