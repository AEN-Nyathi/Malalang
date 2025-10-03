import React from 'react';
import { AUTHORS } from './blog';
import { FaPhone, FaWhatsapp, FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaGithub, FaEnvelope, FaMapMarkerAlt, FaHtml5, FaCss3, FaJs, FaReact, FaFigma, FaUser } from 'react-icons/fa';
import { SiNextdotjs, SiFirebase, SiAdobephotoshop, SiAdobeillustrator, SiAdobeaftereffects, SiAdobepremierepro } from 'react-icons/si';
import { PiMicrosoftExcelLogo, PiMicrosoftPowerpointLogo, PiMicrosoftWordLogo } from 'react-icons/pi';
import type { Value, Difference, TeamMember, Project } from '../types';

export const values: Value[] = [
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>,
    title: 'Trust First',
    description: "Our 'no deposit' policy is the cornerstone of our business. We build your website first, ensuring you are 100% happy before any payment is made. Your success is our success.",
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.125-1.274-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
    title: 'Local Partnership',
    description: "We're not just a service provider; we're your local partner in Phalaborwa. We believe in face-to-face meetings and a collaborative process to truly understand your business.",
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>,
    title: 'Uncompromising Quality',
    description: 'We are committed to delivering modern, high-performance, and visually appealing websites that are not just beautiful, but also effective tools for business growth.',
  },
   {
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H5v-2H3v-2H1v-4a6 6 0 017.743-5.743z" /></svg>,
    title: 'Genuine Accessibility',
    description: 'We demystify the web development process. Our goal is to make professional websites accessible and affordable for every small business in our community.',
  },
];

export const malalangDifference: Difference[] = [
    {
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.944A12.02 12.02 0 0012 21a12.02 12.02 0 009-8.056c.32-1.178.524-2.41.524-3.676 0-3.322-1.34-6.32-3.524-8.516z" /></svg>,
        title: "Risk-Free Model",
        description: "We reverse the financial risk completely. You see your finished website and are 100% satisfied before paying a cent. Our success is directly tied to your happiness."
    },
    {
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
        title: "Hyper-Local Partnership",
        description: "We're part of the Phalaborwa community. We meet you face-to-face to understand your business and the local market in a way no remote agency ever could."
    },
    {
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>,
        title: "Simplicity & Clarity",
        description: "We provide a jargon-free, guided process with simple, fixed-price packages. No hidden fees, no technical headaches—just a professional website that works."
    }
];

export const teamMembers: TeamMember[] = [
  {
    ...(AUTHORS.find(a => a.id === 'abram-ntsako') || {
      id: 'abram-ntsako',
      name: 'Abram Ntsako',
      imageUrl: '/assets/profile.jpg',
      bio: 'A Phalaborwa native and a student of Industrial Engineering at Vaal University of Technology, Abram Elton Ntsako Nyathi is a passionate entrepreneur with a diverse skillset. He founded Malalang Pty Ltd to empower local businesses with the digital tools they need to succeed. With expertise in a wide range of technologies, from web development (HTML, CSS, JavaScript, React, Next.js) to design (Photoshop, Illustrator, After Effects), Abram is a hands-on leader who is committed to delivering high-quality, affordable websites. His passion for problem-solving, honed through his engineering studies and love for chess, is evident in his meticulous approach to every project. Abram’s vision is to bridge the gap between local businesses and the digital world, one website at a time.',
      avatarUrl: '/assets/profile.jpg',
    }),
    title: 'Founder & Managing Director',
    imageUrl: '/assets/profile.jpg',
    bio: 'A Phalaborwa native and a student of Industrial Engineering at Vaal University of Technology, Abram Elton Ntsako Nyathi is a passionate entrepreneur with a diverse skillset. He founded Malalang Pty Ltd to empower local businesses with the digital tools they need to succeed. With expertise in a wide range of technologies, from web development (HTML, CSS, JavaScript, React, Next.js) to design (Photoshop, Illustrator, After Effects), Abram is a hands-on leader who is committed to delivering high-quality, affordable websites. His passion for problem-solving, honed through his engineering studies and love for chess, is evident in his meticulous approach to every project. Abram’s vision is to bridge the gap between local businesses and the digital world, one website at a time.',
    skills: [
      { name: 'HTML', icon: <FaHtml5 /> },
      { name: 'CSS', icon: <FaCss3 /> },
      { name: 'JavaScript', icon: <FaJs /> },
      { name: 'React.js', icon: <FaReact /> },
      { name: 'Next.js', icon: <SiNextdotjs /> },
      { name: 'Firebase', icon: <SiFirebase /> },
      { name: 'Photoshop', icon: <SiAdobephotoshop /> },
      { name: 'Illustrator', icon: <SiAdobeillustrator /> },
      { name: 'After Effects', icon: <SiAdobeaftereffects /> },
      { name: 'Fusion 360', icon: <FaFigma /> },
      { name: 'Word', icon: <PiMicrosoftWordLogo /> },
      { name: 'Excel', icon: <PiMicrosoftExcelLogo /> },
      { name: 'PowerPoint', icon: <PiMicrosoftPowerpointLogo /> },
      { name: 'Premiere Pro', icon: <SiAdobepremierepro /> },
    ],
    contacts: [
      { name: 'phone', value: '079-113-8480', icon: <FaPhone /> },
      { name: 'whatsapp', value: '079-113-8480', icon: <FaWhatsapp /> },
      { name: 'facebook', value: 'Abram Nyathi', link: 'https://www.facebook.com/abram.nyathi.1/', icon: <FaFacebook /> },
      { name: 'instagram', value: '@drchrisntsako', link: 'https://www.instagram.com/drchrisntsako/', icon: <FaInstagram /> },
      { name: 'twitter', value: '@NtsakoDr', link: 'https://twitter.com/NtsakoDr', icon: <FaTwitter /> },
      { name: 'linkedin', value: '@abram-elton-ntsako', link: 'https://www.linkedin.com/in/abram-elton-ntsako/', icon: <FaLinkedin /> },
      { name: 'github', value: '@AEN-Nyathi', link: 'https://github.com/AEN-Nyathi', icon: <FaGithub /> },
      { name: 'portfolio', value: 'abrameltonntsako.web.app', link: 'https://abrameltonntsako.web.app/', icon: <FaUser /> },
      { name: 'email', value: 'drchrsntsako@gmail.com', icon: <FaEnvelope /> },
      { name: 'address', value: 'limpopo, Phalaborwa, lulekani, tututu street 235B', icon: <FaMapMarkerAlt /> },
    ]
  },
  {
    id: 'agreement-mongwe',
    name: 'Agreement Mongwe Assistant',
    title: 'Operations',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop',
    bio: 'Will handle administrative tasks, scheduling, and lead follow-up to streamline our operations.',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop',
    skills: [
      { name: 'Word', icon: <PiMicrosoftWordLogo /> },
      { name: 'Excel', icon: <PiMicrosoftExcelLogo /> },
      { name: 'PowerPoint', icon: <PiMicrosoftPowerpointLogo /> },
    ],
    contacts: [
      { name: 'phone', value: '079-113-8480', icon: <FaPhone /> },
      { name: 'whatsapp', value: '079-113-8480', icon: <FaWhatsapp /> }]
  },
 
];

export const projects: Project[] = [
    {
        name: "Let’s Hunt Crypto",
        description: "Let’s Hunt Crypto offers a comprehensive analysis of the cryptocurrency market. Besides monitoring price, volume, and market capitalization, it also tracks community growth, learning development, events, and family engagement.",
        image: "/assets/letshuntcrypto_Logo.png",
        link: "https://letshuntcrypto.web.app/"
    },
    {
        name: "World Club",
        description: "The World Club is an innovative savings scheme that leverages a hierarchical structure to maximize savings and earnings. Members join by paying a small fee and can recruit up to four new members, earning interest as their network grows.",
        image: "/assets/worldclub_Logo.png",
        link: "https://world-club.web.app/About"
    },
    {
        name: "Sally Sigma",
        description: "Discover unforgettable destinations and seamless bookings with Sally M Travels & Tours. Specializing in group travel experiences across Southern Africa.",
        image: "/assets/Sally_Logo.jpg",
        link: "https://sally-omega.vercel.app/"
    },
    {
        name: "Vuxaka",
        description: "Vuxaka is a compassionate catering service that provides dignified and respectful culinary experiences for funerals and memorial services.",
        image: "/assets/vuxaka_Logo.png",
        link: "https://vuxaka.vercel.app/"
    },
    {
        name: "Central Eatery",
        description: "Experience the unique convenience of delicious food and a state-of-the-art car wash, all in one place in Lulekani.",
        image: "/assets/central_eatery_Logo.png",
        link: "https://central-eatery.vercel.app/about"
    },
    {
        name: "Lethokuhle",
        description: "Nurturing Minds, Elevating Grades: Affordable After-School Care with a Heart.",
        image: "/assets/lethokuhle_Logo.png",
        link: "https://lethokuhle.vercel.app/"
    },
    {
        name: "Bilacert",
        description: "Bilacert is a platform for creating and managing digital certificates.",
        image: "/assets/bilacert_Logo.jpg",
        link: "https://bilacert.co.za/"
    },
    {
        name: "Bila Core Petroleums",
        description: "Your trusted diesel & lubricants partner in Limpopo, delivering excellence through innovation.",
        image: "/assets/BILACORE_LOGO.jpg",
        link: "https://www.bilacorepetroleums.co.za/"
    },
    {
        name: "Day by Day with God",
        description: "Day by Day with God Care Center is a nurturing and faith-based environment for children's growth and development.",
        image: "/assets/daybyday_Logo.png",
        link: "https://day-by-day-with-god.web.app/"
    }
]
