# Convex + Better Auth 마이그레이션 완료

## 현재 상태

이 프로젝트는 **Convex**를 백엔드로, **Better Auth**를 인증 시스템으로 사용하고 있습니다.

### ✅ 완료된 설정

1. **패키지 설치 완료**
   - `@convex-dev/better-auth@^0.9.7` 설치됨
   - `better-auth@1.3.27` 설치됨
   - `convex@^1.28.2` 설치됨

2. **Convex 컴포넌트 설정 완료**
   - `convex/convex.config.ts`에서 `betterAuth` 컴포넌트 활성화됨
   - Better Auth 컴포넌트가 자동으로 다음 테이블 제공:
     - `user` - 사용자 정보
     - `session` - 세션 관리
     - `account` - OAuth 계정 연결
     - `verification` - 이메일 인증
     - `twoFactor` - 2단계 인증
     - `passkey` - 패스키 인증
     - 기타 OAuth 및 rate limiting 테이블

3. **인증 설정 완료**
   - `convex/auth.ts`: Better Auth 인스턴스 및 어댑터 설정
   - GitHub OAuth 설정 완료 (read-only 스코프)
   - Convex 플러그인 활성화

4. **스키마 정리 완료**
   - `convex/schema.ts`: 기존 `sandboxes` 테이블 유지
   - Better Auth 테이블은 컴포넌트가 자동 관리하므로 별도 정의 불필요

## 📝 중요 사항

### Better Auth 테이블은 자동 관리됨

`@convex-dev/better-auth` 컴포넌트가 모든 인증 관련 테이블을 자동으로 생성하고 관리합니다. 
따라서 `convex/schema.ts`에 user, session, account 등을 직접 정의할 필요가 **없습니다**.

### PostgreSQL 마이그레이션 파일은 참고용

`better-auth_migrations/2025-11-08T15-47-52.431Z.sql` 파일은 PostgreSQL용 스키마입니다.
Convex를 사용하고 있으므로 이 SQL 파일은 실행할 필요가 없으며, 단순히 참고 자료입니다.

## 🚀 다음 단계

### 1. Convex 개발 서버 실행

```bash
npx convex dev
```

이 명령어는:
- Convex 스키마를 클라우드에 푸시
- Better Auth 컴포넌트의 테이블을 자동으로 생성
- 로컬 개발 환경과 Convex 백엔드를 동기화

### 2. Next.js 개발 서버 실행

별도 터미널에서:

```bash
bun run dev
```

### 3. 환경 변수 확인

`.env` 또는 `.env.local`에 다음 변수들이 설정되어 있는지 확인:

```bash
# Convex
NEXT_PUBLIC_CONVEX_URL=<your-convex-url>
NEXT_PUBLIC_CONVEX_SITE_URL=<your-site-url>
CONVEX_SITE_URL=<your-site-url>

# Better Auth
BETTER_AUTH_SECRET=<your-secret>
SITE_URL=<your-site-url>

# GitHub OAuth
GITHUB_CLIENT_ID=<your-client-id>
GITHUB_CLIENT_SECRET=<your-client-secret>
```

## 🔍 구조 설명

### 인증 흐름

1. **사용자 로그인** → Better Auth가 GitHub OAuth 처리
2. **세션 생성** → Convex의 `session` 테이블에 저장
3. **사용자 정보** → Convex의 `user` 테이블에 저장
4. **토큰 관리** → Convex의 `account` 테이블에 OAuth 토큰 저장

### 주요 파일

- `convex/convex.config.ts`: Better Auth 컴포넌트 등록
- `convex/auth.ts`: Better Auth 인스턴스 및 어댑터
- `convex/schema.ts`: 앱 스키마 (Better Auth 테이블은 자동 관리)
- `src/lib/auth-client.ts`: 클라이언트 측 인증 헬퍼
- `src/lib/auth-server.ts`: 서버 측 인증 헬퍼

## 📚 참고 자료

- [Convex Better Auth 문서](https://labs.convex.dev/better-auth)
- [Better Auth 문서](https://better-auth.com)
- [Convex 문서](https://docs.convex.dev)

## ✨ 추가 기능

현재 프로젝트는 다음 기능들이 구현되어 있습니다:

- ✅ GitHub OAuth 로그인
- ✅ 세션 관리
- ✅ 사용자 정보 관리
- ✅ GitHub 토큰 자동 갱신 (`convex/getGitHubToken.ts`)
- ✅ Rate limiting
