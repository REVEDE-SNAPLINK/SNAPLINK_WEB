import { LegalLayout } from "./LegalLayout";
import { Article, ArticleTitle, ArticleText } from "./LegalStyles";

export default function MarketingConsent() {
    return (
        <LegalLayout title="개인정보 마케팅 활용 동의">
            <Article>
                <ArticleText>
                    회사는 유저의 서비스 이용 기록을 바탕으로
                    더 유용한 혜택과 맞춤형 정보를 제공하고자 합니다.
                </ArticleText>
            </Article>

            <Article>
                <ArticleTitle>1) 이용 목적</ArticleTitle>
                <ArticleText>
                    맞춤형 혜택 및 광고 제공:
                    사용자의 서비스 이용 기록 및 관심 성향 분석을 통한
                    맞춤형 콘텐츠 추천 및 광고 게재.{"\n\n"}
                    이벤트 정보 활용:
                    신규 서비스 출시, 프로모션, 이벤트 등 홍보 목적의 데이터 활용.{"\n\n"}
                    서비스 고도화:
                    인구통계학적 특성에 따른 서비스 이용 통계 분석 및
                    마케팅 전략 수립.
                </ArticleText>
            </Article>

            <Article>
                <ArticleTitle>2) 이용 항목</ArticleTitle>
                <ArticleText>
                    성명, 이메일 주소, 전화번호,
                    서비스 이용 기록(방문 기록, 클릭 로그 등).
                </ArticleText>
            </Article>

            <Article>
                <ArticleTitle>3) 개인정보의 보유 및 이용 기간</ArticleTitle>
                <ArticleText>
                    회원 탈퇴 시 또는 동의 철회 시까지 보유합니다.
                </ArticleText>
            </Article>
        </LegalLayout>
    );
}