import Head from 'next/head';
import { useRouter } from 'next/router';

const origin = 'https://truststack.academy';
const defaults = {
  title: 'TrustStack Academy | Learn Cybersecurity by Doing',
  description: 'Build practical cybersecurity skills through eight role-based tracks, guided labs, Naira pricing and verifiable TrustStack learner credentials.',
};

const pages = {
  '/about': ['About TrustStack Academy | Practical Cybersecurity Education', 'Meet Truststack Academy and Educational Services Ltd, the Nigerian education company behind TrustStack Academy and its practical, Africa-focused cybersecurity learning platform.'],
  '/career-badges': ['Cybersecurity Career Badges | TrustStack Academy', 'Explore TrustStack Academy career badges for SOC analysis, digital forensics, threat intelligence, cloud security, GRC and other practical tracks.'],
  '/cdpo': ['Free CDPO Course | Nigeria Data Protection Training', 'Study Nigeria data protection with TrustStack Academy’s free 30-day CDPO learning path covering the NDPA, privacy operations and practical compliance.'],
  '/cdpo/exam': ['CDPO Practice Exam | TrustStack Academy', 'Test your understanding of Nigerian data protection, privacy governance and the NDPA with the TrustStack Academy CDPO practice exam.'],
  '/certificates': ['TrustStack Academy Certificates | Verifiable Credentials', 'Learn how TrustStack Academy issues secure, registry-verifiable completion certificates for practical cybersecurity career tracks.'],
  '/contact': ['Contact TrustStack Academy | Training, Support and Partnerships', 'Contact TrustStack Academy for course guidance, learner support, enterprise cybersecurity training, partnerships and media enquiries.'],
  '/dashboard': ['Learner Dashboard | TrustStack Academy', 'Access your TrustStack Academy learning dashboard, course progress and certificate records.'],
  '/knowledge-base': ['Cybersecurity Knowledge Base | TrustStack Academy', 'Read practical SOC playbooks, Nigerian data protection guidance, cloud security notes and Africa-focused cybersecurity analysis.'],
  '/learner': ['Verify a TrustStack Learner | Official Learner Registry', 'Confirm a TrustStack Academy learner ID, current career track and programme status through the official privacy-aware learner registry.'],
  '/privacy': ['Privacy Policy | TrustStack Academy', 'Learn how TrustStack Academy collects, uses, protects and retains learner information under the Nigeria Data Protection Act 2023.'],
  '/sample-certificate': ['Official Sample Certificate | TrustStack Academy', 'View and verify the official TrustStack Academy sample completion certificate and its registry record.'],
  '/scholarship': ['Cybersecurity Scholarship | TrustStack Academy', 'Join the TrustStack Academy scholarship waitlist for practical cybersecurity, data protection and digital compliance training in Africa.'],
  '/terms': ['Terms of Use | TrustStack Academy', 'Read the terms governing TrustStack Academy accounts, enrolment, practical labs, payments, learning services and certificates.'],
  '/verify': ['Verify a Certificate | TrustStack Academy', 'Verify a TrustStack Academy certificate ID against the official credential registry.'],
};

export default function SiteSeo() {
  const router = useRouter();
  const pathname = router.pathname;
  const isPrivate = pathname.startsWith('/admin') || pathname === '/dashboard' || pathname === '/certificate-preview';
  let match = pages[pathname];
  if (!match && pathname.startsWith('/cdpo/day/')) match = ['CDPO Daily Lesson | TrustStack Academy', 'Study a practical daily lesson from TrustStack Academy’s free 30-day Nigeria data protection learning path.'];
  const [title, description] = match || [defaults.title, defaults.description];
  const cleanPath = (router.asPath || pathname).split('?')[0];
  const canonical = `${origin}${cleanPath === '/' ? '/' : cleanPath}`;
  const image = `${origin}${pathname.startsWith('/cdpo') ? '/cdpo-og.png' : '/hero-cyber-lab-v2.jpg'}`;
  return <Head>
    <title key="site-title">{title}</title>
    <meta key="site-description" name="description" content={description}/>
    <link key="site-canonical" rel="canonical" href={canonical}/>
    <meta key="site-robots" name="robots" content={isPrivate ? 'noindex,nofollow' : 'index,follow,max-image-preview:large'}/>
    <meta key="og-site" property="og:site_name" content="TrustStack Academy"/>
    <meta key="og-type" property="og:type" content="website"/>
    <meta key="og-title" property="og:title" content={title}/>
    <meta key="og-description" property="og:description" content={description}/>
    <meta key="og-url" property="og:url" content={canonical}/>
    <meta key="og-image" property="og:image" content={image}/>
    <meta key="twitter-card" name="twitter:card" content="summary_large_image"/>
    <meta key="twitter-title" name="twitter:title" content={title}/>
    <meta key="twitter-description" name="twitter:description" content={description}/>
    <meta key="twitter-image" name="twitter:image" content={image}/>
    <link key="favicon" rel="icon" type="image/png" href="/Truststack_Logo_PNG.png"/>
    <script key="organisation-schema" type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({'@context':'https://schema.org','@type':'EducationalOrganization',name:'Truststack Academy and Educational Services Ltd',alternateName:'TrustStack Academy',url:origin,logo:`${origin}/Truststack_Logo_PNG.png`,description:defaults.description,areaServed:'Africa',founder:{'@type':'Person',name:'Destiny Young',jobTitle:'Founder and Chief Technology Architect'}})}}/>
  </Head>;
}
