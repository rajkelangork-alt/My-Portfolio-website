export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  liveUrl: string;
  credentialsFile: string;
  readmeFile: string;
  techStackFile: string;
  caseStudyImages: string[];
  image: string;
}

export const projectsData: ProjectItem[] = [
  {
    id: 'amaze-shop',
    title: 'Amaze.shop',
    subtitle: 'High-performance Modern E-Commerce Platform',
    category: 'E-Commerce Website',
    liveUrl: 'https://amaze-shop-orpin.vercel.app',
    credentialsFile: '/data/projects/amaze-creds.txt',
    readmeFile: '/data/AmazeShop readme/README.md',
    techStackFile: '/data/projects/amaze-stack.txt',
    caseStudyImages: [
      '/images/Product Case Studies/Amaze-Shop/amaze_shop_case_study_page_1.png',
      '/images/Product Case Studies/Amaze-Shop/amaze_shop_case_study_page_2.png',
    ],
    image: '/images/projects/amaze-shop.webp',
  },
  {
    id: 'connect-teams',
    title: 'Connect Teams',
    subtitle: 'Real-Time Communication & Collaboration Workspace',
    category: 'Communication App',
    liveUrl: 'https://connect-teams-ashen.vercel.app',
    credentialsFile: '/data/projects/connect-teams-creds.txt',
    readmeFile: '/data/ConnectTeams readme/README.md',
    techStackFile: '/data/projects/connect-teams-stack.txt',
    caseStudyImages: [
      '/images/Product Case Studies/ConnectTeams/connectteams_case_study_page_1.png',
      '/images/Product Case Studies/ConnectTeams/connectteams_case_study_page_2.png',
    ],
    image: '/images/projects/connect-teams.webp',
  },
  {
    id: 'smart-hr',
    title: 'Smart HR',
    subtitle: 'End-to-End Enterprise Employee Management System',
    category: 'Enterprise SaaS',
    liveUrl: 'https://smart-hr-woad.vercel.app',
    credentialsFile: '/data/projects/smart-hr-creds.txt',
    readmeFile: '/data/SmartHR readme/README.md',
    techStackFile: '/data/projects/smart-hr-stack.txt',
    caseStudyImages: [
      '/images/Product Case Studies/SmartHR/smarthr_case_study_page_1.png',
      '/images/Product Case Studies/SmartHR/smarthr_case_study_page_2.png',
      '/images/Product Case Studies/SmartHR/smarthr_case_study_page_3.png',
    ],
    image: '/images/projects/smart-hr.webp',
  },
  {
    id: 'tenant-analytics',
    title: 'Tenant Analytics',
    subtitle: 'Multi-Tenant SaaS Metrics & Visualization Suite',
    category: 'Analytics Dashboard',
    liveUrl: 'https://tenant-saas-analytics.vercel.app',
    credentialsFile: '/data/projects/tenant-analytics-creds.txt',
    readmeFile: '/data/Tenant SaaS readme/README.md',
    techStackFile: '/data/projects/tenant-analytics-stack.txt',
    caseStudyImages: [
      '/images/Product Case Studies/SaaS Analytics/saas_analytics_case_study_page_1.png',
      '/images/Product Case Studies/SaaS Analytics/saas_analytics_case_study_page_2.png',
    ],
    image: '/images/projects/tenant-analytics.webp',
  },
];