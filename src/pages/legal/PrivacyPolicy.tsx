import { LegalLayout } from "./LegalLayout";
import { Article, ArticleTitle, ArticleText } from "./LegalStyles";

export default function PrivacyPolicy() {
    return (
        <LegalLayout title="개인정보 처리방침">
            <Article>
                <ArticleText>
                    스냅링크(이하 “회사”)는 개인정보보호법 등 관련 법령을 준수하며,
                    이용자의 개인정보와 권익을 보호하기 위해 최선을 다하고 있습니다.
                </ArticleText>
            </Article>

            <Article>
                <ArticleTitle>제1조 (개인정보의 수집 및 이용 목적)</ArticleTitle>
                <ArticleText>
                    회원 가입 및 관리: 회원 식별, 부정 이용 방지, 불만 처리 및 신고 대응{"\n\n"}
                    서비스 제공: 작가와 고객 간의 프로필 노출, 앱 내 채팅 서비스 제공{"\n\n"}
                    서비스 개선 및 통계 분석: MAU, 리텐션, 체류시간 등 산출
                </ArticleText>
            </Article>

            <Article>
                <ArticleTitle>제2조 (개인정보의 수집 항목 및 방법)</ArticleTitle>
                <ArticleText>
                    필수 수집 항목: 성명, 이메일, 전화번호, 비밀번호{"\n\n"}
                    자동 수집: IP주소, 쿠키, 서비스 이용 기록, 기기 정보, 채팅 로그{"\n\n"}
                    수집 방법: 회원가입, 소셜 로그인, 이용자 직접 입력
                </ArticleText>
            </Article>

            <Article>
                <ArticleTitle>제3조 (보유 및 이용 기간)</ArticleTitle>
                <ArticleText>
                    원칙적으로 회원 탈퇴 시까지 보유합니다.{"\n\n"}
                    부정 이용 방지: 탈퇴 후 6개월{"\n"}
                    로그인 기록: 3개월
                </ArticleText>
            </Article>

            <Article>
                <ArticleTitle>제8조 (개인정보 보호 책임자)</ArticleTitle>
                <ArticleText>
                    성명: 이준호{"\n"}
                    직위: 최고정보책임자 (CIO){"\n"}
                    이메일: snapbridge05@gmail.com
                </ArticleText>
            </Article>

            <Article>
                <ArticleTitle>부칙</ArticleTitle>
                <ArticleText>
                    본 방침은 202X년 00월 00일부터 적용됩니다.{"\n\n"}
                    ※ 2025년 4월 사업자 등록 후 사업자 정보 업데이트 예정
                </ArticleText>
            </Article>
        </LegalLayout>
    );
}