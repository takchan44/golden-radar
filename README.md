# Golden Radar 🟡

골든크로스 임박 종목 분석 대시보드 · NASDAQ + KOSPI

## 기능
- 엑셀 파일 업로드 (나스닥/코스피 종목)
- 등락률 · 가격 · 상승여력 정렬
- 히트맵 시각화
- Claude AI 종목 분석 리포트

## 파일 구조
```
golden-radar/
├── index.html      # 대시보드 메인
├── _worker.js      # AI API 프록시 (Cloudflare Workers)
├── wrangler.toml   # Cloudflare 설정
└── README.md
```

## Cloudflare Pages 배포

### 1. GitHub 레포 연결
1. [dash.cloudflare.com](https://dash.cloudflare.com) 접속
2. **Workers & Pages** → **Create application** → **Pages**
3. **Connect to Git** → `golden-radar` 레포 선택
4. 빌드 설정: 프레임워크 없음, 빌드 커맨드 비움, 출력 디렉토리 `/`
5. **Save and Deploy**

### 2. API 키 환경변수 등록
Pages 프로젝트 → **Settings** → **Environment variables**
```
ANTHROPIC_API_KEY = sk-ant-xxxxxxxxxxxx
```

### 3. 이후 배포
`main` 브랜치에 push하면 자동 재배포됩니다.

## 로컬 테스트
```bash
npx wrangler pages dev .
```
