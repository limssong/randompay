# 랜덤 결제 배분 웹사이트

결제 금액을 여러 인원에게 최소금액과 최대금액 범위 내에서 랜덤하게 배분하는 웹 애플리케이션입니다.

## 🚀 기능

- 인원수, 결제금액, 최소금액, 최대금액 입력
- 인원수만큼 이름 입력
- 최소금액 이상, 최대금액 이하로 결제금액을 랜덤 배분
- 배분 결과 시각화

## 🛠️ 기술 스택

- **Next.js 14** - React 프레임워크
- **React 18** - UI 라이브러리
- **TypeScript** - 타입 안정성
- **SCSS** - 스타일링

## 📦 설치 및 실행

### 사전 요구사항

- Node.js 18 이상
- pnpm (설치: `npm install -g pnpm`)

### 설치

```bash
pnpm install
```

### 개발 서버 실행

```bash
pnpm dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

### 프로덕션 빌드

```bash
pnpm build
pnpm start
```

## 📝 사용 방법

1. **인원수 입력**: 결제를 배분할 인원 수를 입력합니다.
2. **결제금액 입력**: 전체 결제 금액을 입력합니다.
3. **최소/최대 금액 입력**: 각 인원이 받을 수 있는 최소 금액과 최대 금액을 입력합니다.
4. **이름 입력**: 인원수만큼 각 인원의 이름을 입력합니다.
5. **배분하기 버튼 클릭**: 랜덤하게 금액이 배분됩니다.

## 🌐 배포

이 프로젝트는 Vercel을 통해 자동 배포됩니다.

### Vercel 자동 배포 설정

1. [Vercel](https://vercel.com)에 GitHub 계정으로 로그인
2. "New Project" 클릭
3. 이 저장소를 선택
4. 빌드 설정은 자동으로 감지됩니다 (Next.js)
5. "Deploy" 클릭

**중요**: GitHub에 푸시할 때마다 자동으로 배포되도록 하려면:
- Vercel 대시보드에서 프로젝트 설정
- "Git" 탭에서 자동 배포가 활성화되어 있는지 확인
- `main` 또는 `master` 브랜치에 푸시하면 자동 배포됩니다

### GitHub Actions를 통한 배포 (선택사항)

GitHub Actions를 사용하려면 Vercel Secrets를 설정해야 합니다:

1. Vercel 대시보드에서 프로젝트 설정 → "Settings" → "General"
2. "Project ID"와 "Org ID" 복사
3. Vercel CLI로 토큰 생성: `vercel login` 후 `vercel link`
4. GitHub 저장소 → Settings → Secrets and variables → Actions
5. 다음 Secrets 추가:
   - `VERCEL_TOKEN`: Vercel 토큰
   - `VERCEL_ORG_ID`: Organization ID
   - `VERCEL_PROJECT_ID`: Project ID

### 수동 배포

```bash
pnpm build
vercel --prod
```

## 📄 라이선스

MIT

## 🤝 기여

이슈와 풀 리퀘스트를 환영합니다!

