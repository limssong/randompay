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

이 프로젝트는 GitHub Pages와 Vercel 모두에서 배포할 수 있습니다.

### GitHub Pages 배포 (자동)

1. GitHub 저장소 → Settings → Pages
2. Source를 "GitHub Actions"로 선택
3. `main` 또는 `master` 브랜치에 푸시하면 자동으로 배포됩니다

**배포 URL**: `https://[사용자명].github.io/randompay/`

### Vercel 자동 배포 (선택사항)

1. [Vercel](https://vercel.com)에 GitHub 계정으로 로그인
2. "New Project" 클릭
3. 이 저장소를 선택
4. 빌드 설정은 자동으로 감지됩니다 (Next.js)
5. "Deploy" 클릭

**중요**: GitHub에 푸시할 때마다 자동으로 배포됩니다!
- Vercel이 GitHub 저장소와 연결되면 자동으로 배포가 설정됩니다
- `main` 또는 `master` 브랜치에 푸시하면 자동 배포됩니다

### GitHub Actions 빌드 체크

프로젝트에는 빌드가 성공하는지 확인하는 GitHub Actions 워크플로우가 포함되어 있습니다.

### 수동 배포

```bash
pnpm build
vercel --prod
```

### 문제 해결

배포 에러가 발생한다면:
1. Vercel 대시보드에서 프로젝트 설정 확인
2. 빌드 로그 확인
3. `pnpm install` 및 `pnpm build`가 로컬에서 성공하는지 확인

## 📄 라이선스

MIT

## 🤝 기여

이슈와 풀 리퀘스트를 환영합니다!

