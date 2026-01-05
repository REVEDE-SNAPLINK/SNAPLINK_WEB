import { LegalLayout } from "./LegalLayout";
import { Article, ArticleTitle, ArticleText } from "./LegalStyles";

export default function TermsOfService() {
    return (
        <LegalLayout title="이용약관">
            <Article>
                <ArticleTitle>제1조 (목적)</ArticleTitle>
                <ArticleText>
                    본 약관은 스냅링크(이하 "회사")가 제공하는 스냅링크 서비스
                    (도메인: https://www.snaplink.run, 이하 "서비스")를 이용함에 있어
                    "회사"와 "이용자" 간의 권리, 의무 및 책임사항, 기타 필요한 사항을
                    규정함을 목적으로 합니다.
                </ArticleText>
            </Article>

            <Article>
                <ArticleTitle>제2조 (용어의 정의)</ArticleTitle>
                <ArticleText>
                    서비스: 회사가 웹 또는 어플리케이션을 통해 작가와 고객을 연결하고
                    소통을 돕는 정보 중개 플랫폼 및 관련 부가 서비스를 의미합니다.{"\n\n"}
                    이용자: 본 약관에 따라 회사가 제공하는 서비스를 이용하는 "작가 회원"과
                    "고객 회원"을 통칭합니다.{"\n\n"}
                    작가 회원: 촬영 서비스를 제공하기 위해 본인의 포트폴리오와 정보를
                    등록하고 승인받은 회원을 의미합니다.{"\n\n"}
                    고객 회원: 촬영 서비스를 이용하기 위해 작가 정보를 열람하고 상담을
                    요청하는 회원을 의미합니다.{"\n\n"}
                    연결: 고객 회원이 작가 회원의 프로필을 확인하고 앱 내 채팅 기능을
                    통해 상담을 시작하는 행위를 의미합니다.
                </ArticleText>
            </Article>

            <Article>
                <ArticleTitle>제3조 (약관의 효력 및 변경)</ArticleTitle>
                <ArticleText>
                    본 약관은 서비스 화면에 게시하거나 전자우편 등의 방법으로 회원에게
                    공지함으로써 효력이 발생합니다.{"\n\n"}
                    회사는 관련 법령을 위배하지 않는 범위에서 본 약관을 개정할 수 있으며,
                    변경된 약관은 공지사항을 통해 고지합니다.{"\n\n"}
                    회원이 개정 약관에 동의하지 않을 경우 가입 탈퇴를 요청할 수 있으며,
                    고지 후 7일 이내에 거부 의사를 표시하지 않으면 동의한 것으로
                    간주합니다.
                </ArticleText>
            </Article>

            <Article>
                <ArticleTitle>제4조 (서비스의 성격 및 회사의 면책)</ArticleTitle>
                <ArticleText>
                    중개 서비스의 한계: 회사는 작가와 고객 간의 연결을 돕는 정보 중개
                    플랫폼일 뿐이며, 이용자 간에 체결되는 촬영 계약의 당사자가 아닙니다.{"\n\n"}
                    결제 관여 불가: 모든 촬영 대금의 지불, 예약금, 환불 등 경제적 거래는
                    이용자 간 앱 외부에서 직접 협의(계좌이체 등)에 의해 이루어집니다.
                    회사는 어떠한 결제 과정 및 정산에도 개입하지 않습니다.{"\n\n"}
                    책임의 제한: 회사는 이용자 간 직접 거래 과정에서 발생하는 노쇼,
                    촬영 사고, 결과물 불만족, 금전적 손실, 분쟁 등에 대하여 회사의
                    고의 또는 중과실이 없는 한 어떠한 민형사상 책임도 지지 않습니다.
                </ArticleText>
            </Article>

            <Article>
                <ArticleTitle>제5조 (이용계약의 체결 및 거절)</ArticleTitle>
                <ArticleText>
                    이용 계약은 회원이 되고자 하는 자가 약관에 동의하고 가입 신청을 한 후
                    회사가 이를 승낙함으로써 체결됩니다.{"\n\n"}
                    회사는 다음 각 호에 해당하는 신청에 대하여 승낙을 거부하거나 사후에
                    계약을 해지할 수 있습니다.{"\n"}
                    - 실명이 아니거나 타인의 명의를 도용한 경우{"\n"}
                    - 허위 정보를 기재한 경우{"\n"}
                    - 서비스 운영을 방해할 목적으로 신청한 경우
                </ArticleText>
            </Article>

            <Article>
                <ArticleTitle>제6조 (회원의 의무 및 ID 관리)</ArticleTitle>
                <ArticleText>
                    회원은 자신의 ID(이메일)와 비밀번호를 관리할 책임이 있으며,
                    관리 소홀로 발생하는 모든 책임은 회원 본인에게 있습니다.{"\n\n"}
                    등록 정보가 변경되었을 경우 즉시 수정해야 하며,
                    이를 이행하지 않아 발생한 불이익에 대해 회사는 책임지지 않습니다.
                </ArticleText>
            </Article>

            <Article>
                <ArticleTitle>제7조 (허위 이용 및 서비스 제한)</ArticleTitle>
                <ArticleText>
                    회사는 서비스의 건전한 운영을 위해 다음 행위를 금지합니다.{"\n"}
                    - 허위 예약{"\n"}
                    - 허위 경력 또는 포트폴리오 게시{"\n"}
                    - 욕설, 비방, 성희롱 등 채팅 악용 행위{"\n\n"}
                    위반 시 사전 통보 없이 이용 제한 또는 강제 탈퇴 조치가 가능합니다.
                </ArticleText>
            </Article>

            <Article>
                <ArticleTitle>제8조 (콘텐츠의 저작권 및 관리)</ArticleTitle>
                <ArticleText>
                    콘텐츠의 저작권은 해당 작가에게 귀속됩니다.{"\n\n"}
                    회사는 서비스 운영을 위해 게시물을 노출할 수 있으며,
                    마케팅 활용 시 사전 동의를 받습니다.
                </ArticleText>
            </Article>

            <Article>
                <ArticleTitle>제9조 (분쟁의 해결)</ArticleTitle>
                <ArticleText>
                    분쟁은 우선 이용자 간 합의로 해결하며,
                    합의되지 않을 경우 대한민국 법령을 따르고
                    회사 본점 소재지를 관할하는 법원을 전속 관할로 합니다.
                </ArticleText>
            </Article>
        </LegalLayout>
    );
}