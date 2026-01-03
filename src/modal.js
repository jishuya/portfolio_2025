// Project data with details
const projectsData = {
  'TMS v2': {
    title: 'Traffic Management System v2',
    description: '대규모 교통 데이터를 시각화하여 효율적인 교통 운영과 정책 수립을 지원하는 지능형 교통 영상분석 모니터링 소프트웨어입니다. GIS 기반으로 실시간 교통 영상과 AI 분석 정보를 시각적으로 제공하며, Interactive Chart를 이용하여 각 교차로와 접근로의 대규모 교통정보를 쉽게 조회하고 비교분석할 수 있습니다.',
    tech: ['Vue.js', 'Node.js', 'MariaDB'],
    image: 'images/projects/tmsv2_1.png',
    image2: 'images/projects/tmsv2_2.png',
    link: 'https://naver.me/Gypx25qw',
    demoVideo: true,
    team: '2명',
    role: '풀스택 개발',
    deployed: '안양시, 화성시, 부천시, 성남시, 광양시',
    details: [
      'Vue.js + Express.js 기반 풀스택 웹 애플리케이션 개발',
      '실시간 교통 데이터 분석 API 설계 및 구현 (다층 분석: 권역→교차로→접근로→차종)',
      'WebSocket 기반 실시간 영상 스트리밍 시스템 구축, Fabric.js Canvas 오버레이로 실시간 객체 표시',
      '카카오맵 API 연동 GIS 기반 교통 모니터링 대시보드 개발',
      'JWT 기반 인증 및 bcrypt 암호화를 적용한 권한 관리 시스템 구현',
      'LOS(서비스수준) 분석 알고리즘 및 신호제어 연계 분석 기능 개발'
    ]
  },
  'TMS v3': {
    title: 'Traffic Management System v3',
    description: 'TMS v2의 후속 버전으로, Docker 기반 마이크로서비스 아키텍처를 도입하여 확장성과 안정성을 강화한 지능형 교통 모니터링 시스템입니다. GIS 멀티레이어를 통해 교통축, 신호제어, 외부 CCTV 등 다양한 정보를 통합 제공하며, 바닥 신호, 정밀 지도, 시공간 혼잡도 분석 등 고급 기능을 지원합니다.',
    tech: ['Vue.js', 'Node.js', 'PostgreSQL'],
    image: 'images/projects/tmsv3_1.png',
    image2: 'images/projects/tmsv3_2.png',
    link: 'http://localhost:9500',
    demoLogin: { id: 'laon2022', pw: 'laon2022!' },
    team: 'FE 3명, BE 4명',
    role: '프론트엔드 개발',
    deployed: '안양시, 안동시, 남양주시',
    details: [
      'Vue 3 Composition API 기반 기존 Vue 2 Options API 아키텍처 마이그레이션 및 컴포넌트 리팩토링',
      'Kakao Maps API 기반 실시간 교통 관제 GIS 시스템 구현 (6개 다중 레이어 토글 제어, 8가지 교통 지표 실시간 시각화, 시공간 혼잡도 분석)',
      'WebSocket + JMuxer 기반 H.264 영상 실시간 디코딩 및 Canvas 오버레이 메타데이터 동기화 렌더링',
      'ECharts + Axios 기반 교차로 비교분석 시스템 구현 (다중 선택 필터링, 시별/일별/월별 집계 API 연동, Stack/Line/Bar 차트 동적 전환)',
      '월간/통합 리포트 자동 생성 및 ExcelJS 기반 데이터 Export 기능 구현',
      '도시-구역-교차로 3단계 계층 구조 기반 행정구역 CRUD 및 카메라 매핑 설정 기능 구현',
    ]
  },
  'TAS v2': {
    title: 'Traffic Analysis System v2',
    description: '영상장치로부터 스트리밍 중인 영상을 수신받아 AI 기술을 이용하여 차량, 보행자 등의 객체를 인식하여 교통 정보를 수집할 수 있도록 카메라 및 교차로 정보와 ROI(Region Of Interest) 영역들을 설정하고 장비연결 상태 및 분석 상태를 관리하는 소프트웨어입니다.',
    tech: ['Vue.js', 'Node.js', 'MariaDB'],
    image: 'images/projects/tas_1.png',
    image2: 'images/projects/tas_2.png',
    link: 'http://localhost:9501',
    demoLogin: { id: 'admin', pw: 'admin' },
    team: 'FE 1명, BE 1명',
    role: '프론트엔드 개발',
    deployed: '안양시, 안동시, 광양시, 성남시',
    details: [
      '🏆 GS인증 1등급 획득 (국가 공인 소프트웨어 품질 인증)',
      'Vuex 기반 계층 구조(교차로-접근로-카메라) 상태 관리',
      'SHA-256 기반 비밀번호 암호화 및 클라이언트-서버 간 비밀키 암호화 통신 구현',
      'Access Token / Refresh Token 기반 인증 시스템 구축',
      '다중 클라이언트 동시 접속 정책에 따른 세션 관리 구현',
      '전체 입력 필드 유효성 검사 및 최대값 제한 적용',
      '사용자 오조작 방지를 위한 확인 알람 및 경고 시스템 구현',
      '체계적인 오류 처리 및 시스템 로그 기록 기능 구현'
    ]
  },
  'TNS': {
    title: 'Traffic Notify System',
    description: 'VVDS(차량검지시스템), CCTV, IDS(돌발검지시스템)로부터 수집된 데이터를 분석하여 정체 상황을 감지하고, VMS(전광판)에 교통 흐름 개선 및 안전을 위한 정체 알림 서비스를 제공하는 소프트웨어입니다.',
    tech: ['Vue.js'],
    image: 'images/projects/tns.png',
    image2: 'images/projects/tns_2.png',
    link: 'https://naver.me/xI1Nwu0i',
    demoVideo: true,
    team: 'FE 1명, BE 1명',
    role: '프론트엔드 개발',
    deployed: '안양시, 안동시, 광양시, 성남시',
    details: [
      'WebSocket + JMuxer 기반 실시간 CCTV 스트리밍 시스템 구축, Canvas 오버레이로 탐지된 객체의 정보를 영상 위에 표출',
      '카카오맵기반 GIS 시스템 개발, 구간/지점/카메라 위치 및 실시간 교통 정보 시각화',
      'IntersectionObserver API로 뷰포트 가시성 감지, 화면에 보이는 영상만 재생하고 벗어난 영상은 자동 정지하여 메모리 사용량 60% 감소',
      'Vuex 기반 전역 상태 관리 체계 구축 (지도 제어/UI 상태/데이터 상태 통합)',
      '10초 주기 폴링 기반 실시간 데이터 갱신 시스템 구현'
    ]
  },
  'Talk100': {
    title: 'Talk100',
    description: "'김재우의 영어회화 100' 수강생을 위하여 교재 문장을 효과적으로 암기할 수 있도록 돕는 웹 애플리케이션입니다. 원어민 음성 청취, 개인 맞춤형 집중암기 모드, 상세 학습 리포트 기능을 핵심으로, 사용자가 자신만의 학습 패턴을 만들어 체계적으로 영어 실력을 향상시킬 수 있습니다.",
    responsive: true,
    tech: ['React', 'Vite', 'Node.js', 'Express.js', 'PostgreSQL'],
    image: 'images/projects/home/talk100.png',
    image2: ['images/projects/talk100_2.png', 'images/projects/talk100_3.png'],
    link: '#',
    team: '1명',
    role: '디자인, 풀스택 개발',
    deployed: 'Cloudflare Pages',
    mobileApp: true,
    details: [
      'React 19 + Vite 기반 SPA 개발, React Router로 페이지 라우팅 구현',
      'Web Speech API 기반 음성 인식 및 TTS(Text-to-Speech) 기능 구현',
      'OAuth 2.0 기반 Google 소셜 로그인 연동',
      'Express.js + PostgreSQL 백엔드 API 서버 구축',
      'Cloudflare Pages(프론트) + Tunnel(백엔드) 조합으로 무료 배포 환경 구성'
    ]
  },
  'Hotube': {
    title: 'Hotube',
    description: '비공개 YouTube 영상을 가족 구성원만 시청할 수 있도록 구성한 프라이빗 영상 플랫폼입니다. 가족의 소중한 순간을 안전하게 공유하고 감상할 수 있습니다.',
    responsive: true,
    tech: ['React', 'Firebase', 'Firestore'],
    image: 'images/projects/home/hotube.png',
    image2: 'images/projects/hotube.png',
    link: 'https://transcendent-cocada-9a2381.netlify.app/',
    team: '1명',
    role: '디자인, 풀스택 개발',
    deployed: 'Netlify',
    mobileApp: true,
    demoLogin: { id: '기타', pw: '12345!' },
    details: [
      'React 19 + Vite + Tailwind CSS 기반 반응형 SPA 개발 (다크모드, URL 상태 동기화)',
      'YouTube Data API 연동으로 영상 메타데이터 자동 추출 및 Shorts 자동 감지 로직 구현',
      'Firebase Cloud Functions + Firestore 기반 서버리스 REST API 설계 및 구현',
      '다중 뷰 모드(All/Long-form/Shorts/Timeline) 및 연도/월별 그룹핑 타임라인 UI 구현',
      'YouTube IFrame API 활용 영상 플레이어 및 자동 재생 기능 개발'
    ]
  },
  'Project #7': {
    title: 'Project #7',
    description: 'Clone coding project focusing on HTML and CSS fundamentals. A great learning experience for understanding web layout principles.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    image: 'images/projects/youtube.png',
    link: '#'
  },
  'Project #8': {
    title: 'Project #8',
    description: 'Mobile-first clone coding project. Demonstrates responsive design techniques and mobile UI patterns.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    image: 'images/projects/youtube.png',
    link: '#'
  }
};

// DOM Elements
const modal = document.getElementById('projectModal');
const modalImg = modal.querySelector('.modal__img');
const modalTitle = modal.querySelector('.modal__title');
const modalDescription = modal.querySelector('.modal__description');
const modalLink = modal.querySelector('.modal__link');
const modalClose = modal.querySelector('.modal__close');
const modalOverlay = modal.querySelector('.modal__overlay');
const modalTeam = modal.querySelector('.modal__team');
const modalRole = modal.querySelector('.modal__role');
const modalDeployed = modal.querySelector('.modal__deployed');
const modalInfo = modal.querySelector('.modal__info');
const modalDetailsList = modal.querySelector('.modal__details-list');
const modalImgDetails = modal.querySelector('.modal__img--details');
const modalImgDetails2 = modal.querySelector('.modal__img--details2');
const modalImgContainer = modal.querySelector('.modal__img-container');
const modalTechListPage2 = modal.querySelector('.modal__tech-list--page2');
const modalSlides = modal.querySelector('.modal__slides');
const modalNavPrev = modal.querySelector('.modal__nav--prev');
const modalNavNext = modal.querySelector('.modal__nav--next');
const modalIndicators = modal.querySelectorAll('.modal__indicator');
const projects = document.querySelectorAll('.project');

let currentPage = 0;
let hasDetails = false;

// Update navigation state
function updateNavigation() {
  if (currentPage === 0) {
    modalNavPrev.classList.remove('visible');
    if (hasDetails) {
      modalNavNext.classList.remove('hidden');
    } else {
      modalNavNext.classList.add('hidden');
    }
  } else {
    modalNavPrev.classList.add('visible');
    modalNavNext.classList.add('hidden');
  }

  // Update indicators
  modalIndicators.forEach((indicator, index) => {
    if (index === currentPage) {
      indicator.classList.add('modal__indicator--active');
    } else {
      indicator.classList.remove('modal__indicator--active');
    }
  });
}

// Navigate to page
function goToPage(page) {
  currentPage = page;
  if (page === 0) {
    modalSlides.classList.remove('slide-to-details');
  } else {
    modalSlides.classList.add('slide-to-details');
  }
  updateNavigation();
}

// Open modal with project data
function openModal(projectTitle) {
  const project = projectsData[projectTitle];
  if (!project) return;

  // Reset to first page
  currentPage = 0;
  modalSlides.classList.remove('slide-to-details');

  modalImg.src = project.image;
  modalImg.alt = project.title;

  // Apply mobile app style for smaller image height
  if (project.mobileApp) {
    modalImg.classList.add('modal__img--mobile');
  } else {
    modalImg.classList.remove('modal__img--mobile');
  }

  modalTitle.textContent = project.title;
  modalDescription.textContent = project.description;
  modalLink.href = project.link;

  // Show/hide additional info
  if (project.team || project.role) {
    modalInfo.style.display = 'flex';
    modalTeam.textContent = project.team || '';
    modalRole.textContent = project.role || '';
  } else {
    modalInfo.style.display = 'none';
  }

  if (project.deployed) {
    modalDeployed.style.display = 'block';
    modalDeployed.innerHTML = '<i class="fa-solid fa-location-dot"></i> 배포: ' + project.deployed;
  } else {
    modalDeployed.style.display = 'none';
  }

  // Populate tech list (page 2 only)
  modalTechListPage2.innerHTML = '';
  project.tech.forEach(tech => {
    const li = document.createElement('li');
    li.textContent = tech;
    modalTechListPage2.appendChild(li);
  });

  // Populate details list and second image
  hasDetails = project.details && project.details.length > 0;
  modalDetailsList.innerHTML = '';
  if (hasDetails) {
    project.details.forEach(detail => {
      const li = document.createElement('li');
      li.textContent = detail;
      modalDetailsList.appendChild(li);
    });
    // Set second image(s) if available
    if (project.image2) {
      if (Array.isArray(project.image2)) {
        // Multiple images - show side by side
        modalImgContainer.classList.add('dual-image');
        modalImgDetails.src = project.image2[0];
        modalImgDetails.alt = project.title + ' screenshot 2';
        modalImgDetails.style.display = 'block';
        modalImgDetails2.src = project.image2[1];
        modalImgDetails2.alt = project.title + ' screenshot 3';
      } else {
        // Single image
        modalImgContainer.classList.remove('dual-image');
        modalImgDetails.src = project.image2;
        modalImgDetails.alt = project.title + ' screenshot 2';
        modalImgDetails.style.display = 'block';
      }
    } else {
      modalImgContainer.classList.remove('dual-image');
      modalImgDetails.style.display = 'none';
    }
  } else {
    modalImgContainer.classList.remove('dual-image');
    modalImgDetails.style.display = 'none';
  }

  updateNavigation();
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// Close modal
function closeModal() {
  modal.classList.remove('active');
  document.body.style.overflow = '';
  // Reset to first page when closing
  currentPage = 0;
  modalSlides.classList.remove('slide-to-details');
}

// Event listeners
projects.forEach(project => {
  project.addEventListener('click', (e) => {
    e.preventDefault();
    const title = project.querySelector('.project__title').textContent;
    openModal(title);
  });
});

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

// Navigation arrows
modalNavNext.addEventListener('click', () => {
  if (hasDetails && currentPage === 0) {
    goToPage(1);
  }
});

modalNavPrev.addEventListener('click', () => {
  if (currentPage === 1) {
    goToPage(0);
  }
});

// Close on ESC key, navigate with arrow keys
document.addEventListener('keydown', (e) => {
  if (!modal.classList.contains('active')) return;

  if (e.key === 'Escape') {
    closeModal();
  } else if (e.key === 'ArrowRight' && hasDetails && currentPage === 0) {
    goToPage(1);
  } else if (e.key === 'ArrowLeft' && currentPage === 1) {
    goToPage(0);
  }
});

// Initialize Vanilla Tilt on project cards
if (typeof VanillaTilt !== 'undefined') {
  VanillaTilt.init(document.querySelectorAll('.project'), {
    max: 15,
    speed: 400,
    glare: true,
    'max-glare': 0.2,
    scale: 1.05
  });
}

// Security Confirm Modal - Create dynamically
const securityModalHTML = `
  <div class="confirm-modal" id="securityModal">
    <div class="confirm-modal__overlay"></div>
    <div class="confirm-modal__content">
      <p class="confirm-modal__message">해당 프로젝트는 보안이슈로<br> 시연동영상으로 대체합니다.</p>
      <div class="confirm-modal__buttons">
        <button class="confirm-modal__btn confirm-modal__btn--confirm confirm-modal__btn--full">확인</button>
      </div>
    </div>
  </div>
`;
document.body.insertAdjacentHTML('beforeend', securityModalHTML);

const securityModal = document.getElementById('securityModal');
const securityOverlay = securityModal.querySelector('.confirm-modal__overlay');
const securityConfirm = securityModal.querySelector('.confirm-modal__btn--confirm');
let currentDemoLink = '';

function openSecurityModal(link) {
  currentDemoLink = link;
  securityModal.classList.add('active');
}

function closeSecurityModal() {
  securityModal.classList.remove('active');
  currentDemoLink = '';
}

// Handle Visit Site click for demo video projects
modalLink.addEventListener('click', (e) => {
  const currentProjectTitle = modalTitle.textContent;
  const project = Object.values(projectsData).find(p => p.title === currentProjectTitle);

  if (project && project.demoVideo) {
    e.preventDefault();
    openSecurityModal(project.link);
  } else if (project && project.demoLogin) {
    e.preventDefault();
    openLoginModal(project.link, project.demoLogin.id, project.demoLogin.pw);
  }
});

securityOverlay.addEventListener('click', closeSecurityModal);
securityConfirm.addEventListener('click', () => {
  if (currentDemoLink) {
    window.open(currentDemoLink, '_blank');
  }
  closeSecurityModal();
});

// Login Info Modal - Create dynamically
const loginModalHTML = `
  <div class="confirm-modal" id="loginModal">
    <div class="confirm-modal__overlay"></div>
    <div class="confirm-modal__content">
      <p class="confirm-modal__message">해당 프로젝트는 보안이슈로<br>가데이터를 사용하였습니다.<br><br><span id="loginCredentials"></span></p>
      <div class="confirm-modal__buttons">
        <button class="confirm-modal__btn confirm-modal__btn--confirm confirm-modal__btn--full">확인</button>
      </div>
    </div>
  </div>
`;
document.body.insertAdjacentHTML('beforeend', loginModalHTML);

const loginModal = document.getElementById('loginModal');
const loginOverlay = loginModal.querySelector('.confirm-modal__overlay');
const loginConfirm = loginModal.querySelector('.confirm-modal__btn--confirm');
const loginCredentials = document.getElementById('loginCredentials');
let currentLoginLink = '';

function openLoginModal(link, id, pw) {
  currentLoginLink = link;
  loginCredentials.innerHTML = `<strong>ID:</strong> ${id}<br><strong>PW:</strong> ${pw}`;
  loginModal.classList.add('active');
}

function closeLoginModal() {
  loginModal.classList.remove('active');
  currentLoginLink = '';
}

loginOverlay.addEventListener('click', closeLoginModal);
loginConfirm.addEventListener('click', () => {
  if (currentLoginLink) {
    window.open(currentLoginLink, '_blank');
  }
  closeLoginModal();
});
