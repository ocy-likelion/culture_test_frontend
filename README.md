## 📝 Fitin (피틴)
AI 기반(K-means 클러스터링) 기업 컬쳐핏 분석 플랫폼
IT 교육기관 ‘멋쟁이사자처럼’ 주관의 단기 인턴십 프로젝트로, 인사담당자의 채용 성향에 관한 설문 데이터를 K-means 
알고리즘으로 군집화하여 채용 경향을 분석하고, 차트 결과로 시각화한 AI 기반 웹서비스입니다🙂
> 👉 사이트 바로가기: https://www.survey.heun0.site/</br>
> 👉 프로젝트 상세보기: https://my-portfolio-three-xi-44.vercel.app/blog/fitin</br>

---

### 🧭 기술 스택
  - Frontend: React, JavaScript
  - Backend: Java, Spring security, OAuth2, JWT, MySQL, Swagger, Spring Boot
  - AI: Python Fast API, scikit-learn
    
  - Styling: Tailwind CSS, CSS Modules
  - State Management
    - Client State: Zustand
    - Server State: TanStack Query
  - Deployment: Vercel
  - Auth: JWT(HTTP-only Cookie)
  
---

### 🚀 주요 구현 기능
- 사용자 인증의 편의성 확보를 위해 쿠키 기반 인증 방식을 적용한 OAuth 2.0 로그인 및 세션 유지 로직 이해 및 구현
- AI 분석 응답 대기 과정에서의 UX 개선을 위해 polling 기반의 useRef 메모리 관리 방식으로 성능 최적화
- 30초 이내 AI 분석 응답 미도착 시 에러 페이지를 반환하는 예외 처리로 UX 안정성 향상
- 분석 결과의 가독성과 직관성 향상을 위해 Chart.js를 활용하여 사용자의 성향 데이터를 시각화
- 비인증 사용자 접근을 제한하는 목적의 인증 여부 판별 Protected Routes 컴포넌트 구현 및 fromSession 상태값 기반 접근 제어 로직 설계로 보안성 강화
- 결과 이미지를 다운로드할 수 있는 사용자 인터랙션 기능 구현하여 분석 결과의 외부 활용성 확대
