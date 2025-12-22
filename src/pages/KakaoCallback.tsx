import { useEffect, useMemo } from "react";

type KakaoAuthMessage = {
    type: "KAKAO_AUTH_RESULT";
    code: string | null;
    state: string | null;
    error: string | null;
    error_description: string | null;
};

export default function KakaoCallback() {
    const payload: KakaoAuthMessage = useMemo(() => {
        const params = new URLSearchParams(window.location.search);
        return {
            type: "KAKAO_AUTH_RESULT",
            code: params.get("code"),
            state: params.get("state"),
            error: params.get("error"),
            error_description: params.get("error_description"),
        };
    }, []);

    useEffect(() => {
        // RN WebView로만 전달(웹 브라우저로 열었을 때도 문제 없게)
        const rn = window.ReactNativeWebView;
        if (rn?.postMessage) {
            rn.postMessage(JSON.stringify(payload));
        }
    }, [payload]);

    const ok = !!payload.code && !payload.error;

    return (
        <div style={{ padding: 24, fontFamily: "system-ui" }}>
            <h2>{ok ? "로그인 완료" : "로그인 처리 중 오류"}</h2>
            <p>
                {ok
                    ? "앱으로 돌아갑니다…"
                    : `앱으로 돌아가 다시 시도해주세요. (${payload.error ?? "unknown"})`}
            </p>

            {/* 디버깅용(배포 후에는 제거해도 됨) */}
            <pre style={{ marginTop: 16, padding: 12, background: "#f6f6f6", borderRadius: 8 }}>
        {JSON.stringify(payload, null, 2)}
      </pre>
        </div>
    );
}