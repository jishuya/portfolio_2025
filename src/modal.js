// Project data with details
const projectsData = {
  'TMS v2': {
    title: 'Traffic Management System v2',
    description: '대규모 교통 데이터를 시각화하여 효율적인 교통 운영과 정책 수립을 지원하는 지능형 교통 영상분석 모니터링 소프트웨어입니다. GIS 기반으로 실시간 교통 영상과 AI 분석 정보를 시각적으로 제공하며, Interactive Chart를 이용하여 각 교차로와 접근로의 대규모 교통정보를 쉽게 조회하고 비교분석할 수 있습니다.',
    tech: ['Vue.js', 'Node.js', 'MariaDB'],
    image: 'images/projects/tmsv2_1.png',
    image2: 'images/projects/tmsv2_2.png',
    link: '#',
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
    title: 'TMS v3',
    description: 'Traffic Management System version 3. An upgraded version with improved UI/UX, better performance, and new features for advanced traffic analysis.',
    tech: ['Vue.js', 'Vuetify', 'REST API'],
    image: 'images/projects/youtube.png',
    link: '#'
  },
  'TAS v2': {
    title: 'TAS v2',
    description: 'Traffic Analysis System version 2. Provides detailed analytics and insights on traffic patterns, helping city planners make data-driven decisions.',
    tech: ['Vue.js', 'Node.js', 'PostgreSQL', 'Chart.js'],
    image: 'images/projects/youtube.png',
    link: '#'
  },
  'TNS': {
    title: 'TNS',
    description: 'Traffic Notify System. A notification service that alerts users about traffic conditions, road closures, and incidents in real-time.',
    tech: ['Node.js', 'WebSocket', 'Push Notifications'],
    image: 'images/projects/youtube.png',
    link: '#'
  },
  'Talk100': {
    title: 'Talk100',
    description: 'English speaking practice application. Helps users improve their English conversation skills through interactive exercises and AI-powered feedback.',
    tech: ['React Native', 'Node.js', 'Speech API'],
    image: 'images/projects/youtube.png',
    link: '#'
  },
  'Hotube': {
    title: 'Hotube',
    description: 'A private family video sharing platform. Secure and easy-to-use solution for sharing precious family moments with loved ones.',
    tech: ['React', 'Node.js', 'MongoDB', 'AWS S3'],
    image: 'images/projects/youtube.png',
    link: '#'
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
    // Set second image if available
    if (project.image2) {
      modalImgDetails.src = project.image2;
      modalImgDetails.alt = project.title + ' screenshot 2';
      modalImgDetails.style.display = 'block';
    } else {
      modalImgDetails.style.display = 'none';
    }
  } else {
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
