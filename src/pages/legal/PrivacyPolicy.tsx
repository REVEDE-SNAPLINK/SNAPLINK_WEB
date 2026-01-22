import { LegalLayout } from "./LegalLayout";
import { Article, ArticleTitle, ArticleText } from "./LegalStyles";

export default function PrivacyPolicy() {
    return (
        <LegalLayout title="개인정보 처리방침">
            <Article>
                <ArticleText>
                    스냅링크(이하 "회사")는 개인정보보호법 등 관련 법령을 준수하며,
                    이용자의 개인정보와 권익을 보호하기 위해 최선을 다하고 있습니다.
                </ArticleText>
            </Article>

            <Article>
                <ArticleTitle>제1조 (개인정보의 수집 및 이용 목적)</ArticleTitle>
                <ArticleText>
                    회사는 아래와 같은 목적을 위해 개인정보를 처리합니다.{"\n\n"}
                    1. 회원 가입 및 관리: 회원 식별, 부정 이용 방지, 가입 의사 확인, 불만 처리 및 신고 대응을 위한 사실관계 확인.{"\n\n"}
                    2. 서비스 제공: 작가와 고객 간의 프로필 노출, 앱 내 채팅 서비스 제공 및 연결.{"\n\n"}
                    3. 서비스 개선 및 통계 분석: 서비스 이용 기록 분석을 통한 품질 개선, 신규 서비스 개발, 접속 빈도 확인 및 이용 통계(MAU, 리텐션, 체류시간 등) 산출.{"\n\n"}
                    4. 안전한 서비스 환경 구축: 채팅 로그는 이용자 간 분쟁 해결, 신고 처리, 서비스 품질 개선 및 부정 이용 방지를 위한 목적으로만 처리되며, 해당 목적 외의 용도로 사용되지 않습니다.
                </ArticleText>
            </Article>

            <Article>
                <ArticleTitle>제2조 (개인정보의 수집 항목 및 방법)</ArticleTitle>
                <ArticleText>
                    1. 필수 수집 항목: 성명, 이메일 주소(ID), 전화번호, 성별(안전한 매칭 목적), 생년월일(만 14세 미만 가입 제한 확인 목적).{"\n\n"}
                    2. 자동 수집: IP주소, 쿠키, 서비스 이용 기록(방문 일시, 클릭 로그, 체류시간, 앱 버전 등), 기기 식별번호(기기 식별번호, OS 버전), 채팅 로그.{"\n\n"}
                    3. 수집 방법: 어플리케이션 회원가입 및 프로필 설정 페이지를 통한 이용자 직접 입력.{"\n\n"}
                    4. 제3자 서비스 및 소셜 로그인 연동:{"\n"}
                    - 회사는 서비스 제공을 위해 Firebase(푸시 알림, 오류 분석) 및 카카오·네이버 로그인 SDK 등 제3자 서비스를 이용할 수 있으며, 해당 서비스는 각 서비스의 개인정보처리방침에 따라 데이터를 처리합니다.{"\n"}
                    - 소셜 로그인 시 고유 식별값 및 이용자가 동의한 범위 내의 정보(이메일 등)를 제공받습니다.{"\n\n"}
                    5. 자발적 제공: 회사는 이용자가 프로필 편집 등 서비스 이용 과정에서 선택 항목(활동 지역, 포트폴리오 등)을 직접 입력하여 제공하는 경우, 해당 행위를 해당 정보의 수집 및 이용에 동의한 것으로 간주합니다.
                </ArticleText>
            </Article>

            <Article>
                <ArticleTitle>제3조 (개인정보의 처리 및 보유 기간)</ArticleTitle>
                <ArticleText>
                    1. 회원의 개인정보는 원칙적으로 회원 탈퇴 시까지 보유 및 이용합니다.{"\n\n"}
                    2. 단, 다음의 사유가 있는 경우 해당 기간 동안 보존합니다.{"\n"}
                    - 부정 이용 방지: 허위 예약 및 불량 회원의 재가입 방지를 위해 탈퇴 후 6개월간 보존.{"\n"}
                    - 법령 준수: 통신비밀보호법에 따른 로그인 기록 등(3개월).
                </ArticleText>
            </Article>

            <Article>
                <ArticleTitle>제4조 (이용자 간 정보 공유에 관한 사항)</ArticleTitle>
                <ArticleText>
                    1. 서비스의 본질인 '중개'를 위해, 상담 요청 시 고객의 이름 등 프로필 정보가 작가에게 노출될 수 있습니다.{"\n\n"}
                    2. 연락처 보호: 회사는 이용자의 연락처를 상대방에게 자동으로 제공하지 않습니다. 연락처 교환은 앱 내 채팅 기능을 통해 이용자 간 상호 합의하에 자발적으로 이루어져야 합니다.
                </ArticleText>
            </Article>

            <Article>
                <ArticleTitle>제5조 (개인정보 처리 업무의 위탁)</ArticleTitle>
                <ArticleText>
                    회사는 서비스 운영을 위해 필요한 경우 최소한의 범위 내에서 외부 전문 업체에 업무를 위탁할 수 있습니다. (현재 위탁 업체 없음)
                </ArticleText>
            </Article>

            <Article>
                <ArticleTitle>제6조 (개인정보의 안전성 확보 조치)</ArticleTitle>
                <ArticleText>
                    회사는 개인정보 보호를 위해 다음과 같은 조치를 취하고 있습니다.{"\n\n"}
                    1. 기술적 조치: 개인정보의 암호화 저장, 해킹 방지를 위한 보안 프로그램 설치.{"\n\n"}
                    2. 관리적 조치: 개인정보 취급 직원의 최소화 및 정기적 교육.
                </ArticleText>
            </Article>

            <Article>
                <ArticleTitle>제7조 (정보주체의 권리 및 행사 방법)</ArticleTitle>
                <ArticleText>
                    1. 이용자는 언제든지 본인의 개인정보를 열람하거나 수정할 수 있으며, 회원 탈퇴를 통해 개인정보 수집 동의를 철회할 수 있습니다.{"\n\n"}
                    2. 이용자는 앱 내 설정 메뉴를 통해 언제든지 회원 탈퇴(계정 삭제)를 직접 요청할 수 있습니다. 회원 탈퇴 시 회사는 관련 법령에 따라 보관이 필요한 정보를 제외한 개인정보를 지체 없이 파기합니다.
                </ArticleText>
            </Article>

            <Article>
                <ArticleTitle>제8조 (개인정보 보호 책임자)</ArticleTitle>
                <ArticleText>
                    성명: 이준호{"\n"}
                    직위: 최고정보책임자 (CIO){"\n"}
                    연락처(E-mail): snapbridge05@gmail.com
                </ArticleText>
            </Article>

            <Article>
                <ArticleTitle>제9조 (고지의 의무)</ArticleTitle>
                <ArticleText>
                    이 개인정보처리방침은 2026년 01월 12일부터 적용됩니다. 내용의 추가, 삭제 및 수정이 있을 시에는 시행 7일 전부터 공지사항을 통해 고지하겠습니다.{"\n\n"}
                    [참고: 사업자 정보]{"\n"}
                    본 서비스는 현재 개인 프로젝트 단계로 운영 중이며, 2025년 4월 사업자 등록 완료 후 사업자 등록번호 및 소재지 정보가 공식 업데이트될 예정입니다.
                </ArticleText>
            </Article>
        </LegalLayout>
    );
}