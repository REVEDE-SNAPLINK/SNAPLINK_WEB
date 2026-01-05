import { LegalLayout } from "./LegalLayout";
import { Article, ArticleTitle, ArticleText } from "./LegalStyles";

export default function MarketingNotificationConsent() {
    return (
        <LegalLayout title="마케팅 알림 수신 동의">
            <Article>
                <ArticleText>
                    스냅링크에서 제공하는 혜택, 이벤트, 신규 작가 추천 등의 정보를
                    아래의 채널을 통해 받아보실 수 있습니다.
                </ArticleText>
            </Article>

            <Article>
                <ArticleTitle>1) 수신 동의 채널 및 목적</ArticleTitle>
                <ArticleText>
                    앱 푸시(Push):
                    맞춤형 혜택 안내, 이벤트 정보, 추천 콘텐츠 알림.{"\n\n"}
                    SMS(문자메시지) 및 이메일:
                    긴급 혜택 안내, 뉴스레터, 정기 프로모션 소식.
                </ArticleText>
            </Article>

            <Article>
                <ArticleTitle>2) 유의사항</ArticleTitle>
                <ArticleText>
                    이용자는 언제든지 [설정 &gt; 알림 설정] 메뉴를 통해
                    수신 동의를 철회할 수 있습니다.{"\n\n"}
                    서비스 이용에 필수적인 공지사항,
                    결제/예약/안전 관련 정보는
                    본 동의 여부와 관계없이
                    서비스 알림 또는 문자 등으로 발송됩니다.
                </ArticleText>
            </Article>
        </LegalLayout>
    );
}