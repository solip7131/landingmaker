# 📱 맥북 없이 폰으로 작업하기

맥북이 꺼져 있어도 이 저장소의 랜딩페이지를 폰에서 수정하고 결과까지 확인할 수 있습니다.
작업은 클라우드에서 돌아가고, 결과는 GitHub Pages로 자동 배포됩니다.

---

## 한 번만 해두는 설정

### 1. GitHub Pages 소스를 "GitHub Actions"로 바꾸기

폰에서도 가능합니다.

1. `github.com/solip7131/landingmaker` → **Settings** → 왼쪽 메뉴 **Pages**
2. **Build and deployment → Source** 를 **GitHub Actions** 로 변경

> 이미 "GitHub Actions"로 되어 있으면 그대로 두면 됩니다.
> `Deploy from a branch` 로 되어 있으면 반드시 바꿔야 이 저장소의 배포 워크플로우가 동작합니다.

### 2. 폰 홈 화면에 미리보기 페이지 추가

<https://solip7131.github.io/landingmaker/preview/>

- iPhone Safari: 공유 버튼 → **홈 화면에 추가**
- Android Chrome: 우측 상단 ⋮ → **홈 화면에 추가**

앱처럼 한 번에 열려서 배포 결과를 확인할 수 있습니다.

---

## 매번 하는 작업 흐름

1. 폰 브라우저로 <https://claude.ai/code> 접속
2. `solip7131/landingmaker` 저장소로 새 세션 시작
3. 하고 싶은 작업을 한국어로 그냥 말하기
   - 예: "국수명가 랜딩 히어로 문구를 '30년 손맛, 이제 배달로'로 바꿔줘"
   - 예: "메인 랜딩페이지 상담 신청 버튼을 카톡 채널 링크로 연결해줘"
4. 작업이 끝나면 브랜치가 푸시됩니다. 폰에서 그 PR을 **Merge** (또는 Claude에게 "main에 바로 올려줘"라고 요청)
5. 1~2분 뒤 미리보기 페이지를 새로고침 → 상단 **마지막 배포** 시각이 바뀌었으면 반영 완료

세션 중간에 폰을 꺼도 됩니다. 작업은 클라우드에서 계속 돌아가고,
다시 접속하면 이어서 볼 수 있습니다.

---

## 배포되는 주소

| 주소 | 내용 |
| --- | --- |
| <https://solip7131.github.io/landingmaker/> | 메인 랜딩페이지 (`index.html`) |
| <https://solip7131.github.io/landingmaker/guksu/> | 국수명가 가맹모집 랜딩페이지 |
| <https://solip7131.github.io/landingmaker/preview/> | 전체 페이지 목록 + 배포 시각 (폰용 허브) |
| <https://solip7131.github.io/landingmaker/project/> | Claude Design 원본 시안 |

배포 설정은 [`.github/workflows/pages.yml`](../.github/workflows/pages.yml) 에 있습니다.
`main` 브랜치에 푸시될 때마다 실행되고, **Actions** 탭에서 수동 실행(`Run workflow`)도 가능합니다.

### 공개되지 않는 것

`chats/`(Claude Design 대화 기록), `docs/`, `README.md` 는 배포에서 제외됩니다.
저장소 자체는 공개(public)이므로 GitHub에서는 볼 수 있지만, 배포된 사이트 주소로는 열리지 않습니다.

---

## 문제가 생기면

| 증상 | 확인할 것 |
| --- | --- |
| 배포 시각이 안 바뀜 | GitHub **Actions** 탭에서 `Deploy to GitHub Pages` 실행이 실패했는지 확인 |
| 워크플로우가 아예 안 돌음 | 변경사항이 `main` 에 머지됐는지 확인 (다른 브랜치는 배포되지 않음) |
| 404가 뜸 | 위 **한 번만 해두는 설정 1번**(Source를 GitHub Actions로)이 되어 있는지 확인 |
| 옛날 화면이 보임 | 브라우저 캐시. 새로고침을 한 번 더 하거나 시크릿 창으로 열기 |
