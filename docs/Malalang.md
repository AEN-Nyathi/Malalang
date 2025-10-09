This file is a merged representation of the entire codebase, combined into a single document by Repomix.
The content has been processed where security check has been disabled.

# File Summary

## Purpose
This file contains a packed representation of the entire repository's contents.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.

## File Format
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  a. A header with the file path (## File: path/to/file)
  b. The full contents of the file in a code block

## Usage Guidelines
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.

## Notes
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Security check has been disabled - content may contain sensitive information
- Files are sorted by Git change count (files with more changes are at the bottom)

# Directory Structure
```
.idx/
  dev.nix
app/
  about/
    components/
      AboutHero.tsx
      FeaturedProjects.tsx
      OurCoreValues.tsx
      OurGuarantee.tsx
      OurMission.tsx
      OurProcess.tsx
      OurStory.tsx
      OurTeam.tsx
      TheMalalangDifference.tsx
    page.tsx
  api/
    questionnaire/
      route.ts
    sign-image/
      route.ts
  blog/
    [blogs]/
      components/
        CommentsSection.tsx
        SocialShareButtons.tsx
      page.tsx
    page.tsx
  color-palette-generator/
    page.tsx
  contact/
    components/
      ContactForm.tsx
    page.tsx
  home/
    components/
      About.tsx
      Faq.tsx
      Guarantee.tsx
      Hero.tsx
      Portfolio.tsx
      Process.tsx
      RecentPosts.tsx
      Services.tsx
      Testimonials.tsx
    page.tsx
  pricing/
    page.tsx
  questionnaire/
    components/
      AIActions.tsx
      constants.ts
      FileUploadWidget.tsx
      NavigationButtons.tsx
      ProgressBar.tsx
      Question.tsx
      QuestionnaireForm.tsx
      ReviewStep.tsx
      Step.tsx
      types.ts
    page.tsx
  services/
    [service]/
      [bookings]/
        components/
          BookingForm.tsx
        page.tsx
      page.tsx
    page.tsx
  globals.css
  layout.tsx
  manifest.ts
  page.tsx
  robots.ts
  sitemap.ts
components/
  ColorPalettePage.tsx
  Cta.tsx
  Footer.tsx
  Header.tsx
  ImageColorPicker.tsx
  PhoneNumberInput.tsx
  SkipToContent.tsx
docs/
  Genkit.md
lib/
  aiSupport/
    aiSupport.ts
    genkit.ts
  constants/
    about.tsx
    blog.tsx
    faqs.ts
    navigation.ts
    portfolio.ts
    process.tsx
    services.tsx
    site.ts
    testimonials.ts
  firebase.ts
  types.ts
  validation.ts
public/
  robots.txt
.gitignore
.yarnrc.yml
metadata.json
next-env.d.ts
next.config.mjs
package.json
postcss.config.js
README.md
tsconfig.json
tsconfig.tsbuildinfo
types.ts
```

# Files

## File: .idx/dev.nix
```
{pkgs}: {
  channel = "stable-24.05";
  packages = [
    pkgs.nodejs_20
  ];
  idx.extensions = [
    
  ];
  idx.previews = {
    previews = {
      web = {
        command = [
          "npm"
          "run"
          "dev"
          "--"
          "--port"
          "$PORT"
          "--hostname"
          "0.0.0.0"
        ];
        manager = "web";
      };
    };
  };
}
```

## File: app/about/components/AboutHero.tsx
```typescript
import React from 'react';

const AboutHero: React.FC = () => {
  return (
    <section 
      className="relative py-32 md:py-48 bg-cover bg-center"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1920&auto=format&fit=crop')" }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="container mx-auto px-6 text-center relative">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-4">
          We Build Digital Experiences That Drive Results
        </h1>
        <p className="text-xl md:text-2xl text-slate-200 max-w-3xl mx-auto">
          We are a team of passionate developers and designers dedicated to helping businesses succeed in the digital world.
        </p>
        <a 
          href="/contact" 
          className="mt-8 inline-block bg-brand-primary hover:bg-brand-primary/90 text-white font-bold py-4 px-10 rounded-lg text-lg transition-transform transform hover:scale-105 duration-300"
        >
          Let's Work Together
        </a>
      </div>
    </section>
  );
};

export default AboutHero;
```

## File: app/about/components/FeaturedProjects.tsx
```typescript
import React from 'react';
import { projects } from '@/lib/constants/about';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

const FeaturedProjects: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-6">
          <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white">Our Work in Action</h2>
              <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">Take a look at some of the solutions we've delivered for local businesses.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
              {projects.map(project => (
                <div key={project.name} className="bg-slate-900 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden border border-slate-700 group">
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="block">
                    <div className="relative h-60 w-full bg-white">
                        <Image 
                            src={project.image} 
                            alt={project.name} 
                            layout="fill" 
                            objectFit="contain" 
                        />
                    </div>
                    <div className="p-8">
                        <h3 className="text-2xl font-bold text-white mb-2">{project.name}</h3>
                        <p className="text-slate-400 mb-4">{project.description}</p>
                        <span className="font-semibold text-brand-primary group-hover:text-brand-accent transition-colors duration-300 flex items-center">
                            View Project <ArrowRight className="ml-2 h-5 w-5" />
                        </span>
                    </div>
                  </a>
                </div>
              ))}
          </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
```

## File: app/about/components/OurCoreValues.tsx
```typescript
import React from 'react';
import { values } from '@/lib/constants/about';

const OurCoreValues: React.FC = () => {
  return (
    <section className="py-20 bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Our Core Values</h2>
          <p className="mt-4 text-lg text-slate-400 max-w-3xl mx-auto">
            These principles are the promises we make to every client. They guide every decision we make.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value) => (
            <div key={value.title} className="bg-slate-900 p-6 rounded-lg text-center transform transition duration-500 hover:-translate-y-2 hover:bg-slate-800">
              <div className="text-brand-primary inline-block p-4 bg-brand-primary/10 rounded-full mb-4">
                {value.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{value.title}</h3>
              <p className="text-slate-400">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurCoreValues;
```

## File: app/about/components/OurGuarantee.tsx
```typescript
import React from 'react';

const OurGuarantee: React.FC = () => {
  return (
    <section id="guarantee" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-6">
        <div className="relative text-center bg-slate-900 rounded-2xl p-8 md:p-12 border-t-4 border-brand-primary shadow-2xl">
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-brand-primary h-16 w-16 rounded-full flex items-center justify-center border-4 border-background">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.944A12.02 12.02 0 0012 21a12.02 12.02 0 009-8.056c.32-1.178.524-2.41.524-3.676 0-3.322-1.34-6.32-3.524-8.516z" />
                </svg>
            </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-8">Our 100% Satisfaction Guarantee</h2>
          <p className="text-xl md:text-2xl text-brand-primary font-semibold mt-4">
            You Don't Pay a Cent Until You're Completely Happy.
          </p>
          <p className="mt-6 text-lg text-slate-400 max-w-3xl mx-auto">
            We are so confident in our ability to deliver a website you'll love that we operate on a trust-first model. We build your entire website on a private link for you to review. If you aren't 100% satisfied with the final result, you walk away with no questions asked and no payment required. We invest in you first.
          </p>
        </div>
      </div>
    </section>
  );
};

export default OurGuarantee;
```

## File: app/about/components/OurMission.tsx
```typescript
import React from 'react';
import Image from 'next/image';

const OurMission: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          
          <div className="md:w-5/12 mb-10 md:mb-0">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center md:text-left">
              Our Mission
            </h2>
            <p className="text-xl text-slate-300 leading-relaxed">
              To empower local businesses with affordable, high-quality websites through a transparent, collaborative, and risk-free process. We aim to be a catalyst for their growth in the digital economy.
            </p>
          </div>

          <div className="md:w-6/12">
            <Image
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1920&auto=format&fit=crop"
              alt="Our Mission - A team collaborating"
              width={600}
              height={400}
              className="rounded-lg shadow-2xl"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default OurMission;
```

## File: app/about/components/OurProcess.tsx
```typescript
import React from 'react';
import { PROCESS_STEPS } from '@/lib/constants/process';

const OurProcess: React.FC = () => {
  return (
    <section id="process" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Our Client-Friendly Process</h2>
          <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">
            A structured, transparent journey from idea to launch. We guide you every step of the way.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {PROCESS_STEPS.map((step) => (
            <div 
              key={step.step} 
              className="p-8 text-center rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-slate-900 border border-slate-700"
            >
              <div className="flex items-center justify-center h-16 w-16 mx-auto mb-6 bg-brand-primary/10 text-brand-primary rounded-full">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
              <p className="text-slate-400">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurProcess;
```

## File: app/about/components/OurStory.tsx
```typescript
import React from 'react';
import Image from 'next/image';

const OurStory: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row-reverse items-center justify-between gap-12">
          
          <div className="md:w-6/12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center md:text-left">
              Our Story: A Local Solution for Local Businesses
            </h2>
            <div className="text-lg text-slate-300 space-y-4 leading-relaxed text-left">
              <p>
                Malalang Pty Ltd was born from a simple observation: local businesses in Phalaborwa needed a better way to get online. Founder Abram Ntsako saw entrepreneurs being underserved by expensive, complicated web solutions. He decided to create a studio that operated differently.
              </p>
              <p>
                The name "Malalang" comes from the Sepedi word for thatching reed. It symbolizes our approach: using local understanding and foundational strength to build something protective and essential for your business—your online home.
              </p>
               <p>
                Our model is built on trust and a shared goal: your complete satisfaction.
              </p>
            </div>
          </div>

          <div className="md:w-4/12 flex justify-center">
            <div className="relative text-center">
                <Image
                  src="/assets/profile.jpg"
                  alt="Abram Ntsako - Founder of Malalang"
                  width={300}
                  height={300}
                  className="rounded-full shadow-2xl object-cover mx-auto"
                />
                <div className="mt-4">
                    <p className="font-bold text-white text-xl">Abram Ntsako</p>
                    <p className="text-slate-400">Founder & Lead Developer</p>
                </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default OurStory;
```

## File: app/about/components/OurTeam.tsx
```typescript
import React from 'react';
import { teamMembers } from '@/lib/constants/about';

const OurTeam: React.FC = () => {
  return (
    <section className="py-20 bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Meet Our Team</h2>
          <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
            The people dedicated to bringing your digital vision to life.
          </p>
        </div>
        <div className="grid md:grid-cols-1 gap-8 max-w-5xl mx-auto">
          {teamMembers.map((member) => (
            <div key={member.name} className="bg-background rounded-lg p-6 text-center border border-slate-800 transform transition duration-500 hover:-translate-y-2 hover:border-brand-primary/50">
              <img 
                src={member.imageUrl} 
                alt={`Photo of ${member.name}`} 
                className="w-32 h-32 rounded-full object-cover mx-auto mb-4 ring-4 ring-slate-700"
              />
              <h3 className="text-2xl font-bold text-white">{member.name}</h3>
              <p className="text-brand-primary font-semibold mb-3">{member.title}</p>
              <p className="text-slate-400">{member.bio}</p>
          
                <div className="mt-4">
                  <h4 className="text-xl font-bold text-white mb-2">Skills</h4>
                  <div className="flex flex-wrap justify-center">
                    {member.skills.map(skill => (
                      <span key={skill.name} className="bg-slate-700 text-slate-300 px-2 py-1 rounded-md text-sm m-1 flex items-center">
                        {skill.icon} <span className="ml-2">{skill.name}</span>
                      </span>
                    ))}
                  </div>
                </div>
          
            
                  <div className="mt-4">
                      <h4 className="text-xl font-bold text-white mb-2">Contact</h4>
                      <div className="flex flex-wrap justify-center">
                          {member.contacts.map(contact => (
                              <a href={contact.link || (contact.name === 'email' ? `mailto:${contact.value}` : `tel:${contact.value}`)} key={contact.name} className="bg-slate-700 text-slate-300 px-2 py-1 rounded-md text-sm m-1 flex items-center">
                                {contact.icon} <span className="ml-2">{contact.name}: {contact.value}</span>
                              </a>
                          ))}
                      </div>
                  </div>
          
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurTeam;
```

## File: app/about/components/TheMalalangDifference.tsx
```typescript
import React from 'react';
import { malalangDifference } from '@/lib/constants/about';

const TheMalalangDifference: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-6">
          <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white">The Malalang Difference</h2>
              <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">What sets us apart from DIY builders and distant agencies.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {malalangDifference.map(item => (
                  <div 
                    key={item.title} 
                    className="bg-slate-900 p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-slate-700"
                  >
                      <div className="flex items-center justify-center h-16 w-16 mb-6 bg-brand-secondary/10 text-brand-secondary rounded-full">
                          {item.icon}
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                      <p className="text-slate-400 leading-relaxed">{item.description}</p>
                  </div>
              ))}
          </div>
      </div>
    </section>
  );
};

export default TheMalalangDifference;
```

## File: app/about/page.tsx
```typescript
import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import AboutHero from './components/AboutHero';
import OurStory from './components/OurStory';
import OurMission from './components/OurMission';
import OurProcess from './components/OurProcess';
import OurGuarantee from './components/OurGuarantee';
import TheMalalangDifference from './components/TheMalalangDifference';
import OurTeam from './components/OurTeam';
import FeaturedProjects from './components/FeaturedProjects';
import OurCoreValues from './components/OurCoreValues';
import { WHATSAPP_LINK } from '@/lib/constants/site';

export const metadata: Metadata = {
  title: 'About Malalang - Our Story, Mission, and Team',
  description: 'Learn about Malalang Pty Ltd, a Phalaborwa-based web design studio. Discover our unique trust-first approach, our mission to empower local businesses, and meet the team dedicated to your success.',
};

const AboutPage: React.FC = () => {
  return (
    <main>
      <AboutHero />
      <OurStory />
      <OurMission />
      <OurProcess />
      <OurGuarantee />
      <TheMalalangDifference />
      <OurTeam />
      <FeaturedProjects />
      <OurCoreValues />
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-6 text-center">
            <p className="text-lg text-slate-300 mb-4">Ready to start your project?</p>
            <a 
              href={WHATSAPP_LINK} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-brand-primary hover:bg-brand-primary/80 text-white font-bold py-4 px-8 rounded-lg text-lg transition-transform transform hover:scale-105 duration-300"
            >
              Get a Free Consultation
            </a>
            <p className="mt-4">
              <Link href="/pricing" className="text-brand-primary hover:underline">
                Or view our detailed pricing page &rarr;
              </Link>
            </p>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
```

## File: app/api/questionnaire/route.ts
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { enhanceAnswerFlow, suggestAnswerFlow } from '@/lib/aiSupport/aiSupport';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { action, payload } = body;

  if (!action || !payload) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  try {
    if (action === 'enhance') {
      const enhancedAnswer = await enhanceAnswerFlow(payload);
      return NextResponse.json({ result: enhancedAnswer });
    } else if (action === 'suggest') {
      const suggestions = await suggestAnswerFlow(payload);
      return NextResponse.json({ result: suggestions });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error(`Error in ${action} action:`, error);
    return NextResponse.json({ error: 'An error occurred on the server.' }, { status: 500 });
  }
}
```

## File: app/api/sign-image/route.ts
```typescript
import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  const { paramsToSign } = await request.json();
  try {
    const signature = cloudinary.utils.api_sign_request(paramsToSign, process.env.CLOUDINARY_API_SECRET as string);
    return NextResponse.json({ signature });
  } catch (error) {
    console.error('Error signing upload:', error);
    return NextResponse.json({ error: 'Failed to sign upload' }, { status: 500 });
  }
}
```

## File: app/blog/[blogs]/components/CommentsSection.tsx
```typescript
'use client';

import React from 'react';

const CommentsSection: React.FC = () => {
  return (
    <div className="mt-12">
      <h2 className="text-3xl font-bold text-white mb-6">Leave a Comment</h2>
      <form className="grid grid-cols-1 gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input type="text" placeholder="Your Name" className="w-full px-4 py-3 rounded-lg bg-slate-800 text-white border-2 border-slate-700 focus:border-brand-primary focus:ring-0 transition-colors duration-300" />
          <input type="email" placeholder="Your Email" className="w-full px-4 py-3 rounded-lg bg-slate-800 text-white border-2 border-slate-700 focus:border-brand-primary focus:ring-0 transition-colors duration-300" />
        </div>
        <textarea placeholder="Your Comment" rows={5} className="w-full px-4 py-3 rounded-lg bg-slate-800 text-white border-2 border-slate-700 focus:border-brand-primary focus:ring-0 transition-colors duration-300"></textarea>
        <div className="text-right">
          <button type="submit" className="bg-brand-primary hover:bg-brand-primary/80 text-white font-bold py-3 px-6 rounded-lg text-lg transition-colors duration-300">
            Post Comment
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentsSection;
```

## File: app/blog/[blogs]/components/SocialShareButtons.tsx
```typescript
'use client';

import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp } from 'react-icons/fa';

interface SocialShareButtonsProps {
  postUrl: string;
  title: string;
}

const SocialShareButtons: React.FC<SocialShareButtonsProps> = ({ postUrl, title }) => {
  const encodedUrl = encodeURIComponent(postUrl);
  const encodedTitle = encodeURIComponent(title);

  const socialLinks = [
    { name: 'Facebook', icon: <FaFacebook />, url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}` },
    { name: 'Twitter', icon: <FaTwitter />, url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}` },
    { name: 'LinkedIn', icon: <FaLinkedin />, url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}` },
    { name: 'WhatsApp', icon: <FaWhatsapp />, url: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}` }
  ];

  return (
    <div className="flex items-center gap-3">
      <p className="text-slate-300 font-semibold">Share:</p>
      {socialLinks.map(social => (
        <a 
          key={social.name}
          href={social.url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-slate-400 hover:text-brand-primary transition-colors duration-300"
          aria-label={`Share on ${social.name}`}
        >
          {React.cloneElement(social.icon, { size: 24 })}
        </a>
      ))}
    </div>
  );
};

export default SocialShareButtons;
```

## File: app/blog/[blogs]/page.tsx
```typescript
'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { BLOG_POSTS, AUTHORS } from '@/lib/constants/blog';
import SocialShareButtons from './components/SocialShareButtons';
import CommentsSection from './components/CommentsSection';
import type { blogs } from '@/lib/types';

const BlogPostPage: React.FC = () => {
  const params = useParams();
  const blogs  = params.blogs as string;

  const post = BLOG_POSTS.find(p => p.blogs  === blogs );
  const author = post ? AUTHORS.find(a => a.id === post.authorId) : null;

  if (!post || !author) {
    return (
      <div className="py-20 bg-background min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Post Not Found</h1>
          <p className="text-slate-400 mb-8">Sorry, we couldn't find the blog post you're looking for.</p>
          <Link href="/blog" className="bg-brand-primary hover:bg-brand-primary/80 text-white font-bold py-3 px-6 rounded-lg text-lg transition-colors duration-300">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const getRelatedPosts = () => {
    const allOtherPosts = BLOG_POSTS.filter(p => p.blogs  !== blogs );
    let candidates = new Set<blogs>();

    // 1. By Tags
    if (post.tags && post.tags.length > 0) {
      allOtherPosts.forEach(p => {
        if (p.tags && p.tags.some((tag: string) => post.tags!.includes(tag))) {
          candidates.add(p);
        }
      });
    }
    
    // If not enough candidates, check by author
    if (candidates.size < 2) {
         allOtherPosts.forEach(p => {
            if (p.authorId === post.authorId) {
                candidates.add(p);
            }
        });
    }

    // If still not enough, fill with most recent
    if (candidates.size < 2) {
        allOtherPosts.forEach(p => candidates.add(p));
    }

    return Array.from(candidates).slice(0, 2);
  };

  const relatedPosts = getRelatedPosts();
  const postUrl = typeof window !== 'undefined' ? `https://malalang.vercel.app/blog/${blogs }` : '';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
    headline: post.title,
    description: post.metaDescription,
    image: post.imageUrl,
    author: {
      '@type': 'Person',
      name: author.name,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Malalang',
      logo: {
        '@type': 'ImageObject',
        url: 'https://malalang.vercel.app/images/logo.png',
      },
    },
    datePublished: post.date,
  };

  return (
    <main className="bg-slate-900 py-12 md:py-20">
       <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="container mx-auto px-6 max-w-4xl">
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">{post.title}</h1>
          <p className="text-slate-400">
            By <span className="font-semibold text-brand-primary">{author.name}</span> on {post.date}
          </p>
        </header>
        
        <img src={post.imageUrl} alt={post.title} className="w-full h-auto max-h-[500px] object-cover rounded-lg shadow-lg mb-8" />
        
        <div className={`
          text-slate-300 text-lg leading-relaxed
          [&_p]:mb-6
          [&_h3]:text-2xl [&_h3]:md:text-3xl [&_h3]:font-bold [&_h3]:text-white [&_h3]:mt-10 [&_h3]:mb-4
          [&_blockquote]:border-l-4 [&_blockquote]:border-brand-primary [&_blockquote]:pl-6 [&_blockquote]:italic [&_blockquote]:text-slate-400 [&_blockquote]:my-8
          [&_ul]:list-disc [&_ul]:list-inside [&_ul]:my-6 [&_ul]:pl-2 [&_ul]:space-y-2
          [&_li]:mb-2
          [&_pre]:bg-slate-800 [&_pre]:p-4 [&_pre]:rounded-lg [&_pre]:text-sm [&_pre]:overflow-x-auto [&_pre]:my-8
          [&_code]:font-mono [&_code]:text-amber-300
        `}>
          {post.content}
        </div>

        <div className="mt-12 p-6 bg-background rounded-lg flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6 border border-slate-800">
          <img src={author.avatarUrl} alt={author.name} className="w-24 h-24 rounded-full object-cover flex-shrink-0" />
          <div>
            <p className="text-slate-400 text-sm uppercase tracking-wider">Written by</p>
            <h3 className="text-2xl font-bold text-white mt-1">{author.name}</h3>
            <p className="text-slate-400 mt-2 text-base leading-relaxed">{author.bio}</p>
          </div>
        </div>

        <CommentsSection />
        
        <hr className="my-12 border-slate-700" />
        
        <footer className="flex flex-col sm:flex-row justify-between items-center gap-6">
          <SocialShareButtons postUrl={postUrl} title={post.title} />
          <Link href="/blog" className="font-semibold text-brand-primary hover:text-brand-secondary transition-colors duration-300">
            &larr; Back to Blog
          </Link>
        </footer>
        
        {relatedPosts.length > 0 && (
          <section className="mt-16">
              <h2 className="text-3xl font-bold text-white mb-8 border-b border-slate-700 pb-4">You Might Also Like</h2>
              <div className="grid md:grid-cols-2 gap-8">
                  {relatedPosts.map(relatedPost => (
                      <Link key={relatedPost.blogs } href={`/blog/${relatedPost.blogs }`} className="block bg-background rounded-lg overflow-hidden shadow-lg group">
                          <img src={relatedPost.imageUrl} alt={relatedPost.title} className="w-full h-48 object-cover group-hover:opacity-80 transition-opacity duration-300" />
                          <div className="p-6">
                              <h3 className="text-xl font-bold text-white group-hover:text-brand-primary transition-colors duration-300">{relatedPost.title}</h3>
                          </div>
                      </Link>
                  ))}
              </div>
          </section>
        )}

      </article>
    </main>
  );
};

export default BlogPostPage;
```

## File: app/blog/page.tsx
```typescript
'use client';
import React, { useState } from 'react';
import Link from 'next/link';
// import { Metadata } from 'next';
import { BLOG_POSTS, AUTHORS } from '@/lib/constants/blog';

// export const metadata: Metadata = {
//   title: 'Malalang Blog - Web Design Insights for Phalaborwa Businesses',
//   description: 'Explore the Malalang blog for articles on web design, SEO, and digital marketing, tailored for businesses in Phalaborwa. Get tips to improve your online presence.',
// };

const BlogPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const authorsById = Object.fromEntries(AUTHORS.map(a => [a.id, a]));

  const allTags = Array.from(new Set(BLOG_POSTS.flatMap(post => post.tags || []))).sort();

  const filteredPosts = BLOG_POSTS.filter(post => {
    const tagMatch = selectedTag ? post.tags?.includes(selectedTag) : true;
    const searchMatch = searchQuery
      ? post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return tagMatch && searchMatch;
  });

  const handleTagClick = (tag: string | null) => {
    setSelectedTag(tag);
  };

  return (
    <main>
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">The Malalang Blog</h1>
            <p className="text-xl text-brand-primary font-semibold max-w-3xl mx-auto">
              Insights, tutorials, and stories on web development, design, and the digital world.
            </p>
          </div>

          <div className="mb-12 max-w-2xl mx-auto">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search articles..."
              className="w-full px-5 py-3 rounded-lg bg-slate-800 text-white border-2 border-slate-700 focus:border-brand-primary focus:ring-0 transition-colors duration-300"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <button
              onClick={() => handleTagClick(null)}
              className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-300 ${!selectedTag ? 'bg-brand-primary text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
            >
              All Posts
            </button>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-300 ${selectedTag === tag ? 'bg-brand-primary text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
              >
                {tag}
              </button>
            ))}
          </div>

          {filteredPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map(post => (
                <Link key={post.blogs } href={`/blog/${post.blogs }`} className="block bg-background rounded-lg overflow-hidden shadow-lg group">
                  <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover group-hover:opacity-80 transition-opacity duration-300" />
                  <div className="p-6">
                    <p className="text-sm text-slate-400 mb-2">{post.date} &bull; {authorsById[post.authorId]?.name || 'Unknown Author'}</p>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-primary transition-colors duration-300">{post.title}</h3>
                    <p className="text-slate-400 text-base flex-grow">{post.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-2xl text-white font-semibold mb-4">No posts found</p>
              <p className="text-slate-400">Try adjusting your search or selecting a different tag.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default BlogPage;
```

## File: app/color-palette-generator/page.tsx
```typescript
'use client';
import React from 'react';
import ImageColorPicker from '@/components/ImageColorPicker';

const ColorPalettePage: React.FC = () => {
  return (
    <main>
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Color Palette Generator</h1>
            <p className="text-xl text-brand-primary font-semibold max-w-3xl mx-auto">
              Upload an image to automatically generate a color palette. Perfect for finding inspiration for your brand.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <ImageColorPicker onPaletteChange={() => {
              // The component handles its own display state. No action needed here.
            }} />
          </div>
        </div>
      </section>
    </main>
  );
};

export default ColorPalettePage;
```

## File: app/contact/components/ContactForm.tsx
```typescript
'use client';

import React, { useState } from 'react';
import { collection, addDoc } from "firebase/firestore";
import { db } from '@/lib/firebase';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{[key: string]: string}>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const errors: {[key: string]: string} = {};

    if (!formData.name.trim()) {
      errors.name = 'Full name is required';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters long';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await addDoc(collection(db, "contacts"), {
        ...formData,
        createdAt: new Date(),
      });
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });

      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
        console.error("Error adding document: ", error);
        setError("There was an error sending your message. Please try again.");
        setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div
        className="bg-background p-8 rounded-lg border border-brand-secondary/50 h-full flex flex-col justify-center items-center text-center"
        role="status"
        aria-live="polite"
      >
         <div className="text-brand-secondary mb-4" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        </div>
        <h2 className="text-2xl font-bold text-white">Thank You!</h2>
        <p className="text-slate-300 mt-2">Your message has been sent successfully. We will get back to you shortly.</p>
      </div>
    );
  }

  return (
    <div className="bg-background p-8 rounded-lg border border-slate-800">
      <h2 className="text-2xl font-bold text-white mb-6">Send Us a Message</h2>
      <form onSubmit={handleSubmit} noValidate aria-label="Contact form">
        <div className="mb-4">
          <label htmlFor="name" className="block text-slate-300 font-semibold mb-2">
            Full Name <span className="text-red-400" aria-label="required">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full bg-slate-800 border text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-brand-primary ${
              fieldErrors.name ? 'border-red-400' : 'border-slate-700'
            }`}
            required
            aria-required="true"
            aria-invalid={!!fieldErrors.name}
            aria-describedby={fieldErrors.name ? 'name-error' : undefined}
            autoComplete="name"
          />
          {fieldErrors.name && (
            <p id="name-error" className="text-red-400 text-sm mt-1" role="alert">
              {fieldErrors.name}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-slate-300 font-semibold mb-2">
            Email Address <span className="text-red-400" aria-label="required">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full bg-slate-800 border text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-brand-primary ${
              fieldErrors.email ? 'border-red-400' : 'border-slate-700'
            }`}
            required
            aria-required="true"
            aria-invalid={!!fieldErrors.email}
            aria-describedby={fieldErrors.email ? 'email-error' : undefined}
            autoComplete="email"
          />
          {fieldErrors.email && (
            <p id="email-error" className="text-red-400 text-sm mt-1" role="alert">
              {fieldErrors.email}
            </p>
          )}
        </div>
        <div className="mb-6">
          <label htmlFor="message" className="block text-slate-300 font-semibold mb-2">
            Message <span className="text-red-400" aria-label="required">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            className={`w-full bg-slate-800 border text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-brand-primary ${
              fieldErrors.message ? 'border-red-400' : 'border-slate-700'
            }`}
            required
            aria-required="true"
            aria-invalid={!!fieldErrors.message}
            aria-describedby={fieldErrors.message ? 'message-error' : undefined}
          ></textarea>
          {fieldErrors.message && (
            <p id="message-error" className="text-red-400 text-sm mt-1" role="alert">
              {fieldErrors.message}
            </p>
          )}
        </div>
         {error && (
           <div className="text-red-400 text-center mb-4 p-3 bg-red-400/10 rounded-lg" role="alert" aria-live="assertive">
             {error}
           </div>
         )}
        <div className="text-right">
            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-brand-primary hover:bg-brand-primary/80 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-brand-secondary"
                aria-label={isSubmitting ? 'Sending your message' : 'Send message'}
            >
                {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
```

## File: app/contact/page.tsx
```typescript
import React from 'react';
import { Metadata } from 'next';
import ContactForm from '@/app/contact/components/ContactForm';
import { WHATSAPP_LINK, WHATSAPP_NUMBER } from '@/lib/constants/site';

export const metadata: Metadata = {
  title: 'Contact Malalang - Web Design in Phalaborwa',
  description: 'Contact Malalang for a free consultation on your web design project. We are a local web design company in Phalaborwa, ready to help your business succeed online. Reach out via our contact form, email, or WhatsApp.',
};

const ContactPage: React.FC = () => {
  return (
    <>
      <section className="py-20 bg-slate-900" aria-labelledby="contact-heading">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h1 id="contact-heading" className="text-4xl md:text-5xl font-extrabold text-white mb-4">Get in Touch</h1>
            <p className="text-xl text-brand-primary font-semibold max-w-2xl mx-auto">
              We're here to answer any questions you may have. Reach out to us and we'll respond as soon as we can.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="bg-background p-8 rounded-lg border border-slate-800">
              <h2 className="text-2xl font-bold text-white mb-6">Contact Information</h2>
              <div className="space-y-4 text-slate-300">
                <div className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-primary mr-4 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  <div>
                    <h3 className="font-semibold text-white">Our Location</h3>
                    <p className="text-slate-300">Phalaborwa, 1390, Limpopo</p>
                    <p className="text-slate-300">South Africa</p>
                  </div>
                </div>
                 <div className="flex items-start">
                    <svg className="w-6 h-6 mr-4 mt-1 text-brand-primary flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" aria-hidden="true"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.8 0-67.3-8.8-98.1-25.4l-7-4.2-72.5 19.1 19.4-70.6-4.6-7.4c-18.7-29.9-28.7-65.4-28.7-102.1 0-108.7 88.4-197.1 197.1-197.1 53.3 0 104.1 20.8 142.3 58.9 38.2 38.2 58.9 89 58.9 142.3 0 108.7-88.4 197.1-197.1 197.1zm105.9-161.5c-5.9-3-35.1-17.3-40.6-19.3s-9.7-3-13.7 3c-4 6-15.4 19.3-18.9 23.3-3.5 4-7 4.5-13 1.5-6-3-25.3-9.3-48.1-29.6-17.8-15.8-29.8-35.3-33.3-41.3s-.3-9.3 2.7-12.3c2.7-2.7 5.9-7 8.9-10.5 3-3.5 4-5.9 6-9.9s3-6 1.5-11.4c-1.5-5.4-13.7-33.1-18.8-45.3-5.1-12.2-10.2-10.5-13.7-10.7-3.3-.2-7.2-.2-11.2-.2-4 0-10.7 1.5-16.2 7.5-5.6 6-21.5 21-21.5 51.3s22 59.5 25 63.5c3 4 43.1 65.6 105.2 93.2 14.9 6.9 28.6 11.1 38.5 14.1 16.4 5.1 31.4 4.4 43.2 2.7 12.9-1.9 39.8-16.3 45.4-32.1 5.6-15.8 5.6-29.2 3.9-32.1-1.7-2.9-5.7-4.5-11.7-7.5z"/></svg>
                   <div>
                    <h3 className="font-semibold text-white">WhatsApp</h3>
                    <a
                      href={WHATSAPP_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-300 hover:text-brand-primary transition-colors duration-300 focus:outline-none focus:underline"
                      aria-label="Contact us on WhatsApp - Opens in a new window"
                    >
                      {WHATSAPP_NUMBER}
                    </a>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-primary mr-4 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  <div>
                    <h3 className="font-semibold text-white">Email Us</h3>
                    <a
                      href="mailto:info@malalang.co.za"
                      className="text-slate-300 hover:text-brand-primary transition-colors duration-300 focus:outline-none focus:underline"
                    >
                      info@malalang.co.za
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
```

## File: app/home/components/About.tsx
```typescript
import React from 'react';
import Link from 'next/link';

const values = [
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>,
    title: 'Trust',
    description: 'Our no-deposit policy is our promise. We build trust by reversing the financial risk for our clients.',
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.125-1.274-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.125-1.274.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
    title: 'Partnership',
    description: 'We work with you, face-to-face. We\'re a local partner invested in your success, not a distant vendor.',
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>,
    title: 'Quality',
    description: 'We deliver modern, responsive, and effective websites that help you stand out and achieve your goals.',
  },
   {
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H5v-2H3v-2H1v-4a6 6 0 017.743-5.743z" /></svg>,
    title: 'Accessibility',
    description: 'We make professional web development accessible to all local businesses, removing cost and complexity.',
  },
];

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Your Local Digital Partner in Phalaborwa</h2>
          <p className="mt-4 text-lg text-slate-400 max-w-3xl mx-auto">
            We are a Phalaborwa-based web development studio dedicated to empowering local businesses. We build relationships on trust, transparency, and a shared goal: your complete satisfaction.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value) => (
            <div key={value.title} className="bg-background p-6 rounded-lg text-center">
              <div className="text-brand-primary inline-block p-4 bg-brand-primary/10 rounded-full mb-4">
                {value.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{value.title}</h3>
              <p className="text-slate-400">{value.description}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
            <Link href="/about" className="inline-block bg-brand-primary hover:bg-brand-primary/80 text-white font-bold py-3 px-6 rounded-lg text-lg transition-transform transform hover:scale-105 duration-300">
                Learn More About Us
            </Link>
        </div>
      </div>
    </section>
  );
};

export default About;
```

## File: app/home/components/Faq.tsx
```typescript
'use client';
import React, { useState } from 'react';
import { FAQ_ITEMS } from '@/lib/constants/faqs';
import type { FaqItem } from '@/lib/types';

const FaqItemComponent: React.FC<{ item: FaqItem; isOpen: boolean; onClick: () => void; id: string }> = ({ item, isOpen, onClick, id }) => {
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick();
        }
    };

    return (
        <div className="border-b border-slate-800">
            <button
                onClick={onClick}
                onKeyDown={handleKeyDown}
                className="flex justify-between items-center w-full py-5 text-left text-lg font-semibold text-white hover:text-brand-primary transition-colors focus:outline-none focus:ring-2 focus:ring-brand-secondary rounded px-2"
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${id}`}
                id={`faq-question-${id}`}
            >
                <span>{item.question}</span>
                <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'} flex-shrink-0 ml-4`} aria-hidden="true">
                    <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                </span>
            </button>
            <div
                id={`faq-answer-${id}`}
                role="region"
                aria-labelledby={`faq-question-${id}`}
                className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'}`}
                hidden={!isOpen}
            >
                <p className="pt-2 pb-5 text-slate-300 px-2">
                    {item.answer}
                </p>
            </div>
        </div>
    );
};


const Faq: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const handleToggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faq" className="py-20 bg-slate-900" aria-labelledby="faq-heading">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 id="faq-heading" className="text-3xl md:text-4xl font-bold text-white">Frequently Asked Questions</h2>
                    <p className="mt-4 text-lg text-slate-300">
                        Have questions? We have answers.
                    </p>
                </div>
                <div className="max-w-3xl mx-auto">
                    {FAQ_ITEMS.map((item, index) => (
                        <FaqItemComponent
                            key={index}
                            item={item}
                            isOpen={openIndex === index}
                            onClick={() => handleToggle(index)}
                            id={`${index}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Faq;
```

## File: app/home/components/Guarantee.tsx
```typescript
import React from 'react';
import Link from 'next/link';

const Guarantee: React.FC = () => {
  return (
    <section id="guarantee" className="py-20 bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="bg-background rounded-lg p-8 md:p-12 border border-brand-primary/30 text-center">
            <div className="inline-block bg-brand-primary/10 text-brand-primary p-4 rounded-full mb-4">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.944A12.02 12.02 0 0012 21a12.02 12.02 0 009-8.056c.32-1.178.524-2.41.524-3.676 0-3.322-1.34-6.32-3.524-8.516z" />
                </svg>
            </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">Our No-Risk Guarantee</h2>
          <p className="text-xl md:text-2xl text-brand-primary font-semibold mt-4">
            You Don't Pay a Cent Until You're 100% Satisfied.
          </p>
          <p className="mt-6 text-lg text-slate-400 max-w-3xl mx-auto">
            We operate on a trust-first model. We build your website and you only pay when you are completely happy. This is our promise to you.
          </p>
          <div className="text-center mt-8">
            <Link href="/about#guarantee" className="inline-block bg-brand-primary hover:bg-brand-primary/80 text-white font-bold py-3 px-6 rounded-lg text-lg transition-transform transform hover:scale-105 duration-300">
                Learn More About Our Guarantee
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Guarantee;
```

## File: app/home/components/Hero.tsx
```typescript
import React from 'react';
import Link from 'next/link';
import { WHATSAPP_LINK } from '@/lib/constants/site';

const Hero: React.FC = () => {
  return (
    <section
      id="home"
      className="relative py-32 md:py-48 bg-cover bg-center"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1920&auto=format&fit=crop')" }}
      aria-labelledby="hero-heading"
    >
       <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="container mx-auto px-6 text-center relative">
        <h1 id="hero-heading" className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">
          Grow Your Local Business with a Professional Website
        </h1>
        <p className="text-xl md:text-2xl text-brand-primary font-semibold mb-8">
          No Deposit Required. You Only Pay When You're 100% Satisfied.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4" role="group" aria-label="Call to action buttons">
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-brand-primary hover:bg-brand-primary/80 text-white font-bold py-4 px-8 rounded-lg text-lg transition-transform transform hover:scale-105 duration-300 focus:outline-none focus:ring-2 focus:ring-brand-secondary min-h-[56px] flex items-center justify-center"
            aria-label="Start your project today via WhatsApp - Opens in a new window"
          >
            Start Your Project Today
          </a>
          <Link
            href="/about"
            className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-brand-secondary min-h-[56px] flex items-center justify-center"
          >
            Learn More About Us
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
```

## File: app/home/components/Portfolio.tsx
```typescript
import React from 'react';
import { PORTFOLIO_ITEMS } from '@/lib/constants/portfolio';
import type { PortfolioItem } from '@/lib/types';

const PortfolioCard: React.FC<{ item: PortfolioItem }> = ({ item }) => (
    <div className="group relative overflow-hidden rounded-lg shadow-lg bg-slate-900">
        <img src={item.imageUrl} alt={item.title} className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-primary">{item.category}</span>
            <h3 className="text-xl font-bold text-white mt-1">{item.title}</h3>
            <p className="text-slate-300 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 max-h-0 group-hover:max-h-40 overflow-hidden">{item.description}</p>
        </div>
    </div>
);


const Portfolio: React.FC = () => {
  return (
    <section id="portfolio" className="py-20 bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Our Work</h2>
          <p className="mt-4 text-lg text-slate-400">
            We are proud to have helped local businesses establish a strong online presence.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {PORTFOLIO_ITEMS.map((item) => (
                <PortfolioCard key={item.title} item={item} />
            ))}
        </div>

        <div className="text-center mt-12">
            <a href="https://abrameltonntsako.web.app/" target="_blank" rel="noopener noreferrer" className="inline-block bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300">
                View Founder's Full Portfolio
            </a>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
```

## File: app/home/components/Process.tsx
```typescript
import React from 'react';
import Link from 'next/link';
import { PROCESS_STEPS } from '@/lib/constants/process';

const Process: React.FC = () => {
  return (
    <section id="process" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Our Client-Friendly Process</h2>
          <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
            A structured, transparent journey from idea to launch. We guide you every step of the way.
          </p>
        </div>

        <div className="relative">
          {/* The connecting line */}
          <div className="absolute left-1/2 -ml-px w-0.5 h-full bg-slate-700 hidden md:block"></div>

          {PROCESS_STEPS.slice(0, 3).map((step, index) => (
            <div key={step.step} className="mb-12 md:mb-0">
              <div className="flex flex-col md:flex-row items-center">
                
                {/* Content on Left */}
                <div className={`md:w-5/12 ${index % 2 === 0 ? 'md:order-1' : 'md:order-3 md:text-right'}`}>
                   <div className="bg-slate-900 p-6 rounded-lg border border-slate-800">
                    <h3 className="text-xl font-bold text-brand-primary mb-2">Step {step.step}: {step.title}</h3>
                    <p className="text-slate-400">{step.description}</p>
                   </div>
                </div>

                {/* Icon in Middle */}
                <div className="md:w-2/12 flex justify-center my-4 md:my-0 md:order-2">
                  <div className="z-10">{step.icon}</div>
                </div>

                {/* Spacer on Right */}
                <div className="hidden md:block md:w-5/12 md:order-1"></div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-16">
            <Link href="/about#process" className="inline-block bg-brand-primary hover:bg-brand-primary/80 text-white font-bold py-3 px-6 rounded-lg text-lg transition-transform transform hover:scale-105 duration-300">
                See Our Full Process
            </Link>
        </div>
      </div>
    </section>
  );
};

export default Process;
```

## File: app/home/components/RecentPosts.tsx
```typescript
import React from 'react';
import Link from 'next/link';
import { BLOG_POSTS, AUTHORS } from '@/lib/constants/blog';

const RecentPosts: React.FC = () => {
  // Assuming the newest posts are at the beginning of the array
  const recentPosts = BLOG_POSTS.slice(0, 3);
  const authorsById = Object.fromEntries(AUTHORS.map(a => [a.id, a]));

  return (
    <section id="recent-posts" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Latest Insights</h2>
          <p className="mt-4 text-lg text-slate-400">
            Check out the latest articles from our blog.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentPosts.map((post) => {
            const author = authorsById[post.authorId];
            return (
              <div key={post.blogs } className="bg-slate-900 rounded-lg overflow-hidden shadow-lg flex flex-col group">
                <Link href={`/blog/${post.blogs }`} className="block">
                  <img src={post.imageUrl} alt={post.title} className="w-full h-56 object-cover group-hover:opacity-80 transition-opacity duration-300" />
                </Link>
                <div className="p-6 flex flex-col flex-grow">
                  <p className="text-sm text-slate-400">{post.date} &bull; {author?.name || 'Unknown Author'}</p>
                  <h3 className="text-xl font-bold text-white mt-2 mb-3 group-hover:text-brand-primary transition-colors duration-300">
                    <Link href={`/blog/${post.blogs }`}>{post.title}</Link>
                  </h3>
                  <p className="text-slate-300 flex-grow text-base">{post.excerpt}</p>
                  <div className="mt-4">
                    <Link href={`/blog/${post.blogs }`} className="font-semibold text-brand-primary hover:text-brand-secondary transition-colors duration-300">
                      Read More &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
            <Link href="/blog" className="inline-block bg-brand-primary hover:bg-brand-primary/80 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300">
                View All Posts
            </Link>
        </div>
      </div>
    </section>
  );
};

export default RecentPosts;
```

## File: app/home/components/Services.tsx
```typescript
import React from 'react';
import Link from 'next/link';
import { SERVICE_PACKAGES } from '@/lib/constants/services';
import type { ServicePackage } from '@/lib/types';

const ServiceCard: React.FC<{ packageInfo: ServicePackage }> = ({ packageInfo }) => {
    const cardClasses = packageInfo.isFeatured
        ? 'bg-slate-800 border-2 border-brand-primary'
        : 'bg-background border border-slate-700';

    return (
        <article className={`p-8 rounded-lg ${cardClasses} flex flex-col transition-all duration-300`}>
            <h3 className="text-2xl font-bold text-white text-center">{packageInfo.title}</h3>
            <p className="text-4xl font-extrabold text-white text-center my-4">{packageInfo.price}</p>
            <p className="text-slate-300 text-center mb-6 min-h-[4.5rem]">{packageInfo.description}</p>
            <Link href="/pricing" className="mt-auto text-center bg-brand-primary hover:bg-brand-primary/80 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300">
                Learn More
            </Link>
        </article>
    );
};

const Services: React.FC = () => {
  return (
    <section id="services" className="py-20 bg-slate-900" aria-labelledby="services-heading">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 id="services-heading" className="text-3xl md:text-4xl font-bold text-white">Simple, Transparent Pricing</h2>
          <p className="mt-4 text-lg text-slate-300">Fixed-price packages designed for local businesses. No hidden fees.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {SERVICE_PACKAGES.slice(0, 3).map((servicePackage: ServicePackage) => (
            <ServiceCard key={servicePackage.title} packageInfo={servicePackage} />
          ))}
        </div>
        
        <div className="text-center mt-16">
            <Link href="/pricing" className="text-brand-primary hover:underline text-lg font-semibold">
                View All Packages and Add-ons &rarr;
            </Link>
        </div>

      </div>
    </section>
  );
};

export default Services;
```

## File: app/home/components/Testimonials.tsx
```typescript
import React from 'react';
import { TESTIMONIALS } from '@/lib/constants/testimonials';
import type { Testimonial } from '@/lib/types';

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => (
    <div className="bg-background p-8 rounded-lg border border-slate-800 flex flex-col h-full">
        <div className="text-brand-primary mb-4">
             <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
        </div>
        <blockquote className="text-slate-300 italic text-lg flex-grow">"{testimonial.quote}"</blockquote>
        <footer className="mt-6">
            <p className="font-bold text-white">{testimonial.author}</p>
            <p className="text-sm text-slate-400">{testimonial.company}</p>
        </footer>
    </div>
)

const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">What Our Clients Say</h2>
          <p className="mt-4 text-lg text-slate-400">
            We're proud to be a trusted partner for businesses in our community.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testimonial: Testimonial, index: number) => (
                <TestimonialCard key={index} testimonial={testimonial} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
```

## File: app/home/page.tsx
```typescript
import React from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Process from './components/Process';
import Portfolio from './components/Portfolio';
import Guarantee from './components/Guarantee';
import Testimonials from './components/Testimonials';
import RecentPosts from './components/RecentPosts';
import Faq from './components/Faq';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Web Design in Phalaborwa | Malalang - Local Website Development',
  description: 'Looking for a web designer in Phalaborwa? Malalang builds affordable, professional websites for local businesses. We help you get online, attract more customers, and grow your business with a stunning, mobile-friendly site. Contact us for a free quote!',
};

const HomePage: React.FC = () => {
  return (
    <main>
      <Hero />
      <About />
      <Guarantee />
      <Testimonials />
      <Services />
      <Process />
      <Portfolio />
      <RecentPosts />
      <Faq />
    </main>
  );
};

export default HomePage;
```

## File: app/pricing/page.tsx
```typescript
import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { SERVICE_PACKAGES, ADDON_CATEGORIES, LAUNCH_PACK_SERVICES, RECURRING_SERVICE } from '@/lib/constants/services';
import { FAQ_ITEMS } from '@/lib/constants/faqs';
import type { ServicePackage, AddonCategory, AddonService, FaqItem } from '@/lib/types';

export const metadata: Metadata = {
  title: 'Website Pricing in Phalaborwa | Malalang Packages',
  description: 'Transparent pricing for web design in Phalaborwa. Explore our packages, from the Starter Site to the Advanced Business Solution. Find the perfect fit for your budget and business goals.',
};

const CheckIcon = () => (
    <svg className="w-6 h-6 text-brand-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
    </svg>
);

const ServiceDetail: React.FC<{ servicePackage: ServicePackage }> = ({ servicePackage }) => (
    <div id={servicePackage.serviceUrl} className="bg-background p-8 rounded-lg border border-slate-700/50 mb-12 scroll-mt-20">
        <div className="grid md:grid-cols-2 gap-8">
            <div>
                <h3 className="text-3xl font-bold text-white">{servicePackage.title}</h3>
                <p className="text-5xl font-extrabold text-brand-primary my-4">{servicePackage.price}</p>
                <p className="text-slate-300 mb-4">{servicePackage.longDescription}</p>
                {servicePackage.isCombo && servicePackage.savingsNote && (
                    <p className="text-green-400 font-bold mb-4">{servicePackage.savingsNote}</p>
                )}
                <Link 
                    href={`/services/${servicePackage.serviceUrl}/${servicePackage.serviceUrl}`}
                    className="inline-block bg-brand-primary hover:bg-brand-primary/80 text-white font-bold py-3 px-6 rounded-lg text-lg transition-transform transform hover:scale-105 duration-300 mt-4"
                >
                    Get Started
                </Link>
            </div>
            <div>
                <h4 className="text-xl font-semibold text-white mb-2">What's Included:</h4>
                <ul className="space-y-3 text-slate-300">
                    {servicePackage.features.map(feature => (
                        <li key={feature} className="flex items-start">
                            <CheckIcon />
                            <span className="ml-3">{feature}</span>
                        </li>
                    ))}
                </ul>
                 <div className="mt-6 bg-slate-800/50 p-4 rounded-lg">
                    <p className="font-semibold text-slate-200">Ideal for: <span className="font-normal text-slate-400">{servicePackage.idealFor}</span></p>
                </div>
            </div>
        </div>
    </div>
);

const PricingPage: React.FC = () => {
  return (
    <main>
        <section className="py-20 md:py-28 bg-slate-900">
            <div className="container mx-auto px-6 text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Pricing & Packages</h1>
                <p className="text-xl text-brand-primary font-semibold max-w-3xl mx-auto">
                    Clear, upfront pricing for every stage of your business. Let's build something great together.
                </p>
            </div>
        </section>

        <section className="py-20 bg-slate-900">
            <div className="container mx-auto px-6">
                {SERVICE_PACKAGES.filter(p => !p.isCombo).map(servicePackage => (
                    <ServiceDetail key={servicePackage.title} servicePackage={servicePackage} />
                ))}
            </div>
        </section>

        <section className="py-20 bg-background">
            <div className="container mx-auto px-6">
                 <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white">Special Combo Package</h2>
                </div>
                {SERVICE_PACKAGES.filter(p => p.isCombo).map(servicePackage => (
                    <ServiceDetail key={servicePackage.title} servicePackage={servicePackage} />
                ))}
            </div>
        </section>

        <section className="py-20 bg-slate-900">
            <div className="container mx-auto px-6">
                 <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white">Enhance Your Website</h2>
                    <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">Add extra functionality to any package with our à la carte services.</p>
                </div>
                
                <div className="grid lg:grid-cols-12 gap-12 items-start">
                    <div className="lg:col-span-8">
                        <h3 className="text-2xl font-bold text-white mb-6">Service Add-ons</h3>
                         <div className="space-y-8">
                            {ADDON_CATEGORIES.map(category => (
                            <div key={category.name} className="bg-background p-6 rounded-lg border border-slate-700/50">
                                <h4 className="text-xl font-semibold text-brand-primary mb-4">{category.name}</h4>
                                <ul className="space-y-4">
                                {category.addons.map(addon => (
                                    <li key={addon.title} className="flex justify-between items-start text-slate-300 border-t border-slate-800 pt-4 first:pt-0 first:border-t-0">
                                    <span className="flex-1 pr-4">{addon.title}</span>
                                    <span className="font-bold text-white text-right whitespace-nowrap">{addon.price}</span>
                                    </li>
                                ))}
                                </ul>
                            </div>
                            ))}
                        </div>
                    </div>
                    <div className="lg:col-span-4 sticky top-24">
                        <div className="bg-slate-800 p-6 rounded-lg border border-brand-secondary/50">
                             <div className="text-center border-b border-slate-700 pb-4 mb-4">
                                <h3 className="text-2xl font-bold text-brand-secondary">The Complete Launch Pack</h3>
                                <p className="font-bold text-white text-4xl">R900 <span className="text-lg font-normal text-slate-400">(Save R200)</span></p>
                            </div>
                            <p className="text-slate-400 text-center text-sm mb-4">Bundle our most essential launch services for the best value.</p>
                            <ul className="space-y-3">
                                {LAUNCH_PACK_SERVICES.map(service => (
                                    <li key={service.title} className="flex justify-between items-center text-slate-300">
                                        <span>{service.title}</span>
                                        <span className="font-bold text-white text-sm bg-slate-700 px-2 py-1 rounded">{service.price}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                         <div className="mt-8 bg-brand-primary/10 p-6 rounded-lg border border-brand-primary/30 text-center">
                            <h3 className="text-2xl font-bold text-white">Web Care Plan</h3>
                             <p className="text-3xl font-bold text-white my-2">{RECURRING_SERVICE.price}</p>
                             <p className="text-slate-400">Includes hosting, security, backups, and 30 mins of monthly updates. Total peace of mind.</p>
                             <Link href="#" className="text-brand-primary hover:underline mt-3 inline-block font-semibold">Learn more &rarr;</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>

         <section id="faq" className="py-20 bg-background">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-white">Frequently Asked Questions</h2>
                </div>
                <div className="space-y-4">
                    {FAQ_ITEMS.map((faq: FaqItem, index: number) => (
                        <details key={index} className="bg-slate-900 p-4 rounded-lg cursor-pointer open:bg-slate-800 transition-colors">
                            <summary className="font-semibold text-lg text-white list-none flex justify-between items-center">
                                {faq.question}
                                <svg className="w-5 h-5 transition-transform transform rotate-0 open:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                            </summary>
                            <div className="mt-3 text-slate-300">
                                <p>{faq.answer}</p>
                            </div>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    </main>
  );
};

export default PricingPage;
```

## File: app/questionnaire/components/AIActions.tsx
```typescript
import React from 'react';

interface AIActionsProps {
  questionId: string;
  questionText: string;
  aiLoading: string | null;
  onEnhance: (questionId: string, questionText: string) => void;
  onSuggest: (questionId: string, questionText: string) => void;
}

const AIActions: React.FC<AIActionsProps> = ({ questionId, questionText, aiLoading, onEnhance, onSuggest }) => {
  return (
    <div className="flex space-x-2 pt-2">
      <button
        type="button"
        onClick={() => onEnhance(questionId, questionText)}
        disabled={!!aiLoading}
        className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md disabled:bg-slate-600 transition-colors"
      >
        {aiLoading === questionId ? 'Enhancing...' : 'Enhance with AI'}
      </button>
      <button
        type="button"
        onClick={() => onSuggest(questionId, questionText)}
        disabled={!!aiLoading}
        className="px-3 py-1 text-sm bg-green-600 hover:bg-green-700 text-white rounded-md disabled:bg-slate-600 transition-colors"
      >
        {aiLoading === questionId ? 'Suggesting...' : 'Suggest Answers'}
      </button>
    </div>
  );
};

export default AIActions;
```

## File: app/questionnaire/components/constants.ts
```typescript
import { Step } from './types';

export const steps: Step[] = [
  {
    id: 'business-identity',
    title: 'Business & Brand Identity',
    description: 'Tell us about your business.',
    questions: [
      { id: 'contactPerson', text: 'Contact Person', type: 'text', required: true },
      { id: 'email', text: 'Email Address', type: 'email', required: true },
      { id: 'phone', text: 'Phone Number', type: 'tel' },
      { id: 'businessName', text: 'Business Name', type: 'text', required: true },
      { id: 'businessDescription', text: 'Briefly describe your business and the services/products you offer.', type: 'textarea', required: true, aiSupport: 'enhancement' },
      {
        id: 'competitorAnalysis',
        text: 'Competitor Analysis',
        type: 'textarea',
        subQuestions: [
          { id: 'competitor1_name', text: 'Competitor 1 Website', type: 'text', placeholder: 'www.competitor.com' },
          { id: 'competitor1_likes', text: 'What do you LIKE about their website?', type: 'textarea' },
          { id: 'competitor1_dislikes', text: 'What do you DISLIKE about their website?', type: 'textarea' },
        ],
      },
    ],
  },
  {
    id: 'project-goals',
    title: 'Project Goals & Scope',
    description: 'What do you want to achieve?',
    questions: [
      { id: 'primaryGoal', text: 'What is the single most important goal for this website?', type: 'text' },
      { id: 'successMetrics', text: 'How will you measure the success of the new website?', type: 'textarea' },
      { id: 'requiredPages', text: "What are the key pages you think you'll need?", type: 'checkbox', options: ['Home', 'About Us', 'Our Team', 'Services', 'Pricing', 'Portfolio/Gallery', 'Testimonials', 'Blog', 'Contact', 'FAQ', 'Privacy Policy'] },
      {
        id: 'budget',
        text: 'What is your approximate budget for this project?',
        type: 'select',
        options: [
          { value: '', label: 'Please select a range' },
          { value: '<1500', label: '< R1,500' },
          { value: '1500-2000', label: 'R1,500 - R2,000' },
          { value: '2000-5000', label: 'R2,000 - R5,000' },
          { value: '5000-10000', label: 'R5,000 - R10,000' },
          { value: '>10000', label: '> R10,000' },
        ],
      },
    ],
  },
  {
    id: 'design-aesthetics',
    title: 'Design & Aesthetics',
    description: 'How should your website look and feel?',
    questions: [
      { id: 'brandWords', text: "List 3-5 words that describe your brand's desired feel.", type: 'text' },
      {
        id: 'designStyle',
        text: 'Which design style best fits your brand?',
        type: 'select',
        options: [
          { value: '', label: 'Please select' },
          { value: 'minimalist', label: 'Minimalist & Clean' },
          { value: 'bold', label: 'Bold & Modern' },
          { value: 'playful', label: 'Playful & Creative' },
          { value: 'corporate', label: 'Corporate & Professional' },
          { value: 'elegant', label: 'Elegant & Sophisticated' },
          { value: 'other', label: 'Other' },
        ],
      },
      { id: 'designStyleOther', text: 'Please describe the style:', type: 'text', dependsOn: 'designStyle', showIf: (v: any) => v === 'other' },
      { id: 'hasLogo', text: 'Do you have an existing logo?', type: 'select', options: [ { value: '', label: 'Please select' }, { value: 'yes', label: 'Yes, I have a logo.' }, { value: 'no', label: 'No, I need one created.' } ] },
      { id: 'logoUpload', text: 'Upload Your Logo', type: 'file-upload', dependsOn: 'hasLogo', showIf: (v: any) => v === 'yes' },
      { id: 'brandColors', text: 'Brand Colors (HEX codes)', type: 'text', placeholder: '#1a2b3c, #d4e5f6, ...' },
      { id: 'likedWebsites', text: 'Please list 2-3 websites you like and explain what you like about them.', type: 'textarea' },
    ],
  },
  {
    id: 'content-functionality',
    title: 'Content & Functionality',
    description: 'What should your website do?',
    questions: [
      {
        id: 'contentProvider',
        text: 'Who will be providing the written content (text) and images for the website?',
        type: 'select',
        options: [
          { value: '', label: 'Please select' },
          { value: 'client-all', label: 'I will provide all text and images.' },
          { value: 'client-some', label: 'I will provide some, but I need help.' },
          { value: 'developer-all', label: 'I need you to source/create all content.' },
        ],
      },
      { id: 'needsBlog', text: 'Do you require a blog or news section on your website?', type: 'select', options: [ { value: '', label: 'Please select' }, { value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }, { value: 'not-sure', label: 'Not sure yet' } ] },
      {
        id: 'features',
        text: 'Do you need any of the following special features?',
        type: 'checkbox',
        options: {
          'Content Display': ['Photo Gallery', 'Testimonials Section', 'Social Media Feed Integration', 'Embedded Maps'],
          'User Interaction': ['Advanced Forms', 'Newsletter Signup', 'Live Chat', 'Customer Login Area'],
          'Business Logic': ['E-commerce / Online Store', 'Booking / Appointment System'],
        },
      },
    ],
  },
  {
    id: 'technical-logistics',
    title: 'Technical & Logistics',
    description: "Let's get technical.",
    questions: [
      { id: 'domainStatus', text: 'Do you already own a domain name (e.g., yourbusiness.co.za)?', type: 'select', options: [ { value: '', label: 'Please select' }, { value: 'yes', label: 'Yes' }, { value: 'no', label: 'No, I need help getting one' } ] },
      { id: 'maintenanceInterest', text: 'Are you interested in an ongoing website maintenance plan?', type: 'select', options: [ { value: '', label: 'Please select' }, { value: 'yes', label: 'Yes, tell me more' }, { value: 'no', label: 'No, not at this time' }, { value: 'not-sure', label: "I'm not sure yet" } ] },
      { id: 'additionalInfo', text: 'Is there anything else we should know about your project?', type: 'textarea' },
    ],
  },
  {
    id: 'review',
    title: 'Review & Submit',
    description: 'Review your answers before submitting.',
    questions: [],
  },
];
```

## File: app/questionnaire/components/FileUploadWidget.tsx
```typescript
'use client';
import React, { useState } from 'react';

interface FileUploadWidgetProps {
  id: string;
  label: string;
  description: string;
  onUploadComplete: (id: string, url: string) => void;
}

const FileUploadWidget: React.FC<FileUploadWidgetProps> = ({ id, label, description, onUploadComplete }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadUrl, setUploadUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
      setUploadUrl(null); // Reset on new file selection
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file first.');
      return;
    }

    setIsUploading(true);
    setError(null);
    setUploadProgress(0);

    try {
      const timestamp = Math.round(new Date().getTime() / 1000);
      const paramsToSign = {
        timestamp,
        eager: 'w_400,h_300,c_pad|w_260,h_200,c_crop', // Example transformations
        public_id: `questionnaire/${id}_${file.name}`,
      };

      // Get signature from our API route
      const signResponse = await fetch('/api/sign-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paramsToSign }),
      });

      const { signature } = await signResponse.json();

      const formData = new FormData();
      formData.append('file', file);
      formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!);
      formData.append('timestamp', timestamp.toString());
      formData.append('public_id', paramsToSign.public_id);
      formData.append('eager', paramsToSign.eager);
      formData.append('signature', signature);

      const uploadUrl = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;

      const xhr = new XMLHttpRequest();
      xhr.open('POST', uploadUrl, true);

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentCompleted = Math.round((event.loaded * 100) / event.total);
          setUploadProgress(percentCompleted);
        }
      };

      xhr.onload = () => {
        setIsUploading(false);
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          const secureUrl = response.secure_url;
          setUploadUrl(secureUrl);
          onUploadComplete(id, secureUrl);
        } else {
          setError(`Upload failed: ${xhr.statusText}`);
        }
      };

      xhr.onerror = () => {
        setIsUploading(false);
        setError('An unknown error occurred during upload.');
      };

      xhr.send(formData);
    } catch (err: any) {
      setIsUploading(false);
      setError(`Upload failed: ${err.message}`);
    }
  };

  return (
    <div className="bg-slate-900/50 p-4 rounded-md border border-slate-700/50">
      <label htmlFor={id} className="block text-slate-300 font-semibold mb-2">{label}</label>
      <p className="text-sm text-slate-400 mt-1 mb-3">{description}</p>

      <div className="flex items-center space-x-4">
        <input
          type="file"
          id={id}
          onChange={handleFileChange}
          className="block w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-primary/10 file:text-brand-primary hover:file:bg-brand-primary/20"
          disabled={isUploading}
        />
        <button
          onClick={handleUpload}
          disabled={!file || isUploading}
          className="bg-brand-primary hover:bg-brand-primary/80 disabled:bg-slate-600 text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm whitespace-nowrap"
        >
          {isUploading ? 'Uploading...' : 'Upload'}
        </button>
      </div>

      {isUploading && (
        <div className="mt-3 w-full bg-slate-700 rounded-full h-2.5">
          <div className="bg-brand-primary h-2.5 rounded-full" style={{ width: `${uploadProgress}%` }}></div>
        </div>
      )}

      {error && <p className="text-red-400 text-sm mt-2">{error}</p>}

      {uploadUrl && (
        <div className="mt-3 text-sm text-green-400 bg-green-900/20 p-3 rounded-md border border-green-700/50">
          <p>Upload successful! <a href={uploadUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-green-300">View File</a></p>
        </div>
      )}
    </div>
  );
};

export default FileUploadWidget;
```

## File: app/questionnaire/components/NavigationButtons.tsx
```typescript
import React from 'react';

interface NavigationButtonsProps {
  currentStep: number;
  totalSteps: number;
  isSubmitting: boolean;
  onPrev: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({ currentStep, totalSteps, isSubmitting, onPrev, onNext, onSubmit }) => {
  return (
    <div className="flex justify-between mt-8">
      {currentStep > 0 ? (
        <button onClick={onPrev} className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-lg transition-colors">
          Previous
        </button>
      ) : ( <div></div> )}
      {currentStep < totalSteps - 1 ? (
        <button onClick={onNext} className="px-6 py-2 bg-brand-primary hover:bg-brand-primary/80 text-white font-bold rounded-lg transition-colors">
          Next
        </button>
      ) : (
        <button onClick={onSubmit} disabled={isSubmitting} className="w-full bg-brand-primary hover:bg-brand-primary/80 text-white font-bold py-3 px-4 rounded-lg disabled:opacity-50 transition-colors duration-300 text-lg">
            {isSubmitting ? 'Submitting...' : 'Submit Questionnaire'}
        </button>
      )}
    </div>
  );
};

export default NavigationButtons;
```

## File: app/questionnaire/components/ProgressBar.tsx
```typescript
import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  const progressPercentage = (currentStep / (totalSteps - 1)) * 100;

  return (
    <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold inline-block py-1 px-2 uppercase rounded-full text-brand-primary bg-brand-primary/20">
              Step {currentStep + 1} of {totalSteps}
            </span>
            <span className='text-sm text-slate-400'>
                {steps[currentStep].title}
            </span>
        </div>
      <div className="overflow-hidden h-2 text-xs flex rounded bg-slate-700">
        <div
          style={{ width: `${progressPercentage}%` }}
          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-brand-primary transition-all duration-500"
        ></div>
      </div>
    </div>
  );
};

// Add this line to import the steps array
import { steps } from './constants';

export default ProgressBar;
```

## File: app/questionnaire/components/Question.tsx
```typescript
import React from 'react';
import { Question as QuestionType, FormData, QuestionOption } from './types';
import AIActions from './AIActions';
import FileUploadWidget from './FileUploadWidget';

interface QuestionProps {
  question: QuestionType;
  formData: FormData;
  aiLoading: string | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onCheckboxChange: (id: string, value: string, checked: boolean) => void;
  onFileUpload: (id: string, url: string) => void;
  onEnhance: (questionId: string, questionText: string) => void;
  onSuggest: (questionId: string, questionText: string) => void;
}

const Question: React.FC<QuestionProps> = ({ question, formData, aiLoading, onChange, onCheckboxChange, onFileUpload, onEnhance, onSuggest }) => {
  const questionText = question.text
    .replace('{businessName}', formData.businessName || 'your business')
    .replace('{userName}', formData.userName || 'User');

  const inputClass = "block w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-brand-primary focus:border-brand-primary";
  const labelClass = "block text-sm font-medium text-slate-300";

  const renderQuestion = () => {
    switch (question.type) {
      case 'textarea':
        return <textarea id={question.id} name={question.id} value={formData[question.id] || ''} onChange={onChange} className={inputClass} rows={4} />;
      case 'select':
        return (
          <select id={question.id} name={question.id} value={formData[question.id] || ''} onChange={onChange} className={inputClass}>
            {(question.options as QuestionOption[]).map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)
            }
          </select>
        );
      case 'checkbox': {
        if (Array.isArray(question.options)) {
          return (
            <div className="grid grid-cols-2 gap-2">
              {(question.options as string[]).map((opt) => (
                <label key={opt} className="flex items-center gap-2 p-2 bg-slate-800 rounded-md border border-slate-700">
                  <input type="checkbox" checked={Array.isArray(formData[question.id]) && formData[question.id].includes(opt)} onChange={(e) => onCheckboxChange(question.id, opt, e.target.checked)} />
                  <span className="text-sm">{opt}</span>
                </label>
              ))}
            </div>
          );
        } else {
          const groups = question.options as { [k: string]: string[] };
          return (
            <div className="space-y-3">
              {Object.entries(groups).map(([groupTitle, opts]) => (
                <div key={groupTitle}>
                  <div className="text-xs text-slate-400 font-semibold mb-1">{groupTitle}</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {opts.map((opt) => (
                      <label key={opt} className="flex items-center gap-2 p-2 bg-slate-800 rounded-md border border-slate-700">
                        <input type="checkbox" checked={Array.isArray(formData[question.id]) && formData[question.id].includes(opt)} onChange={(e) => onCheckboxChange(question.id, opt, e.target.checked)} />
                        <span className="text-sm">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          );
        }
      }
      case 'radio':
        return (
          <div className="flex items-center space-x-4 pt-2">
            {(question.options as QuestionOption[])?.map((option: any) => (
              <label key={option.value} className="flex items-center space-x-2 text-slate-300">
                <input
                  type="radio"
                  name={question.id}
                  value={option.value}
                  checked={formData[question.id] === option.value}
                  onChange={onChange}
                  className="h-4 w-4 rounded-full border-slate-500 bg-slate-700 text-brand-primary focus:ring-brand-primary"
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        );
      case 'file-upload':
        return <FileUploadWidget id={question.id} onUploadComplete={onFileUpload} label={question.text} description={question.description || ''} />;
      default:
        return <input id={question.id} name={question.id} value={formData[question.id] || ''} onChange={onChange} className={inputClass} type={question.type} />;
    }
  };

  return (
    <div key={question.id} className="space-y-2">
      <label htmlFor={question.id} className={labelClass}>
        {questionText}
      </label>
      {renderQuestion()}
      {question.aiSupport && (
        <AIActions
          questionId={question.id}
          questionText={questionText}
          aiLoading={aiLoading}
          onEnhance={onEnhance}
          onSuggest={onSuggest}
        />
      )}
    </div>
  );
};

export default Question;
```

## File: app/questionnaire/components/QuestionnaireForm.tsx
```typescript
'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import ProgressBar from './ProgressBar';
import NavigationButtons from './NavigationButtons';
import ReviewStep from './ReviewStep';
import Step from './Step';
import { steps } from './constants';
import { FormData } from './types';

interface QuestionnaireFormProps {
  clientData?: {
    userName?: string;
    businessName?: string;
    email?: string;
    phone?: string;
    bookings?: { servicePackage: string }[];
  } | null;
}

export default function QuestionnaireForm({ clientData }: QuestionnaireFormProps) {
  const initialFormData = useMemo(() => {
    const base: Record<string, any> = {};
    steps.forEach((step) => {
        step.questions.forEach((q) => {
            if (q.type === 'checkbox') base[q.id] = q.default ?? [];
            else base[q.id] = q.default ?? '';
            if (q.subQuestions) {
                q.subQuestions.forEach((sq) => {
                    base[sq.id] = sq.default ?? '';
                });
            }
        });
    });

    if (clientData) {
      base.contactPerson = clientData.userName ?? base.contactPerson;
      base.email = clientData.email ?? base.email;
      base.phone = clientData.phone ?? base.phone;
      base.businessName = clientData.businessName ?? base.businessName;
      base.servicePackage = clientData.bookings?.[0]?.servicePackage ?? base.servicePackage;
    }

    return base;
  }, [clientData]);

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [aiLoading, setAiLoading] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleCheckboxChange = useCallback((id: string, option: string, checked: boolean) => {
    setFormData((prev) => {
      const current = Array.isArray(prev[id]) ? [...prev[id]] : [];
      if (checked) {
        if (!current.includes(option)) current.push(option);
      } else {
        const idx = current.indexOf(option);
        if (idx >= 0) current.splice(idx, 1);
      }
      return { ...prev, [id]: current };
    });
  }, []);

  const handleFileUpload = useCallback((id: string, url: string) => {
    setFormData((prev) => ({ ...prev, [id]: url }));
  }, []);


  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleEdit = (stepIndex: number) => {
    setCurrentStep(stepIndex);
  };

  const handleEnhance = async (questionId: string, questionText: string) => {
    setAiLoading(questionId);
    try {
      const response = await fetch('/api/questionnaire', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'enhance',
          payload: {
            question: questionText,
            answer: formData[questionId] || '',
            businessName: formData.businessName || '',
            userName: formData.userName || 'there',
          },
        }),
      });
      const data = await response.json();
      setFormData((prev) => ({ ...prev, [questionId]: data.result }));
    } catch (error) {
      console.error('Error enhancing answer:', error);
    }
    setAiLoading(null);
  };

  const handleSuggest = async (questionId: string, questionText: string) => {
    setAiLoading(questionId);
    try {
      const response = await fetch('/api/questionnaire', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'suggest',
          payload: {
            question: questionText,
            businessName: formData.businessName || '',
            userName: formData.userName || 'there',
          },
        }),
      });
      const data = await response.json();
      alert(`Suggestions:\n- ${data.result.join('\n- ')}`);
    } catch (error) {
      console.error('Error suggesting answers:', error);
    }
    setAiLoading(null);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);
    try {
      await addDoc(collection(db, 'questionnaires'), formData);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting questionnaire:', error);
      setError('Failed to submit questionnaire. Please try again later.');
    }
    setIsSubmitting(false);
  };

  if (isSubmitted) {
    return (
        <div className="text-center bg-background p-8 rounded-lg max-w-3xl mx-auto border border-slate-700">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Thank you for your submission!</h2>
            <p className="text-slate-300 text-lg mb-6">We have received your project details and will be in touch shortly to discuss the next steps.</p>
        </div>
    );
  }

  const renderStep = () => {
    const step = steps[currentStep];

    if (step.id === 'review') {
      return <ReviewStep steps={steps} formData={formData} onEdit={handleEdit} />;
    }

    return (
      <Step
        step={step}
        formData={formData}
        aiLoading={aiLoading}
        onChange={handleChange}
        onCheckboxChange={handleCheckboxChange}
        onFileUpload={handleFileUpload}
        onEnhance={handleEnhance}
        onSuggest={handleSuggest}
      />
    );
  };

  return (
    <div className="max-w-3xl mx-auto bg-background p-8 rounded-lg border border-slate-800 space-y-8">
      <ProgressBar currentStep={currentStep} totalSteps={steps.length} />
      {renderStep()}
      {error && <p className="text-red-500 text-center bg-red-900/20 p-3 rounded-md">{error}</p>}
      <NavigationButtons
        currentStep={currentStep}
        totalSteps={steps.length}
        onPrev={handlePrev}
        onNext={handleNext}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
```

## File: app/questionnaire/components/ReviewStep.tsx
```typescript
import React from 'react';
import { Step, FormData } from './types';

interface ReviewStepProps {
  steps: Step[];
  formData: FormData;
  onEdit: (stepIndex: number) => void;
}

const ReviewStep: React.FC<ReviewStepProps> = ({ steps, formData, onEdit }) => {
  return (
    <div className="space-y-6">
        <div className="text-center">
            <h2 className="text-3xl font-bold text-white">Review Your Answers</h2>
            <p className="text-slate-400 mt-2">Please review your answers before submitting. You can edit any section by clicking the 'Edit' button.</p>
        </div>

      {steps.map((step, stepIndex) => {
        if (step.id === 'review') return null;
        return (
          <div key={step.id} className="bg-slate-800 p-6 rounded-lg border border-slate-700">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-white">{step.title}</h3>
              <button onClick={() => onEdit(stepIndex)} className="text-sm text-brand-primary hover:underline">
                Edit
              </button>
            </div>
            <div className="space-y-4">
              {step.questions?.map((q) => (
                <div key={q.id}>
                  <p className="block text-sm font-medium text-slate-300">{q.text.replace('{businessName}', formData.businessName || 'your business')}</p>
                  <p className="text-white mt-1">{formData[q.id] || <span className='text-slate-400'>Not answered</span>}</p>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ReviewStep;
```

## File: app/questionnaire/components/Step.tsx
```typescript
import React from 'react';
import { Step as StepType, FormData } from './types';
import Question from './Question';

interface StepProps {
  step: StepType;
  formData: FormData;
  aiLoading: string | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onCheckboxChange: (id: string, value: string, checked: boolean) => void;
  onFileUpload: (id: string, url: string) => void;
  onEnhance: (questionId: string, questionText: string) => void;
  onSuggest: (questionId: string, questionText: string) => void;
}

const Step: React.FC<StepProps> = ({ step, formData, aiLoading, onChange, onCheckboxChange, onFileUpload, onEnhance, onSuggest }) => {
  const visibleQuestions = step.questions.filter((q) => {
      if (q.dependsOn) {
        const dependsVal = formData[q.dependsOn];
        if (q.showIf) return q.showIf(dependsVal);
        return !!dependsVal;
      }
      return true;
    });


  return (
    <fieldset>
      <legend className="text-xl font-semibold text-white mb-4">{step.title}</legend>
        <div className="space-y-6">
        {visibleQuestions.map((q) => (
            <Question
            key={q.id}
            question={q}
            formData={formData}
            aiLoading={aiLoading}
            onChange={onChange}
            onCheckboxChange={onCheckboxChange}
            onFileUpload={onFileUpload}
            onEnhance={onEnhance}
            onSuggest={onSuggest}
            />
        ))}
        </div>
    </fieldset>
  );
};

export default Step;
```

## File: app/questionnaire/components/types.ts
```typescript
export type QuestionOption = {
  value: string;
  label: string;
};

export interface Question {
  id: string;
  text: string;
  description?: string;
  type:
    | 'text'
    | 'email'
    | 'tel'
    | 'textarea'
    | 'select'
    | 'checkbox'
    | 'radio'
    | 'file-upload'
    | 'color-picker';
  options?: string[] | QuestionOption[] | { [key: string]: string[] };
  placeholder?: string;
  required?: boolean;
  subQuestions?: Question[];
  dependsOn?: string;
  showIf?: (value: any) => boolean;
  aiSupport?: 'suggestion' | 'enhancement';
  default?: any;
}

export interface Step {
  id: string;
  title: string;
  description?: string;
  questions: Question[];
}

export interface FormData {
  [key: string]: any;
}
```

## File: app/questionnaire/page.tsx
```typescript
'use client';

import React, { useState } from 'react';
import QuestionnaireForm from './components/QuestionnaireForm';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { ClientData } from '@/lib/types';
import PhoneNumberInput from '@/components/PhoneNumberInput';

const QuestionnairePage: React.FC = () => {
    type FlowState = 'initial' | 'prompt-phone' | 'loading' | 'form-loaded';
    const [flowState, setFlowState] = useState<FlowState>('initial');
    const [clientData, setClientData] = useState<ClientData | null>(null);
    const [phone, setPhone] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleFetchClientData = async () => {
        if (!phone) {
            setError('Please enter your phone number.');
            return;
        }
        setFlowState('loading');
        setError(null);

        const fullPhoneNumber = `+27${phone}`;

        let foundData: ClientData | null = null;

        try {
            const clientRef = doc(db, 'clients', fullPhoneNumber);
            const docSnap = await getDoc(clientRef);

            if (docSnap.exists()) {
                foundData = docSnap.data() as ClientData;
            }

            if (foundData) {
                setClientData(foundData);
                setFlowState('form-loaded');
            } else {
                setError('No booking found for this phone number. You can proceed as a new client by clicking "No".');
                setFlowState('initial');
            }
        } catch (e) {
            console.error('Error fetching client data:', e);
            setError('An error occurred while looking up your booking. Please try again.');
            setFlowState('initial');
        }
    };

    const renderInitialStep = () => (
        <div className="text-center bg-background p-8 rounded-lg max-w-2xl mx-auto border border-slate-700">
            {error && <p className="text-red-400 bg-red-900/20 p-3 rounded-md mb-6">{error}</p>}
            <h2 className="text-2xl font-bold text-white mb-4">Have you booked an initial session with us before?</h2>
            <p className="text-slate-400 mb-6">If so, we can pre-fill some of your information.</p>
            <div className="flex justify-center gap-4">
                <button
                    onClick={() => { setError(null); setFlowState('prompt-phone'); }}
                    className="bg-brand-primary hover:bg-brand-primary/80 text-white font-bold py-2 px-6 rounded-lg transition-colors"
                >
                    Yes, I Have
                </button>
                <button
                    onClick={() => { setError(null); setClientData(null); setFlowState('form-loaded'); }}
                    className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-6 rounded-lg transition-colors"
                >
                    No, I'm New
                </button>
            </div>
        </div>
    );

    const renderPhonePrompt = () => (
        <div className="text-center bg-background p-8 rounded-lg max-w-2xl mx-auto border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-2">Find Your Booking</h2>
            <p className="text-slate-400 mb-6">Please enter the phone number you used during your booking.</p>
            <div className="flex flex-col items-center gap-4 w-full max-w-sm mx-auto">
                <PhoneNumberInput
                    id="phone-lookup"
                    name="phone-lookup"
                    value={phone}
                    onChange={setPhone}
                    placeholder="e.g., 712345678"
                />
                <button
                    onClick={handleFetchClientData}
                    className="bg-brand-primary hover:bg-brand-primary/80 text-white font-bold py-2 px-8 rounded-lg transition-colors w-full"
                >
                    Find My Booking
                </button>
                <button
                    onClick={() => setFlowState('initial')}
                    className="text-slate-400 hover:text-white text-sm mt-2"
                >
                    Back
                </button>
            </div>
        </div>
    );

    const renderLoading = () => (
        <div className="text-center bg-background p-8 rounded-lg max-w-2xl mx-auto border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-4 animate-pulse">Finding your booking...</h2>
        </div>
    );

    const renderContent = () => {
        switch (flowState) {
            case 'initial':
                return renderInitialStep();
            case 'prompt-phone':
                return renderPhonePrompt();
            case 'loading':
                return renderLoading();
            case 'form-loaded':
                return <QuestionnaireForm clientData={clientData} />;
            default:
                return renderInitialStep();
        }
    };

    return (
        <main>
            <section className="py-20 bg-slate-900">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Website Project Questionnaire</h1>
                        <p className="text-xl text-brand-primary font-semibold max-w-3xl mx-auto">
                            {flowState === 'form-loaded'
                                ? 'Please fill out this form to the best of your ability. The more detail you provide, the better we can understand your vision.'
                                : "Let's get started by identifying you."
                            }
                        </p>
                    </div>
                    <div className="max-w-4xl mx-auto">
                        {renderContent()}
                    </div>
                </div>
            </section>
        </main>
    );
};

export default QuestionnairePage;
```

## File: app/services/[service]/[bookings]/components/BookingForm.tsx
```typescript
'use client';

import React, { useState } from 'react';
import { collection, addDoc, doc, setDoc, getDoc, arrayUnion } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { ServicePackage } from '@/lib/types';
import { SERVICE_PACKAGES } from '@/lib/constants/services';
import { z, ZodError } from 'zod';
import { bookingFormSchema } from '@/lib/validation';
import PhoneNumberInput from '@/components/PhoneNumberInput';

interface Props {
    service: ServicePackage;
}

const BookingForm: React.FC<Props> = ({ service }) => {
    const [formData, setFormData] = useState<any>({
        meetingType: 'Face-to-Face',
        servicePackage: service.serviceUrl,
        isWhatsApp: false,
        fullName: '',
        businessName: '',
        email: '',
        phone: '',
        meetingLocation: 'Central Eatery Restaurant', // Default value
        officeLocation: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formErrors, setFormErrors] = useState<any>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            const { checked } = e.target as HTMLInputElement;
            setFormData({ ...formData, [name]: checked });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handlePhoneChange = (phoneValue: string) => {
        setFormData({ ...formData, phone: phoneValue });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormErrors({});
        setError(null);

        const fullPhoneNumber = `+27${formData.phone}`;
        const dataToValidate = {
            ...formData,
            phone: fullPhoneNumber,
        };

        try {
            bookingFormSchema.parse(dataToValidate);
        } catch (error) {
            if (error instanceof ZodError) {
                const errors: any = {};
                error.issues.forEach((err) => {
                    errors[err.path[0]] = err.message;
                });
                setFormErrors(errors);
                return;
            }
        }

        setIsSubmitting(true);

        try {
            const submittedAt = new Date();
            const serviceTitle = SERVICE_PACKAGES.find(p => p.serviceUrl === formData.servicePackage)?.title;

            const finalData = {
                ...dataToValidate,
                serviceTitle,
                submittedAt,
            };

            await addDoc(collection(db, service.serviceUrl), finalData);

            const clientRef = doc(db, 'clients', fullPhoneNumber);
            const clientSnap = await getDoc(clientRef);

            const newBooking = {
                servicePackage: formData.servicePackage,
                serviceTitle,
                submittedAt,
                bookingId: (await addDoc(collection(db, 'clientBookings'), {})).id
            };

            if (clientSnap.exists()) {
                await setDoc(clientRef, {
                    ...finalData,
                    updatedAt: submittedAt,
                    bookings: arrayUnion(newBooking)
                }, { merge: true });
            } else {
                await setDoc(clientRef, {
                    ...finalData,
                    createdAt: submittedAt,
                    bookings: [newBooking]
                });
            }

            setIsSubmitted(true);
        } catch (e) {
            console.error('Error adding document: ', e);
            setError('There was an error submitting your booking. Please try again later.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSubmitted) {
        return (
            <div className="text-center bg-background p-8 rounded-lg max-w-3xl mx-auto border border-slate-700">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Thank you for booking your first meeting with AEN Nyath.</h2>
                <p className="text-slate-300 text-lg mb-6">We’re excited to learn more about your business and goals. You’ll receive a confirmation email shortly with the meeting details.</p>
            </div>
        );
    }

    const inputClass = "block w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-brand-primary focus:border-brand-primary";
    const labelClass = "block text-sm font-medium text-slate-300";

    return (
        <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl mx-auto bg-background p-8 rounded-lg border border-slate-800">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-white">Schedule Your First Meeting</h2>
                <p className="text-slate-400 mt-2">This is the first step. Let's discuss your vision and goals for the <span className="text-brand-primary font-semibold">{service.title}</span>.</p>
            </div>

            <fieldset>
                <legend className="text-xl font-semibold text-white mb-4">1. Your Information</legend>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label htmlFor="fullName" className={labelClass}>Full Name</label>
                        <input type="text" name="fullName" id="fullName" onChange={handleChange} className={inputClass} />
                        {formErrors.fullName && <p className="text-red-500 text-sm">{formErrors.fullName}</p>}
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="businessName" className={labelClass}>Business Name (Optional)</label>
                        <input type="text" name="businessName" id="businessName" onChange={handleChange} className={inputClass} />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="email" className={labelClass}>Email Address</label>
                        <input type="email" name="email" id="email" onChange={handleChange} className={inputClass} />
                        {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="phone" className={labelClass}>Phone Number</label>
                        <PhoneNumberInput
                            name="phone"
                            id="phone"
                            value={formData.phone}
                            onChange={handlePhoneChange}
                            placeholder="712345678"
                        />
                        {formErrors.phone && <p className="text-red-500 text-sm">{formErrors.phone}</p>}
                        <div className="flex items-center pt-1">
                            <input id="isWhatsApp" name="isWhatsApp" type="checkbox" checked={formData.isWhatsApp} onChange={handleChange} className="h-4 w-4 rounded border-slate-500 bg-slate-700 text-brand-primary focus:ring-brand-primary" />
                            <label htmlFor="isWhatsApp" className="ml-2 block text-sm text-slate-400">This is my WhatsApp number.</label>
                        </div>
                    </div>
                </div>
            </fieldset>

            <fieldset>
                 <legend className="text-xl font-semibold text-white mb-4">2. Meeting Preferences</legend>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label htmlFor="meetingType" className={labelClass}>Preferred Meeting Type</label>
                        <select name="meetingType" id="meetingType" value={formData.meetingType} onChange={handleChange} className={inputClass}>
                            <option value="Face-to-Face">Face-to-Face Meeting</option>
                            <option value="Virtual">Virtual (Zoom/Google Meet)</option>
                        </select>
                    </div>
                    {formData.meetingType === 'Face-to-Face' && (
                        <div className="space-y-2">
                            <label htmlFor="meetingLocation" className={labelClass}>Preferred Meeting Location</label>
                            <select name="meetingLocation" id="meetingLocation" value={formData.meetingLocation} onChange={handleChange} className={inputClass}>
                                <option value="Central Eatery Restaurant">Central Eatery Restaurant (next to Shell, Lulekani)</option>
                                <option value="My Office">My Office</option>
                            </select>
                        </div>
                    )}
                    {formData.meetingLocation === 'My Office' && formData.meetingType === 'Face-to-Face' && (
                        <div className="space-y-2">
                            <label htmlFor="officeLocation" className={labelClass}>Your Office Location</label>
                            <input type="text" name="officeLocation" id="officeLocation" onChange={handleChange} className={inputClass} placeholder="Enter your office address" />
                            {formErrors.officeLocation && <p className="text-red-500 text-sm">{formErrors.officeLocation}</p>}
                        </div>
                    )}
                    <div className="space-y-2">
                        <label htmlFor="preferredDate" className={labelClass}>Preferred Date</label>
                        <input type="date" name="preferredDate" id="preferredDate" onChange={handleChange} className={inputClass} />
                        {formErrors.preferredDate && <p className="text-red-500 text-sm">{formErrors.preferredDate}</p>}
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="preferredTime" className={labelClass}>Preferred Time</label>
                        <input type="time" name="preferredTime" id="preferredTime" onChange={handleChange} className={inputClass} />
                        {formErrors.preferredTime && <p className="text-red-500 text-sm">{formErrors.preferredTime}</p>}
                    </div>
                </div>
            </fieldset>

            <fieldset>
                 <legend className="text-xl font-semibold text-white mb-4">3. Service & Notes</legend>
                 <div className="space-y-6">
                    <div className="space-y-2">
                        <label htmlFor="servicePackage" className={labelClass}>Selected Service Package</label>
                        <select name="servicePackage" id="servicePackage" value={formData.servicePackage} onChange={handleChange} className={inputClass}>
                            {SERVICE_PACKAGES.map(servicePackage => (
                                <option key={servicePackage.serviceUrl} value={servicePackage.serviceUrl}>{servicePackage.title} – {servicePackage.price}</option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="additionalNotes" className={labelClass}>Additional Notes (Optional)</label>
                        <textarea name="additionalNotes" id="additionalNotes" rows={4} onChange={handleChange} placeholder="Share any early thoughts..." className={inputClass}></textarea>
                    </div>
                 </div>
            </fieldset>

            {error && <p className="text-red-500 text-center bg-red-900/20 p-3 rounded-md">{error}</p>}

            <button type="submit" disabled={isSubmitting} className="w-full bg-brand-primary hover:bg-brand-primary/80 text-white font-bold py-3 px-4 rounded-lg disabled:opacity-50 transition-colors duration-300 text-lg">
                {isSubmitting ? 'Submitting...' : 'Schedule Your First Meeting'}
            </button>
        </form>
    );
};

export default BookingForm;
```

## File: app/services/[service]/[bookings]/page.tsx
```typescript
'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import BookingForm from './components/BookingForm';
import { SERVICE_PACKAGES } from '@/lib/constants/services';

const QuestionnairePage: React.FC = () => {
    const params = useParams();
    const bookingUrl = params.bookings as string;
    const service = SERVICE_PACKAGES.find(s => s.serviceUrl === bookingUrl);

    if (!service) {
        return <p>Service not found</p>; // Or a more styled 404
    }

    return (
        <main className="container mx-auto px-6 py-12 md:py-20">
            <div className="text-center max-w-3xl mx-auto mb-12">
                <h1 className="text-3xl md:text-4xl font-bold text-white">Let's Start with a Conversation</h1>
                <p className="mt-4 text-lg text-slate-300">
                    You've selected the <span className="font-semibold text-brand-primary">{service.title}</span>. The first step is a one-on-one meeting where we'll discuss your business, goals, and vision for the new website.
                </p>
                <p className="mt-4 text-slate-400">
                    After our chat, we'll move on to a detailed questionnaire and then a project kick-off. Use the form below to find a time that works for you.
                </p>
            </div>
            <BookingForm service={service} />
        </main>
    );
};

export default QuestionnairePage;
```

## File: app/services/[service]/page.tsx
```typescript
'use client';

import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { SERVICE_PACKAGES } from '@/lib/constants/services';

const ServiceDetailPage: React.FC = () => {
  const params = useParams();
  const ServiceName = params.service as string;
  const servicePackage = SERVICE_PACKAGES.find(s => s.serviceUrl === ServiceName);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [ServiceName]);

  if (!servicePackage) {
    return (
      <div className="py-20 bg-background min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Service Not Found</h1>
          <p className="text-slate-400 mb-8">Sorry, we couldn't find the service package you're looking for.</p>
          <Link href="/services" className="bg-brand-primary hover:bg-brand-primary/80 text-white font-bold py-3 px-6 rounded-lg text-lg transition-colors duration-300">
            Back to Services
          </Link>
        </div>
      </div>
    );
  }

  const CheckIcon = () => (
    <svg className="w-6 h-6 text-brand-secondary mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
    </svg>
  );

  return (
    <main>
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-6">
          <header className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">{servicePackage.title}</h1>
            <p className="text-3xl text-brand-primary font-bold mb-4">{servicePackage.price}</p>
            <p className="text-lg text-slate-300">{servicePackage.description}</p>
          </header>

          <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
            <div className="lg:col-span-2 bg-background p-8 rounded-lg border border-slate-800">
              <h2 className="text-3xl font-bold text-white mb-6">Package Details</h2>
              <p className="text-slate-300 leading-relaxed mb-8">{servicePackage.longDescription}</p>

              <h3 className="text-2xl font-bold text-white mb-4">Key Features Included:</h3>
              <ul className="space-y-4">
                {servicePackage.features.map(feature => (
                  <li key={feature} className="flex items-start text-slate-200 text-lg">
                    <CheckIcon />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <aside className="lg:col-span-1 space-y-8">
              <div className="bg-background p-8 rounded-lg border border-slate-800">
                <h3 className="text-2xl font-bold text-white mb-4">Who is this for?</h3>
                <p className="text-slate-300 leading-relaxed">{servicePackage.idealFor}</p>
              </div>
              <div className="bg-brand-primary/10 p-8 rounded-lg border border-brand-primary/30 text-center">
                 <h3 className="text-2xl font-bold text-white mb-4">Ready to Start?</h3>
                 <p className="text-slate-300 mb-6">Let's get some details about your project.</p>
                 <Link
                    href={`/services/${servicePackage.serviceUrl}/${servicePackage.serviceUrl}`}
                    className="w-full block bg-brand-primary hover:bg-brand-primary/80 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300"
                 >
                    Get Started
                 </Link>
              </div>
              <div className="text-center">
                <Link href="/services" className="font-semibold text-brand-primary hover:text-brand-secondary transition-colors duration-300">
                    &larr; Back to All Services
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ServiceDetailPage;
```

## File: app/services/page.tsx
```typescript
import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { SERVICE_PACKAGES } from '@/lib/constants/services';
import { WHATSAPP_LINK } from '@/lib/constants/site';
import type { ServicePackage } from '@/lib/types';

export const metadata: Metadata = {
  title: 'Web Development Services in Phalaborwa | Malalang',
  description: 'Explore our web development services. We offer tailored solutions to meet the unique needs of local businesses in Phalaborwa, from starter websites to advanced e-commerce platforms.',
};

const ServiceDetailCard: React.FC<{ ServicePackage: ServicePackage }> = ({ ServicePackage }) => (
  <div className="bg-background p-8 rounded-lg border border-slate-800 flex flex-col group hover:border-brand-primary/50 transition-colors duration-300">
    <h3 className="text-3xl font-bold text-brand-primary mb-4">{ServicePackage.title}</h3>
    <p className="text-slate-400 text-lg mb-6 flex-grow">{ServicePackage.description}</p>
    
    <div className="mb-6">
        <p className="text-slate-300">
            <span className="font-semibold text-white">Best for:</span> {ServicePackage.bestFor}
        </p>
    </div>

    <div>
        <Link href={`/services/${ServicePackage.serviceUrl}`} className="font-semibold text-brand-primary hover:text-brand-secondary transition-colors duration-300">
          Learn More &rarr;
        </Link>
    </div>
  </div>
);

const ServicesPage: React.FC = () => {
  return (
    <main>
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Our Web Development Services</h1>
            <p className="text-xl text-brand-primary font-semibold max-w-3xl mx-auto">
              We offer tailored solutions to meet the unique needs of local businesses in Phalaborwa. Explore our packages to find the perfect fit for you.
            </p>
          </div>

          <div className="grid lg:grid-cols-1 gap-8 max-w-4xl mx-auto">
            {SERVICE_PACKAGES.map(servicePackage => (
              <ServiceDetailCard key={servicePackage.title} ServicePackage={servicePackage} />
            ))}
          </div>

          <div className="text-center mt-16">
            <p className="text-lg text-slate-300 mb-4">Not sure which package is right for you?</p>
            <a 
              href={WHATSAPP_LINK} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-brand-primary hover:bg-brand-primary/80 text-white font-bold py-4 px-8 rounded-lg text-lg transition-transform transform hover:scale-105 duration-300"
            >
              Get a Free Consultation
            </a>
            <p className="mt-4">
              <Link href="/pricing" className="text-brand-primary hover:underline">
                Or view our detailed pricing page &rarr;
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ServicesPage;
```

## File: app/globals.css
```css
@import "tailwindcss";

@theme {
  --color-brand-primary: #10B981; /* Emerald-500 */
  --color-brand-secondary: #F59E0B; /* Amber-500 */
  --color-background: #0F172A; /* Slate-900 */
  --color-brand-light: #F8FAFC; /* Slate-50 */
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.focus\:not-sr-only:focus {
  position: static;
  width: auto;
  height: auto;
  padding: 0;
  margin: 0;
  overflow: visible;
  clip: auto;
  white-space: normal;
}

*:focus-visible {
  outline: 3px solid #F59E0B;
  outline-offset: 2px;
}
```

## File: app/layout.tsx
```typescript
import './globals.css';
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Cta from '@/components/Cta';
import SkipToContent from '@/components/SkipToContent';
import { WHATSAPP_LINK } from '@/lib/constants/site';

import { Metadata } from 'next';

const metadata: Metadata = {
  title: {
    default: 'Malalang - Web Development Solutions',
    template: '%s | Malalang',
  },
  description: 'Malalang offers professional web development services, specializing in creating fast, responsive, and SEO-friendly websites for businesses of all sizes.',
  openGraph: {
    title: 'Malalang - Web Development Solutions',
    description: 'Professional web development services to elevate your online presence.',
    url: 'https://malalang.vercel.app',
    siteName: 'Malalang',
    images: [
      {
        url: 'https://malalang.vercel.app/images/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Malalang - Web Development Solutions',
    description: 'Professional web development services to elevate your online presence.',
    creator: '@malalang',
    images: ['https://malalang.vercel.app/images/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: 'favicon.ico',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  alternates: {
    canonical: 'https://malalang.vercel.app',
    types: {
      'application/rss+xml': 'https://malalang.vercel.app/rss.xml',
    },
  },
};




const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Malalang',
    url: 'https://malalang.vercel.app',
    logo: 'https://malalang.vercel.app/images/logo.png',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+27 12 345 6789',
      contactType: 'customer service',
    },
  };

  return (
    <html lang="en">
      <body className="bg-background text-brand-light font-sans antialiased">
        <SkipToContent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <main id="main-content" role="main">{children}</main>
        <Cta />
        <Footer />
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:bg-[#128C7E] transition-all duration-300 transform hover:scale-110 z-50 focus:outline-none focus:ring-4 focus:ring-brand-secondary"
          aria-label="Contact us on WhatsApp - Opens in a new window"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 448 512" fill="currentColor" aria-hidden="true">
            <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.8 0-67.3-8.8-98.1-25.4l-7-4.2-72.5 19.1 19.4-70.6-4.6-7.4c-18.7-29.9-28.7-65.4-28.7-102.1 0-108.7 88.4-197.1 197.1-197.1 53.3 0 104.1 20.8 142.3 58.9 38.2 38.2 58.9 89 58.9 142.3 0 108.7-88.4 197.1-197.1 197.1zm105.9-161.5c-5.9-3-35.1-17.3-40.6-19.3s-9.7-3-13.7 3c-4 6-15.4 19.3-18.9 23.3-3.5 4-7 4.5-13 1.5-6-3-25.3-9.3-48.1-29.6-17.8-15.8-29.8-35.3-33.3-41.3s-.3-9.3 2.7-12.3c2.7-2.7 5.9-7 8.9-10.5 3-3.5 4-5.9 6-9.9s3-6 1.5-11.4c-1.5-5.4-13.7-33.1-18.8-45.3-5.1-12.2-10.2-10.5-13.7-10.7-3.3-.2-7.2-.2-11.2-.2-4 0-10.7 1.5-16.2 7.5-5.6 6-21.5 21-21.5 51.3s22 59.5 25 63.5c3 4 43.1 65.6 105.2 93.2 14.9 6.9 28.6 11.1 38.5 14.1 16.4 5.1 31.4 4.4 43.2 2.7 12.9-1.9 39.8-16.3 45.4-32.1 5.6-15.8 5.6-29.2 3.9-32.1-1.7-2.9-5.7-4.5-11.7-7.5z"/>
          </svg>
        </a>
      </body>
    </html>
  );
};

export default RootLayout;
```

## File: app/manifest.ts
```typescript
import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Malalang - Web Development Solutions',
    short_name: 'Malalang',
    description: 'Malalang offers professional web development services, specializing in creating fast, responsive, and SEO-friendly websites for businesses of all sizes.',
    start_url: '/',
    display: 'standalone',
    background_color: '#1a202c',
    theme_color: '#1a202c',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/logo192.png',
        type: 'image/png',
        sizes: '192x192'
      },
      {
        src: '/logo512.png',
        type: 'image/png',
        sizes: '512x512'
      }
    ],
  };
}
```

## File: app/page.tsx
```typescript
import { Metadata } from 'next';
import Faq from "./home/components/Faq";
import Guarantee from "./home/components/Guarantee";
import Hero from "./home/components/Hero";
import Portfolio from "./home/components/Portfolio";
import Process from "./home/components/Process";
import RecentPosts from "./home/components/RecentPosts";
import Services from "./home/components/Services";
import Testimonials from "./home/components/Testimonials";

export const metadata: Metadata = {
  title: 'Web Design in Phalaborwa | Malalang - Local Website Development',
  description: 'Looking for a web designer in Phalaborwa? Malalang builds affordable, professional websites for local businesses. We help you get online, attract more customers, and grow your business with a stunning, mobile-friendly site. Contact us for a free quote!',
};

const HomePage: React.FC = () => {
  return (
    <main>
      <Hero />
      <Testimonials />
      <Guarantee />
      <Services />
      <Process />
      <Portfolio />
      <Faq />
      <RecentPosts />
    </main>
  );
};

export default HomePage;
```

## File: app/robots.ts
```typescript
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/questionnaire/', '/privacy-policy/'],
    },
    sitemap: 'https://malalang.vercel.app/sitemap.xml',
  };
}
```

## File: app/sitemap.ts
```typescript
import { MetadataRoute } from 'next';
import { BLOG_POSTS } from '@/lib/constants/blog';
import { SERVICE_PACKAGES } from '@/lib/constants/services';

const BASE_URL = 'https://malalang.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    '/',
    '/about',
    '/blog',
    '/contact',
    '/pricing',
    '/services',
    '/questionnaire',
    '/color-palette-generator',
  ].map(route => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '/' ? 1 : 0.8,
  }));

  const blogPostRoutes = BLOG_POSTS.map(post => ({
    url: `${BASE_URL}/blog/${post.blogs }`,
    lastModified: new Date(post.date),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const serviceRoutes = SERVICE_PACKAGES.map(service => ({
    url: `${BASE_URL}/services/${service.serviceUrl}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  return [...staticRoutes, ...blogPostRoutes, ...serviceRoutes];
}
```

## File: components/ColorPalettePage.tsx
```typescript
// This file is obsolete. Please use /app/color-palette-generator/page.tsx instead.
export {};
```

## File: components/Cta.tsx
```typescript
import React from 'react';
import { WHATSAPP_LINK } from '@/lib/constants/site';

const Cta: React.FC = () => {
  return (
    <section id="cta" className="py-20 bg-brand-primary/10" aria-labelledby="cta-heading">
      <div className="container mx-auto px-6 text-center">
        <h2 id="cta-heading" className="text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to Grow Your Business?
        </h2>
        <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-8">
          Let's build a website that gets you results. Our process is risk-free, and our focus is on your success. Get in touch for a free, no-obligation consultation.
        </p>
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-brand-primary hover:bg-brand-primary/80 text-white font-bold py-4 px-8 rounded-lg text-lg transition-transform transform hover:scale-105 duration-300 focus:outline-none focus:ring-2 focus:ring-brand-secondary min-h-[56px]"
          aria-label="Get your free quote via WhatsApp - Opens in a new window"
        >
          Get My Free Quote
        </a>
      </div>
    </section>
  );
};

export default Cta;
```

## File: components/Footer.tsx
```typescript
import React from 'react';
import Link from 'next/link';
import { FOOTER_LINKS } from '@/lib/constants/navigation';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const footerLinks = FOOTER_LINKS.filter(link => link.name !== 'Home');

  return (
    <footer className="bg-slate-900 border-t border-slate-300/10" role="contentinfo">
      <div className="container mx-auto px-6 py-8 text-center text-slate-300">
        <div className="mb-6">
          <Link href="/" aria-label="Malalang Pty Ltd - Return to homepage">
            <img src="/logo.jpg" alt="Malalang Pty Ltd - Professional Web Development" className="h-16 w-auto mx-auto" />
          </Link>
        </div>
        <nav className="flex justify-center flex-wrap gap-x-6 gap-y-2 mb-6" aria-label="Footer navigation">
            {footerLinks.map(link => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm text-slate-300 hover:text-brand-primary transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:rounded px-2 py-1"
                >
                    {link.name}
                </Link>
            ))}
        </nav>
        <p>&copy; {currentYear} Malalang Pty Ltd. All Rights Reserved.</p>
        <p className="text-sm mt-1">
          Your Trusted Web Development Partner in Phalaborwa, Limpopo.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
```

## File: components/Header.tsx
```typescript
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { HEADER_LINKS } from '@/lib/constants/navigation';
import { WHATSAPP_LINK } from '@/lib/constants/site';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-slate-300/10" role="banner">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" aria-label="Malalang Pty Ltd - Return to homepage" className="flex items-center gap-2">
            <img src="/logo.jpg" alt="Malalang Pty Ltd - Professional Web Development" className="h-12 w-auto" />
            <span className="text-3xl  font-bold text-white">Malalang</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6" aria-label="Main navigation">
            {HEADER_LINKS.map(link => (
              <Link
                key={link.name}
                href={link.href}
                className="text-slate-300 hover:text-brand-primary transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:rounded px-2 py-1"
              >
                {link.name}
              </Link>
            ))}
            <Link href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-primary hover:bg-brand-primary/80 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-brand-secondary"
              aria-label="Get a free quote via WhatsApp - Opens in a new window"
            >
              Get a Free Quote
            </Link>
          </nav>
          
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none focus:ring-2 focus:ring-brand-secondary rounded p-2"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
              </svg>
            </button>
          </div>
        </div>

        {isOpen && (
          <nav id="mobile-menu" className="md:hidden mt-4" aria-label="Mobile navigation">
            <div className="flex flex-col space-y-4">
              {HEADER_LINKS.map(link => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-slate-300 hover:text-brand-primary transition-colors duration-300 text-center py-3 rounded-md bg-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-secondary min-h-[44px] flex items-center justify-center"
                >
                  {link.name}
                </Link>
              ))}
              <Link href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-brand-primary hover:bg-brand-primary/80 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 text-center focus:outline-none focus:ring-2 focus:ring-brand-secondary min-h-[44px] flex items-center justify-center"
                aria-label="Get a free quote via WhatsApp - Opens in a new window"
              >
                Get a Free Quote
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
```

## File: components/ImageColorPicker.tsx
```typescript
'use client';
import React, { useState, useRef, useCallback } from 'react';

interface Color {
  r: number;
  g: number;
  b: number;
}

const rgbToHex = (r: number, g: number, b: number): string => {
  const toHex = (c: number) => `0${c.toString(16)}`.slice(-2);
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

interface ImageColorPickerProps {
  onPaletteChange: (colors: string[]) => void;
}

const ImageColorPicker: React.FC<ImageColorPickerProps> = ({ onPaletteChange }) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [palette, setPalette] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Please upload a valid image file (PNG, JPG, etc.).');
      return;
    }
    setError(null);
    setIsLoading(true);
    setPalette([]);
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setImageSrc(result);
      generatePalette(result);
    };
    reader.readAsDataURL(file);
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  }, []);

  const generatePalette = (src: string) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d', { willReadFrequently: true });
    if (!canvas || !ctx) {
        setError('Could not process the image.');
        setIsLoading(false);
        return;
    }

    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      const MAX_WIDTH = 100;
      const scale = MAX_WIDTH / img.width;
      canvas.width = MAX_WIDTH;
      canvas.height = img.height * scale;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      try {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
        const colorCounts: { [key: string]: { color: Color, count: number } } = {};
        const step = 4 * 5;

        for (let i = 0; i < imageData.length; i += step) {
            const r = imageData[i];
            const g = imageData[i + 1];
            const b = imageData[i + 2];
            const a = imageData[i + 3];

            if (a < 125 || (r > 250 && g > 250 && b > 250) || (r < 10 && g < 10 && b < 10)) {
                continue;
            }

            const key = `${r},${g},${b}`;
            colorCounts[key] = colorCounts[key] || { color: { r, g, b }, count: 0 };
            colorCounts[key].count++;
        }

        const sortedColors = Object.values(colorCounts).sort((a, b) => b.count - a.count);
        const topColors = sortedColors.slice(0, 5).map(c => rgbToHex(c.color.r, c.color.g, c.color.b));

        setPalette(topColors);
        onPaletteChange(topColors);

      } catch (e) {
          setError('Could not process the image. It might be from a protected source.');
          console.error(e);
      } finally {
          setIsLoading(false);
      }
    };
    img.onerror = () => {
        setError('Could not load the image file.');
        setIsLoading(false);
    }
    img.src = src;
  };

  const copyToClipboard = (color: string) => {
    navigator.clipboard.writeText(color);
    setCopiedColor(color);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  const handleDropZoneKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      fileInputRef.current?.click();
    }
  };

  return (
    <div className="bg-slate-900/50 p-4 rounded-lg">
      <div
        className="bg-background border-2 border-dashed border-slate-700 rounded-lg p-8 text-center cursor-pointer hover:border-brand-primary transition-colors focus-within:border-brand-primary focus-within:ring-2 focus-within:ring-brand-secondary"
        onDrop={onDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => fileInputRef.current?.click()}
        onKeyDown={handleDropZoneKeyDown}
        tabIndex={0}
        role="button"
        aria-label="Upload an image to generate color palette. Click or press Enter to browse files, or drag and drop an image here"
      >
        <input
          ref={fileInputRef}
          type="file"
          className="sr-only"
          accept="image/*"
          onChange={onFileChange}
          id="image-upload"
          aria-label="Upload image file"
        />
        <div className="flex flex-col items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-slate-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-slate-300 font-semibold">Drop an image here</p>
            <p className="text-slate-500">or click to browse</p>
        </div>
      </div>

      {error && (
        <div className="text-red-400 text-center mt-4 p-3 bg-red-400/10 rounded-lg" role="alert" aria-live="assertive">
          {error}
        </div>
      )}

      <div className="mt-8">
          {isLoading && (
              <div className="text-center" role="status" aria-live="polite">
                  <p className="text-slate-300 text-lg">Generating palette...</p>
              </div>
          )}
          {imageSrc && !isLoading && (
              <div className="bg-background p-6 rounded-lg border border-slate-800">
                  <img src={imageSrc} alt="Uploaded image for color palette extraction" className="rounded-lg max-w-full max-h-80 mx-auto shadow-lg" />
              </div>
          )}
          {palette.length > 0 && (
              <div className="mt-8">
                  <h3 className="text-white text-xl font-bold mb-4 text-center">Generated Color Palette</h3>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-0 overflow-hidden rounded-lg" role="list" aria-label="Color palette">
                      {palette.map((color, index) => (
                          <div
                            key={index}
                            style={{ backgroundColor: color }}
                            className="h-40 flex flex-col justify-end p-3 text-white font-mono text-sm shadow-inner"
                            role="listitem"
                            aria-label={`Color ${index + 1}: ${color}`}
                          >
                              <span className="bg-black/40 px-2 py-1 rounded" aria-hidden="true">{color}</span>
                          </div>
                      ))}
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
                      {palette.map((color, index) => (
                          <button
                            key={`${index}-btn`}
                            onClick={() => copyToClipboard(color)}
                            className="w-full bg-slate-700 text-white font-semibold py-3 px-3 rounded-lg hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-primary transition-colors min-h-[44px]"
                            aria-label={copiedColor === color ? `Color ${color} copied to clipboard` : `Copy color ${color} to clipboard`}
                          >
                              {copiedColor === color ? 'Copied!' : color}
                          </button>
                      ))}
                  </div>
              </div>
          )}
      </div>
      <canvas ref={canvasRef} className="sr-only" aria-hidden="true"></canvas>
    </div>
  );
};

export default ImageColorPicker;
```

## File: components/PhoneNumberInput.tsx
```typescript
'use client';

import React from 'react';

interface Props {
    value: string;
    onChange: (value: string) => void;
    error?: string;
    name: string;
    id: string;
    placeholder?: string;
}

const inputClass = "block w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-brand-primary focus:border-brand-primary";

const PhoneNumberInput: React.FC<Props> = ({ value, onChange, error, name, id, placeholder }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let numericValue = e.target.value.replace(/[^0-9]/g, '');
        if (numericValue.startsWith('0')) {
            numericValue = numericValue.substring(1);
        }
        const finalValue = numericValue.substring(0, 9);
        onChange(finalValue);
    };

    return (
        <div>
            <div className="mt-1 flex rounded-md shadow-sm">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-slate-600 bg-slate-700 text-slate-300 text-sm">
                    +27
                </span>
                <input
                    type="tel"
                    name={name}
                    id={id}
                    value={value}
                    onChange={handleChange}
                    className={`${inputClass} rounded-l-none`}
                    placeholder={placeholder}
                />
            </div>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
};

export default PhoneNumberInput;
```

## File: components/SkipToContent.tsx
```typescript
import React from 'react';

const SkipToContent: React.FC = () => {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-brand-primary focus:text-white focus:px-6 focus:py-3 focus:rounded-lg focus:font-bold focus:shadow-lg focus:outline-none focus:ring-4 focus:ring-brand-secondary"
    >
      Skip to main content
    </a>
  );
};

export default SkipToContent;
```

## File: docs/Genkit.md
```markdown
import { googleAI } from '@genkit-ai/google-genai';
import { genkit } from 'genkit';

const ai = genkit({
  plugins: [googleAI()],
  model: googleAI.model('gemini-2.5-flash'), // Default model
});

// Generate with default model
const response1 = await ai.generate('prompt text');
console.log(response1.text);

// Generate with specific model reference
import { googleAI } from '@genkit-ai/google-genai';
const response2 = await ai.generate({
  model: googleAI.model('gemini-2.5-flash'),
  prompt: 'prompt text',
});
console.log(response2.text);

// Generate with model string ID
const response3 = await ai.generate({
  model: 'googleai/gemini-2.5-flash',
  prompt: 'prompt text',
});
console.log(response3.text);
At the heart of generative AI are AI models. Currently, the two most prominent examples of generative models are large language models (LLMs) and image generation models. These models take input, called a prompt (most commonly text, an image, or a combination of both), and from it produce as output text, an image, or even audio or video.

The output of these models can be surprisingly convincing: LLMs generate text that appears as though it could have been written by a human being, and image generation models can produce images that are very close to real photographs or artwork created by humans.

In addition, LLMs have proven capable of tasks beyond simple text generation:

Writing computer programs
Planning subtasks that are required to complete a larger task
Organizing unorganized data
Understanding and extracting information data from a corpus of text
Following and performing automated activities based on a text description of the activity
There are many models available to you, from several different providers. Each model has its own strengths and weaknesses and one model might excel at one task but perform less well at others. Apps making use of generative AI can often benefit from using multiple different models depending on the task at hand.

As an app developer, you typically don’t interact with generative AI models directly, but rather through services available as web APIs. Although these services often have similar functionality, they all provide them through different and incompatible APIs. If you want to make use of multiple model services, you have to use each of their proprietary SDKs, potentially incompatible with each other. And if you want to upgrade from one model to the newest and most capable one, you might have to build that integration all over again.

Genkit addresses this challenge by providing a single interface that abstracts away the details of accessing potentially any generative AI model service, with several pre-built implementations already available. Building your AI-powered app around Genkit simplifies the process of making your first generative AI call and makes it equally easy to combine multiple models or swap one model for another as new models emerge.

Before you begin
If you want to run the code examples on this page, first complete the steps in the Getting started guide. All of the examples assume that you have already installed Genkit as a dependency in your project.

Models supported by Genkit
Genkit is designed to be flexible enough to use potentially any generative AI model service. Its core libraries define the common interface for working with models, and model plugins define the implementation details for working with a specific model and its API.

The Genkit team maintains plugins for working with models provided by Vertex AI, Google Generative AI, and Ollama:

Gemini family of LLMs, through the Google Cloud Vertex AI plugin
Gemini family of LLMs, through the Google AI plugin
Imagen2 and Imagen3 image generation models, through Google Cloud Vertex AI
Anthropic’s Claude 3 family of LLMs, through Google Cloud Vertex AI’s model garden
Gemma 2, Llama 3, and many more open models, through the Ollama plugin (you must host the Ollama server yourself)
GPT, Dall-E and Whisper family of models, through the OpenAI plugin
Grok family of models, through the xAI plugin
DeepSeek Chat and DeepSeek Reasoner models, through the DeepSeek plugin
In addition, there are also several community-supported plugins that provide interfaces to these models:

Claude 3 family of LLMs, through the Anthropic plugin
GPT family of LLMs through the Azure OpenAI plugin
Command R family of LLMs through the Cohere plugin
Mistral family of LLMs through the Mistral plugin
Gemma 2, Llama 3, and many more open models hosted on Groq, through the Groq plugin
You can discover more by searching for packages tagged with genkit-model on npmjs.org.

Loading and configuring model plugins
Before you can use Genkit to start generating content, you need to load and configure a model plugin. If you’re coming from the Getting Started guide, you’ve already done this. Otherwise, see the Getting Started guide or the individual plugin’s documentation and follow the steps there before continuing.

The generate() method
In Genkit, the primary interface through which you interact with generative AI models is the generate() method.

The simplest generate() call specifies the model you want to use and a text prompt:

import { googleAI } from '@genkit-ai/google-genai';
import { genkit } from 'genkit';

const ai = genkit({
  plugins: [googleAI()],
  // Optional. Specify a default model.
  model: googleAI.model('gemini-2.5-flash'),
});

async function run() {
  const response = await ai.generate('Invent a menu item for a restaurant with a pirate theme.');
  console.log(response.text);
}

run();

When you run this brief example, it will print out some debugging information followed by the output of the generate() call, which will usually be Markdown text as in the following example:

## The Blackheart's Bounty

**A hearty stew of slow-cooked beef, spiced with rum and molasses, served in a
hollowed-out cannonball with a side of crusty bread and a dollop of tangy
pineapple salsa.**

**Description:** This dish is a tribute to the hearty meals enjoyed by pirates
on the high seas. The beef is tender and flavorful, infused with the warm spices
of rum and molasses. The pineapple salsa adds a touch of sweetness and acidity,
balancing the richness of the stew. The cannonball serving vessel adds a fun and
thematic touch, making this dish a perfect choice for any pirate-themed
adventure.

Run the script again and you’ll get a different output.

The preceding code sample sent the generation request to the default model, which you specified when you configured the Genkit instance.

You can also specify a model for a single generate() call:

import { googleAI } from '@genkit-ai/google-genai';

const response = await ai.generate({
  model: googleAI.model('gemini-2.5-flash'),
  prompt: 'Invent a menu item for a restaurant with a pirate theme.',
});

This example uses a model reference function provided by the model plugin. Model references carry static type information about the model and its options which can be useful for code completion in the IDE and at compile time. Many plugins use this pattern, but not all, so in cases where they don’t, refer to the plugin documentation for their preferred way to create function references.

Sometimes you may see code samples where model references are imported as constants:

import { googleAI, gemini20Flash } from '@genkit-ai/google-genai';

const ai = genkit({
  plugins: [googleAI()],
  model: gemini20Flash,
});

Some plugins may still use this pattern. For plugins that switched to the new syntax those constants are still there and continue to work, but new constants for new future models may not to be added in the future.

Another option is to specify the model using a string identifier. This way will work for all plugins regardless of how they chose to handle typed model references, however you won’t have the help of static type checking:

const response = await ai.generate({
  model: 'googleai/gemini-2.5-flash-001',
  prompt: 'Invent a menu item for a restaurant with a pirate theme.',
});

A model string identifier looks like providerid/modelid, where the provider ID (in this case, googleai) identifies the plugin, and the model ID is a plugin-specific string identifier for a specific version of a model.

Some model plugins, such as the Ollama plugin, provide access to potentially dozens of different models and therefore do not export individual model references. In these cases, you can only specify a model to generate() using its string identifier.

These examples also illustrate an important point: when you use generate() to make generative AI model calls, changing the model you want to use is simply a matter of passing a different value to the model parameter. By using generate() instead of the native model SDKs, you give yourself the flexibility to more easily use several different models in your app and change models in the future.

So far you have only seen examples of the simplest generate() calls. However, generate() also provides an interface for more advanced interactions with generative models, which you will see in the sections that follow.

System prompts
Some models support providing a system prompt, which gives the model instructions as to how you want it to respond to messages from the user. You can use the system prompt to specify a persona you want the model to adopt, the tone of its responses, the format of its responses, and so on.

If the model you’re using supports system prompts, you can provide one with the system parameter:

const response = await ai.generate({
  prompt: 'What is your quest?',
  system: "You are a knight from Monty Python's Flying Circus.",
});

Multi-turn conversations with messages
For multi-turn conversations, you can use the messages parameter instead of prompt to provide a conversation history. This is particularly useful when you need to maintain context across multiple interactions with the model.

The messages parameter accepts an array of message objects, where each message has a role (one of 'system', 'user', 'model', or 'tool') and content:

const response = await ai.generate({
  messages: [
    { role: 'user', content: 'Hello, can you help me plan a trip?' },
    { role: 'model', content: "Of course! I'd be happy to help you plan a trip. Where are you thinking of going?" },
    { role: 'user', content: 'I want to visit Japan for two weeks in spring.' },
  ],
});

You can also combine messages with other parameters like system prompts:

const response = await ai.generate({
  system: 'You are a helpful travel assistant.',
  messages: [{ role: 'user', content: 'What should I pack for Japan in spring?' }],
});

When to use messages vs. Chat API:

Use the messages parameter for simple multi-turn conversations where you manually manage the conversation history
For persistent chat sessions with automatic history management, use the Chat API instead
Model parameters
The generate() function takes a config parameter, through which you can specify optional settings that control how the model generates content:

const response = await ai.generate({
  prompt: 'Invent a menu item for a restaurant with a pirate theme.',
  config: {
    maxOutputTokens: 512,
    stopSequences: ['\n'],
    temperature: 1.0,
    topP: 0.95,
    topK: 40,
  },
});

The exact parameters that are supported depend on the individual model and model API. However, the parameters in the previous example are common to almost every model. The following is an explanation of these parameters:

Parameters that control output length
maxOutputTokens

LLMs operate on units called tokens. A token usually, but does not necessarily, map to a specific sequence of characters. When you pass a prompt to a model, one of the first steps it takes is to tokenize your prompt string into a sequence of tokens. Then, the LLM generates a sequence of tokens from the tokenized input. Finally, the sequence of tokens gets converted back into text, which is your output.

The maximum output tokens parameter simply sets a limit on how many tokens to generate using the LLM. Every model potentially uses a different tokenizer, but a good rule of thumb is to consider a single English word to be made of 2 to 4 tokens.

As stated earlier, some tokens might not map to character sequences. One such example is that there is often a token that indicates the end of the sequence: when an LLM generates this token, it stops generating more. Therefore, it’s possible and often the case that an LLM generates fewer tokens than the maximum because it generated the “stop” token.

stopSequences

You can use this parameter to set the tokens or token sequences that, when generated, indicate the end of LLM output. The correct values to use here generally depend on how the model was trained, and are usually set by the model plugin. However, if you have prompted the model to generate another stop sequence, you might specify it here.

Note that you are specifying character sequences, and not tokens per se. In most cases, you will specify a character sequence that the model’s tokenizer maps to a single token.

Parameters that control “creativity”
The temperature, top-p, and top-k parameters together control how “creative” you want the model to be. Below are very brief explanations of what these parameters mean, but the more important point to take away is this: these parameters are used to adjust the character of an LLM’s output. The optimal values for them depend on your goals and preferences, and are likely to be found only through experimentation.

temperature

LLMs are fundamentally token-predicting machines. For a given sequence of tokens (such as the prompt) an LLM predicts, for each token in its vocabulary, the likelihood that the token comes next in the sequence. The temperature is a scaling factor by which these predictions are divided before being normalized to a probability between 0 and 1.

Low temperature values—between 0.0 and 1.0—amplify the difference in likelihoods between tokens, with the result that the model will be even less likely to produce a token it already evaluated to be unlikely. This is often perceived as output that is less creative. Although 0.0 is technically not a valid value, many models treat it as indicating that the model should behave deterministically, and to only consider the single most likely token.

High temperature values—those greater than 1.0—compress the differences in likelihoods between tokens, with the result that the model becomes more likely to produce tokens it had previously evaluated to be unlikely. This is often perceived as output that is more creative. Some model APIs impose a maximum temperature, often 2.0.

topP

Top-p is a value between 0.0 and 1.0 that controls the number of possible tokens you want the model to consider, by specifying the cumulative probability of the tokens. For example, a value of 1.0 means to consider every possible token (but still take into account the probability of each token). A value of 0.4 means to only consider the most likely tokens, whose probabilities add up to 0.4, and to exclude the remaining tokens from consideration.

topK

Top-k is an integer value that also controls the number of possible tokens you want the model to consider, but this time by explicitly specifying the maximum number of tokens. Specifying a value of 1 means that the model should behave deterministically.

Experiment with model parameters
You can experiment with the effect of these parameters on the output generated by different model and prompt combinations by using the Developer UI. Start the developer UI with the genkit start command and it will automatically load all of the models defined by the plugins configured in your project. You can quickly try different prompts and configuration values without having to repeatedly make these changes in code.

Structured output
Genkit by Example: Structured Output
View a live example of using structured output to generate a D&D character sheet.
When using generative AI as a component in your application, you often want output in a format other than plain text. Even if you’re just generating content to display to the user, you can benefit from structured output simply for the purpose of presenting it more attractively to the user. But for more advanced applications of generative AI, such as programmatic use of the model’s output, or feeding the output of one model into another, structured output is a must.

In Genkit, you can request structured output from a model by specifying a schema when you call generate():

import { z } from 'genkit';

const MenuItemSchema = z.object({
  name: z.string().describe('The name of the menu item.'),
  description: z.string().describe('A description of the menu item.'),
  calories: z.number().describe('The estimated number of calories.'),
  allergens: z.array(z.string()).describe('Any known allergens in the menu item.'),
});

const response = await ai.generate({
  prompt: 'Suggest a menu item for a pirate-themed restaurant.',
  output: { schema: MenuItemSchema },
});

Model output schemas are specified using the Zod library. In addition to a schema definition language, Zod also provides runtime type checking, which bridges the gap between static TypeScript types and the unpredictable output of generative AI models. Zod lets you write code that can rely on the fact that a successful generate call will always return output that conforms to your TypeScript types.

When you specify a schema in generate(), Genkit does several things behind the scenes:

Augments the prompt with additional guidance about the desired output format. This also has the side effect of specifying to the model what content exactly you want to generate (for example, not only suggest a menu item but also generate a description, a list of allergens, and so on).
Parses the model output into a JavaScript object.
Verifies that the output conforms with the schema.
To get structured output from a successful generate call, use the response object’s output property:

const menuItem = response.output; // Typed as z.infer<typeof MenuItemSchema>
console.log(menuItem?.name);

Handling errors
Note in the prior example that the output property can be null. This can happen when the model fails to generate output that conforms to the schema. The best strategy for dealing with such errors will depend on your exact use case, but here are some general hints:

Try a different model. For structured output to succeed, the model must be capable of generating output in JSON. The most powerful LLMs, like Gemini and Claude, are versatile enough to do this; however, smaller models, such as some of the local models you would use with Ollama, might not be able to generate structured output reliably unless they have been specifically trained to do so.

Make use of Zod’s coercion abilities: You can specify in your schemas that Zod should try to coerce non-conforming types into the type specified by the schema. If your schema includes primitive types other than strings, using Zod coercion can reduce the number of generate() failures you experience. The following version of MenuItemSchema uses type coercion to automatically correct situations where the model generates calorie information as a string instead of a number:

const MenuItemSchema = z.object({
  name: z.string().describe('The name of the menu item.'),
  description: z.string().describe('A description of the menu item.'),
  calories: z.coerce.number().describe('The estimated number of calories.'),
  allergens: z.array(z.string()).describe('Any known allergens in the menu item.'),
});

Retry the generate() call. If the model you’ve chosen only rarely fails to generate conformant output, you can treat the error as you would treat a network error, and simply retry the request using some kind of incremental back-off strategy.

Streaming
When generating large amounts of text, you can improve the experience for your users by presenting the output as it’s generated—streaming the output. A familiar example of streaming in action can be seen in most LLM chat apps: users can read the model’s response to their message as it’s being generated, which improves the perceived responsiveness of the application and enhances the illusion of chatting with an intelligent counterpart.

In Genkit, you can stream output using the generateStream() method. Its syntax is similar to the generate() method:

const { stream, response } = ai.generateStream({
  prompt: 'Tell me a story about a boy and his dog.',
});

The response object has a stream property, which you can use to iterate over the streaming output of the request as it’s generated:

for await (const chunk of stream) {
  console.log(chunk.text);
}

You can also get the complete output of the request, as you can with a non-streaming request:

const finalResponse = await response;
console.log(finalResponse.text);

Streaming also works with structured output:

const { stream, response } = ai.generateStream({
  prompt: 'Suggest three pirate-themed menu items.',
  output: { schema: z.array(MenuItemSchema) },
});

for await (const chunk of stream) {
  console.log(chunk.output);
}

const finalResponse = await response;
console.log(finalResponse.output);

Streaming structured output works a little differently from streaming text: the output property of a response chunk is an object constructed from the accumulation of the chunks that have been produced so far, rather than an object representing a single chunk (which might not be valid on its own). Every chunk of structured output in a sense supersedes the chunk that came before it.

For example, here’s what the first five outputs from the prior example might look like:

null;

{
  starters: [{}];
}

{
  starters: [{ name: "Captain's Treasure Chest", description: 'A' }];
}

{
  starters: [
    {
      name: "Captain's Treasure Chest",
      description: 'A mix of spiced nuts, olives, and marinated cheese served in a treasure chest.',
      calories: 350,
    },
  ];
}

{
  starters: [
    {
      name: "Captain's Treasure Chest",
      description: 'A mix of spiced nuts, olives, and marinated cheese served in a treasure chest.',
      calories: 350,
      allergens: [Array],
    },
    { name: 'Shipwreck Salad', description: 'Fresh' },
  ];
}

Multimodal input
Genkit by Example: Image Analysis
See a live demo of how Genkit can enable image analysis using multimodal input.
The examples you’ve seen so far have used text strings as model prompts. While this remains the most common way to prompt generative AI models, many models can also accept other media as prompts. Media prompts are most often used in conjunction with text prompts that instruct the model to perform some operation on the media, such as to caption an image or transcribe an audio recording.

The ability to accept media input and the types of media you can use are completely dependent on the model and its API. For example, the Gemini 1.5 series of models can accept images, video, and audio as prompts.

To provide a media prompt to a model that supports it, instead of passing a simple text prompt to generate, pass an array consisting of a media part and a text part:

const response = await ai.generate({
  prompt: [{ media: { url: 'https://.../image.jpg' } }, { text: 'What is in this image?' }],
});

In the above example, you specified an image using a publicly-accessible HTTPS URL. You can also pass media data directly by encoding it as a data URL. For example:

import { readFile } from 'node:fs/promises';

const data = await readFile('image.jpg');
const response = await ai.generate({
  prompt: [{ media: { url: `data:image/jpeg;base64,${data.toString('base64')}` } }, { text: 'What is in this image?' }],
});

All models that support media input support both data URLs and HTTPS URLs. Some model plugins add support for other media sources. For example, the Vertex AI plugin also lets you use Cloud Storage (gs://) URLs.

Generating Media
While most examples in this guide focus on generating text with LLMs, Genkit also supports generating other types of media, including images and audio. Thanks to its unified generate() interface, working with media models is just as straightforward as generating text.

Note

Genkit returns generated media as a data URL, a widely supported format for handling binary media in both browsers and Node.js environments.

Image Generation
To generate an image using a model like Imagen from Vertex AI, follow these steps:

Install a data URL parser. Genkit outputs media as data URLs, so you’ll need to decode them before saving to disk. This example uses data-urls:

Terminal window
npm install data-urls
npm install --save-dev @types/data-urls

Generate the image and save it to a file:

import { vertexAI } from '@genkit-ai/vertexai';
import parseDataURL from 'data-urls';
import { writeFile } from 'node:fs/promises';

const response = await ai.generate({
  model: vertexAI.model('imagen-3.0-fast-generate-001'),
  prompt: 'An illustration of a dog wearing a space suit, photorealistic',
  output: { format: 'media' },
});

if (response?.media?.url) {
  const parsed = parseDataURL(response.media.url);
  if (parsed) {
    await writeFile('dog.png', parsed.body);
  }
}

This will generate an image and save it as a PNG file named dog.png.

Audio Generation
You can also use Genkit to generate audio with a text-to-speech (TTS) models. This is especially useful for voice features, narration, or accessibility support.

Here’s how to convert text into speech and save it as an audio file:

import { googleAI } from '@genkit-ai/google-genai';
import { writeFile } from 'node:fs/promises';
import { Buffer } from 'node:buffer';

const response = await ai.generate({
  model: googleAI.model('gemini-2.5-flash-preview-tts'),

  // Gemini-specific configuration for audio generation
  // Available configuration options will depend on model and provider
  config: {
    responseModalities: ['AUDIO'],
    speechConfig: {
      voiceConfig: {
        prebuiltVoiceConfig: { voiceName: 'Algenib' },
      },
    },
  },
  prompt: 'Say that Genkit is an amazing AI framework',
});

// Handle the audio data (returned as a data URL)
if (response.media?.url) {
  // Extract base64 data from the data URL
  const audioBuffer = Buffer.from(response.media.url.substring(response.media.url.indexOf(',') + 1), 'base64');

  // Save to a file
  await writeFile('output.wav', audioBuffer);
}

This code generates speech using the Gemini TTS model and saves the result to a file named output.wav.

Next steps
Learn more about Genkit
As an app developer, the primary way you influence the output of generative AI models is through prompting. Read Prompt management to learn how Genkit helps you develop effective prompts and manage them in your codebase.
Although generate() is the nucleus of every generative AI powered application, real-world applications usually require additional work before and after invoking a generative AI model. To reflect this, Genkit introduces the concept of flows, which are defined like functions but add additional features such as observability and simplified deployment. To learn more, see Defining workflows.
Advanced LLM use
Many of your users will have interacted with large language models for the first time through chatbots. Although LLMs are capable of much more than simulating conversations, it remains a familiar and useful style of interaction. Even when your users will not be interacting directly with the model in this way, the conversational style of prompting is a powerful way to influence the output generated by an AI model. Read Multi-turn chats to learn how to use Genkit as part of an LLM chat implementation.
One way to enhance the capabilities of LLMs is to prompt them with a list of ways they can request more information from you, or request you to perform some action. This is known as tool calling or function calling. Models that are trained to support this capability can respond to a prompt with a specially-formatted response, which indicates to the calling application that it should perform some action and send the result back to the LLM along with the original prompt. Genkit has library functions that automate both the prompt generation and the call-response loop elements of a tool calling implementation. See Tool calling to learn more.
Retrieval-augmented generation (RAG) is a technique used to introduce domain-specific information into a model’s output. This is accomplished by inserting relevant information into a prompt before passing it on to the language model. A complete RAG implementation requires you to bring several technologies together: text embedding generation models, vector databases, and large language models. See Retrieval-augmented generation (RAG) to learn how Genkit simplifies the process of coordinating these various elements.
There are different categories of information that a developer working with an LLM may be handling simultaneously:

Input: Information that is directly relevant to guide the LLM’s response for a particular call. An example of this is the text that needs to be summarized.
Generation Context: Information that is relevant to the LLM, but isn’t specific to the call. An example of this is the current time or a user’s name.
Execution Context: Information that is important to the code surrounding the LLM call but not to the LLM itself. An example of this is a user’s current auth token.
Genkit provides a consistent context object that can propagate generation and execution context throughout the process. This context is made available to all actions including flows, tools, and prompts.

Context is automatically propagated to all actions called within the scope of execution: Context passed to a flow is made available to prompts executed within the flow. Context passed to the generate() method is available to tools called within the generation loop.

Why is context important?
As a best practice, you should provide the minimum amount of information to the LLM that it needs to complete a task. This is important for multiple reasons:

The less extraneous information the LLM has, the more likely it is to perform well at its task.
If an LLM needs to pass around information like user or account IDs to tools, it can potentially be tricked into leaking information.
Context gives you a side channel of information that can be used by any of your code but doesn’t necessarily have to be sent to the LLM. As an example, it can allow you to restrict tool queries to the current user’s available scope.

Context structure
Context must be an object, but its properties are yours to decide. In some situations Genkit automatically populates context. For example, when using persistent sessions the state property is automatically added to context.

One of the most common uses of context is to store information about the current user. We recommend adding auth context in the following format:

{
  auth: {
    uid: "...", // the user's unique identifier
    token: {...}, // the decoded claims of a user's id token
    rawToken: "...", // the user's raw encoded id token
    // ...any other fields
  }
}

The context object can store any information that you might need to know somewhere else in the flow of execution.

Use context in an action
To use context within an action, you can access the context helper that is automatically supplied to your function definition:

Flow
Tool
Prompt file
const summarizeHistory = ai.defineFlow({
  name: 'summarizeMessages',
  inputSchema: z.object({friendUid: z.string()}),
  outputSchema: z.string()
}, async ({friendUid}, {context}) => {
  if (!context.auth?.uid) throw new Error("Must supply auth context.");
  const messages = await listMessagesBetween(friendUid, context.auth.uid);
  const {text} = await ai.generate({
    prompt:
      `Summarize the content of these messages: ${JSON.stringify(messages)}`,
  });
  return text;
});

Provide context at runtime
To provide context to an action, you pass the context object as an option when calling the action.

Flows
Generation
Prompts
const summarizeHistory = ai.defineFlow(/* ... */);

const summary = await summarizeHistory(friend.uid, {
  context: { auth: currentUser },
});

Context propagation and overrides
By default, when you provide context it is automatically propagated to all actions called as a result of your original call. If your flow calls other flows, or your generation calls tools, the same context is provided.

If you wish to override context within an action, you can pass a different context object to replace the existing one:

const otherFlow = ai.defineFlow(/* ... */);

const myFlow = ai.defineFlow(
  {
    // ...
  },
  (input, { context }) => {
    // override the existing context completely
    otherFlow(
      {
        /*...*/
      },
      { context: { newContext: true } },
    );
    // or selectively override
    otherFlow(
      {
        /*...*/
      },
      { context: { ...context, updatedContext: true } },
    );
  },
);

When context is replaced, it propagates the same way. In this example, any actions that otherFlow called during its execution would inherit the overridden context.
The core of your app’s AI features are generative model requests, but it’s rare that you can simply take user input, pass it to the model, and display the model output back to the user. Usually, there are pre- and post-processing steps that must accompany the model call. For example:

Retrieving contextual information to send with the model call
Retrieving the history of the user’s current session, for example in a chat app
Using one model to reformat the user input in a way that’s suitable to pass to another model
Evaluating the “safety” of a model’s output before presenting it to the user
Combining the output of several models
Every step of this workflow must work together for any AI-related task to succeed.

In Genkit, you represent this tightly-linked logic using a construction called a flow. Flows are written just like functions, using ordinary TypeScript code, but they add additional capabilities intended to ease the development of AI features:

Type safety: Input and output schemas defined using Zod, which provides both static and runtime type checking
Integration with developer UI: Debug flows independently of your application code using the developer UI. In the developer UI, you can run flows and view traces for each step of the flow.
Simplified deployment: Deploy flows directly as web API endpoints, using Cloud Functions for Firebase or any platform that can host a web app.
Unlike similar features in other frameworks, Genkit’s flows are lightweight and unobtrusive, and don’t force your app to conform to any specific abstraction. All of the flow’s logic is written in standard TypeScript, and code inside a flow doesn’t need to be flow-aware.

Defining and calling flows
In its simplest form, a flow just wraps a function. The following example wraps a function that calls generate():

export const menuSuggestionFlow = ai.defineFlow(
  {
    name: 'menuSuggestionFlow',
    inputSchema: z.object({ theme: z.string() }),
    outputSchema: z.object({ menuItem: z.string() }),
  },
  async ({ theme }) => {
    const { text } = await ai.generate({
      model: googleAI.model('gemini-2.5-flash'),
      prompt: `Invent a menu item for a ${theme} themed restaurant.`,
    });
    return { menuItem: text };
  },
);

Just by wrapping your generate() calls like this, you add some functionality: doing so lets you run the flow from the Genkit CLI and from the developer UI, and is a requirement for several of Genkit’s features, including deployment and observability (later sections discuss these topics).

Input and output schemas
One of the most important advantages Genkit flows have over directly calling a model API is type safety of both inputs and outputs. When defining flows, you can define schemas for them using Zod, in much the same way as you define the output schema of a generate() call; however, unlike with generate(), you can also specify an input schema.

While it’s not mandatory to wrap your input and output schemas in z.object(), it’s considered best practice for these reasons:

Better developer experience: Wrapping schemas in objects provides a better experience in the Developer UI by giving you labeled input fields.
Future-proof API design: Object-based schemas allow for easy extensibility in the future. You can add new fields to your input or output schemas without breaking existing clients, which is a core principle of robust API design.
All examples in this documentation use object-based schemas to follow these best practices.

Here’s a refinement of the last example, which defines a flow that takes a string as input and outputs an object:

import { z } from 'genkit';

const MenuItemSchema = z.object({
  dishname: z.string(),
  description: z.string(),
});

export const menuSuggestionFlowWithSchema = ai.defineFlow(
  {
    name: 'menuSuggestionFlow',
    inputSchema: z.object({ theme: z.string() }),
    outputSchema: MenuItemSchema,
  },
  async ({ theme }) => {
    const { output } = await ai.generate({
      model: googleAI.model('gemini-2.5-flash'),
      prompt: `Invent a menu item for a ${theme} themed restaurant.`,
      output: { schema: MenuItemSchema },
    });
    if (output == null) {
      throw new Error("Response doesn't satisfy schema.");
    }
    return output;
  },
);

Note that the schema of a flow does not necessarily have to line up with the schema of the generate() calls within the flow (in fact, a flow might not even contain generate() calls). Here’s a variation of the example that passes a schema to generate(), but uses the structured output to format a simple string, which the flow returns.

export const menuSuggestionFlowMarkdown = ai.defineFlow(
  {
    name: 'menuSuggestionFlow',
    inputSchema: z.object({ theme: z.string() }),
    outputSchema: z.object({ formattedMenuItem: z.string() }),
  },
  async ({ theme }) => {
    const { output } = await ai.generate({
      model: googleAI.model('gemini-2.5-flash'),
      prompt: `Invent a menu item for a ${theme} themed restaurant.`,
      output: { schema: MenuItemSchema },
    });
    if (output == null) {
      throw new Error("Response doesn't satisfy schema.");
    }
    return {
      formattedMenuItem: `**${output.dishname}**: ${output.description}`,
    };
  },
);

Calling flows
Once you’ve defined a flow, you can call it from your Node.js code:

const { text } = await menuSuggestionFlow({ theme: 'bistro' });

The argument to the flow must conform to the input schema, if you defined one.

If you defined an output schema, the flow response will conform to it. For example, if you set the output schema to MenuItemSchema, the flow output will contain its properties:

const { dishname, description } = await menuSuggestionFlowWithSchema({ theme: 'bistro' });

Streaming flows
Flows support streaming using an interface similar to generate()’s streaming interface. Streaming is useful when your flow generates a large amount of output, because you can present the output to the user as it’s being generated, which improves the perceived responsiveness of your app. As a familiar example, chat-based LLM interfaces often stream their responses to the user as they are generated.

Here’s an example of a flow that supports streaming:

export const menuSuggestionStreamingFlow = ai.defineFlow(
  {
    name: 'menuSuggestionFlow',
    inputSchema: z.object({ theme: z.string() }),
    streamSchema: z.string(),
    outputSchema: z.object({ theme: z.string(), menuItem: z.string() }),
  },
  async ({ theme }, { sendChunk }) => {
    const { stream, response } = ai.generateStream({
      model: googleAI.model('gemini-2.5-flash'),
      prompt: `Invent a menu item for a ${theme} themed restaurant.`,
    });

    for await (const chunk of stream) {
      // Here, you could process the chunk in some way before sending it to
      // the output stream via sendChunk(). In this example, we output
      // the text of the chunk, unmodified.
      sendChunk(chunk.text);
    }

    const { text: menuItem } = await response;

    return {
      theme,
      menuItem,
    };
  },
);

The streamSchema option specifies the type of values your flow streams. This does not necessarily need to be the same type as the outputSchema, which is the type of the flow’s complete output.
The second parameter to your flow definition is called sideChannel. It provides features such as request context and the sendChunk callback. The sendChunk callback takes a single parameter, of the type specified by streamSchema. Whenever data becomes available within your flow, send the data to the output stream by calling this function.
In the above example, the values streamed by the flow are directly coupled to the values streamed by the generate() call inside the flow. Although this is often the case, it doesn’t have to be: you can output values to the stream using the callback as often as is useful for your flow.

Calling streaming flows
Streaming flows are also callable, but they immediately return a response object rather than a promise:

const response = menuSuggestionStreamingFlow.stream({ theme: 'Danube' });

The response object has a stream property, which you can use to iterate over the streaming output of the flow as it’s generated:

for await (const chunk of response.stream) {
  console.log('chunk', chunk);
}

You can also get the complete output of the flow, as you can with a non-streaming flow:

const output = await response.output;

Note that the streaming output of a flow might not be the same type as the complete output; the streaming output conforms to streamSchema, whereas the complete output conforms to outputSchema.

Running flows from the command line
You can run flows from the command line using the Genkit CLI tool:

Terminal window
genkit flow:run menuSuggestionFlow '{"theme": "French"}'

For streaming flows, you can print the streaming output to the console by adding the -s flag:

Terminal window
genkit flow:run menuSuggestionFlow '{"theme": "French"}' -s

Running a flow from the command line is useful for testing a flow, or for running flows that perform tasks needed on an ad hoc basis—for example, to run a flow that ingests a document into your vector database.

Debugging flows
One of the advantages of encapsulating AI logic within a flow is that you can test and debug the flow independently from your app using the Genkit developer UI.

To start the developer UI, run the following commands from your project directory:

Terminal window
genkit start -- tsx --watch src/your-code.ts

From the Run tab of developer UI, you can run any of the flows defined in your project:

Genkit DevUI flows

After you’ve run a flow, you can inspect a trace of the flow invocation by either clicking View trace or looking on the Inspect tab.

In the trace viewer, you can see details about the execution of the entire flow, as well as details for each of the individual steps within the flow. For example, consider the following flow, which contains several generation requests:

const PrixFixeMenuSchema = z.object({
  starter: z.string(),
  soup: z.string(),
  main: z.string(),
  dessert: z.string(),
});

export const complexMenuSuggestionFlow = ai.defineFlow(
  {
    name: 'complexMenuSuggestionFlow',
    inputSchema: z.object({ theme: z.string() }),
    outputSchema: PrixFixeMenuSchema,
  },
  async ({ theme }): Promise<z.infer<typeof PrixFixeMenuSchema>> => {
    const chat = ai.chat({ model: googleAI.model('gemini-2.5-flash') });
    await chat.send('What makes a good prix fixe menu?');
    await chat.send(
      'What are some ingredients, seasonings, and cooking techniques that ' + `would work for a ${theme} themed menu?`,
    );
    const { output } = await chat.send({
      prompt: `Based on our discussion, invent a prix fixe menu for a ${theme} ` + 'themed restaurant.',
      output: {
        schema: PrixFixeMenuSchema,
      },
    });
    if (!output) {
      throw new Error('No data generated.');
    }
    return output;
  },
);

When you run this flow, the trace viewer shows you details about each generation request including its output:

Genkit DevUI flows

Flow steps
In the last example, you saw that each generate() call showed up as a separate step in the trace viewer. Each of Genkit’s fundamental actions show up as separate steps of a flow:

generate()
Chat.send()
embed()
index()
retrieve()
If you want to include code other than the above in your traces, you can do so by wrapping the code in a run() call. You might do this for calls to third-party libraries that are not Genkit-aware, or for any critical section of code.

For example, here’s a flow with two steps: the first step retrieves a menu using some unspecified method, and the second step includes the menu as context for a generate() call.

export const menuQuestionFlow = ai.defineFlow(
  {
    name: 'menuQuestionFlow',
    inputSchema: z.object({ question: z.string() }),
    outputSchema: z.object({ answer: z.string() }),
  },
  async ({ question }): Promise<{ answer: string }> => {
    const menu = await ai.run('retrieve-daily-menu', async (): Promise<string> => {
      // Retrieve today's menu. (This could be a database access or simply
      // fetching the menu from your website.)

      // ...

      return menu;
    });
    const { text } = await ai.generate({
      model: googleAI.model('gemini-2.5-flash'),
      system: "Help the user answer questions about today's menu.",
      prompt: question,
      docs: [{ content: [{ text: menu }] }],
    });
    return { answer: text };
  },
);

Because the retrieval step is wrapped in a run() call, it’s included as a step in the trace viewer:

Genkit DevUI flows

Deploying flows
You can deploy your flows directly as web API endpoints, ready for you to call from your app clients. Deployment is discussed in detail on several other pages, but this section gives brief overviews of your deployment options.

Cloud Functions for Firebase
To deploy flows with Cloud Functions for Firebase, use the onCallGenkit feature of firebase-functions/https. onCallGenkit wraps your flow in a callable function. You may set an auth policy and configure App Check.

import { hasClaim, onCallGenkit } from 'firebase-functions/https';
import { defineSecret } from 'firebase-functions/params';

const apiKey = defineSecret('GOOGLE_AI_API_KEY');

const menuSuggestionFlow = ai.defineFlow(
  {
    name: 'menuSuggestionFlow',
    inputSchema: z.object({ theme: z.string() }),
    outputSchema: z.object({ menuItem: z.string() }),
  },
  async ({ theme }) => {
    // ...
    return { menuItem: 'Generated menu item would go here' };
  },
);

export const menuSuggestion = onCallGenkit(
  {
    secrets: [apiKey],
    authPolicy: hasClaim('email_verified'),
  },
  menuSuggestionFlow,
);

For more information, see the following pages:

Deploy with Firebase
Authorization and integrity
Firebase plugin
Express.js
To deploy flows using any Node.js hosting platform, such as Cloud Run, define your flows using defineFlow() and then call startFlowServer():

import { startFlowServer } from '@genkit-ai/express';

export const menuSuggestionFlow = ai.defineFlow(
  {
    name: 'menuSuggestionFlow',
    inputSchema: z.object({ theme: z.string() }),
    outputSchema: z.object({ result: z.string() }),
  },
  async ({ theme }) => {
    // ...
  },
);

startFlowServer({
  flows: [menuSuggestionFlow],
});

By default, startFlowServer will serve all the flows defined in your codebase as HTTP endpoints (for example, http://localhost:3400/menuSuggestionFlow). You can call a flow with a POST request as follows:

Terminal window
curl -X POST "http://localhost:3400/menuSuggestionFlow" \
  -H "Content-Type: application/json"  -d '{"data": {"theme": "banana"}}'

If needed, you can customize the flows server to serve a specific list of flows, as shown below. You can also specify a custom port (it will use the PORT environment variable if set) or specify CORS settings.

export const flowA = ai.defineFlow(
  {
    name: 'flowA',
    inputSchema: z.object({ subject: z.string() }),
    outputSchema: z.object({ response: z.string() }),
  },
  async ({ subject }) => {
    // ...
    return { response: 'Generated response would go here' };
  },
);

export const flowB = ai.defineFlow(
  {
    name: 'flowB',
    inputSchema: z.object({ subject: z.string() }),
    outputSchema: z.object({ response: z.string() }),
  },
  async ({ subject }) => {
    // ...
    return { response: 'Generated response would go here' };
  },
);

startFlowServer({
  flows: [flowB],
  port: 4567,
  cors: {
    origin: '*',
  },
});
```

## File: lib/aiSupport/aiSupport.ts
```typescript
import { gemini15Flash, googleAI } from '@genkit-ai/googleai';
import { genkit, z } from 'genkit';

const ai = genkit({
  plugins: [googleAI()],
});

export const enhanceAnswerFlow = ai.defineFlow(
  {
    name: 'enhanceAnswerFlow',
    inputSchema: z.object({
      question: z.string(),
      answer: z.string(),
      businessName: z.string(),
      userName: z.string(),
    }),
    outputSchema: z.string(),
  },
  async ({ question, answer, businessName, userName }) => {
    const prompt = `As an expert copywriter, enhance the following answer for a questionnaire.
      The user's name is ${userName} and their business is called ${businessName}.
      Question: "${question}"
      User's Answer: "${answer}"
      Enhanced Answer:`;

    const llmResponse = await ai.generate({
      model: gemini15Flash,
      prompt: prompt,
      config: {
        temperature: 0.5,
      },
    });

    return llmResponse.text || answer;
  }
);

export const suggestAnswerFlow = ai.defineFlow(
  {
    name: 'suggestAnswerFlow',
    inputSchema: z.object({
      question: z.string(),
      businessName: z.string(),
      userName: z.string(),
    }),
    outputSchema: z.array(z.string()),
  },
  async ({ question, businessName, userName }) => {
    const prompt = `As an expert business consultant, suggest 3-5 concise and creative answers for the following questionnaire question.
    The user's name is ${userName} and their business is called ${businessName}.
    Question: "${question}"
    Suggestions (comma-separated):`;

    const llmResponse = await ai.generate({
      model: gemini15Flash,
      prompt: prompt,
      config: {
        temperature: 0.8,
      },
    });

    return (
      llmResponse.text
        ?.split(',')
        .map((s: string) => s.trim()) || []
    );
  }
);
```

## File: lib/aiSupport/genkit.ts
```typescript
// lib/genkit.ts
import { genkit  } from "genkit";
import { gemini15Flash, googleAI } from "@genkit-ai/googleai";

export const ai = genkit({
  plugins: [googleAI()],
  model: gemini15Flash, // lightweight, good for real-time form AI
});
```

## File: lib/constants/about.tsx
```typescript
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
        description: "Discover unforgettable destinations and seamless Service with Sally M Travels & Tours. Specializing in group travel experiences across Southern Africa.",
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
```

## File: lib/constants/blog.tsx
```typescript
import React from 'react';
import type {blogs , Author } from '@/lib/types.ts';

export const AUTHORS: Author[] = [
  {
    id: 'abram-ntsako',
    name: 'Abram Ntsako',
    imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzOTAwNXwwfDF8c2VhcmNofDEyfHxwcm9mZXNzaW9uYWwlMjBtYW58ZW58MHx8fHwxNzI0NTU2ODUwfDA&ixlib=rb-4.0.3&q=80&w=200',
    bio: 'Abram Ntsako is the founder of Malalang Pty Ltd, a web development studio dedicated to empowering local businesses in Phalaborwa. With a passion for clean code and user-centric design, he helps SMEs build a strong online presence without breaking the bank.',
    avatarUrl: '/assets/profile.jpg',
  }
];


export const BLOG_POSTS: blogs[] = [
  {
    blogs : 'choosing-the-right-web-package',
    title: 'How to Choose the Right Web Development Package for Your Business',
    authorId: 'abram-ntsako',
    date: 'August 02, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzOTAwNXwwfDF8c2VhcmNofDEwfHxidXNpbmVzcyUyMHBsYW5uaW5nfGVufDB8fHx8MTcyNDU1Njg3Nnww&ixlib=rb-4.0.3&q=80&w=1200',
    excerpt: 'Feeling lost in a sea of web development options? This guide breaks down our packages to help you make an informed decision that aligns with your business goals and budget.',
    tags: ['Web Development', 'Business Strategy'],
    metaTitle: 'How to Choose the Right Web Development Package | Malalang Pty Ltd',
    metaDescription: 'A guide to help your business make an informed decision on the right web development package based on goals and budget.',
    content: (
      <>
        <p>Choosing the right web development package is a critical decision for any small business. It\'s not just about cost; it\'s about finding the right fit for your current needs and future ambitions. Let\'s break down the options we offer to help you decide.</p>
        
        <h3>1. The Economic Package</h3>
        <p>This package is perfect for new businesses, sole proprietors, or anyone needing a simple, professional online brochure. If your primary goal is to establish a legitimate online presence where customers can find your contact information and learn about your core services, this is the most cost-effective entry point.</p>
        <ul>
          <li><strong>Best for:</strong> Startups, freelancers, basic info sites.</li>
          <li><strong>Key Feature:</strong> Quick turnaround on a pre-selected template.</li>
          <li><strong>Consider if:</strong> You have all your content (text and images) ready to go.</li>
        </ul>

        <h3>2. The Standard Package</h3>
        <p>Our most popular choice, the Standard Package, offers a custom-designed website that reflects your unique brand identity. It provides more room for content, including dedicated pages for different services or a detailed portfolio. This is the workhorse package for established businesses looking to make a serious impression.</p>
        <blockquote>
          <p>This is the ideal balance of custom design, functionality, and affordability. It provides a solid foundation that can grow with your business.</p>
        </blockquote>

        <h3>3. The E-commerce Package</h3>
        <p>Ready to sell products online? This package is your all-in-one solution. We handle the entire setup, from product listings to secure payment gateway integration. The complexity and price can scale, but the foundation is a robust online store ready to generate revenue.</p>
        <p>We often use a simple HTML structure for initial mockups. Here\'s an example of what a product card\'s basic structure might look like in code:</p>
        <pre>
          <code>
{`<div class="product-card">
  <img src="product-image.jpg" alt="Product Name">
  <h3>Product Name</h3>
  <p class="price">R299.99</p>
  <button>Add to Cart</button>
</div>`}
          </code>
        </pre>
        <p>Making the right choice sets your business up for success. If you\'re still unsure, don\'t hesitate to reach out. We\'re happy to discuss your specific needs in a free, no-obligation consultation.</p>
      </>
    ),
  },
  {
    blogs : 'why-your-small-business-needs-a-website',
    title: '5 Reasons Why Every Phalaborwa Small Business Needs a Website in 2024',
    authorId: 'abram-ntsako',
    date: 'July 26, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzOTAwNXwwfDF8c2VhcmNofDd8fHdlYnNpdGUlMjBidXNpbmVzc3xlbnwwfHx8fDE3MjQ1NTY5MDJ8MA&ixlib=rb-4.0.3&q=80&w=1200',
    excerpt: 'In today\'s digital-first world, not having a website means you\'re invisible to a huge portion of your potential customers. Discover the top reasons why a professional online presence is no longer a luxury, but a necessity.',
    tags: ['Marketing', 'Small Business'],
    metaTitle: '5 Reasons Your Phalaborwa Business Needs a Website | Malalang Pty Ltd',
    metaDescription: 'Discover the top 5 reasons why a professional website is a necessity for Phalaborwa small businesses in 2024 to stay visible to customers.',
    content: (
      <>
        <p>In the bustling local economy of Phalaborwa, standing out is more crucial than ever. While word-of-mouth is powerful, the digital landscape offers unparalleled opportunities for growth. If you\'re still on the fence about investing in a website for your small business, here are five compelling reasons to make the leap.</p>
        <h3>1. 24/7 Accessibility</h3>
        <p>Your website acts as your digital storefront, open 24 hours a day, 7 days a week. It allows potential customers to find information about your products or services, check your hours, and contact you at their convenience, even when your physical doors are closed.</p>
        <h3>2. Build Credibility and Trust</h3>
        <p>A professional, well-designed website instantly boosts your business\'s credibility. It shows that you are a legitimate and serious operation. Our "no deposit" model at Malalang Pty Ltd is built on this very principle of trust—we build your credible online presence before you pay a cent.</p>
        <h3>3. Reach a Wider Audience</h3>
        <p>A website breaks down geographical barriers. While your business is based in Phalaborwa, your website can be accessed by tourists planning a trip, potential clients in nearby towns, or even national customers, depending on your business model.</p>
        <h3>4. Cost-Effective Marketing</h3>
        <p>Compared to a traditional advertising like print or radio, a website is an incredibly cost-effective marketing tool. It has a global reach and can be updated easily with new promotions, products, or information. Combined with our "Complete Launch Pack," which includes SEO setup, your website becomes a powerful engine for attracting new customers.</p>
        <h3>5. Showcase Your Work</h3>
        <p>A website is the perfect platform to display your products, services, and past work. A gallery of your best projects, like our portfolio section, or testimonials from happy clients can be the deciding factor for a potential customer.</p>
      </>
    ),
  },
  {
    blogs : 'understanding-our-no-deposit-model',
    title: 'The Malalang Difference: How Our "Pay on Completion" Model Benefits You',
    authorId: 'abram-ntsako',
    date: 'July 20, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1200&auto=format&fit=crop',
    excerpt: 'We\'ve removed the biggest barrier for small businesses wanting a website: the upfront cost. Learn how our unique, trust-first approach puts you in control and guarantees your satisfaction.',
    tags: ['Business Model', 'Client Trust'],
    metaTitle: 'Our "Pay on Completion" Web Design Model | Malalang Pty Ltd',
    metaDescription: 'Learn how our unique, trust-first "pay on completion" model removes the upfront cost barrier for small businesses and guarantees your satisfaction.',
    content: (
       <>
        <p>Starting a new project can be daunting, especially when it involves a significant financial outlay before you\'ve even seen the results. At Malalang Pty Ltd, we decided to flip the traditional web development model on its head. Here\'s how our "Pay on Completion" model works and why it\'s a game-changer for local businesses in Phalaborwa.</p>
        <h3>Zero Financial Risk</h3>
        <p>The most significant advantage is simple: you don\'t pay anything upfront. No deposit, no hidden fees. We absorb all the initial development costs. This means you can commission a new website with complete peace of mind, knowing that you haven\'t risked a single rand.</p>
        <h3>Our Motivation is Your Satisfaction</h3>
        <p>This model forces us to be at our best. Since we only get paid if you are 100% satisfied with the final product, our primary focus is on delivering exceptional quality that meets and exceeds your expectations. Your happiness is directly tied to our success.</p>
        <h3>A Collaborative and Transparent Process</h3>
        <p>We build your website on a private staging link, which you can access at any time. This transparency allows you to see the progress in real-time and provide feedback along the way. Our process includes two rounds of revisions to ensure the final site is exactly what you envisioned.</p>
        <h3>Building Trust, Not Just Websites</h3>
        <p>We are a local business, just like you. Our goal is to build long-term partnerships within the Phalaborwa community. By starting our relationship on a foundation of trust, we hope to become your go-to digital partner for years to come.</p>
      </>
    ),
  },
  {
    blogs : 'seo-101-for-phalaborwa-businesses',
    title: 'SEO 101 for Phalaborwa Businesses',
    authorId: 'abram-ntsako',
    date: 'August 10, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1543286386-713bdd548da4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzOTAwNXwwfDF8c2VhcmNofDEzfHxsb2NhbCUyMHNlb3xlbnwwfHx8fDE3MjQ1NTY5NDZ8MA&ixlib=rb-4.0.3&q=80&w=1200',
    excerpt: 'Search Engine Optimization (SEO) sounds complex, but it\'s essential for getting found online. This guide breaks down the basics for local Phalaborwa businesses.',
    tags: ['SEO', 'Marketing', 'Local Business'],
    metaTitle: 'SEO 101 for Phalaborwa Businesses | Malalang Pty Ltd',
    metaDescription: 'A simple guide breaking down the basics of Search Engine Optimization (SEO) to help local Phalaborwa businesses get found online.',
    content: (
      <>
        <p>Want more local customers to find you on Google? That\'s where SEO comes in. It\'s the process of making your website more attractive to search engines. Here’s a simple breakdown for Phalaborwa business owners.</p>
        <h3>What is Local SEO?</h3>
        <p>Local SEO focuses on attracting customers in your specific geographic area. When someone in Phalaborwa searches "mechanic near me," you want your business to be at the top of the list. That’s the power of local SEO.</p>
        <h3>Simple Steps to Get Started:</h3>
        <ul>
            <li><strong>Claim Your Google Business Profile:</strong> This is the most important step. It\'s free and puts you on Google Maps. We cover this in our Launch Pack!</li>
            <li><strong>Use Local Keywords:</strong> Include "Phalaborwa," "Lulekani," or other local terms in your website content naturally.</li>
            <li><strong>Get Online Reviews:</strong> Encourage happy customers to leave reviews on your Google Business Profile.</li>
        </ul>
        <p>By focusing on these basics, you can significantly improve your visibility to customers who are actively searching for your services in the area.</p>
      </>
    ),
  },
  {
    blogs : 'why-your-website-must-be-mobile-friendly',
    title: 'Why Your Website Must Be Mobile-Friendly in 2024',
    authorId: 'abram-ntsako',
    date: 'August 15, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1559526324-c1f275fbfa32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzOTAwNXwwfDF8c2VhcmNofDN8fG1vYmlsZSUyMHdlYnNpdGV8ZW58MHx8fHwxNzI0NTU2OTY4fDA&ixlib=rb-4.0.3&q=80&w=1200',
    excerpt: 'Most of your customers are browsing on their phones. If your website isn\'t easy to use on a small screen, you\'re losing business. It\'s that simple.',
    tags: ['Web Development', 'User Experience'],
    metaTitle: 'Why Your Website Must Be Mobile-Friendly in 2024 | Malalang Pty Ltd',
    metaDescription: 'Learn why a mobile-friendly website is essential for your business in 2024 and how a poor mobile experience can lose you customers.',
    content: (
      <>
        <p>Take a look around. How many people do you see on their phones? A lot. That\'s how most people access the internet today. If your website is difficult to read or navigate on a mobile device, potential customers will simply leave and go to a competitor.</p>
        <blockquote>
          <p>A mobile-friendly website isn\'t a feature anymore; it\'s a fundamental requirement for online success. Google also ranks mobile-friendly sites higher in search results.</p>
        </blockquote>
        <h3>What Makes a Site Mobile-Friendly?</h3>
        <ul>
            <li><strong>Responsive Design:</strong> The layout automatically adjusts to fit any screen size, from a phone to a desktop computer. All our websites are built this way.</li>
            <li><strong>Readable Text:</strong> No pinching and zooming required to read your content.</li>
            <li><strong>Easy-to-Tap Buttons:</strong> Buttons and links are spaced out so users don\'t accidentally tap the wrong one.</li>
            <li><strong>Fast Loading Speed:</strong> Mobile users are often on slower connections, so your site needs to load quickly.</li>
        </ul>
        <p>Ensuring your website works perfectly on mobile is one of our top priorities because we know it’s critical for your business growth.</p>
      </>
    ),
  },
  {
    blogs : 'beginners-guide-to-domains-and-hosting',
    title: "A Beginner\'s Guide to Domain Names and Hosting",
    authorId: 'abram-ntsako',
    date: 'August 22, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzOTAwNXwwfDF8c2VhcmNofDF8fGhvc3RpbmclMjBzZXJ2ZXJ8ZW58MHx8fHwxNzI0NTU3MDAxfDA&ixlib=rb-4.0.3&q=80&w=1200',
    excerpt: 'Every website needs an address and a place to live online. This guide demystifies domain names and web hosting for beginners.',
    tags: ['Web Development', 'Technical'],
    metaTitle: "A Beginner\'s Guide to Domain Names & Hosting | Malalang Pty Ltd",
    metaDescription: 'A simple guide for beginners that demystifies the concepts of domain names and web hosting, the two essential components of any website.',
    content: (
      <>
        <p>When you get a website, you’ll hear the terms "domain name" and "hosting." They might sound technical, but the concepts are quite simple.</p>
        <h3>What is a Domain Name?</h3>
        <p>A domain name is your website\'s address on the internet (e.g., `malalang.co.za` or `google.com`). It\'s what people type into their browser to find you. It should be memorable and relevant to your business.</p>
        <h3>What is Web Hosting?</h3>
        <p>If the domain is the address, hosting is the actual house where your website\'s files (images, text, code) are stored. This "house" is a powerful computer called a server, which is connected to the internet 24/7.</p>
        <blockquote>
          <p>You need both a domain name and hosting to have a live website. You rent both on a yearly or monthly basis.</p>
        </blockquote>
        <p>When you work with us, we guide you through the process of getting a domain and can include hosting as part of our affordable Web Care Plan, so you don\'t have to worry about the technical details.</p>
      </>
    ),
  },
  {
    blogs : '5-tips-for-writing-website-content',
    title: '5 Tips for Writing Website Content That Converts',
    authorId: 'abram-ntsako',
    date: 'September 01, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzOTAwNXwwfDF8c2VhcmNofDR8fGNvbnRlbnQlMjB3cml0aW5nfGVufDB8fHx8MTcyNDU1NzAyM3ww&ixlib=rb-4.0.3&q=80&w=1200',
    excerpt: 'Great design gets visitors to your site, but great content gets them to take action. Here are five tips for writing compelling text for your website.',
    tags: ['Content Strategy', 'Marketing'],
    metaTitle: '5 Tips for Writing Website Content That Converts | Malalang Pty Ltd',
    metaDescription: 'Learn 5 tips for writing compelling website text that converts visitors into customers. Great content is key to taking action.',
    content: (
      <>
        <p>Your website\'s words are your online salesperson. They need to be clear, persuasive, and helpful. If you’re writing your own content, keep these five tips in mind.</p>
        <h3>1. Know Your Audience</h3>
        <p>Write for your ideal customer. Use language they understand and address the problems they need to solve. What are their biggest questions? Answer them.</p>
        <h3>2. Keep it Simple and Scannable</h3>
        <p>People don\'t read websites; they scan them. Use short sentences, small paragraphs, headings, and bullet points to break up your text and make it easy to digest.</p>
        <h3>3. Focus on Benefits, Not Just Features</h3>
        <p>Don\'t just list what your product or service does (features). Explain how it helps your customer (benefits). For example, instead of "Mobile-Responsive Design," say "Reach More Customers on Their Phones."</p>
        <h3>4. Include a Clear Call to Action (CTA)</h3>
        <p>Tell visitors what you want them to do next. "Call Us Today," "Get a Free Quote," or "View Our Services" are all clear CTAs. Make them stand out.</p>
        <h3>5. Be Authentic</h3>
        <p>Let your brand\'s personality shine through. Being genuine builds trust. If you need help, our Professional Content Creation add-on can handle the writing for you.</p>
      </>
    ),
  },
  {
    blogs : 'website-expense-or-investment',
    title: 'Is a Website an Expense or an Investment?',
    authorId: 'abram-ntsako',
    date: 'September 08, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
    excerpt: 'Shifting your mindset about your website is key. It\'s not just a cost to be minimized; it\'s a powerful tool for generating revenue and growing your business.',
    tags: ['Business Strategy', 'Finance'],
    metaTitle: 'Is a Website an Expense or an Investment? | Malalang Pty Ltd',
    metaDescription: 'Understand why you should view your website as a powerful investment for generating revenue, not just a business expense to be minimized.',
    content: (
      <>
        <p>Many small business owners view a website as a necessary evil—a line item on the budget. But a well-crafted website is one of the most powerful investments you can make in your business\'s future.</p>
        <h3>The Expense Mindset</h3>
        <p>Viewing a website as an expense leads to one goal: finding the cheapest option possible. This often results in a poor-quality site that doesn\'t attract customers, hurts your brand\'s credibility, and ultimately costs you more in lost opportunities.</p>
        <h3>The Investment Mindset</h3>
        <p>Viewing a website as an investment focuses on the return. An effective website can:</p>
        <ul>
            <li>Generate new leads and sales 24/7.</li>
            <li>Automate customer service with FAQs and contact forms.</li>
            <li>Build your brand and establish you as an expert.</li>
            <li>Reach a wider audience beyond your immediate location.</li>
        </ul>
        <p>Our "no deposit" model is designed to make this investment risk-free. We build the asset for you first, and you only pay when you see its value. Think of your website not as a cost, but as your hardest-working employee.</p>
      </>
    ),
  },
  {
    blogs : '7-essential-website-security-practices',
    title: '7 Essential Security Practices for Your Small Business Website',
    authorId: 'abram-ntsako',
    date: 'September 15, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop',
    excerpt: 'A hacked website can destroy your reputation and cost you customers. Protecting your online presence is crucial. Here are seven key security practices to follow.',
    tags: ['Security', 'Technical'],
    metaTitle: '7 Essential Website Security Practices for Small Businesses | Malalang Pty Ltd',
    metaDescription: 'Learn seven key security practices to protect your small business website from hackers, preserve your reputation, and retain customers.',
    content: (
      <>
        <p>Website security isn\'t just for big corporations. Small business sites are often targeted because they are perceived as easier to breach. Here’s how you can protect your digital asset.</p>
        <h3>Key Security Measures:</h3>
        <ol className="list-decimal list-inside space-y-2">
            <li><strong>Use Strong Passwords:</strong> For your hosting, your website admin area, and everything else. Use a password manager.</li>
            <li><strong>Enable HTTPS (SSL Certificate):</strong> This encrypts data between your site and your visitors, showing a padlock icon in the browser. It\'s essential for trust and SEO.</li>
            <li><strong>Keep Software Updated:</strong> If your site uses a CMS like WordPress, always keep the core software, plugins, and themes updated to patch vulnerabilities.</li>
            <li><strong>Regular Backups:</strong> Regularly back up your website\'s files and database. If something goes wrong, you can restore a clean version.</li>
            <li><strong>Use a Web Application Firewall (WAF):</strong> A WAF can block malicious traffic before it even reaches your site.</li>
            <li><strong>Limit User Permissions:</strong> Don\'t give every user administrator access. Grant only the permissions necessary for their role.</li>
            <li><strong>Regular Security Scans:</strong> Use tools to scan your website for malware and vulnerabilities.</li>
        </ol>
        <p>Our Web Care Plan includes security monitoring and backups, taking this worry off your plate so you can focus on your business.</p>
      </>
    ),
  },
  {
    blogs : 'google-business-profile-guide',
    title: 'Your Google Business Profile: The Most Important Local Listing',
    authorId: 'abram-ntsako',
    date: 'September 23, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1614332287897-cdc485fa562d?q=80&w=1200&auto=format&fit=crop',
    excerpt: 'For local businesses, your Google Business Profile is arguably more important than your website for attracting nearby customers. Here\'s why you need to optimize it.',
    tags: ['SEO', 'Local Business', 'Marketing'],
    metaTitle: 'Guide to Google Business Profile for Local Businesses | Malalang Pty Ltd',
    metaDescription: 'Learn why your Google Business Profile is a crucial tool for attracting local customers and how to optimize it for better visibility.',
    content: (
      <>
        <p>When you search for a local service on Google, what’s the first thing you see? Usually, it\'s a map with three business listings. This is the "local pack," and getting your business in there can be a game-changer. The tool that powers this is your Google Business Profile (GBP).</p>
        <h3>Why is GBP so Important?</h3>
        <p>Your GBP is a free profile that lets you control how your business appears on Google Search and Maps. It’s where customers can find your:</p>
        <ul>
            <li>Address and service area</li>
            <li>Phone number and website link</li>
            <li>Opening hours</li>
            <li>Customer reviews and photos</li>
        </ul>
        <blockquote>
          <p>A complete and active GBP sends strong signals to Google that you are a legitimate, active local business, which dramatically increases your chances of showing up in the local pack.</p>
        </blockquote>
        <p>Optimizing your GBP is a core part of our "Complete Launch Pack." We ensure it\'s set up correctly, with all the essential information to help you attract local customers from day one.</p>
      </>
    ),
  },
  {
    blogs : 'red-flags-when-hiring-web-developer',
    title: 'Red Flags to Watch for When Hiring a Web Developer',
    authorId: 'abram-ntsako',
    date: 'October 02, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop',
    excerpt: 'Choosing the right web developer is crucial for your project\'s success. Here are some common red flags to be aware of during your search.',
    tags: ['Business Strategy', 'Web Development'],
    metaTitle: 'Red Flags to Watch for When Hiring a Web Developer | Malalang Pty Ltd',
    metaDescription: 'Ensure your project\'s success by learning the common red flags to watch for when hiring a web developer for your business.',
    content: (
      <>
        <p>Finding a reliable web developer can be challenging. While there are many great professionals out there, there are also some who might not be a good fit for your business. Here are some red flags to watch out for.</p>
        <h3>1. Unclear Pricing or a Large Upfront Deposit</h3>
        <p>A developer who is vague about costs or demands a huge deposit (e.g., more than 50%) before starting work can be a risk. This is why we operate on a no-deposit model—to eliminate that risk for you entirely.</p>
        <h3>2. Poor Communication</h3>
        <p>If they are slow to respond, use excessive jargon without explaining it, or don\'t seem to be listening to your needs, it\'s a sign of communication problems to come.</p>
        <h3>3. A Lack of a Portfolio or References</h3>
        <p>A credible developer should be proud to show you their past work and connect you with previous clients. If they are hesitant to do so, it\'s a major red flag.</p>
        <h3>4. Promising #1 Google Rankings Overnight</h3>
        <p>SEO is a long-term process. Anyone who guarantees top rankings quickly is making a promise they can\'t keep and likely uses shady tactics that can get your site penalized.</p>
        <p>Trust your gut. A good partnership is built on clear communication, transparency, and mutual respect.</p>
      </>
    ),
  },
  {
    blogs : 'social-media-for-website-traffic',
    title: 'How to Use Social Media to Drive Traffic to Your Website',
    authorId: 'abram-ntsako',
    date: 'October 11, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzOTAwNXwwfDF8c2VhcmNofDN8fHNvY2lhbCUyMG1lZGlhfGVufDB8fHx8MTcyNDU1NzEzNHww&ixlib=rb-4.0.3&q=80&w=1200',
    excerpt: 'Social media and your website should work together. Learn how to use platforms like Facebook to send interested visitors directly to your site.',
    tags: ['Marketing', 'Social Media'],
    metaTitle: 'How to Use Social Media to Drive Website Traffic | Malalang Pty Ltd',
    metaDescription: 'Learn effective strategies to use social media platforms like Facebook to drive interested visitors and potential customers to your website.',
    content: (
      <>
        <p>Social media is a great tool for engagement, but its real power for business is in driving traffic to a platform you own: your website. Here are effective ways to do that.</p>
        <h3>1. Optimize Your Profiles</h3>
        <p>Make sure every social media profile has a clear link to your website in the bio or "About" section. It\'s the easiest way to get clicks.</p>
        <h3>2. Share Your Blog Posts</h3>
        <p>When you publish a new blog post (like this one!), share it across your social channels. Don\'t just post the link; write an engaging caption that teases the content and encourages people to click to learn more.</p>
        <h3>3. Promote Your Services and Products</h3>
        <p>Run a special offer? Post about it on social media and link directly to the service or product page on your website. Make it easy for people to buy.</p>
        <h3>4. Use a Clear Call to Action</h3>
        <p>Don\'t be afraid to tell people what to do. Use phrases like "Learn more on our website," "Shop the new collection here," or "Book your consultation now" with a direct link.</p>
        <h3>5. Be Authentic</h3>
        <p>Let your brand\'s personality shine through. Being genuine builds trust. If you need help, our Professional Content Creation add-on can handle the writing for you.</p>
      </>
    ),
  },
  {
    blogs : 'understanding-website-maintenance',
    title: 'Understanding Website Maintenance: Our Web Care Plan Explained',
    authorId: 'abram-ntsako',
    date: 'October 18, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzOTAwNXwwfDF8c2VhcmNofDd8fHdlYnNpdGUlMjBtYWludGVuYW5jZXxlbnwwfHx8fDE3MjQ1NTcxNTR8MA&ixlib=rb-4.0.3&q=80&w=1200',
    excerpt: 'A website isn\'t a "set it and forget it" tool. Regular maintenance is crucial for security, performance, and keeping it running smoothly. Here’s what our plan covers.',
    tags: ['Web Care', 'Technical', 'Services'],
    metaTitle: 'Understanding Website Maintenance: Our Web Care Plan | Malalang Pty Ltd',
    metaDescription: 'Learn why regular website maintenance is crucial for security and performance, and see what our affordable Web Care Plan covers for your peace of mind.',
    content: (
      <>
        <p>Just like a car, a website needs regular tune-ups to perform at its best. Neglecting maintenance can lead to security breaches, slow loading times, or broken features. Our Web Care Plan is designed to handle this for you.</p>
        <h3>What is Website Maintenance?</h3>
        <p>It\'s the ongoing process of keeping your website healthy. This includes:</p>
        <ul>
            <li><strong>Security Monitoring:</strong> Actively scanning for and protecting against threats.</li>
            <li><strong>Software Updates:</strong> Keeping your platform, plugins, and themes up-to-date.</li>
            <li><strong>Regular Backups:</strong> Creating copies of your site so it can be restored if anything goes wrong.</li>
            <li><strong>Performance Checks:</strong> Ensuring your site remains fast and responsive.</li>
            <li><strong>Minor Content Updates:</strong> Small changes like updating text or swapping out an image.</li>
        </ul>
        <blockquote>
          <p>Our Web Care Plan for R199/month covers all of the above, including 30 minutes of minor monthly changes. It\'s peace of mind that your investment is protected and continues to work for you.</p>
        </blockquote>
        <p>By investing a small amount each month, you can prevent major, costly problems down the road and ensure your website remains a secure and effective asset for your business.</p>
      </>
    ),
  },
];
```

## File: lib/constants/faqs.ts
```typescript
import type { FaqItem } from '../types';

export const FAQ_ITEMS: FaqItem[] = [
    {
        question: "Why don't you require a deposit?",
        answer: "Our 'no deposit' policy is the foundation of our business. We believe in building trust first. We're confident in the quality of our work and want to remove any financial risk for you, our client. You only pay when you are 100% happy with the website."
    },
    {
        question: "How long does it take to build a website?",
        answer: "A standard 5-page website typically takes 1 to 2 weeks from our initial meeting to launch. E-commerce sites or more complex projects may take longer. We'll provide a clear timeline in our proposal."
    },
    {
        question: "Do I need to buy a domain and hosting first?",
        answer: "No, you don't need to worry about that initially. We develop your site on a private staging link. You will only need to purchase your domain name (e.g., yourbusiness.com) right before we launch the site. We can guide you through this process and handle the technical setup for you."
    },
    {
        question: "What happens after the website is launched?",
        answer: "Once launched, the website is fully yours. We transfer all ownership and access to you. We then recommend our 'Complete Launch Pack' to boost your new site's visibility, and our affordable 'Web Care Plan' for ongoing maintenance, security, and support."
    }
];
```

## File: lib/constants/navigation.ts
```typescript
interface linkType{
  name: string;
  href: '/'|'/about'|'/services'|'/pricing'|'/blog'|'/contact'|'/color-palette-generator'|'/questionnaire';
};
export const HEADER_LINKS:linkType[] = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
];

export const FOOTER_LINKS:linkType[] = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Blog', href: '/blog' },
  { name: 'Palette Generator', href: '/color-palette-generator' },
  { name: 'Questionnaire', href: '/questionnaire' },
  { name: 'Contact', href: '/contact' },
];
```

## File: lib/constants/portfolio.ts
```typescript
import type { PortfolioItem } from '@/lib/types.ts';

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    title: "Let’s Hunt Crypto",
    description: "Let’s Hunt Crypto offers a comprehensive analysis of the cryptocurrency market. Besides monitoring price, volume, and market capitalization, it also tracks community growth, learning development, events, and family engagement.",
    imageUrl: "/assets/letshuntcrypto_Logo.png",
    category: "Crypto Analysis"
  },
  {
    title: "World Club",
    description: "The World Club is an innovative savings scheme that leverages a hierarchical structure to maximize savings and earnings. Members join by paying a small fee and can recruit up to four new members, earning interest as their network grows.",
    imageUrl: "/assets/worldclub_Logo.png",
    category: "Savings Scheme"
  },
  {
    title: "Sally Sigma",
    description: "Discover unforgettable destinations and seamless Service with Sally M Travels & Tours. Specializing in group travel experiences across Southern Africa.",
    imageUrl: "/assets/Sally_Logo.jpg",
    category: "Travel & Tours"
  },
  {
    title: "Vuxaka",
    description: "Vuxaka is a compassionate catering service that provides dignified and respectful culinary experiences for funerals and memorial services.",
    imageUrl: "/assets/vuxaka_Logo.png",
    category: "Catering Services"
  }
];
```

## File: lib/constants/process.tsx
```typescript
import React from 'react';
import type { ProcessStep } from '@/lib/types.ts';

const ProcessStepIcon: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="flex items-center justify-center w-12 h-12 bg-brand-primary/10 text-brand-primary rounded-full ring-8 ring-background">
        {children}
    </div>
);

export const PROCESS_STEPS: ProcessStep[] = [
    { step: 1, title: 'Intake & Agreement', description: 'We start with a face-to-face meeting to understand your needs. A simple WhatsApp confirmation is all we need to begin—no deposit required.', icon: <ProcessStepIcon><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002 2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg></ProcessStepIcon> },
    { step: 2, title: 'Development', description: 'We build your website on a private staging link (e.g., yourname.vercel.app), so you can watch the progress live.', icon: <ProcessStepIcon><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg></ProcessStepIcon> },
    { step: 3, title: 'Review & Feedback', description: 'You review the site and provide feedback. We include up to two rounds of revisions to get everything just right.', icon: <ProcessStepIcon><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg></ProcessStepIcon> },
    { step: 4, title: 'Launch & Handover', description: 'After a final face-to-face sign-off, we handle all the technical details to launch your site. Payment is only due now.', icon: <ProcessStepIcon><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg></ProcessStepIcon> },
    { step: 5, title: 'Upsell & Support', description: 'We present our "Complete Launch Pack" to boost your online presence from day one and offer ongoing support.', icon: <ProcessStepIcon><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg></ProcessStepIcon> }
];
```

## File: lib/constants/services.tsx
```typescript
import React from 'react';
import type { ServicePackage, AddonService, AddonCategory, RecurringService } from '@/lib/types.ts';

// Main website packages with fixed pricing and clear scope.
export const SERVICE_PACKAGES: ServicePackage[] = [
  {
    title: 'Landing Page',
    serviceUrl: 'landing-page',
    price: 'R1,000',
    description: 'A focused single-page website to convert visitors for a specific campaign or goal.',
    longDescription: "Perfect for marketing campaigns, product launches, or events, a landing page is a highly focused, single-page website designed for one purpose: to convert visitors into leads or customers. We craft a compelling narrative with a clear call-to-action to maximize your campaign's effectiveness.",
    idealFor: "Marketing campaigns, event promotion, new product launches, or any business needing a focused, high-conversion web page without the complexity of a full multi-page site.",
    bestFor: "Marketing campaigns and product launches.",
    features: [
      'Single-Page Focused Design (up to 5 sections)',
      'Clear Call-to-Action',
      'Mobile Responsive',
      'Contact/Lead Form Integration',
      'Basic Security Setup (SSL/HTTPS)', // Added
      'Database Integration (Firebase only)',
      'Hosting Configuration (Vercel, Firebase, or your own choice)', // Fixed typo
    ],
  },
  {
    title: 'Base Package',
    serviceUrl: 'economic-package',
    price: 'R1,500',
    description: 'A professional 5-page website, perfect for building a strong and comprehensive online presence.',
    longDescription: "Our Base Package is the perfect choice for businesses needing a complete and professional online footprint. With up to 5 pages, you have the space to detail your services, introduce your team, and provide essential information to your customers. This package focuses on creating a clean, functional, and mobile-friendly website that establishes your credibility and serves as a digital hub for your business.",
    idealFor: "Small businesses, service providers, and startups who need more than a basic brochure site and want to present a comprehensive view of their offerings.",
    bestFor: "Small businesses needing a comprehensive site.",
    features: [
      'Up to 5 Pages',
      'Professionally Styled Design',
      'Clear Call-to-Action',
      'Mobile Responsive',
      'Basic Security Setup (SSL/HTTPS)', // Added
      'Forms Integration (up to 5 forms)',
      'Database Integration (Firebase only)',
      'Hosting Configuration (Vercel or Firebase)',
      'Basic Search Engine Setup (SEO) On-page',
      'Simple Admin Panel (View and Sort Form Submissions)', // Clarified text
    ],
    isFeatured: true,
  },
  {
    title: 'Standard Package',
    serviceUrl: 'standard-package',
    price: 'R2,500',
    description: 'Our most popular option for a complete, custom-designed online presence with advanced features.',
    longDescription: "This is our flagship offering and the ideal choice for most small to medium-sized businesses looking to make a serious impact. The Standard Package moves beyond templates to provide a fully custom-designed website that reflects your unique brand identity and business goals. With up to 8 pages, we can build a comprehensive site that details your services, showcases your work, and is optimized from the ground up to attract and convert visitors.",
    idealFor: "Established businesses, service providers, and companies looking for a unique digital storefront that sets them apart from the competition and provides a solid foundation for future growth.",
    bestFor: "Established businesses wanting a custom brand presence.",
    features: [
      'Up to 8 Main Pages plus 10 Extra Pages (for services or blog posts)',
      'Unique Design Tailored to Your Brand',
      'Clear Call-to-Action',
      'Mobile Responsive',
      'Basic Security Setup (SSL/HTTPS)', // Added
      'Advanced Forms (unlimited forms)',
      'Database Integration (Firebase or Supabase)',
      'Optimized Hosting Configuration (Vercel only)', // Clarified text
      'Basic Site Performance Optimization', // Added
      'Advanced On-Page Search Engine Setup (SEO)',
      'Advanced Admin Panel (Separate website to manage content and forms)', // Clarified text
      '1 Hour of Content Upload Training',
      'Google Analytics & Search Console Integration',
    ],
  },
  {
    title: 'E-commerce Package',
    serviceUrl: 'e-commerce-package',
    price: 'From R5,000',
    description: 'A fully functional online store to sell your products. Price scales with complexity.',
    longDescription: "Ready to sell your products online? The E-commerce Package is your all-in-one solution for launching a powerful and secure online store. We handle everything from the initial setup and design to product management systems and secure payment gateway integration (like Paystack or Yoco). The design is fully customized to create an enjoyable shopping experience for your customers, encouraging sales and repeat business.",
    idealFor: "Retail businesses, artisans, and anyone wanting to sell physical or digital products directly to customers online. The platform is scalable to grow with your product line and sales volume.",
    bestFor: "Businesses ready to sell products online.",
    features: [
      'Full Online Store Setup',
      'Product Management System',
      'Full Order & Inventory Management System', // Added
      'Secure Payment Gateway Integration',
      'Custom Design Tailored for Sales',
      'Mobile-Optimized Checkout',
      'Basic Security Setup (SSL/HTTPS)', // Added
      'Database Integration (Firebase, Supabase or custom)',
      'Hosting Configuration (hosting provider of your choice)',
      'Advanced On-Page Search Engine Setup (SEO)',
      'Technical SEO for Products (Schema Markup)', // Added
      'Advanced Admin Panel (Manage products, orders, and content)', // Clarified text
      '1 Hour of Content Upload Training',
      'Google Analytics & Search Console Integration',
      'Customer Accounts Setup',
    ],
  },{
    title: 'Local Visibility Starter',
    serviceUrl: 'local-startup',
    price: 'R2,000', // Clear, fixed price
    description: 'The **Economic Package** plus all the tools needed to rank locally and track performance.',longDescription: "This special package combines the full features of our **Economic Package** with the top add-ons needed to get your business found on Google Maps and track customer behavior. It's the most cost-effective way to get a comprehensive site that is ready to attract local customers.",
    idealFor: "Restaurants, service providers, or any local business that needs a comprehensive site plus a clear path to ranking on Google Maps and local search results.",
    bestFor: "Local service businesses and physical stores.",  
    features: [
      'All Economic Package Features Included', 
      'Basic Security Setup (SSL/HTTPS)',
      'Google Business Profile Setup',
      'Google Analytics & Search Console Setup',
      'Enhanced Basic On-Page SEO',
    ],
    isCombo: true, 
  savingsNote: 'Saves R750 compared to buying the Economic Package and add-ons separately!', 
},
];

// Add-on services, categorized for easy navigation.
export const ADDON_CATEGORIES: AddonCategory[] = [
  {
    name: 'Content & Presentation',
    addons: [
      { title: 'Additional Page', price: 'R250/page' },
      { title: 'Photo Gallery / Portfolio', price: 'R200' },
      { title: 'Charts, Graphs, and Advanced Visuals', price: 'R150' },
      { title: 'Social Media Feed Integration', price: 'R150' },
      { title: 'Embedded Maps', price: 'R50' },
      { title: 'Professional Content Creation (Per Page)', price: 'From R500' },
      { title: 'Design Revision Round (Extra)', price: 'R300/round' }, // Added
    ],
  },
  {
    name: 'User & Business Interaction',
    addons: [
      { title: 'Advanced Forms (Multi-step, Quizzes)', price: 'R250' },
      { title: 'Newsletter Signup & Integration', price: 'R200' },
      { title: 'Live Chat Integration', price: 'R250' },
      { title: 'Customer Login Area/Basic Portal', price: 'From R1,000' },
      { title: 'Booking / Appointment System Setup', price: 'R500' },
    ],
  },
  {
    name: 'E-commerce & Data',
    addons: [
      { title: 'E-commerce / Online Store', price: 'See Package' },
      { title: 'Initial Product Data Import (Up to 20 Items)', price: 'R500' },
      { title: 'Additional Payment Gateway Setup', price: 'R300' },
      { title: 'Shipping & Tax Configuration', price: 'R300' },
    ],
  },
  {
    name: 'SEO & Performance',
    addons: [
      { title: 'Technical SEO Audit & Setup', price: 'R750' },
      { title: 'Schema Markup Implementation', price: 'R250/page' },
      { title: 'Website Speed Optimization', price: 'R350' },
    ],
  },
  {
    name: 'Security & Maintenance', // Renamed category for clarity
    addons: [
      { title: 'Automated Daily Backup Setup', price: 'R350' }, // Added
      { title: 'Advanced WAF/DDoS Protection Setup', price: 'R400' }, // Added
      { title: 'Cookie Consent Banner (POPIA/GDPR Compliant)', price: 'R200' },
      { title: 'Privacy Policy / T&C Template Setup', price: 'R100' },
    ],
  },
  {
    name: 'Training & Support', // New Category
    addons: [
      { title: 'Additional Content Training', price: 'R200/hour' }, // Added
    ],
  },
];

// Launch-specific services, often bundled together.
export const LAUNCH_PACK_SERVICES: AddonService[] = [
  { title: 'Google Business Profile Setup', price: 'R300' },
  { title: 'Google Analytics & Search Console Setup', price: 'R300' },
  { title: 'Basic On-Page SEO', price: 'R500' },
];


// Recurring maintenance plan.
export const RECURRING_SERVICE: RecurringService = {
  title: 'Web Care Plan',
  price: 'R199/month',
  description: 'Monthly maintenance including core software updates, security checks, off-site backup storage, and up to 15 minutes of minor content/text edits.', // Enhanced description
};
```

## File: lib/constants/site.ts
```typescript
export const WHATSAPP_LINK = "https://wa.me/27622840835";
export const WHATSAPP_NUMBER = "27622840835";
```

## File: lib/constants/testimonials.ts
```typescript
import type { Testimonial } from '@/lib/types.ts';

export const TESTIMONIALS: Testimonial[] = [
    {
        quote: "Malalang Pty Ltd delivered a fantastic website that exceeded our expectations. The no-deposit model gave us complete peace of mind. Highly recommended for any local business!",
        author: "Mr Salvation",
        company: "Sally M Travels & Tours"
    },
    {
        quote: "The process was so simple and transparent. Abram was a pleasure to work with, always listening to our needs and delivering quality work. Our online presence has never been stronger.",
        author: "Vuxaka Catering",
        company: "Vuxaka Catering Services"
    },
    {
        quote: "Finally, a web developer who understands the challenges of small businesses in Phalaborwa. The face-to-face meetings made all the difference. We're thrilled with the final product.",
        author: "Mr Molapo",
        company: "Central Eatery"
    }
];
```

## File: lib/firebase.ts
```typescript
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqkzwgP4IpzDZ8g6K3jr1jXozP60efiLg",
  authDomain: "rise-and-shine-shop.firebaseapp.com",
  projectId: "rise-and-shine-shop",
  storageBucket: "rise-and-shine-shop.firebasestorage.app",
  messagingSenderId: "1000695658741",
  appId: "1:1000695658741:web:aaa173d3ce97f3a70a6dbc",
  measurementId: "G-2JJGQFTT4K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
```

## File: lib/types.ts
```typescript
export interface ClientData {
    fullName: string;
    businessName?: string;
    email?: string;
    phone: string;
    bookings : {
        servicePackage: string;
        serviceTitle: string;
        submittedAt: any; // Firestore timestamp
    }[];
}

export interface ServicePackage {
    title: string;
    serviceUrl: string;
    price: string;
    description: string;
    longDescription: string;
    idealFor: string;
    bestFor: string;
    features: string[];
    isFeatured?: boolean;
    isCombo?: boolean;
    savingsNote?: string;
    type?: 'static' | 'dynamic';
}

export interface AddonService {
    title: string;
    price: string;
}

export interface RecurringService {
    title: string;
    price: string;
    description: string;
}

export interface AddonCategory {
    name: string;
    addons: AddonService[];
}

export interface ProcessStep {
    step: number;
    title: string;
    description: string;
    icon: React.ReactNode;
}

export interface PortfolioItem {
    title: string;
    category: string;
    imageUrl: string;
    description: string;
}

export interface Testimonial {
    quote: string;
    author: string;
    company: string;
}

export interface FaqItem {
    question: string;
    answer: string;
}

export interface Author {
    id: string;
    name: string;
    imageUrl: string;
    bio: string;
    avatarUrl: string;
}

export interface blogs {
    blogs : string;
    title:string;
    authorId: string;
    date: string;
    imageUrl: string;
    excerpt: string;
    content: React.ReactNode;
    tags?: string[];
    metaTitle: string;
    metaDescription: string;
}

export interface Value {
    icon: React.ReactNode;
    title: string;
    description: string;
}

export interface Difference {
    icon: React.ReactNode;
    title: string;
    description: string;
}

export interface Skill {
    name: string;
    icon: React.ReactNode;
}

export interface Contact {
    name: string;
    value: string;
    icon: React.ReactNode;
    link?: string;
}

export interface TeamMember extends Author {
    title: string;
    skills: Skill[];
    contacts: Contact[];
}

export interface Project {
    name: string;
    description: string;
    image: string;
    link: string;
}
```

## File: lib/validation.ts
```typescript
import { z } from 'zod';

export const bookingFormSchema = z.object({
    fullName: z.string().min(1, { message: 'Full name is required' }),
    email: z.string().email({ message: 'Invalid email address' }),
    phone: z.string().min(9, { message: 'Phone number must be a valid 9-digit South African number' }),
    businessName: z.string().optional(),
    meetingType: z.string(),
    meetingLocation: z.string().optional(),
    officeLocation: z.string().optional(),
    preferredDate: z.string().optional(),
    preferredTime: z.string().optional(),
    servicePackage: z.string(),
    additionalNotes: z.string().optional(),
});

export const websiteBlueprintSchema = z.object({
    business_name: z.string().min(1, { message: 'Business name is required' }),
    business_summary: z.string().min(1, { message: 'Business summary is required' }),
    target_audience: z.string().min(1, { message: 'Target audience is required' }),
});
```

## File: public/robots.txt
```
User-agent: *
Allow: /
Sitemap: https://malalang.vercel.app/sitemap.xml
```

## File: .gitignore
```
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*
.next
node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
.env
```

## File: .yarnrc.yml
```yaml
nodeLinker: node-modules
```

## File: metadata.json
```json
{
  "name": "Malalang Pty Ltd Website",
  "description": "The official business website for Malalang Pty Ltd, a web development studio based in Phalaborwa, Limpopo, that specializes in creating affordable, high-quality websites for local SMEs with a unique 'pay on completion' model.",
  "requestFramePermissions": []
}
```

## File: next-env.d.ts
```typescript
/// <reference types="next" />
/// <reference types="next/image-types/global" />
/// <reference path="./.next/types/routes.d.ts" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/app/api-reference/config/typescript for more information.
```

## File: next.config.mjs
```
/** @type {import('next').NextConfig} */
const nextConfig = {
  typedRoutes: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
```

## File: package.json
```json
{
  "name": "malalang-pty-ltd-website",
  "private": true,
  "version": "0.0.0",
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "genkit": "genkit"
  },
  "dependencies": {
    "@genkit-ai/googleai": "^1.20.0",
    "@heroicons/react": "^2.1.4",
    "@tailwindcss/postcss": "^4.1.13",
    "cloudinary": "^2.7.0",
    "firebase": "^12.2.1",
    "genkit": "^1.20.0",
    "lucide-react": "^0.544.0",
    "next": "15.5.4",
    "react": "19.2.0",
    "react-dom": "19.2.0",
    "react-icons": "^5.5.0",
    "zod": "^4.1.11"
  },
  "devDependencies": {
    "@types/node": "^22.14.0",
    "@types/react": "19.2.0",
    "@types/react-dom": "19.2.0",
    "autoprefixer": "^10.4.21",
    "postcss": "^8.5.6",
    "tailwindcss": "^4.1.13",
    "typescript": "~5.8.2"
  },
  "resolutions": {
    "@types/react": "19.2.0",
    "@types/react-dom": "19.2.0"
  }
}
```

## File: postcss.config.js
```javascript
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
}
```

## File: README.md
```markdown
# Malalang Web Presence Analysis & Recommendations

This document outlines a comprehensive analysis of the Malalang website's front-end code, focusing on brand identity, user experience, and technical performance. It provides actionable recommendations to enhance the site's effectiveness, particularly in targeting the local Phalaborwa market.

## 1. Brand Identity & Visual Consistency

The brand identity is strong and consistent, but minor improvements can be made to enhance its impact.

### 1.1. Color Palette

The color palette is well-defined, but the shades of grey and blue can be refined to improve contrast and visual appeal.

- **Recommendation:** Update the color palette to use more accessible and visually appealing shades of grey and blue.

### 1.2. Logo

The brand identity is strong, but the logo is not consistently applied across all pages.

- **Recommendation:** Add the brand name to the logo to improve brand recognition and memorability.

## 2. User Experience & Content Strategy

The user experience is generally good, but there are opportunities to improve user engagement and trust.

### 2.1. Call-to-Action (CTA)

The primary CTA is clear, but its placement and messaging can be optimized.

- **Recommendation:** Add a secondary CTA in the hero section to encourage users to learn more about the brand.

### 2.2. Navigation

The main navigation is functional, but it can be improved to better guide users.

- **Recommendation:** Add a "Contact" link to the main navigation to make it easier for users to get in touch.

### 2.3. Trust, Credibility, & Social Proof

The site effectively uses testimonials to build trust, but the credibility of the testimonials can be enhanced.

- **Recommendation:** Replace placeholder author names with more specific and believable attributions.

## 3. Technical Performance & Accessibility

The technical performance is solid, but there are opportunities to improve accessibility and SEO.

### 3.1. Metadata & SEO

The site has good default metadata, but the home page metadata can be better optimized for the target audience.

- **Recommendation:** Update the home page metadata to better target the local Phalaborwa market.

### 3.2. Heading Structure

The heading structure is generally well-defined, but there are some inconsistencies that can be improved.

- **Recommendation:** Ensure all pages have a consistent and logical heading structure.
```

## File: tsconfig.json
```json
{
  "compilerOptions": {
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "downlevelIteration": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": [
        "./*"
      ]
    },
    "target": "ES2017"
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts"
  ],
  "exclude": [
    "node_modules"
  ]
}
```

## File: tsconfig.tsbuildinfo
```
{"fileNames":["./node_modules/typescript/lib/lib.es5.d.ts","./node_modules/typescript/lib/lib.es2015.d.ts","./node_modules/typescript/lib/lib.es2016.d.ts","./node_modules/typescript/lib/lib.es2017.d.ts","./node_modules/typescript/lib/lib.es2018.d.ts","./node_modules/typescript/lib/lib.es2019.d.ts","./node_modules/typescript/lib/lib.es2020.d.ts","./node_modules/typescript/lib/lib.es2021.d.ts","./node_modules/typescript/lib/lib.es2022.d.ts","./node_modules/typescript/lib/lib.es2023.d.ts","./node_modules/typescript/lib/lib.es2024.d.ts","./node_modules/typescript/lib/lib.esnext.d.ts","./node_modules/typescript/lib/lib.dom.d.ts","./node_modules/typescript/lib/lib.dom.iterable.d.ts","./node_modules/typescript/lib/lib.es2015.core.d.ts","./node_modules/typescript/lib/lib.es2015.collection.d.ts","./node_modules/typescript/lib/lib.es2015.generator.d.ts","./node_modules/typescript/lib/lib.es2015.iterable.d.ts","./node_modules/typescript/lib/lib.es2015.promise.d.ts","./node_modules/typescript/lib/lib.es2015.proxy.d.ts","./node_modules/typescript/lib/lib.es2015.reflect.d.ts","./node_modules/typescript/lib/lib.es2015.symbol.d.ts","./node_modules/typescript/lib/lib.es2015.symbol.wellknown.d.ts","./node_modules/typescript/lib/lib.es2016.array.include.d.ts","./node_modules/typescript/lib/lib.es2016.intl.d.ts","./node_modules/typescript/lib/lib.es2017.arraybuffer.d.ts","./node_modules/typescript/lib/lib.es2017.date.d.ts","./node_modules/typescript/lib/lib.es2017.object.d.ts","./node_modules/typescript/lib/lib.es2017.sharedmemory.d.ts","./node_modules/typescript/lib/lib.es2017.string.d.ts","./node_modules/typescript/lib/lib.es2017.intl.d.ts","./node_modules/typescript/lib/lib.es2017.typedarrays.d.ts","./node_modules/typescript/lib/lib.es2018.asyncgenerator.d.ts","./node_modules/typescript/lib/lib.es2018.asynciterable.d.ts","./node_modules/typescript/lib/lib.es2018.intl.d.ts","./node_modules/typescript/lib/lib.es2018.promise.d.ts","./node_modules/typescript/lib/lib.es2018.regexp.d.ts","./node_modules/typescript/lib/lib.es2019.array.d.ts","./node_modules/typescript/lib/lib.es2019.object.d.ts","./node_modules/typescript/lib/lib.es2019.string.d.ts","./node_modules/typescript/lib/lib.es2019.symbol.d.ts","./node_modules/typescript/lib/lib.es2019.intl.d.ts","./node_modules/typescript/lib/lib.es2020.bigint.d.ts","./node_modules/typescript/lib/lib.es2020.date.d.ts","./node_modules/typescript/lib/lib.es2020.promise.d.ts","./node_modules/typescript/lib/lib.es2020.sharedmemory.d.ts","./node_modules/typescript/lib/lib.es2020.string.d.ts","./node_modules/typescript/lib/lib.es2020.symbol.wellknown.d.ts","./node_modules/typescript/lib/lib.es2020.intl.d.ts","./node_modules/typescript/lib/lib.es2020.number.d.ts","./node_modules/typescript/lib/lib.es2021.promise.d.ts","./node_modules/typescript/lib/lib.es2021.string.d.ts","./node_modules/typescript/lib/lib.es2021.weakref.d.ts","./node_modules/typescript/lib/lib.es2021.intl.d.ts","./node_modules/typescript/lib/lib.es2022.array.d.ts","./node_modules/typescript/lib/lib.es2022.error.d.ts","./node_modules/typescript/lib/lib.es2022.intl.d.ts","./node_modules/typescript/lib/lib.es2022.object.d.ts","./node_modules/typescript/lib/lib.es2022.string.d.ts","./node_modules/typescript/lib/lib.es2022.regexp.d.ts","./node_modules/typescript/lib/lib.es2023.array.d.ts","./node_modules/typescript/lib/lib.es2023.collection.d.ts","./node_modules/typescript/lib/lib.es2023.intl.d.ts","./node_modules/typescript/lib/lib.es2024.arraybuffer.d.ts","./node_modules/typescript/lib/lib.es2024.collection.d.ts","./node_modules/typescript/lib/lib.es2024.object.d.ts","./node_modules/typescript/lib/lib.es2024.promise.d.ts","./node_modules/typescript/lib/lib.es2024.regexp.d.ts","./node_modules/typescript/lib/lib.es2024.sharedmemory.d.ts","./node_modules/typescript/lib/lib.es2024.string.d.ts","./node_modules/typescript/lib/lib.esnext.array.d.ts","./node_modules/typescript/lib/lib.esnext.collection.d.ts","./node_modules/typescript/lib/lib.esnext.intl.d.ts","./node_modules/typescript/lib/lib.esnext.disposable.d.ts","./node_modules/typescript/lib/lib.esnext.promise.d.ts","./node_modules/typescript/lib/lib.esnext.decorators.d.ts","./node_modules/typescript/lib/lib.esnext.iterator.d.ts","./node_modules/typescript/lib/lib.esnext.float16.d.ts","./node_modules/typescript/lib/lib.decorators.d.ts","./node_modules/typescript/lib/lib.decorators.legacy.d.ts","./.next/types/routes.d.ts","./node_modules/@types/react/global.d.ts","./node_modules/csstype/index.d.ts","./node_modules/@types/react/index.d.ts","./node_modules/next/dist/styled-jsx/types/css.d.ts","./node_modules/next/dist/styled-jsx/types/macro.d.ts","./node_modules/next/dist/styled-jsx/types/style.d.ts","./node_modules/next/dist/styled-jsx/types/global.d.ts","./node_modules/next/dist/styled-jsx/types/index.d.ts","./node_modules/next/dist/shared/lib/amp.d.ts","./node_modules/next/amp.d.ts","./node_modules/next/dist/server/get-page-files.d.ts","./node_modules/@types/node/compatibility/disposable.d.ts","./node_modules/@types/node/compatibility/indexable.d.ts","./node_modules/@types/node/compatibility/iterators.d.ts","./node_modules/@types/node/compatibility/index.d.ts","./node_modules/@types/node/globals.typedarray.d.ts","./node_modules/@types/node/buffer.buffer.d.ts","./node_modules/@types/node/globals.d.ts","./node_modules/@types/node/web-globals/abortcontroller.d.ts","./node_modules/@types/node/web-globals/domexception.d.ts","./node_modules/@types/node/web-globals/events.d.ts","./node_modules/undici-types/header.d.ts","./node_modules/undici-types/readable.d.ts","./node_modules/undici-types/file.d.ts","./node_modules/undici-types/fetch.d.ts","./node_modules/undici-types/formdata.d.ts","./node_modules/undici-types/connector.d.ts","./node_modules/undici-types/client.d.ts","./node_modules/undici-types/errors.d.ts","./node_modules/undici-types/dispatcher.d.ts","./node_modules/undici-types/global-dispatcher.d.ts","./node_modules/undici-types/global-origin.d.ts","./node_modules/undici-types/pool-stats.d.ts","./node_modules/undici-types/pool.d.ts","./node_modules/undici-types/handlers.d.ts","./node_modules/undici-types/balanced-pool.d.ts","./node_modules/undici-types/agent.d.ts","./node_modules/undici-types/mock-interceptor.d.ts","./node_modules/undici-types/mock-agent.d.ts","./node_modules/undici-types/mock-client.d.ts","./node_modules/undici-types/mock-pool.d.ts","./node_modules/undici-types/mock-errors.d.ts","./node_modules/undici-types/proxy-agent.d.ts","./node_modules/undici-types/env-http-proxy-agent.d.ts","./node_modules/undici-types/retry-handler.d.ts","./node_modules/undici-types/retry-agent.d.ts","./node_modules/undici-types/api.d.ts","./node_modules/undici-types/interceptors.d.ts","./node_modules/undici-types/util.d.ts","./node_modules/undici-types/cookies.d.ts","./node_modules/undici-types/patch.d.ts","./node_modules/undici-types/websocket.d.ts","./node_modules/undici-types/eventsource.d.ts","./node_modules/undici-types/filereader.d.ts","./node_modules/undici-types/diagnostics-channel.d.ts","./node_modules/undici-types/content-type.d.ts","./node_modules/undici-types/cache.d.ts","./node_modules/undici-types/index.d.ts","./node_modules/@types/node/web-globals/fetch.d.ts","./node_modules/@types/node/web-globals/navigator.d.ts","./node_modules/@types/node/web-globals/storage.d.ts","./node_modules/@types/node/assert.d.ts","./node_modules/@types/node/assert/strict.d.ts","./node_modules/@types/node/async_hooks.d.ts","./node_modules/@types/node/buffer.d.ts","./node_modules/@types/node/child_process.d.ts","./node_modules/@types/node/cluster.d.ts","./node_modules/@types/node/console.d.ts","./node_modules/@types/node/constants.d.ts","./node_modules/@types/node/crypto.d.ts","./node_modules/@types/node/dgram.d.ts","./node_modules/@types/node/diagnostics_channel.d.ts","./node_modules/@types/node/dns.d.ts","./node_modules/@types/node/dns/promises.d.ts","./node_modules/@types/node/domain.d.ts","./node_modules/@types/node/events.d.ts","./node_modules/@types/node/fs.d.ts","./node_modules/@types/node/fs/promises.d.ts","./node_modules/@types/node/http.d.ts","./node_modules/@types/node/http2.d.ts","./node_modules/@types/node/https.d.ts","./node_modules/@types/node/inspector.generated.d.ts","./node_modules/@types/node/module.d.ts","./node_modules/@types/node/net.d.ts","./node_modules/@types/node/os.d.ts","./node_modules/@types/node/path.d.ts","./node_modules/@types/node/perf_hooks.d.ts","./node_modules/@types/node/process.d.ts","./node_modules/@types/node/punycode.d.ts","./node_modules/@types/node/querystring.d.ts","./node_modules/@types/node/readline.d.ts","./node_modules/@types/node/readline/promises.d.ts","./node_modules/@types/node/repl.d.ts","./node_modules/@types/node/sea.d.ts","./node_modules/@types/node/sqlite.d.ts","./node_modules/@types/node/stream.d.ts","./node_modules/@types/node/stream/promises.d.ts","./node_modules/@types/node/stream/consumers.d.ts","./node_modules/@types/node/stream/web.d.ts","./node_modules/@types/node/string_decoder.d.ts","./node_modules/@types/node/test.d.ts","./node_modules/@types/node/timers.d.ts","./node_modules/@types/node/timers/promises.d.ts","./node_modules/@types/node/tls.d.ts","./node_modules/@types/node/trace_events.d.ts","./node_modules/@types/node/tty.d.ts","./node_modules/@types/node/url.d.ts","./node_modules/@types/node/util.d.ts","./node_modules/@types/node/v8.d.ts","./node_modules/@types/node/vm.d.ts","./node_modules/@types/node/wasi.d.ts","./node_modules/@types/node/worker_threads.d.ts","./node_modules/@types/node/zlib.d.ts","./node_modules/@types/node/index.d.ts","./node_modules/@types/react/canary.d.ts","./node_modules/@types/react/experimental.d.ts","./node_modules/@types/react-dom/index.d.ts","./node_modules/@types/react-dom/canary.d.ts","./node_modules/@types/react-dom/experimental.d.ts","./node_modules/next/dist/lib/fallback.d.ts","./node_modules/next/dist/compiled/webpack/webpack.d.ts","./node_modules/next/dist/server/config.d.ts","./node_modules/next/dist/lib/load-custom-routes.d.ts","./node_modules/next/dist/shared/lib/image-config.d.ts","./node_modules/next/dist/build/webpack/plugins/subresource-integrity-plugin.d.ts","./node_modules/next/dist/server/body-streams.d.ts","./node_modules/next/dist/server/lib/cache-control.d.ts","./node_modules/next/dist/lib/setup-exception-listeners.d.ts","./node_modules/next/dist/lib/worker.d.ts","./node_modules/next/dist/lib/constants.d.ts","./node_modules/next/dist/client/components/app-router-headers.d.ts","./node_modules/next/dist/build/rendering-mode.d.ts","./node_modules/next/dist/server/lib/router-utils/build-prefetch-segment-data-route.d.ts","./node_modules/next/dist/server/require-hook.d.ts","./node_modules/next/dist/server/lib/experimental/ppr.d.ts","./node_modules/next/dist/build/webpack/plugins/app-build-manifest-plugin.d.ts","./node_modules/next/dist/lib/page-types.d.ts","./node_modules/next/dist/build/segment-config/app/app-segment-config.d.ts","./node_modules/next/dist/build/segment-config/pages/pages-segment-config.d.ts","./node_modules/next/dist/build/analysis/get-page-static-info.d.ts","./node_modules/next/dist/build/webpack/loaders/get-module-build-info.d.ts","./node_modules/next/dist/build/webpack/plugins/middleware-plugin.d.ts","./node_modules/next/dist/server/node-polyfill-crypto.d.ts","./node_modules/next/dist/server/node-environment-baseline.d.ts","./node_modules/next/dist/server/node-environment-extensions/error-inspect.d.ts","./node_modules/next/dist/server/node-environment-extensions/random.d.ts","./node_modules/next/dist/server/node-environment-extensions/date.d.ts","./node_modules/next/dist/server/node-environment-extensions/web-crypto.d.ts","./node_modules/next/dist/server/node-environment-extensions/node-crypto.d.ts","./node_modules/next/dist/server/node-environment.d.ts","./node_modules/next/dist/build/page-extensions-type.d.ts","./node_modules/next/dist/build/webpack/plugins/flight-manifest-plugin.d.ts","./node_modules/next/dist/server/instrumentation/types.d.ts","./node_modules/next/dist/lib/coalesced-function.d.ts","./node_modules/next/dist/shared/lib/router/utils/middleware-route-matcher.d.ts","./node_modules/next/dist/server/lib/router-utils/types.d.ts","./node_modules/next/dist/shared/lib/modern-browserslist-target.d.ts","./node_modules/next/dist/shared/lib/constants.d.ts","./node_modules/next/dist/trace/types.d.ts","./node_modules/next/dist/trace/trace.d.ts","./node_modules/next/dist/trace/shared.d.ts","./node_modules/next/dist/trace/index.d.ts","./node_modules/next/dist/build/load-jsconfig.d.ts","./node_modules/@next/env/dist/index.d.ts","./node_modules/next/dist/build/webpack/plugins/telemetry-plugin/use-cache-tracker-utils.d.ts","./node_modules/next/dist/build/webpack/plugins/telemetry-plugin/telemetry-plugin.d.ts","./node_modules/next/dist/telemetry/storage.d.ts","./node_modules/next/dist/build/build-context.d.ts","./node_modules/next/dist/shared/lib/bloom-filter.d.ts","./node_modules/next/dist/build/webpack-config.d.ts","./node_modules/next/dist/server/route-kind.d.ts","./node_modules/next/dist/server/route-definitions/route-definition.d.ts","./node_modules/next/dist/build/swc/generated-native.d.ts","./node_modules/next/dist/build/swc/types.d.ts","./node_modules/next/dist/server/dev/parse-version-info.d.ts","./node_modules/next/dist/next-devtools/shared/types.d.ts","./node_modules/next/dist/server/dev/dev-indicator-server-state.d.ts","./node_modules/next/dist/server/lib/parse-stack.d.ts","./node_modules/next/dist/next-devtools/server/shared.d.ts","./node_modules/next/dist/next-devtools/shared/stack-frame.d.ts","./node_modules/next/dist/next-devtools/dev-overlay/utils/get-error-by-type.d.ts","./node_modules/@types/react/jsx-runtime.d.ts","./node_modules/next/dist/next-devtools/dev-overlay/container/runtime-error/render-error.d.ts","./node_modules/next/dist/next-devtools/dev-overlay/shared.d.ts","./node_modules/next/dist/server/dev/hot-reloader-types.d.ts","./node_modules/next/dist/server/lib/cache-handlers/types.d.ts","./node_modules/next/dist/server/response-cache/types.d.ts","./node_modules/next/dist/server/resume-data-cache/cache-store.d.ts","./node_modules/next/dist/server/resume-data-cache/resume-data-cache.d.ts","./node_modules/next/dist/server/render-result.d.ts","./node_modules/next/dist/server/lib/i18n-provider.d.ts","./node_modules/next/dist/server/web/next-url.d.ts","./node_modules/next/dist/compiled/@edge-runtime/cookies/index.d.ts","./node_modules/next/dist/server/web/spec-extension/cookies.d.ts","./node_modules/next/dist/server/web/spec-extension/request.d.ts","./node_modules/next/dist/server/after/builtin-request-context.d.ts","./node_modules/next/dist/server/web/spec-extension/fetch-event.d.ts","./node_modules/next/dist/server/web/spec-extension/response.d.ts","./node_modules/next/dist/build/segment-config/middleware/middleware-config.d.ts","./node_modules/next/dist/server/web/types.d.ts","./node_modules/next/dist/build/webpack/plugins/pages-manifest-plugin.d.ts","./node_modules/next/dist/shared/lib/router/utils/parse-url.d.ts","./node_modules/next/dist/server/base-http/node.d.ts","./node_modules/next/dist/build/webpack/plugins/next-font-manifest-plugin.d.ts","./node_modules/next/dist/server/route-definitions/locale-route-definition.d.ts","./node_modules/next/dist/server/route-definitions/pages-route-definition.d.ts","./node_modules/next/dist/shared/lib/mitt.d.ts","./node_modules/next/dist/client/with-router.d.ts","./node_modules/next/dist/client/router.d.ts","./node_modules/next/dist/client/route-loader.d.ts","./node_modules/next/dist/client/page-loader.d.ts","./node_modules/next/dist/shared/lib/router/router.d.ts","./node_modules/next/dist/shared/lib/router-context.shared-runtime.d.ts","./node_modules/next/dist/shared/lib/loadable-context.shared-runtime.d.ts","./node_modules/next/dist/shared/lib/loadable.shared-runtime.d.ts","./node_modules/next/dist/shared/lib/image-config-context.shared-runtime.d.ts","./node_modules/next/dist/shared/lib/hooks-client-context.shared-runtime.d.ts","./node_modules/next/dist/shared/lib/head-manager-context.shared-runtime.d.ts","./node_modules/next/dist/server/route-definitions/app-page-route-definition.d.ts","./node_modules/next/dist/build/webpack/loaders/metadata/types.d.ts","./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.d.ts","./node_modules/next/dist/server/lib/app-dir-module.d.ts","./node_modules/next/dist/server/web/spec-extension/adapters/request-cookies.d.ts","./node_modules/next/dist/server/async-storage/draft-mode-provider.d.ts","./node_modules/next/dist/server/web/spec-extension/adapters/headers.d.ts","./node_modules/next/dist/server/app-render/cache-signal.d.ts","./node_modules/next/dist/server/app-render/dynamic-rendering.d.ts","./node_modules/next/dist/server/request/fallback-params.d.ts","./node_modules/next/dist/server/app-render/work-unit-async-storage-instance.d.ts","./node_modules/next/dist/server/response-cache/index.d.ts","./node_modules/next/dist/server/lib/lazy-result.d.ts","./node_modules/next/dist/server/lib/implicit-tags.d.ts","./node_modules/next/dist/server/app-render/work-unit-async-storage.external.d.ts","./node_modules/next/dist/shared/lib/deep-readonly.d.ts","./node_modules/next/dist/shared/lib/router/utils/parse-relative-url.d.ts","./node_modules/next/dist/server/app-render/app-render.d.ts","./node_modules/next/dist/shared/lib/server-inserted-html.shared-runtime.d.ts","./node_modules/next/dist/shared/lib/amp-context.shared-runtime.d.ts","./node_modules/next/dist/server/route-modules/app-page/vendored/contexts/entrypoints.d.ts","./node_modules/next/dist/server/route-modules/app-page/module.compiled.d.ts","./node_modules/next/dist/client/components/error-boundary.d.ts","./node_modules/next/dist/client/components/layout-router.d.ts","./node_modules/next/dist/client/components/render-from-template-context.d.ts","./node_modules/next/dist/server/app-render/action-async-storage-instance.d.ts","./node_modules/next/dist/server/app-render/action-async-storage.external.d.ts","./node_modules/next/dist/client/components/client-page.d.ts","./node_modules/next/dist/client/components/client-segment.d.ts","./node_modules/next/dist/server/request/search-params.d.ts","./node_modules/next/dist/client/components/hooks-server-context.d.ts","./node_modules/next/dist/client/components/http-access-fallback/error-boundary.d.ts","./node_modules/next/dist/lib/metadata/types/alternative-urls-types.d.ts","./node_modules/next/dist/lib/metadata/types/extra-types.d.ts","./node_modules/next/dist/lib/metadata/types/metadata-types.d.ts","./node_modules/next/dist/lib/metadata/types/manifest-types.d.ts","./node_modules/next/dist/lib/metadata/types/opengraph-types.d.ts","./node_modules/next/dist/lib/metadata/types/twitter-types.d.ts","./node_modules/next/dist/lib/metadata/types/metadata-interface.d.ts","./node_modules/next/dist/lib/metadata/types/resolvers.d.ts","./node_modules/next/dist/lib/metadata/types/icons.d.ts","./node_modules/next/dist/lib/metadata/resolve-metadata.d.ts","./node_modules/next/dist/lib/metadata/metadata.d.ts","./node_modules/next/dist/lib/framework/boundary-components.d.ts","./node_modules/next/dist/server/app-render/rsc/preloads.d.ts","./node_modules/next/dist/server/app-render/rsc/postpone.d.ts","./node_modules/next/dist/server/app-render/rsc/taint.d.ts","./node_modules/next/dist/shared/lib/segment-cache/segment-value-encoding.d.ts","./node_modules/next/dist/server/app-render/collect-segment-data.d.ts","./node_modules/next/dist/next-devtools/userspace/app/segment-explorer-node.d.ts","./node_modules/next/dist/server/app-render/entry-base.d.ts","./node_modules/next/dist/build/templates/app-page.d.ts","./node_modules/@types/react/jsx-dev-runtime.d.ts","./node_modules/@types/react/compiler-runtime.d.ts","./node_modules/next/dist/server/route-modules/app-page/vendored/rsc/entrypoints.d.ts","./node_modules/@types/react-dom/client.d.ts","./node_modules/@types/react-dom/static.d.ts","./node_modules/@types/react-dom/server.d.ts","./node_modules/next/dist/server/route-modules/app-page/vendored/ssr/entrypoints.d.ts","./node_modules/next/dist/server/route-modules/app-page/module.d.ts","./node_modules/next/dist/server/web/adapter.d.ts","./node_modules/next/dist/server/use-cache/cache-life.d.ts","./node_modules/next/dist/server/app-render/types.d.ts","./node_modules/next/dist/client/components/router-reducer/router-reducer-types.d.ts","./node_modules/next/dist/client/flight-data-helpers.d.ts","./node_modules/next/dist/client/components/router-reducer/fetch-server-response.d.ts","./node_modules/next/dist/shared/lib/app-router-context.shared-runtime.d.ts","./node_modules/next/dist/server/route-modules/pages/vendored/contexts/entrypoints.d.ts","./node_modules/next/dist/server/route-modules/pages/module.compiled.d.ts","./node_modules/next/dist/build/templates/pages.d.ts","./node_modules/next/dist/server/route-modules/pages/module.d.ts","./node_modules/next/dist/next-devtools/userspace/pages/pages-dev-overlay-setup.d.ts","./node_modules/next/dist/server/render.d.ts","./node_modules/next/dist/server/route-definitions/pages-api-route-definition.d.ts","./node_modules/next/dist/server/route-matches/pages-api-route-match.d.ts","./node_modules/next/dist/server/route-matchers/route-matcher.d.ts","./node_modules/next/dist/server/route-matcher-providers/route-matcher-provider.d.ts","./node_modules/next/dist/server/route-matcher-managers/route-matcher-manager.d.ts","./node_modules/next/dist/server/normalizers/normalizer.d.ts","./node_modules/next/dist/server/normalizers/locale-route-normalizer.d.ts","./node_modules/next/dist/server/normalizers/request/pathname-normalizer.d.ts","./node_modules/next/dist/server/normalizers/request/suffix.d.ts","./node_modules/next/dist/server/normalizers/request/rsc.d.ts","./node_modules/next/dist/server/normalizers/request/prefetch-rsc.d.ts","./node_modules/next/dist/server/normalizers/request/next-data.d.ts","./node_modules/next/dist/server/normalizers/request/segment-prefix-rsc.d.ts","./node_modules/next/dist/build/static-paths/types.d.ts","./node_modules/next/dist/server/base-server.d.ts","./node_modules/next/dist/server/lib/async-callback-set.d.ts","./node_modules/next/dist/shared/lib/router/utils/route-regex.d.ts","./node_modules/next/dist/shared/lib/router/utils/route-matcher.d.ts","./node_modules/sharp/lib/index.d.ts","./node_modules/next/dist/server/image-optimizer.d.ts","./node_modules/next/dist/server/next-server.d.ts","./node_modules/next/dist/server/lib/types.d.ts","./node_modules/next/dist/server/lib/lru-cache.d.ts","./node_modules/next/dist/server/lib/dev-bundler-service.d.ts","./node_modules/next/dist/server/dev/static-paths-worker.d.ts","./node_modules/next/dist/server/dev/next-dev-server.d.ts","./node_modules/next/dist/server/next.d.ts","./node_modules/next/dist/server/lib/render-server.d.ts","./node_modules/next/dist/server/lib/router-server.d.ts","./node_modules/next/dist/shared/lib/router/utils/path-match.d.ts","./node_modules/next/dist/server/lib/router-utils/filesystem.d.ts","./node_modules/next/dist/server/lib/router-utils/setup-dev-bundler.d.ts","./node_modules/next/dist/server/lib/router-utils/router-server-context.d.ts","./node_modules/next/dist/server/route-modules/route-module.d.ts","./node_modules/next/dist/server/load-components.d.ts","./node_modules/next/dist/server/route-definitions/app-route-route-definition.d.ts","./node_modules/next/dist/server/async-storage/work-store.d.ts","./node_modules/next/dist/server/web/http.d.ts","./node_modules/next/dist/server/route-modules/app-route/shared-modules.d.ts","./node_modules/next/dist/client/components/redirect-status-code.d.ts","./node_modules/next/dist/client/components/redirect-error.d.ts","./node_modules/next/dist/build/templates/app-route.d.ts","./node_modules/next/dist/server/route-modules/app-route/module.d.ts","./node_modules/next/dist/server/route-modules/app-route/module.compiled.d.ts","./node_modules/next/dist/build/segment-config/app/app-segments.d.ts","./node_modules/next/dist/build/utils.d.ts","./node_modules/next/dist/build/turborepo-access-trace/types.d.ts","./node_modules/next/dist/build/turborepo-access-trace/result.d.ts","./node_modules/next/dist/build/turborepo-access-trace/helpers.d.ts","./node_modules/next/dist/build/turborepo-access-trace/index.d.ts","./node_modules/next/dist/export/routes/types.d.ts","./node_modules/next/dist/export/types.d.ts","./node_modules/next/dist/export/worker.d.ts","./node_modules/next/dist/build/worker.d.ts","./node_modules/next/dist/build/index.d.ts","./node_modules/next/dist/server/lib/incremental-cache/index.d.ts","./node_modules/next/dist/server/after/after.d.ts","./node_modules/next/dist/server/after/after-context.d.ts","./node_modules/next/dist/server/app-render/work-async-storage-instance.d.ts","./node_modules/next/dist/server/app-render/work-async-storage.external.d.ts","./node_modules/next/dist/server/request/params.d.ts","./node_modules/next/dist/server/route-matches/route-match.d.ts","./node_modules/next/dist/server/request-meta.d.ts","./node_modules/next/dist/cli/next-test.d.ts","./node_modules/next/dist/server/config-shared.d.ts","./node_modules/next/dist/server/base-http/index.d.ts","./node_modules/next/dist/server/api-utils/index.d.ts","./node_modules/next/dist/types.d.ts","./node_modules/next/dist/shared/lib/html-context.shared-runtime.d.ts","./node_modules/next/dist/shared/lib/utils.d.ts","./node_modules/next/dist/pages/_app.d.ts","./node_modules/next/app.d.ts","./node_modules/next/dist/server/web/spec-extension/unstable-cache.d.ts","./node_modules/next/dist/server/web/spec-extension/revalidate.d.ts","./node_modules/next/dist/server/web/spec-extension/unstable-no-store.d.ts","./node_modules/next/dist/server/use-cache/cache-tag.d.ts","./node_modules/next/cache.d.ts","./node_modules/next/dist/shared/lib/runtime-config.external.d.ts","./node_modules/next/config.d.ts","./node_modules/next/dist/pages/_document.d.ts","./node_modules/next/document.d.ts","./node_modules/next/dist/shared/lib/dynamic.d.ts","./node_modules/next/dynamic.d.ts","./node_modules/next/dist/pages/_error.d.ts","./node_modules/next/error.d.ts","./node_modules/next/dist/shared/lib/head.d.ts","./node_modules/next/head.d.ts","./node_modules/next/dist/server/request/cookies.d.ts","./node_modules/next/dist/server/request/headers.d.ts","./node_modules/next/dist/server/request/draft-mode.d.ts","./node_modules/next/headers.d.ts","./node_modules/next/dist/shared/lib/get-img-props.d.ts","./node_modules/next/dist/client/image-component.d.ts","./node_modules/next/dist/shared/lib/image-external.d.ts","./node_modules/next/image.d.ts","./node_modules/next/dist/client/link.d.ts","./node_modules/next/link.d.ts","./node_modules/next/dist/client/components/redirect.d.ts","./node_modules/next/dist/client/components/not-found.d.ts","./node_modules/next/dist/client/components/forbidden.d.ts","./node_modules/next/dist/client/components/unauthorized.d.ts","./node_modules/next/dist/client/components/unstable-rethrow.server.d.ts","./node_modules/next/dist/client/components/unstable-rethrow.d.ts","./node_modules/next/dist/client/components/navigation.react-server.d.ts","./node_modules/next/dist/client/components/unrecognized-action-error.d.ts","./node_modules/next/dist/client/components/navigation.d.ts","./node_modules/next/navigation.d.ts","./node_modules/next/router.d.ts","./node_modules/next/dist/client/script.d.ts","./node_modules/next/script.d.ts","./node_modules/next/dist/server/web/spec-extension/user-agent.d.ts","./node_modules/next/dist/compiled/@edge-runtime/primitives/url.d.ts","./node_modules/next/dist/server/web/spec-extension/image-response.d.ts","./node_modules/next/dist/compiled/@vercel/og/satori/index.d.ts","./node_modules/next/dist/compiled/@vercel/og/emoji/index.d.ts","./node_modules/next/dist/compiled/@vercel/og/types.d.ts","./node_modules/next/dist/server/after/index.d.ts","./node_modules/next/dist/server/request/root-params.d.ts","./node_modules/next/dist/server/request/connection.d.ts","./node_modules/next/server.d.ts","./node_modules/next/types/global.d.ts","./node_modules/next/types/compiled.d.ts","./node_modules/next/types.d.ts","./node_modules/next/index.d.ts","./node_modules/next/image-types/global.d.ts","./next-env.d.ts","./types.ts","./app/manifest.ts","./app/robots.ts","./lib/types.ts","./lib/constants/blog.tsx","./lib/constants/services.tsx","./app/sitemap.ts","./node_modules/@genkit-ai/core/node_modules/zod/v3/helpers/typeAliases.d.cts","./node_modules/@genkit-ai/core/node_modules/zod/v3/helpers/util.d.cts","./node_modules/@genkit-ai/core/node_modules/zod/v3/index.d.cts","./node_modules/@genkit-ai/core/node_modules/zod/v3/ZodError.d.cts","./node_modules/@genkit-ai/core/node_modules/zod/v3/locales/en.d.cts","./node_modules/@genkit-ai/core/node_modules/zod/v3/errors.d.cts","./node_modules/@genkit-ai/core/node_modules/zod/v3/helpers/parseUtil.d.cts","./node_modules/@genkit-ai/core/node_modules/zod/v3/helpers/enumUtil.d.cts","./node_modules/@genkit-ai/core/node_modules/zod/v3/helpers/errorUtil.d.cts","./node_modules/@genkit-ai/core/node_modules/zod/v3/helpers/partialUtil.d.cts","./node_modules/@genkit-ai/core/node_modules/zod/v3/standard-schema.d.cts","./node_modules/@genkit-ai/core/node_modules/zod/v3/types.d.cts","./node_modules/@genkit-ai/core/node_modules/zod/v3/external.d.cts","./node_modules/@genkit-ai/core/node_modules/zod/index.d.cts","./node_modules/@types/json-schema/index.d.ts","./node_modules/@genkit-ai/core/lib/context.d.ts","./node_modules/@genkit-ai/core/lib/statusTypes.d.ts","./node_modules/dotprompt/dist/index.d.ts","./node_modules/fast-uri/types/index.d.ts","./node_modules/ajv/dist/compile/codegen/code.d.ts","./node_modules/ajv/dist/compile/codegen/scope.d.ts","./node_modules/ajv/dist/compile/codegen/index.d.ts","./node_modules/ajv/dist/compile/rules.d.ts","./node_modules/ajv/dist/compile/util.d.ts","./node_modules/ajv/dist/compile/validate/subschema.d.ts","./node_modules/ajv/dist/compile/errors.d.ts","./node_modules/ajv/dist/compile/validate/index.d.ts","./node_modules/ajv/dist/compile/validate/dataType.d.ts","./node_modules/ajv/dist/vocabularies/applicator/additionalItems.d.ts","./node_modules/ajv/dist/vocabularies/applicator/items2020.d.ts","./node_modules/ajv/dist/vocabularies/applicator/contains.d.ts","./node_modules/ajv/dist/vocabularies/applicator/dependencies.d.ts","./node_modules/ajv/dist/vocabularies/applicator/propertyNames.d.ts","./node_modules/ajv/dist/vocabularies/applicator/additionalProperties.d.ts","./node_modules/ajv/dist/vocabularies/applicator/not.d.ts","./node_modules/ajv/dist/vocabularies/applicator/anyOf.d.ts","./node_modules/ajv/dist/vocabularies/applicator/oneOf.d.ts","./node_modules/ajv/dist/vocabularies/applicator/if.d.ts","./node_modules/ajv/dist/vocabularies/applicator/index.d.ts","./node_modules/ajv/dist/vocabularies/validation/limitNumber.d.ts","./node_modules/ajv/dist/vocabularies/validation/multipleOf.d.ts","./node_modules/ajv/dist/vocabularies/validation/pattern.d.ts","./node_modules/ajv/dist/vocabularies/validation/required.d.ts","./node_modules/ajv/dist/vocabularies/validation/uniqueItems.d.ts","./node_modules/ajv/dist/vocabularies/validation/const.d.ts","./node_modules/ajv/dist/vocabularies/validation/enum.d.ts","./node_modules/ajv/dist/vocabularies/validation/index.d.ts","./node_modules/ajv/dist/vocabularies/format/format.d.ts","./node_modules/ajv/dist/vocabularies/unevaluated/unevaluatedProperties.d.ts","./node_modules/ajv/dist/vocabularies/unevaluated/unevaluatedItems.d.ts","./node_modules/ajv/dist/vocabularies/validation/dependentRequired.d.ts","./node_modules/ajv/dist/vocabularies/discriminator/types.d.ts","./node_modules/ajv/dist/vocabularies/discriminator/index.d.ts","./node_modules/ajv/dist/vocabularies/errors.d.ts","./node_modules/ajv/dist/types/json-schema.d.ts","./node_modules/ajv/dist/types/jtd-schema.d.ts","./node_modules/ajv/dist/runtime/validation_error.d.ts","./node_modules/ajv/dist/compile/ref_error.d.ts","./node_modules/ajv/dist/core.d.ts","./node_modules/ajv/dist/compile/resolve.d.ts","./node_modules/ajv/dist/compile/index.d.ts","./node_modules/ajv/dist/types/index.d.ts","./node_modules/ajv/dist/ajv.d.ts","./node_modules/@genkit-ai/core/lib/action-BSRKjsZQ.d.ts","./node_modules/@genkit-ai/core/lib/async-context.d.ts","./node_modules/@genkit-ai/core/lib/flow.d.ts","./node_modules/@genkit-ai/core/lib/reflection.d.ts","./node_modules/@opentelemetry/api/build/src/baggage/internal/symbol.d.ts","./node_modules/@opentelemetry/api/build/src/baggage/types.d.ts","./node_modules/@opentelemetry/api/build/src/baggage/utils.d.ts","./node_modules/@opentelemetry/api/build/src/common/Exception.d.ts","./node_modules/@opentelemetry/api/build/src/common/Time.d.ts","./node_modules/@opentelemetry/api/build/src/common/Attributes.d.ts","./node_modules/@opentelemetry/api/build/src/context/types.d.ts","./node_modules/@opentelemetry/api/build/src/context/context.d.ts","./node_modules/@opentelemetry/api/build/src/api/context.d.ts","./node_modules/@opentelemetry/api/build/src/diag/types.d.ts","./node_modules/@opentelemetry/api/build/src/diag/consoleLogger.d.ts","./node_modules/@opentelemetry/api/build/src/api/diag.d.ts","./node_modules/@opentelemetry/api/build/src/metrics/ObservableResult.d.ts","./node_modules/@opentelemetry/api/build/src/metrics/Metric.d.ts","./node_modules/@opentelemetry/api/build/src/metrics/Meter.d.ts","./node_modules/@opentelemetry/api/build/src/metrics/NoopMeter.d.ts","./node_modules/@opentelemetry/api/build/src/metrics/MeterProvider.d.ts","./node_modules/@opentelemetry/api/build/src/api/metrics.d.ts","./node_modules/@opentelemetry/api/build/src/propagation/TextMapPropagator.d.ts","./node_modules/@opentelemetry/api/build/src/baggage/context-helpers.d.ts","./node_modules/@opentelemetry/api/build/src/api/propagation.d.ts","./node_modules/@opentelemetry/api/build/src/trace/attributes.d.ts","./node_modules/@opentelemetry/api/build/src/trace/trace_state.d.ts","./node_modules/@opentelemetry/api/build/src/trace/span_context.d.ts","./node_modules/@opentelemetry/api/build/src/trace/link.d.ts","./node_modules/@opentelemetry/api/build/src/trace/status.d.ts","./node_modules/@opentelemetry/api/build/src/trace/span.d.ts","./node_modules/@opentelemetry/api/build/src/trace/span_kind.d.ts","./node_modules/@opentelemetry/api/build/src/trace/SpanOptions.d.ts","./node_modules/@opentelemetry/api/build/src/trace/tracer.d.ts","./node_modules/@opentelemetry/api/build/src/trace/tracer_options.d.ts","./node_modules/@opentelemetry/api/build/src/trace/ProxyTracer.d.ts","./node_modules/@opentelemetry/api/build/src/trace/tracer_provider.d.ts","./node_modules/@opentelemetry/api/build/src/trace/ProxyTracerProvider.d.ts","./node_modules/@opentelemetry/api/build/src/trace/SamplingResult.d.ts","./node_modules/@opentelemetry/api/build/src/trace/Sampler.d.ts","./node_modules/@opentelemetry/api/build/src/trace/trace_flags.d.ts","./node_modules/@opentelemetry/api/build/src/trace/internal/utils.d.ts","./node_modules/@opentelemetry/api/build/src/trace/spancontext-utils.d.ts","./node_modules/@opentelemetry/api/build/src/trace/invalid-span-constants.d.ts","./node_modules/@opentelemetry/api/build/src/trace/context-utils.d.ts","./node_modules/@opentelemetry/api/build/src/api/trace.d.ts","./node_modules/@opentelemetry/api/build/src/context-api.d.ts","./node_modules/@opentelemetry/api/build/src/diag-api.d.ts","./node_modules/@opentelemetry/api/build/src/metrics-api.d.ts","./node_modules/@opentelemetry/api/build/src/propagation-api.d.ts","./node_modules/@opentelemetry/api/build/src/trace-api.d.ts","./node_modules/@opentelemetry/api/build/src/index.d.ts","./node_modules/@opentelemetry/sdk-node/node_modules/@opentelemetry/core/build/src/baggage/propagation/W3CBaggagePropagator.d.ts","./node_modules/@opentelemetry/sdk-node/node_modules/@opentelemetry/core/build/src/common/anchored-clock.d.ts","./node_modules/@opentelemetry/sdk-node/node_modules/@opentelemetry/core/build/src/common/attributes.d.ts","./node_modules/@opentelemetry/sdk-node/node_modules/@opentelemetry/core/build/src/common/types.d.ts","./node_modules/@opentelemetry/sdk-node/node_modules/@opentelemetry/core/build/src/common/global-error-handler.d.ts","./node_modules/@opentelemetry/sdk-node/node_modules/@opentelemetry/core/build/src/common/logging-error-handler.d.ts","./node_modules/@opentelemetry/sdk-node/node_modules/@opentelemetry/core/build/src/common/time.d.ts","./node_modules/@opentelemetry/sdk-node/node_modules/@opentelemetry/core/build/src/common/hex-to-binary.d.ts","./node_modules/@opentelemetry/sdk-node/node_modules/@opentelemetry/core/build/src/ExportResult.d.ts","./node_modules/@opentelemetry/sdk-node/node_modules/@opentelemetry/core/build/src/baggage/utils.d.ts","./node_modules/@opentelemetry/sdk-node/node_modules/@opentelemetry/core/build/src/utils/environment.d.ts","./node_modules/@opentelemetry/sdk-node/node_modules/@opentelemetry/core/build/src/platform/node/environment.d.ts","./node_modules/@opentelemetry/sdk-node/node_modules/@opentelemetry/core/build/src/platform/node/globalThis.d.ts","./node_modules/@opentelemetry/sdk-node/node_modules/@opentelemetry/core/build/src/platform/node/hex-to-base64.d.ts","./node_modules/@opentelemetry/sdk-node/node_modules/@opentelemetry/core/build/src/trace/IdGenerator.d.ts","./node_modules/@opentelemetry/sdk-node/node_modules/@opentelemetry/core/build/src/platform/node/RandomIdGenerator.d.ts","./node_modules/@opentelemetry/sdk-node/node_modules/@opentelemetry/core/build/src/platform/node/performance.d.ts","./node_modules/@opentelemetry/sdk-node/node_modules/@opentelemetry/core/build/src/platform/node/sdk-info.d.ts","./node_modules/@opentelemetry/sdk-node/node_modules/@opentelemetry/core/build/src/platform/node/timer-util.d.ts","./node_modules/@opentelemetry/sdk-node/node_modules/@opentelemetry/core/build/src/platform/node/index.d.ts","./node_modules/@opentelemetry/sdk-node/node_modules/@opentelemetry/core/build/src/platform/index.d.ts","./node_modules/@opentelemetry/sdk-node/node_modules/@opentelemetry/core/build/src/propagation/composite.d.ts","./node_modules/@opentelemetry/sdk-node/node_modules/@opentelemetry/core/build/src/trace/W3CTraceContextPropagator.d.ts","./node_modules/@opentelemetry/sdk-node/node_modules/@opentelemetry/core/build/src/trace/rpc-metadata.d.ts","./node_modules/@opentelemetry/sdk-node/node_modules/@opentelemetry/core/build/src/trace/sampler/AlwaysOffSampler.d.ts","./node_modules/@opentelemetry/sdk-node/node_modules/@opentelemetry/core/build/src/trace/sampler/AlwaysOnSampler.d.ts","./node_modules/@opentelemetry/sdk-node/node_modules/@opentelemetry/core/build/src/trace/sampler/ParentBasedSampler.d.ts","./node_modules/@opentelemetry/sdk-node/node_modules/@opentelemetry/core/build/src/trace/sampler/TraceIdRatioBasedSampler.d.ts","./node_modules/@opentelemetry/sdk-node/node_modules/@opentelemetry/core/build/src/trace/suppress-tracing.d.ts","./node_modules/@opentelemetry/sdk-node/node_modules/@opentelemetry/core/build/src/trace/TraceState.d.ts","./node_modules/@opentelemetry/sdk-node/node_modules/@opentelemetry/core/build/src/utils/merge.d.ts","./node_modules/@opentelemetry/sdk-node/node_modules/@opentelemetry/core/build/src/utils/sampling.d.ts","./node_modules/@opentelemetry/sdk-node/node_modules/@opentelemetry/core/build/src/utils/timeout.d.ts","./node_modules/@opentelemetry/sdk-node/node_modules/@opentelemetry/core/build/src/utils/url.d.ts","./node_modules/@opentelemetry/sdk-node/node_modules/@opentelemetry/core/build/src/utils/wrap.d.ts","./node_modules/@opentelemetry/sdk-node/node_modules/@opentelemetry/core/build/src/utils/callback.d.ts","./node_modules/@opentelemetry/sdk-node/node_modules/@opentelemetry/core/build/src/version.d.ts","./node_modules/@opentelemetry/sdk-node/node_modules/@opentelemetry/core/build/src/internal/exporter.d.ts","./node_modules/@opentelemetry/sdk-node/node_modules/@opentelemetry/core/build/src/index.d.ts","./node_modules/@opentelemetry/resources/build/src/config.d.ts","./node_modules/@opentelemetry/resources/build/src/IResource.d.ts","./node_modules/@opentelemetry/resources/build/src/types.d.ts","./node_modules/@opentelemetry/resources/build/src/Resource.d.ts","./node_modules/@opentelemetry/resources/build/src/platform/node/default-service-name.d.ts","./node_modules/@opentelemetry/resources/build/src/platform/node/index.d.ts","./node_modules/@opentelemetry/resources/build/src/platform/index.d.ts","./node_modules/@opentelemetry/resources/build/src/detectors/platform/node/HostDetector.d.ts","./node_modules/@opentelemetry/resources/build/src/detectors/platform/node/HostDetectorSync.d.ts","./node_modules/@opentelemetry/resources/build/src/detectors/platform/node/OSDetector.d.ts","./node_modules/@opentelemetry/resources/build/src/detectors/platform/node/OSDetectorSync.d.ts","./node_modules/@opentelemetry/resources/build/src/detectors/platform/node/ProcessDetector.d.ts","./node_modules/@opentelemetry/resources/build/src/detectors/platform/node/ProcessDetectorSync.d.ts","./node_modules/@opentelemetry/resources/build/src/detectors/platform/node/ServiceInstanceIdDetectorSync.d.ts","./node_modules/@opentelemetry/resources/build/src/detectors/platform/node/index.d.ts","./node_modules/@opentelemetry/resources/build/src/detectors/platform/index.d.ts","./node_modules/@opentelemetry/resources/build/src/detectors/BrowserDetector.d.ts","./node_modules/@opentelemetry/resources/build/src/detectors/EnvDetector.d.ts","./node_modules/@opentelemetry/resources/build/src/detectors/BrowserDetectorSync.d.ts","./node_modules/@opentelemetry/resources/build/src/detectors/EnvDetectorSync.d.ts","./node_modules/@opentelemetry/resources/build/src/detectors/index.d.ts","./node_modules/@opentelemetry/resources/build/src/detect-resources.d.ts","./node_modules/@opentelemetry/resources/build/src/index.d.ts","./node_modules/@opentelemetry/sdk-logs/build/src/types.d.ts","./node_modules/@opentelemetry/api-logs/build/src/types/AnyValue.d.ts","./node_modules/@opentelemetry/api-logs/build/src/types/LogRecord.d.ts","./node_modules/@opentelemetry/api-logs/build/src/types/Logger.d.ts","./node_modules/@opentelemetry/api-logs/build/src/types/LoggerOptions.d.ts","./node_modules/@opentelemetry/api-logs/build/src/types/LoggerProvider.d.ts","./node_modules/@opentelemetry/api-logs/build/src/NoopLogger.d.ts","./node_modules/@opentelemetry/api-logs/build/src/NoopLoggerProvider.d.ts","./node_modules/@opentelemetry/api-logs/build/src/api/logs.d.ts","./node_modules/@opentelemetry/api-logs/build/src/index.d.ts","./node_modules/@opentelemetry/sdk-logs/node_modules/@opentelemetry/core/build/src/index.d.ts","./node_modules/@opentelemetry/sdk-logs/build/src/export/ReadableLogRecord.d.ts","./node_modules/@opentelemetry/sdk-logs/build/src/internal/LoggerProviderSharedState.d.ts","./node_modules/@opentelemetry/sdk-logs/build/src/LogRecord.d.ts","./node_modules/@opentelemetry/sdk-logs/build/src/LogRecordProcessor.d.ts","./node_modules/@opentelemetry/sdk-logs/build/src/LoggerProvider.d.ts","./node_modules/@opentelemetry/sdk-logs/build/src/export/NoopLogRecordProcessor.d.ts","./node_modules/@opentelemetry/sdk-logs/build/src/export/LogRecordExporter.d.ts","./node_modules/@opentelemetry/sdk-logs/build/src/export/ConsoleLogRecordExporter.d.ts","./node_modules/@opentelemetry/sdk-logs/build/src/export/SimpleLogRecordProcessor.d.ts","./node_modules/@opentelemetry/sdk-logs/build/src/export/InMemoryLogRecordExporter.d.ts","./node_modules/@opentelemetry/sdk-logs/build/src/export/BatchLogRecordProcessorBase.d.ts","./node_modules/@opentelemetry/sdk-logs/build/src/platform/node/export/BatchLogRecordProcessor.d.ts","./node_modules/@opentelemetry/sdk-logs/build/src/platform/node/index.d.ts","./node_modules/@opentelemetry/sdk-logs/build/src/platform/index.d.ts","./node_modules/@opentelemetry/sdk-logs/build/src/index.d.ts","./node_modules/@opentelemetry/sdk-metrics/node_modules/@opentelemetry/core/build/src/index.d.ts","./node_modules/@opentelemetry/sdk-metrics/build/src/view/AttributesProcessor.d.ts","./node_modules/@opentelemetry/sdk-metrics/build/src/view/Predicate.d.ts","./node_modules/@opentelemetry/sdk-metrics/build/src/view/InstrumentSelector.d.ts","./node_modules/@opentelemetry/sdk-metrics/build/src/view/MeterSelector.d.ts","./node_modules/@opentelemetry/sdk-metrics/build/src/export/AggregationTemporality.d.ts","./node_modules/@opentelemetry/sdk-metrics/build/src/utils.d.ts","./node_modules/@opentelemetry/sdk-metrics/build/src/aggregator/types.d.ts","./node_modules/@opentelemetry/sdk-metrics/build/src/aggregator/Drop.d.ts","./node_modules/@opentelemetry/sdk-metrics/build/src/aggregator/Histogram.d.ts","./node_modules/@opentelemetry/sdk-metrics/build/src/aggregator/exponential-histogram/Buckets.d.ts","./node_modules/@opentelemetry/sdk-metrics/build/src/aggregator/exponential-histogram/mapping/types.d.ts","./node_modules/@opentelemetry/sdk-metrics/build/src/aggregator/ExponentialHistogram.d.ts","./node_modules/@opentelemetry/sdk-metrics/build/src/aggregator/LastValue.d.ts","./node_modules/@opentelemetry/sdk-metrics/build/src/aggregator/Sum.d.ts","./node_modules/@opentelemetry/sdk-metrics/build/src/aggregator/index.d.ts","./node_modules/@opentelemetry/sdk-metrics/build/src/view/Aggregation.d.ts","./node_modules/@opentelemetry/sdk-metrics/build/src/view/View.d.ts","./node_modules/@opentelemetry/sdk-metrics/build/src/InstrumentDescriptor.d.ts","./node_modules/@opentelemetry/sdk-metrics/build/src/export/MetricData.d.ts","./node_modules/@opentelemetry/sdk-metrics/build/src/export/AggregationSelector.d.ts","./node_modules/@opentelemetry/sdk-metrics/build/src/export/MetricExporter.d.ts","./node_modules/@opentelemetry/sdk-metrics/build/src/export/MetricProducer.d.ts","./node_modules/@opentelemetry/sdk-metrics/build/src/types.d.ts","./node_modules/@opentelemetry/sdk-metrics/build/src/export/MetricReader.d.ts","./node_modules/@opentelemetry/sdk-metrics/build/src/export/PeriodicExportingMetricReader.d.ts","./node_modules/@opentelemetry/sdk-metrics/build/src/export/InMemoryMetricExporter.d.ts","./node_modules/@opentelemetry/sdk-metrics/build/src/export/ConsoleMetricExporter.d.ts","./node_modules/@opentelemetry/sdk-metrics/build/src/MeterProvider.d.ts","./node_modules/@opentelemetry/sdk-metrics/build/src/index.d.ts","./node_modules/@opentelemetry/sdk-trace-base/node_modules/@opentelemetry/core/build/src/index.d.ts","./node_modules/@opentelemetry/sdk-trace-base/build/src/IdGenerator.d.ts","./node_modules/@opentelemetry/sdk-trace-base/build/src/Sampler.d.ts","./node_modules/@opentelemetry/sdk-trace-base/build/src/types.d.ts","./node_modules/@opentelemetry/sdk-trace-base/build/src/TimedEvent.d.ts","./node_modules/@opentelemetry/sdk-trace-base/build/src/export/ReadableSpan.d.ts","./node_modules/@opentelemetry/sdk-trace-base/build/src/export/SpanExporter.d.ts","./node_modules/@opentelemetry/sdk-trace-base/build/src/BasicTracerProvider.d.ts","./node_modules/@opentelemetry/sdk-trace-base/build/src/Span.d.ts","./node_modules/@opentelemetry/sdk-trace-base/build/src/SpanProcessor.d.ts","./node_modules/@opentelemetry/sdk-trace-base/build/src/Tracer.d.ts","./node_modules/@opentelemetry/sdk-trace-base/build/src/export/BatchSpanProcessorBase.d.ts","./node_modules/@opentelemetry/sdk-trace-base/build/src/platform/node/export/BatchSpanProcessor.d.ts","./node_modules/@opentelemetry/sdk-trace-base/build/src/platform/node/RandomIdGenerator.d.ts","./node_modules/@opentelemetry/sdk-trace-base/build/src/platform/node/index.d.ts","./node_modules/@opentelemetry/sdk-trace-base/build/src/platform/index.d.ts","./node_modules/@opentelemetry/sdk-trace-base/build/src/export/ConsoleSpanExporter.d.ts","./node_modules/@opentelemetry/sdk-trace-base/build/src/export/InMemorySpanExporter.d.ts","./node_modules/@opentelemetry/sdk-trace-base/build/src/export/SimpleSpanProcessor.d.ts","./node_modules/@opentelemetry/sdk-trace-base/build/src/export/NoopSpanProcessor.d.ts","./node_modules/@opentelemetry/sdk-trace-base/build/src/sampler/AlwaysOffSampler.d.ts","./node_modules/@opentelemetry/sdk-trace-base/build/src/sampler/AlwaysOnSampler.d.ts","./node_modules/@opentelemetry/sdk-trace-base/build/src/sampler/ParentBasedSampler.d.ts","./node_modules/@opentelemetry/sdk-trace-base/build/src/sampler/TraceIdRatioBasedSampler.d.ts","./node_modules/@opentelemetry/sdk-trace-base/build/src/index.d.ts","./node_modules/@opentelemetry/sdk-trace-node/build/src/config.d.ts","./node_modules/@opentelemetry/sdk-trace-node/build/src/NodeTracerProvider.d.ts","./node_modules/@opentelemetry/sdk-trace-node/build/src/index.d.ts","./node_modules/@opentelemetry/instrumentation/build/src/types.d.ts","./node_modules/@opentelemetry/instrumentation/build/src/types_internal.d.ts","./node_modules/@opentelemetry/instrumentation/build/src/autoLoader.d.ts","./node_modules/@types/shimmer/index.d.ts","./node_modules/@opentelemetry/instrumentation/build/src/instrumentation.d.ts","./node_modules/@opentelemetry/instrumentation/build/src/platform/node/instrumentation.d.ts","./node_modules/@opentelemetry/instrumentation/build/src/platform/node/normalize.d.ts","./node_modules/@opentelemetry/instrumentation/build/src/platform/node/index.d.ts","./node_modules/@opentelemetry/instrumentation/build/src/platform/index.d.ts","./node_modules/@opentelemetry/instrumentation/build/src/instrumentationNodeModuleDefinition.d.ts","./node_modules/@opentelemetry/instrumentation/build/src/instrumentationNodeModuleFile.d.ts","./node_modules/@opentelemetry/instrumentation/build/src/utils.d.ts","./node_modules/@opentelemetry/instrumentation/build/src/index.d.ts","./node_modules/@opentelemetry/sdk-node/build/src/types.d.ts","./node_modules/@opentelemetry/sdk-node/build/src/sdk.d.ts","./node_modules/@opentelemetry/sdk-node/build/src/index.d.ts","./node_modules/@genkit-ai/core/lib/telemetryTypes.d.ts","./node_modules/@genkit-ai/core/lib/utils.d.ts","./node_modules/@genkit-ai/core/lib/index.d.ts","./node_modules/@genkit-ai/core/lib/registry.d.ts","./node_modules/@genkit-ai/ai/lib/check-operation.d.ts","./node_modules/@genkit-ai/ai/lib/document-SEV6zxye.d.ts","./node_modules/@genkit-ai/ai/lib/evaluator.d.ts","./node_modules/@genkit-ai/ai/lib/model-types.d.ts","./node_modules/@genkit-ai/ai/lib/generate/chunk.d.ts","./node_modules/@genkit-ai/ai/lib/message.d.ts","./node_modules/@genkit-ai/ai/lib/generate/response.d.ts","./node_modules/@genkit-ai/ai/lib/formats/types.d.ts","./node_modules/@genkit-ai/ai/lib/model-BBzPDrC1.d.ts","./node_modules/@genkit-ai/ai/lib/resource.d.ts","./node_modules/@genkit-ai/ai/lib/generate-C5ASHXwM.d.ts","./node_modules/@genkit-ai/ai/lib/reranker.d.ts","./node_modules/@genkit-ai/ai/lib/retriever.d.ts","./node_modules/@genkit-ai/ai/lib/types.d.ts","./node_modules/@genkit-ai/ai/lib/index.d.ts","./node_modules/@genkit-ai/ai/lib/session.d.ts","./node_modules/@genkit-ai/ai/lib/chat.d.ts","./node_modules/@genkit-ai/ai/lib/tool.d.ts","./node_modules/@genkit-ai/ai/lib/embedder.d.ts","./node_modules/@genkit-ai/ai/lib/model.d.ts","./node_modules/genkit/lib/index-D0wVUZ6a.d.ts","./node_modules/genkit/lib/index.d.ts","./node_modules/genkit/lib/plugin.d.ts","./node_modules/@google/generative-ai/dist/generative-ai.d.ts","./node_modules/genkit/lib/model.d.ts","./node_modules/@genkit-ai/googleai/lib/gemini.d.mts","./node_modules/@genkit-ai/googleai/lib/imagen.d.mts","./node_modules/@genkit-ai/googleai/lib/veo.d.mts","./node_modules/@genkit-ai/googleai/lib/index.d.mts","./lib/aiSupport/aiSupport.ts","./app/api/questionnaire/route.ts","./node_modules/cloudinary/types/index.d.ts","./app/api/sign-image/route.ts","./app/questionnaire/components/types.ts","./app/questionnaire/components/constants.ts","./node_modules/@firebase/component/dist/src/provider.d.ts","./node_modules/@firebase/component/dist/src/component_container.d.ts","./node_modules/@firebase/component/dist/src/types.d.ts","./node_modules/@firebase/component/dist/src/component.d.ts","./node_modules/@firebase/component/dist/index.d.ts","./node_modules/@firebase/util/dist/util-public.d.ts","./node_modules/@firebase/logger/dist/src/logger.d.ts","./node_modules/@firebase/logger/dist/index.d.ts","./node_modules/@firebase/app/dist/app-public.d.ts","./node_modules/firebase/app/dist/app/index.d.ts","./node_modules/@firebase/firestore/dist/index.d.ts","./node_modules/firebase/firestore/dist/firestore/index.d.ts","./lib/firebase.ts","./node_modules/zod/v4/core/standard-schema.d.cts","./node_modules/zod/v4/core/util.d.cts","./node_modules/zod/v4/core/versions.d.cts","./node_modules/zod/v4/core/schemas.d.cts","./node_modules/zod/v4/core/checks.d.cts","./node_modules/zod/v4/core/errors.d.cts","./node_modules/zod/v4/core/core.d.cts","./node_modules/zod/v4/core/parse.d.cts","./node_modules/zod/v4/core/regexes.d.cts","./node_modules/zod/v4/locales/ar.d.cts","./node_modules/zod/v4/locales/az.d.cts","./node_modules/zod/v4/locales/be.d.cts","./node_modules/zod/v4/locales/ca.d.cts","./node_modules/zod/v4/locales/cs.d.cts","./node_modules/zod/v4/locales/da.d.cts","./node_modules/zod/v4/locales/de.d.cts","./node_modules/zod/v4/locales/en.d.cts","./node_modules/zod/v4/locales/eo.d.cts","./node_modules/zod/v4/locales/es.d.cts","./node_modules/zod/v4/locales/fa.d.cts","./node_modules/zod/v4/locales/fi.d.cts","./node_modules/zod/v4/locales/fr.d.cts","./node_modules/zod/v4/locales/fr-CA.d.cts","./node_modules/zod/v4/locales/he.d.cts","./node_modules/zod/v4/locales/hu.d.cts","./node_modules/zod/v4/locales/id.d.cts","./node_modules/zod/v4/locales/is.d.cts","./node_modules/zod/v4/locales/it.d.cts","./node_modules/zod/v4/locales/ja.d.cts","./node_modules/zod/v4/locales/ka.d.cts","./node_modules/zod/v4/locales/kh.d.cts","./node_modules/zod/v4/locales/km.d.cts","./node_modules/zod/v4/locales/ko.d.cts","./node_modules/zod/v4/locales/lt.d.cts","./node_modules/zod/v4/locales/mk.d.cts","./node_modules/zod/v4/locales/ms.d.cts","./node_modules/zod/v4/locales/nl.d.cts","./node_modules/zod/v4/locales/no.d.cts","./node_modules/zod/v4/locales/ota.d.cts","./node_modules/zod/v4/locales/ps.d.cts","./node_modules/zod/v4/locales/pl.d.cts","./node_modules/zod/v4/locales/pt.d.cts","./node_modules/zod/v4/locales/ru.d.cts","./node_modules/zod/v4/locales/sl.d.cts","./node_modules/zod/v4/locales/sv.d.cts","./node_modules/zod/v4/locales/ta.d.cts","./node_modules/zod/v4/locales/th.d.cts","./node_modules/zod/v4/locales/tr.d.cts","./node_modules/zod/v4/locales/ua.d.cts","./node_modules/zod/v4/locales/uk.d.cts","./node_modules/zod/v4/locales/ur.d.cts","./node_modules/zod/v4/locales/vi.d.cts","./node_modules/zod/v4/locales/zh-CN.d.cts","./node_modules/zod/v4/locales/zh-TW.d.cts","./node_modules/zod/v4/locales/yo.d.cts","./node_modules/zod/v4/locales/index.d.cts","./node_modules/zod/v4/core/registries.d.cts","./node_modules/zod/v4/core/doc.d.cts","./node_modules/zod/v4/core/api.d.cts","./node_modules/zod/v4/core/json-schema.d.cts","./node_modules/zod/v4/core/to-json-schema.d.cts","./node_modules/zod/v4/core/index.d.cts","./node_modules/zod/v4/classic/errors.d.cts","./node_modules/zod/v4/classic/parse.d.cts","./node_modules/zod/v4/classic/schemas.d.cts","./node_modules/zod/v4/classic/checks.d.cts","./node_modules/zod/v4/classic/compat.d.cts","./node_modules/zod/v4/classic/iso.d.cts","./node_modules/zod/v4/classic/coerce.d.cts","./node_modules/zod/v4/classic/external.d.cts","./node_modules/zod/index.d.cts","./lib/validation.ts","./lib/aiSupport/genkit.ts","./lib/constants/faqs.ts","./lib/constants/navigation.ts","./lib/constants/portfolio.ts","./lib/constants/site.ts","./lib/constants/testimonials.ts","./components/Header.tsx","./components/Footer.tsx","./components/Cta.tsx","./components/SkipToContent.tsx","./app/layout.tsx","./app/home/components/Faq.tsx","./app/home/components/Guarantee.tsx","./app/home/components/Hero.tsx","./app/home/components/Portfolio.tsx","./lib/constants/process.tsx","./app/home/components/Process.tsx","./app/home/components/RecentPosts.tsx","./app/home/components/Services.tsx","./app/home/components/Testimonials.tsx","./app/page.tsx","./app/about/components/AboutHero.tsx","./app/about/components/OurStory.tsx","./app/about/components/OurMission.tsx","./app/about/components/OurProcess.tsx","./app/about/components/OurGuarantee.tsx","./node_modules/react-icons/lib/iconsManifest.d.ts","./node_modules/react-icons/lib/iconBase.d.ts","./node_modules/react-icons/lib/iconContext.d.ts","./node_modules/react-icons/lib/index.d.ts","./node_modules/react-icons/fa/index.d.ts","./node_modules/react-icons/si/index.d.ts","./node_modules/react-icons/pi/index.d.ts","./lib/constants/about.tsx","./app/about/components/TheMalalangDifference.tsx","./app/about/components/OurTeam.tsx","./node_modules/lucide-react/dist/lucide-react.d.ts","./app/about/components/FeaturedProjects.tsx","./app/about/components/OurCoreValues.tsx","./app/about/page.tsx","./app/blog/page.tsx","./app/blog/[blogs]/components/SocialShareButtons.tsx","./app/blog/[blogs]/components/CommentsSection.tsx","./app/blog/[blogs]/page.tsx","./components/ImageColorPicker.tsx","./app/color-palette-generator/page.tsx","./app/contact/components/ContactForm.tsx","./app/contact/page.tsx","./app/home/components/About.tsx","./app/home/page.tsx","./app/pricing/page.tsx","./app/questionnaire/components/ProgressBar.tsx","./app/questionnaire/components/NavigationButtons.tsx","./app/questionnaire/components/ReviewStep.tsx","./app/questionnaire/components/AIActions.tsx","./app/questionnaire/components/FileUploadWidget.tsx","./app/questionnaire/components/Question.tsx","./app/questionnaire/components/Step.tsx","./app/questionnaire/components/QuestionnaireForm.tsx","./components/PhoneNumberInput.tsx","./app/questionnaire/page.tsx","./app/services/page.tsx","./app/services/[service]/page.tsx","./app/services/[service]/[bookings]/components/BookingForm.tsx","./app/services/[service]/[bookings]/page.tsx","./components/ColorPalettePage.tsx","./node_modules/next/dist/client/form-shared.d.ts","./node_modules/next/dist/client/form.d.ts","./.next/types/link.d.ts","./.next/types/validator.ts","./node_modules/@types/aws-lambda/common/api-gateway.d.ts","./node_modules/@types/aws-lambda/common/cloudfront.d.ts","./node_modules/@types/aws-lambda/handler.d.ts","./node_modules/@types/aws-lambda/trigger/alb.d.ts","./node_modules/@types/aws-lambda/trigger/api-gateway-proxy.d.ts","./node_modules/@types/aws-lambda/trigger/api-gateway-authorizer.d.ts","./node_modules/@types/aws-lambda/trigger/appsync-resolver.d.ts","./node_modules/@types/aws-lambda/trigger/autoscaling.d.ts","./node_modules/@types/aws-lambda/trigger/cloudformation-custom-resource.d.ts","./node_modules/@types/aws-lambda/trigger/cdk-custom-resource.d.ts","./node_modules/@types/aws-lambda/trigger/cloudfront-request.d.ts","./node_modules/@types/aws-lambda/trigger/cloudfront-response.d.ts","./node_modules/@types/aws-lambda/trigger/eventbridge.d.ts","./node_modules/@types/aws-lambda/trigger/cloudwatch-events.d.ts","./node_modules/@types/aws-lambda/trigger/cloudwatch-logs.d.ts","./node_modules/@types/aws-lambda/trigger/codebuild-cloudwatch-state.d.ts","./node_modules/@types/aws-lambda/trigger/codecommit.d.ts","./node_modules/@types/aws-lambda/trigger/codepipeline.d.ts","./node_modules/@types/aws-lambda/trigger/codepipeline-cloudwatch-action.d.ts","./node_modules/@types/aws-lambda/trigger/codepipeline-cloudwatch-pipeline.d.ts","./node_modules/@types/aws-lambda/trigger/codepipeline-cloudwatch-stage.d.ts","./node_modules/@types/aws-lambda/trigger/codepipeline-cloudwatch.d.ts","./node_modules/@types/aws-lambda/trigger/cognito-user-pool-trigger/_common.d.ts","./node_modules/@types/aws-lambda/trigger/cognito-user-pool-trigger/create-auth-challenge.d.ts","./node_modules/@types/aws-lambda/trigger/cognito-user-pool-trigger/custom-email-sender.d.ts","./node_modules/@types/aws-lambda/trigger/cognito-user-pool-trigger/custom-message.d.ts","./node_modules/@types/aws-lambda/trigger/cognito-user-pool-trigger/custom-sms-sender.d.ts","./node_modules/@types/aws-lambda/trigger/cognito-user-pool-trigger/define-auth-challenge.d.ts","./node_modules/@types/aws-lambda/trigger/cognito-user-pool-trigger/post-authentication.d.ts","./node_modules/@types/aws-lambda/trigger/cognito-user-pool-trigger/post-confirmation.d.ts","./node_modules/@types/aws-lambda/trigger/cognito-user-pool-trigger/pre-authentication.d.ts","./node_modules/@types/aws-lambda/trigger/cognito-user-pool-trigger/pre-signup.d.ts","./node_modules/@types/aws-lambda/trigger/cognito-user-pool-trigger/pre-token-generation.d.ts","./node_modules/@types/aws-lambda/trigger/cognito-user-pool-trigger/user-migration.d.ts","./node_modules/@types/aws-lambda/trigger/cognito-user-pool-trigger/verify-auth-challenge-response.d.ts","./node_modules/@types/aws-lambda/trigger/cognito-user-pool-trigger/index.d.ts","./node_modules/@types/aws-lambda/trigger/connect-contact-flow.d.ts","./node_modules/@types/aws-lambda/trigger/dynamodb-stream.d.ts","./node_modules/@types/aws-lambda/trigger/iot.d.ts","./node_modules/@types/aws-lambda/trigger/kinesis-firehose-transformation.d.ts","./node_modules/@types/aws-lambda/trigger/kinesis-stream.d.ts","./node_modules/@types/aws-lambda/trigger/lex.d.ts","./node_modules/@types/aws-lambda/trigger/lex-v2.d.ts","./node_modules/@types/aws-lambda/trigger/amplify-resolver.d.ts","./node_modules/@types/aws-lambda/trigger/msk.d.ts","./node_modules/@types/aws-lambda/trigger/s3.d.ts","./node_modules/@types/aws-lambda/trigger/s3-batch.d.ts","./node_modules/@types/aws-lambda/trigger/s3-event-notification.d.ts","./node_modules/@types/aws-lambda/trigger/secretsmanager.d.ts","./node_modules/@types/aws-lambda/trigger/self-managed-kafka.d.ts","./node_modules/@types/aws-lambda/trigger/ses.d.ts","./node_modules/@types/aws-lambda/trigger/sns.d.ts","./node_modules/@types/aws-lambda/trigger/sqs.d.ts","./node_modules/@types/aws-lambda/index.d.ts","./node_modules/@types/bunyan/index.d.ts","./node_modules/@types/caseless/index.d.ts","./node_modules/@types/connect/index.d.ts","./node_modules/@types/long/index.d.ts","./node_modules/@types/memcached/index.d.ts","./node_modules/@types/mysql/index.d.ts","./node_modules/pg-types/index.d.ts","./node_modules/pg-protocol/dist/messages.d.ts","./node_modules/pg-protocol/dist/serializer.d.ts","./node_modules/pg-protocol/dist/parser.d.ts","./node_modules/pg-protocol/dist/index.d.ts","./node_modules/@types/pg/index.d.ts","./node_modules/@types/pg-pool/node_modules/@types/pg/lib/type-overrides.d.ts","./node_modules/@types/pg-pool/node_modules/@types/pg/index.d.ts","./node_modules/@types/pg-pool/node_modules/@types/pg/index.d.mts","./node_modules/@types/pg-pool/index.d.ts","./node_modules/form-data/index.d.ts","./node_modules/@types/tough-cookie/index.d.ts","./node_modules/@types/request/index.d.ts","./node_modules/@types/tedious/index.d.ts","./node_modules/@types/triple-beam/index.d.ts"],"fileIdsList":[[84,98,146,188,366,413,468,478,495,974],[98,146],[81,98,146,492,495,817,819,917,927,946,947,950,952,954,956,957,967,968,969,971],[84,98,146],[84,98,146,467,940,943],[84,98,146,940],[84,98,146,467],[84,98,146,922],[84,98,146,911,928,929,930,931,932,941,942,944,945,975],[98,146,492,816],[98,146,492,818],[84,98,146,937],[84,98,146,502,503,948,949,975],[84,98,146,503,975],[84,98,146,951],[84,98,146,833,834],[84,98,146,911,953,975],[84,98,146,975],[84,98,146,502,908],[84,98,146,911,975],[84,98,146,502,910],[84,98,146,922,975],[84,98,146,502,504,975],[84,98,146,502,912],[84,98,146,918,919,920,921,923,924,925,926,955,975],[84,98,146,911,913,914,915,916,975],[98,146,975],[98,146,918,919,920,921,923,924,925,926,975],[84,98,146,502,504,908,975],[84,98,146,821],[84,98,146,820,961,962],[84,98,146,820,821,833,834,958,959,960,964],[84,98,146,820],[84,98,146,820,963],[98,146,820],[84,98,146,502,833,834,965,966],[84,98,146,502,504,833,834,905,906,966],[84,98,146,504,970,975],[84,98,146,504,975],[84,98,146,502,504,911,975],[98,146,503,504,975],[84,98,146,911],[84,98,146,909,975],[84,98,146,909,911,975],[98,146,808,815],[84,98,146,502,503,937,938,939],[84,98,146,502],[98,146,502],[98,146,831,833],[98,146,905],[81,98,146,496,497],[98,146,826,827,829],[98,146,822,823,824,825],[98,146,824],[98,146,822,824,825],[98,146,823,824,825],[98,146,823],[98,146,827,829,830],[98,146,828],[98,146,785,786,788,790,791,792,793,794,795,796,797,802],[98,146,785,786],[98,146,785,786,788],[98,146,785,786,788,790,791,792],[98,146,785,786,788,790,791,793,795,796],[98,146,785,786,788,790],[98,146,785,786,788,790,792],[98,146,785,786,787,788,789,790,791,792,793,794,795,796,797,798,799,800],[98,146,785,786,788,790,791,794],[98,146,785],[98,146,785,786,788,790,791,792,794,795],[98,146,785,786,788,790,791,792,793,794,795,796,797],[98,146,519,520,521,522,523,568],[98,146,519,520,521,522,523,568,569],[98,146,519,520,521,522,523,568,569,570,571,572,782,783,784],[98,146,519],[98,146,782],[98,146,518],[98,146,506,507,508],[98,146,509,510],[98,146,506,507,509,511,512,517],[98,146,507,509],[98,146,517],[98,146,509],[98,146,506,507,509,512,513,514,515,516],[98,146,808,810,811],[98,146,808,811],[98,146,808,809,810,811,812,813,814],[98,146,685,686],[98,146,686,687,688],[98,146,684,685,686,687,688,689,690,691],[98,146,620],[98,146,620,684],[98,146,685],[98,146,686,687],[98,146,579],[98,146,582],[98,146,587,589],[98,146,575,579,591,592],[98,146,602,605,611,613],[98,146,574,579],[98,146,573],[98,146,574],[98,146,581],[98,146,584],[98,146,574,575,576,577,578,579,580,581,582,583,584,585,586,587,588,589,590,591,593,594,595,596,597,598,599,600,601,602,603,604,605,606,607,608,609,610,611,612,614,615,616,617,618,619],[98,146,590],[98,146,586],[98,146,587],[98,146,578,579,585],[98,146,586,587],[98,146,593],[98,146,614],[98,146,579,599,601,602,603],[98,146,602,603,605],[98,146,579,594,597,600,607],[98,146,594,595],[98,146,577,594,597,600],[98,146,578],[98,146,579,596,599],[98,146,595],[98,146,596],[98,146,594,596],[98,146,576,577,594,596,597,598],[98,146,596,599],[98,146,579,599,601],[98,146,602,603],[98,146,768],[98,146,767,768,769,775,776,777,778],[98,146,620,692,767],[98,146,767],[98,146,774],[98,146,772,773],[98,146,767,770,771],[98,146,167],[98,146,620,692],[98,146,662],[98,146,661,662],[98,146,660,661],[98,146,660,661,662],[98,146,675,676,677,678,679],[98,146,674],[98,146,660,662,663],[98,146,667,668,669,670,671,672,673],[98,146,660,661,662,663,666,680,681],[98,146,665],[98,146,664],[98,146,620,660,661],[98,146,620,659,682,692,694,695],[98,146,620,696],[98,146,683,692,697],[98,146,683,696,697,700],[98,146,659,694,700],[98,146,659,694],[98,146,620,694,697],[98,146,620,659,682,692],[98,146,696,697,700],[98,146,683,694,696,697,698,699,700,701,702,703,707],[98,146,682,683,692,697],[98,146,706],[98,146,683,704],[98,146,705],[98,146,682],[98,146,621,622,623,624,625,626,627,628,629,630,631,635,641,642,643,644,645,646,647,648,649,650,651,652,653,654,655,656,657,658],[98,146,620,726],[98,146,620,682,726,732,733],[98,146,620,714,715,716,728],[98,146,620,714,715,716,719,720,728],[98,146,716,717,718,721,722,723],[98,146,620,714,715,728],[98,146,714,725,727],[98,146,659,714,727,728,729,730],[98,146,659,714,727,728,730],[98,146,620,659,682,714,716,727],[98,146,659,714,725,727,728],[98,146,728],[98,146,714,725,727,728,729,731,732],[98,146,730,731,733],[98,146,714,715,716,725,726,727,728,729,730,731,733,734,735,736,737],[98,146,620,659],[98,146,715,716,724,727],[98,146,711,727],[98,146,711],[98,146,710,712,713,725,727],[98,146,620,659,682,708,738,763,766,780,781],[98,146,708,738,780],[98,146,620,682,708,738,763,779],[98,146,620,624],[98,146,624],[98,146,629],[98,146,640],[98,146,635],[98,146,631],[98,146,632,633,634,636,637,638,639],[98,146,168,195],[98,146,195],[98,146,620,682,742,745,763],[98,146,620,659,682,743,744,749],[98,146,620,744,747],[98,146,620,659,682,742,746,748],[98,146,620,742,744,745,747,748],[98,146,659,744,745],[98,146,620,744,747,748],[98,146,620,659,682,743],[98,146,620,744,745,747,748],[98,146,659,744],[98,146,740,741,742,743,744,745,746,747,748,749,754,755,756,757,758,759,760,761,762],[98,146,753],[98,146,740],[98,146,742,750],[98,146,751,752],[98,146,741],[98,146,620,741],[98,146,620,682,740,741],[98,146,763,764],[98,146,763],[98,146,763,764,765],[98,146,977,978,979,980,981,982,983,984,985,986,987,988,989,990,991,992,993,994,995,996,997,998,1012,1013,1014,1015,1016,1017,1018,1019,1020,1021,1022,1023,1024,1025,1026,1027,1028,1029],[98,146,979],[98,146,979,983],[98,146,977,979,981],[98,146,977,979],[98,146,979,985],[98,146,978,979],[98,146,989],[98,146,979,995,996,997],[98,146,979,999],[98,146,979,1000,1001,1002,1003,1004,1005,1006,1007,1008,1009,1010,1011],[98,146,979,989],[98,146,157,195],[98,146,160,195],[98,146,157,177,185,195],[98,143,146],[98,145,146],[146],[98,146,151,180],[98,146,147,152,157,165,177,188],[98,146,147,148,157,165],[93,94,95,98,146],[98,146,149,189],[98,146,150,151,158,166],[98,146,151,177,185],[98,146,152,154,157,165],[98,145,146,153],[98,146,154,155],[98,146,156,157],[98,145,146,157],[98,146,157,158,159,177,188],[98,146,157,158,159,172,177,180],[98,139,146,154,157,160,165,177,188],[98,146,157,158,160,161,165,177,185,188],[98,146,160,162,177,185,188],[96,97,98,99,100,101,102,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,193,194],[98,146,157,163],[98,146,164,188],[98,146,154,157,165,177],[98,146,166],[98,145,146,168],[98,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,193,194],[98,146,170],[98,146,171],[98,146,157,172,173],[98,146,172,174,189,191],[98,146,157,177,178,180],[98,146,179,180],[98,146,177,178],[98,146,180],[98,146,181],[98,143,146,177,182],[98,146,157,183,184],[98,146,183,184],[98,146,151,165,177,185],[98,146,186],[98,146,165,187],[98,146,160,171,188],[98,146,151,189],[98,146,177,190],[98,146,164,191],[98,146,192],[98,139,146],[98,139,146,157,159,168,177,180,188,190,191,193],[98,146,177,194],[98,146,1045],[98,146,1044],[98,146,157,177,185,195,1037,1038,1041,1043,1044],[98,146,157,177,185,195,1037,1038,1041,1042],[84,98,146,198,200],[84,88,98,146,196,197,198,199,355,440,488],[84,88,98,146,196,197,200,440,488],[84,98,146,200,355,356],[84,98,146,200,355],[84,88,98,146,197,198,200,440,488],[84,88,98,146,196,198,200,440,488],[82,83,98,146],[98,146,158,160,162,165,177,188,195,1032,1047,1048],[98,146,157,185,195],[98,146,527,528,532,559,560,562,563,564,566,567],[98,146,525,526],[98,146,525],[98,146,527,567],[98,146,527,528,564,565,567],[98,146,567],[98,146,524,567,568],[98,146,527,528,566,567],[98,146,527,528,530,531,566,567],[98,146,527,528,529,566,567],[98,146,527,528,532,559,560,561,562,563,566,567],[98,146,524,527,528,532,564,566],[98,146,532,567],[98,146,534,535,536,537,538,539,540,541,542,543,567],[98,146,557,567],[98,146,533,544,552,553,554,555,556,558],[98,146,537,567],[98,146,545,546,547,548,549,550,551,567],[98,146,177],[98,146,830],[98,146,832],[98,146,160,177,195],[98,146,785,786,789,798,799,801,802,803,804,805,806],[98,146,785,786,789,798,799,801,802,803,804,805,806,807],[98,146,806],[90,98,146],[98,146,443],[98,146,445,446,447,448],[98,146,450],[98,146,204,218,219,220,222,437],[98,146,204,243,245,247,248,251,437,439],[98,146,204,208,210,211,212,213,214,426,437,439],[98,146,437],[98,146,219,321,407,416,433],[98,146,204],[98,146,201,433],[98,146,255],[98,146,254,437,439],[98,146,160,303,321,350,494],[98,146,160,314,330,416,432],[98,146,160,368],[98,146,420],[98,146,419,420,421],[98,146,419],[92,98,146,160,201,204,208,211,215,216,217,219,223,231,232,361,386,417,437,440],[98,146,204,221,239,243,244,249,250,437,494],[98,146,221,494],[98,146,232,239,301,437,494],[98,146,494],[98,146,204,221,222,494],[98,146,246,494],[98,146,215,418,425],[98,146,171,263,433],[98,146,263,433],[84,98,146,263],[84,98,146,322],[98,146,318,366,433,476,477],[98,146,413,470,471,472,473,475],[98,146,412],[98,146,412,413],[98,146,212,362,363,364],[98,146,362,365,366],[98,146,474],[98,146,362,366],[84,98,146,973],[84,98,146,205,464],[84,98,146,188],[84,98,146,221,291],[84,98,146,221],[98,146,289,293],[84,98,146,290,442],[84,88,98,146,160,195,196,197,198,200,440,486,487],[98,146,160],[98,146,160,208,270,362,372,387,407,422,423,437,438,494],[98,146,231,424],[98,146,440],[98,146,203],[84,98,146,303,317,329,339,341,432],[98,146,171,303,317,338,339,340,432,493],[98,146,332,333,334,335,336,337],[98,146,334],[98,146,338],[98,146,261,262,263,265],[84,98,146,256,257,258,264],[98,146,261,264],[98,146,259],[98,146,260],[84,98,146,263,290,442],[84,98,146,263,441,442],[84,98,146,263,442],[98,146,387,429],[98,146,429],[98,146,160,438,442],[98,146,326],[98,145,146,325],[98,146,233,271,309,311,313,314,315,316,359,362,432,435,438],[98,146,233,347,362,366],[98,146,314,432],[84,98,146,314,323,324,326,327,328,329,330,331,342,343,344,345,346,348,349,432,433,494],[98,146,308],[98,146,160,171,233,234,270,285,315,359,360,361,366,387,407,428,437,438,439,440,494],[98,146,432],[98,145,146,219,312,315,361,428,430,431,438],[98,146,314],[98,145,146,270,275,304,305,306,307,308,309,310,311,313,432,433],[98,146,160,275,276,304,438,439],[98,146,219,361,362,387,428,432,438],[98,146,160,437,439],[98,146,160,177,435,438,439],[98,146,160,171,188,201,208,221,233,234,236,271,272,277,282,285,311,315,362,372,374,377,379,382,383,384,385,386,407,427,428,433,435,437,438,439],[98,146,160,177],[98,146,204,205,206,208,213,216,221,239,427,435,436,440,442,494],[98,146,160,177,188,251,253,255,256,257,258,265,494],[98,146,171,188,201,243,253,281,282,283,284,311,362,377,386,387,393,396,397,407,428,433,435],[98,146,215,216,231,361,386,428,437],[98,146,160,188,205,208,311,391,435,437],[98,146,302],[98,146,160,394,395,404],[98,146,435,437],[98,146,309,312],[98,146,311,315,427,442],[98,146,160,171,237,243,284,377,387,393,396,399,435],[98,146,160,215,231,243,400],[98,146,204,236,402,427,437],[98,146,160,188,437],[98,146,160,221,235,236,237,248,266,401,403,427,437],[92,98,146,233,315,406,440,442],[98,146,160,171,188,208,215,223,231,234,271,277,281,282,283,284,285,311,362,374,387,388,390,392,407,427,428,433,434,435,442],[98,146,160,177,215,393,398,404,435],[98,146,226,227,228,229,230],[98,146,272,378],[98,146,380],[98,146,378],[98,146,380,381],[98,146,160,208,211,212,270,438],[98,146,160,171,203,205,233,271,285,315,370,371,407,435,439,440,442],[98,146,160,171,188,207,212,311,371,434,438],[98,146,304],[98,146,305],[98,146,306],[98,146,433],[98,146,252,268],[98,146,160,208,252,271],[98,146,267,268],[98,146,269],[98,146,252,253],[98,146,252,286],[98,146,252],[98,146,272,376,434],[98,146,375],[98,146,253,433,434],[98,146,373,434],[98,146,253,433],[98,146,359],[98,146,208,213,271,300,303,309,311,315,317,320,351,354,358,362,406,427,435,438],[98,146,294,297,298,299,318,319,366],[84,98,146,198,200,263,352,353],[84,98,146,198,200,263,352,353,357],[98,146,415],[98,146,219,276,314,315,326,330,362,406,408,409,410,411,413,414,417,427,432,437],[98,146,366],[98,146,370],[98,146,160,271,287,367,369,372,406,435,440,442],[98,146,294,295,296,297,298,299,318,319,366,441],[92,98,146,160,171,188,234,252,253,285,311,315,404,405,407,427,428,437,438,440],[98,146,276,278,281,428],[98,146,160,272,437],[98,146,275,314],[98,146,274],[98,146,276,277],[98,146,273,275,437],[98,146,160,207,276,278,279,280,437,438],[84,98,146,362,363,365],[98,146,238],[84,98,146,205],[84,98,146,433],[84,92,98,146,285,315,440,442],[98,146,205,464,465],[84,98,146,293],[84,98,146,171,188,203,250,288,290,292,442],[98,146,221,433,438],[98,146,389,433],[98,146,362],[84,98,146,158,160,171,203,239,245,293,440,441],[84,98,146,196,197,198,200,440,488],[84,85,86,87,88,98,146],[98,146,151],[98,146,240,241,242],[98,146,240],[84,88,98,146,160,162,171,195,196,197,198,200,201,203,234,338,399,437,439,442,488],[98,146,452],[98,146,454],[98,146,456],[98,146,458],[98,146,460,461,462],[98,146,466],[89,91,98,146,444,449,451,453,455,457,459,463,467,469,479,480,482,492,493,494,495],[98,146,468],[98,146,478],[98,146,290],[98,146,481],[98,145,146,276,278,279,281,329,433,483,484,485,488,489,490,491],[98,146,195,1038,1039,1040],[98,146,177,195,1038],[98,146,936],[98,146,933,934,935],[98,146,177,195],[98,111,115,146,188],[98,111,146,177,188],[98,106,146],[98,108,111,146,185,188],[98,146,165,185],[98,106,146,195],[98,108,111,146,165,188],[98,103,104,107,110,146,157,177,188],[98,111,118,146],[98,103,109,146],[98,111,132,133,146],[98,107,111,146,180,188,195],[98,132,146,195],[98,105,106,146,195],[98,111,146],[98,105,106,107,108,109,110,111,112,113,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,133,134,135,136,137,138,146],[98,111,126,146],[98,111,118,119,146],[98,109,111,119,120,146],[98,110,146],[98,103,106,111,146],[98,111,115,119,120,146],[98,115,146],[98,109,111,114,146,188],[98,103,108,111,118,146],[98,106,111,132,146,193,195],[98,146,904],[98,146,896],[98,146,896,899],[98,146,890,896,897,898,899,900,901,902,903],[98,146,896,897],[98,146,896,898],[98,146,836,838,839,840,841],[98,146,836,838,840,841],[98,146,836,838,840],[98,146,835,836,838,839,841],[98,146,836,837,838,839,840,841,842,843,890,891,892,893,894,895],[98,146,838,841],[98,146,835,836,837,839,840,841],[98,146,838,891,894],[98,146,838,839,840,841],[98,146,840],[98,146,844,845,846,847,848,849,850,851,852,853,854,855,856,857,858,859,860,861,862,863,864,865,866,867,868,869,870,871,872,873,874,875,876,877,878,879,880,881,882,883,884,885,886,887,888,889]],"fileInfos":[{"version":"69684132aeb9b5642cbcd9e22dff7818ff0ee1aa831728af0ecf97d3364d5546","affectsGlobalScope":true,"impliedFormat":1},{"version":"45b7ab580deca34ae9729e97c13cfd999df04416a79116c3bfb483804f85ded4","impliedFormat":1},{"version":"3facaf05f0c5fc569c5649dd359892c98a85557e3e0c847964caeb67076f4d75","impliedFormat":1},{"version":"e44bb8bbac7f10ecc786703fe0a6a4b952189f908707980ba8f3c8975a760962","impliedFormat":1},{"version":"5e1c4c362065a6b95ff952c0eab010f04dcd2c3494e813b493ecfd4fcb9fc0d8","impliedFormat":1},{"version":"68d73b4a11549f9c0b7d352d10e91e5dca8faa3322bfb77b661839c42b1ddec7","impliedFormat":1},{"version":"5efce4fc3c29ea84e8928f97adec086e3dc876365e0982cc8479a07954a3efd4","impliedFormat":1},{"version":"feecb1be483ed332fad555aff858affd90a48ab19ba7272ee084704eb7167569","impliedFormat":1},{"version":"ee7bad0c15b58988daa84371e0b89d313b762ab83cb5b31b8a2d1162e8eb41c2","impliedFormat":1},{"version":"27bdc30a0e32783366a5abeda841bc22757c1797de8681bbe81fbc735eeb1c10","impliedFormat":1},{"version":"8fd575e12870e9944c7e1d62e1f5a73fcf23dd8d3a321f2a2c74c20d022283fe","impliedFormat":1},{"version":"8bf8b5e44e3c9c36f98e1007e8b7018c0f38d8adc07aecef42f5200114547c70","impliedFormat":1},{"version":"092c2bfe125ce69dbb1223c85d68d4d2397d7d8411867b5cc03cec902c233763","affectsGlobalScope":true,"impliedFormat":1},{"version":"07f073f19d67f74d732b1adea08e1dc66b1b58d77cb5b43931dee3d798a2fd53","affectsGlobalScope":true,"impliedFormat":1},{"version":"c57796738e7f83dbc4b8e65132f11a377649c00dd3eee333f672b8f0a6bea671","affectsGlobalScope":true,"impliedFormat":1},{"version":"dc2df20b1bcdc8c2d34af4926e2c3ab15ffe1160a63e58b7e09833f616efff44","affectsGlobalScope":true,"impliedFormat":1},{"version":"515d0b7b9bea2e31ea4ec968e9edd2c39d3eebf4a2d5cbd04e88639819ae3b71","affectsGlobalScope":true,"impliedFormat":1},{"version":"0559b1f683ac7505ae451f9a96ce4c3c92bdc71411651ca6ddb0e88baaaad6a3","affectsGlobalScope":true,"impliedFormat":1},{"version":"0dc1e7ceda9b8b9b455c3a2d67b0412feab00bd2f66656cd8850e8831b08b537","affectsGlobalScope":true,"impliedFormat":1},{"version":"ce691fb9e5c64efb9547083e4a34091bcbe5bdb41027e310ebba8f7d96a98671","affectsGlobalScope":true,"impliedFormat":1},{"version":"8d697a2a929a5fcb38b7a65594020fcef05ec1630804a33748829c5ff53640d0","affectsGlobalScope":true,"impliedFormat":1},{"version":"4ff2a353abf8a80ee399af572debb8faab2d33ad38c4b4474cff7f26e7653b8d","affectsGlobalScope":true,"impliedFormat":1},{"version":"936e80ad36a2ee83fc3caf008e7c4c5afe45b3cf3d5c24408f039c1d47bdc1df","affectsGlobalScope":true,"impliedFormat":1},{"version":"d15bea3d62cbbdb9797079416b8ac375ae99162a7fba5de2c6c505446486ac0a","affectsGlobalScope":true,"impliedFormat":1},{"version":"68d18b664c9d32a7336a70235958b8997ebc1c3b8505f4f1ae2b7e7753b87618","affectsGlobalScope":true,"impliedFormat":1},{"version":"eb3d66c8327153d8fa7dd03f9c58d351107fe824c79e9b56b462935176cdf12a","affectsGlobalScope":true,"impliedFormat":1},{"version":"38f0219c9e23c915ef9790ab1d680440d95419ad264816fa15009a8851e79119","affectsGlobalScope":true,"impliedFormat":1},{"version":"69ab18c3b76cd9b1be3d188eaf8bba06112ebbe2f47f6c322b5105a6fbc45a2e","affectsGlobalScope":true,"impliedFormat":1},{"version":"fef8cfad2e2dc5f5b3d97a6f4f2e92848eb1b88e897bb7318cef0e2820bceaab","affectsGlobalScope":true,"impliedFormat":1},{"version":"2f11ff796926e0832f9ae148008138ad583bd181899ab7dd768a2666700b1893","affectsGlobalScope":true,"impliedFormat":1},{"version":"4de680d5bb41c17f7f68e0419412ca23c98d5749dcaaea1896172f06435891fc","affectsGlobalScope":true,"impliedFormat":1},{"version":"954296b30da6d508a104a3a0b5d96b76495c709785c1d11610908e63481ee667","affectsGlobalScope":true,"impliedFormat":1},{"version":"ac9538681b19688c8eae65811b329d3744af679e0bdfa5d842d0e32524c73e1c","affectsGlobalScope":true,"impliedFormat":1},{"version":"0a969edff4bd52585473d24995c5ef223f6652d6ef46193309b3921d65dd4376","affectsGlobalScope":true,"impliedFormat":1},{"version":"9e9fbd7030c440b33d021da145d3232984c8bb7916f277e8ffd3dc2e3eae2bdb","affectsGlobalScope":true,"impliedFormat":1},{"version":"811ec78f7fefcabbda4bfa93b3eb67d9ae166ef95f9bff989d964061cbf81a0c","affectsGlobalScope":true,"impliedFormat":1},{"version":"717937616a17072082152a2ef351cb51f98802fb4b2fdabd32399843875974ca","affectsGlobalScope":true,"impliedFormat":1},{"version":"d7e7d9b7b50e5f22c915b525acc5a49a7a6584cf8f62d0569e557c5cfc4b2ac2","affectsGlobalScope":true,"impliedFormat":1},{"version":"71c37f4c9543f31dfced6c7840e068c5a5aacb7b89111a4364b1d5276b852557","affectsGlobalScope":true,"impliedFormat":1},{"version":"576711e016cf4f1804676043e6a0a5414252560eb57de9faceee34d79798c850","affectsGlobalScope":true,"impliedFormat":1},{"version":"89c1b1281ba7b8a96efc676b11b264de7a8374c5ea1e6617f11880a13fc56dc6","affectsGlobalScope":true,"impliedFormat":1},{"version":"74f7fa2d027d5b33eb0471c8e82a6c87216223181ec31247c357a3e8e2fddc5b","affectsGlobalScope":true,"impliedFormat":1},{"version":"d6d7ae4d1f1f3772e2a3cde568ed08991a8ae34a080ff1151af28b7f798e22ca","affectsGlobalScope":true,"impliedFormat":1},{"version":"063600664504610fe3e99b717a1223f8b1900087fab0b4cad1496a114744f8df","affectsGlobalScope":true,"impliedFormat":1},{"version":"934019d7e3c81950f9a8426d093458b65d5aff2c7c1511233c0fd5b941e608ab","affectsGlobalScope":true,"impliedFormat":1},{"version":"52ada8e0b6e0482b728070b7639ee42e83a9b1c22d205992756fe020fd9f4a47","affectsGlobalScope":true,"impliedFormat":1},{"version":"3bdefe1bfd4d6dee0e26f928f93ccc128f1b64d5d501ff4a8cf3c6371200e5e6","affectsGlobalScope":true,"impliedFormat":1},{"version":"59fb2c069260b4ba00b5643b907ef5d5341b167e7d1dbf58dfd895658bda2867","affectsGlobalScope":true,"impliedFormat":1},{"version":"639e512c0dfc3fad96a84caad71b8834d66329a1f28dc95e3946c9b58176c73a","affectsGlobalScope":true,"impliedFormat":1},{"version":"368af93f74c9c932edd84c58883e736c9e3d53cec1fe24c0b0ff451f529ceab1","affectsGlobalScope":true,"impliedFormat":1},{"version":"af3dd424cf267428f30ccfc376f47a2c0114546b55c44d8c0f1d57d841e28d74","affectsGlobalScope":true,"impliedFormat":1},{"version":"995c005ab91a498455ea8dfb63aa9f83fa2ea793c3d8aa344be4a1678d06d399","affectsGlobalScope":true,"impliedFormat":1},{"version":"959d36cddf5e7d572a65045b876f2956c973a586da58e5d26cde519184fd9b8a","affectsGlobalScope":true,"impliedFormat":1},{"version":"965f36eae237dd74e6cca203a43e9ca801ce38824ead814728a2807b1910117d","affectsGlobalScope":true,"impliedFormat":1},{"version":"3925a6c820dcb1a06506c90b1577db1fdbf7705d65b62b99dce4be75c637e26b","affectsGlobalScope":true,"impliedFormat":1},{"version":"0a3d63ef2b853447ec4f749d3f368ce642264246e02911fcb1590d8c161b8005","affectsGlobalScope":true,"impliedFormat":1},{"version":"b5ce7a470bc3628408429040c4e3a53a27755022a32fd05e2cb694e7015386c7","affectsGlobalScope":true,"impliedFormat":1},{"version":"8444af78980e3b20b49324f4a16ba35024fef3ee069a0eb67616ea6ca821c47a","affectsGlobalScope":true,"impliedFormat":1},{"version":"3287d9d085fbd618c3971944b65b4be57859f5415f495b33a6adc994edd2f004","affectsGlobalScope":true,"impliedFormat":1},{"version":"b4b67b1a91182421f5df999988c690f14d813b9850b40acd06ed44691f6727ad","affectsGlobalScope":true,"impliedFormat":1},{"version":"df83c2a6c73228b625b0beb6669c7ee2a09c914637e2d35170723ad49c0f5cd4","affectsGlobalScope":true,"impliedFormat":1},{"version":"436aaf437562f276ec2ddbee2f2cdedac7664c1e4c1d2c36839ddd582eeb3d0a","affectsGlobalScope":true,"impliedFormat":1},{"version":"8e3c06ea092138bf9fa5e874a1fdbc9d54805d074bee1de31b99a11e2fec239d","affectsGlobalScope":true,"impliedFormat":1},{"version":"87dc0f382502f5bbce5129bdc0aea21e19a3abbc19259e0b43ae038a9fc4e326","affectsGlobalScope":true,"impliedFormat":1},{"version":"b1cb28af0c891c8c96b2d6b7be76bd394fddcfdb4709a20ba05a7c1605eea0f9","affectsGlobalScope":true,"impliedFormat":1},{"version":"2fef54945a13095fdb9b84f705f2b5994597640c46afeb2ce78352fab4cb3279","affectsGlobalScope":true,"impliedFormat":1},{"version":"ac77cb3e8c6d3565793eb90a8373ee8033146315a3dbead3bde8db5eaf5e5ec6","affectsGlobalScope":true,"impliedFormat":1},{"version":"56e4ed5aab5f5920980066a9409bfaf53e6d21d3f8d020c17e4de584d29600ad","affectsGlobalScope":true,"impliedFormat":1},{"version":"4ece9f17b3866cc077099c73f4983bddbcb1dc7ddb943227f1ec070f529dedd1","affectsGlobalScope":true,"impliedFormat":1},{"version":"0a6282c8827e4b9a95f4bf4f5c205673ada31b982f50572d27103df8ceb8013c","affectsGlobalScope":true,"impliedFormat":1},{"version":"1c9319a09485199c1f7b0498f2988d6d2249793ef67edda49d1e584746be9032","affectsGlobalScope":true,"impliedFormat":1},{"version":"e3a2a0cee0f03ffdde24d89660eba2685bfbdeae955a6c67e8c4c9fd28928eeb","affectsGlobalScope":true,"impliedFormat":1},{"version":"811c71eee4aa0ac5f7adf713323a5c41b0cf6c4e17367a34fbce379e12bbf0a4","affectsGlobalScope":true,"impliedFormat":1},{"version":"51ad4c928303041605b4d7ae32e0c1ee387d43a24cd6f1ebf4a2699e1076d4fa","affectsGlobalScope":true,"impliedFormat":1},{"version":"60037901da1a425516449b9a20073aa03386cce92f7a1fd902d7602be3a7c2e9","affectsGlobalScope":true,"impliedFormat":1},{"version":"d4b1d2c51d058fc21ec2629fff7a76249dec2e36e12960ea056e3ef89174080f","affectsGlobalScope":true,"impliedFormat":1},{"version":"22adec94ef7047a6c9d1af3cb96be87a335908bf9ef386ae9fd50eeb37f44c47","affectsGlobalScope":true,"impliedFormat":1},{"version":"4245fee526a7d1754529d19227ecbf3be066ff79ebb6a380d78e41648f2f224d","affectsGlobalScope":true,"impliedFormat":1},{"version":"8e7f8264d0fb4c5339605a15daadb037bf238c10b654bb3eee14208f860a32ea","affectsGlobalScope":true,"impliedFormat":1},{"version":"782dec38049b92d4e85c1585fbea5474a219c6984a35b004963b00beb1aab538","affectsGlobalScope":true,"impliedFormat":1},{"version":"226a74c9819d24b369f4e1c2e65f9574fad7702a270fa12229000f8d49d41965","affectsGlobalScope":true},{"version":"170d4db14678c68178ee8a3d5a990d5afb759ecb6ec44dbd885c50f6da6204f6","affectsGlobalScope":true,"impliedFormat":1},{"version":"8a8eb4ebffd85e589a1cc7c178e291626c359543403d58c9cd22b81fab5b1fb9","impliedFormat":1},{"version":"a98cf343ef71e0f5eade35af182579a7ff80d54a1ea8f6a6478a9693837d1d79","impliedFormat":1},{"version":"acd8fd5090ac73902278889c38336ff3f48af6ba03aa665eb34a75e7ba1dccc4","impliedFormat":1},{"version":"d6258883868fb2680d2ca96bc8b1352cab69874581493e6d52680c5ffecdb6cc","impliedFormat":1},{"version":"1b61d259de5350f8b1e5db06290d31eaebebc6baafd5f79d314b5af9256d7153","impliedFormat":1},{"version":"f258e3960f324a956fc76a3d3d9e964fff2244ff5859dcc6ce5951e5413ca826","impliedFormat":1},{"version":"643f7232d07bf75e15bd8f658f664d6183a0efaca5eb84b48201c7671a266979","impliedFormat":1},{"version":"0f6666b58e9276ac3a38fdc80993d19208442d6027ab885580d93aec76b4ef00","impliedFormat":1},{"version":"05fd364b8ef02fb1e174fbac8b825bdb1e5a36a016997c8e421f5fab0a6da0a0","impliedFormat":1},{"version":"631eff75b0e35d1b1b31081d55209abc43e16b49426546ab5a9b40bdd40b1f60","impliedFormat":1},{"version":"6c7176368037af28cb72f2392010fa1cef295d6d6744bca8cfb54985f3a18c3e","affectsGlobalScope":true,"impliedFormat":1},{"version":"ab41ef1f2cdafb8df48be20cd969d875602483859dc194e9c97c8a576892c052","affectsGlobalScope":true,"impliedFormat":1},{"version":"437e20f2ba32abaeb7985e0afe0002de1917bc74e949ba585e49feba65da6ca1","affectsGlobalScope":true,"impliedFormat":1},{"version":"21d819c173c0cf7cc3ce57c3276e77fd9a8a01d35a06ad87158781515c9a438a","impliedFormat":1},{"version":"a79e62f1e20467e11a904399b8b18b18c0c6eea6b50c1168bf215356d5bebfaf","affectsGlobalScope":true,"impliedFormat":1},{"version":"d802f0e6b5188646d307f070d83512e8eb94651858de8a82d1e47f60fb6da4e2","affectsGlobalScope":true,"impliedFormat":1},{"version":"17bb4105d0ea2ab2bfcb4f77ff8585691d5569c90ae15f4fa8d5ff9fb42b910b","affectsGlobalScope":true,"impliedFormat":1},{"version":"1db0b7dca579049ca4193d034d835f6bfe73096c73663e5ef9a0b5779939f3d0","affectsGlobalScope":true,"impliedFormat":1},{"version":"9798340ffb0d067d69b1ae5b32faa17ab31b82466a3fc00d8f2f2df0c8554aaa","affectsGlobalScope":true,"impliedFormat":1},{"version":"f26b11d8d8e4b8028f1c7d618b22274c892e4b0ef5b3678a8ccbad85419aef43","affectsGlobalScope":true,"impliedFormat":1},{"version":"5929864ce17fba74232584d90cb721a89b7ad277220627cc97054ba15a98ea8f","impliedFormat":1},{"version":"763fe0f42b3d79b440a9b6e51e9ba3f3f91352469c1e4b3b67bfa4ff6352f3f4","impliedFormat":1},{"version":"25c8056edf4314820382a5fdb4bb7816999acdcb929c8f75e3f39473b87e85bc","impliedFormat":1},{"version":"c464d66b20788266e5353b48dc4aa6bc0dc4a707276df1e7152ab0c9ae21fad8","impliedFormat":1},{"version":"78d0d27c130d35c60b5e5566c9f1e5be77caf39804636bc1a40133919a949f21","impliedFormat":1},{"version":"c6fd2c5a395f2432786c9cb8deb870b9b0e8ff7e22c029954fabdd692bff6195","impliedFormat":1},{"version":"1d6e127068ea8e104a912e42fc0a110e2aa5a66a356a917a163e8cf9a65e4a75","impliedFormat":1},{"version":"5ded6427296cdf3b9542de4471d2aa8d3983671d4cac0f4bf9c637208d1ced43","impliedFormat":1},{"version":"7f182617db458e98fc18dfb272d40aa2fff3a353c44a89b2c0ccb3937709bfb5","impliedFormat":1},{"version":"cadc8aced301244057c4e7e73fbcae534b0f5b12a37b150d80e5a45aa4bebcbd","impliedFormat":1},{"version":"385aab901643aa54e1c36f5ef3107913b10d1b5bb8cbcd933d4263b80a0d7f20","impliedFormat":1},{"version":"9670d44354bab9d9982eca21945686b5c24a3f893db73c0dae0fd74217a4c219","impliedFormat":1},{"version":"0b8a9268adaf4da35e7fa830c8981cfa22adbbe5b3f6f5ab91f6658899e657a7","impliedFormat":1},{"version":"11396ed8a44c02ab9798b7dca436009f866e8dae3c9c25e8c1fbc396880bf1bb","impliedFormat":1},{"version":"ba7bc87d01492633cb5a0e5da8a4a42a1c86270e7b3d2dea5d156828a84e4882","impliedFormat":1},{"version":"4893a895ea92c85345017a04ed427cbd6a1710453338df26881a6019432febdd","impliedFormat":1},{"version":"c21dc52e277bcfc75fac0436ccb75c204f9e1b3fa5e12729670910639f27343e","impliedFormat":1},{"version":"13f6f39e12b1518c6650bbb220c8985999020fe0f21d818e28f512b7771d00f9","impliedFormat":1},{"version":"9b5369969f6e7175740bf51223112ff209f94ba43ecd3bb09eefff9fd675624a","impliedFormat":1},{"version":"4fe9e626e7164748e8769bbf74b538e09607f07ed17c2f20af8d680ee49fc1da","impliedFormat":1},{"version":"24515859bc0b836719105bb6cc3d68255042a9f02a6022b3187948b204946bd2","impliedFormat":1},{"version":"ea0148f897b45a76544ae179784c95af1bd6721b8610af9ffa467a518a086a43","impliedFormat":1},{"version":"24c6a117721e606c9984335f71711877293a9651e44f59f3d21c1ea0856f9cc9","impliedFormat":1},{"version":"dd3273ead9fbde62a72949c97dbec2247ea08e0c6952e701a483d74ef92d6a17","impliedFormat":1},{"version":"405822be75ad3e4d162e07439bac80c6bcc6dbae1929e179cf467ec0b9ee4e2e","impliedFormat":1},{"version":"0db18c6e78ea846316c012478888f33c11ffadab9efd1cc8bcc12daded7a60b6","impliedFormat":1},{"version":"e61be3f894b41b7baa1fbd6a66893f2579bfad01d208b4ff61daef21493ef0a8","impliedFormat":1},{"version":"bd0532fd6556073727d28da0edfd1736417a3f9f394877b6d5ef6ad88fba1d1a","impliedFormat":1},{"version":"89167d696a849fce5ca508032aabfe901c0868f833a8625d5a9c6e861ef935d2","impliedFormat":1},{"version":"615ba88d0128ed16bf83ef8ccbb6aff05c3ee2db1cc0f89ab50a4939bfc1943f","impliedFormat":1},{"version":"a4d551dbf8746780194d550c88f26cf937caf8d56f102969a110cfaed4b06656","impliedFormat":1},{"version":"8bd86b8e8f6a6aa6c49b71e14c4ffe1211a0e97c80f08d2c8cc98838006e4b88","impliedFormat":1},{"version":"317e63deeb21ac07f3992f5b50cdca8338f10acd4fbb7257ebf56735bf52ab00","impliedFormat":1},{"version":"4732aec92b20fb28c5fe9ad99521fb59974289ed1e45aecb282616202184064f","impliedFormat":1},{"version":"2e85db9e6fd73cfa3d7f28e0ab6b55417ea18931423bd47b409a96e4a169e8e6","impliedFormat":1},{"version":"c46e079fe54c76f95c67fb89081b3e399da2c7d109e7dca8e4b58d83e332e605","impliedFormat":1},{"version":"bf67d53d168abc1298888693338cb82854bdb2e69ef83f8a0092093c2d562107","impliedFormat":1},{"version":"2cbe0621042e2a68c7cbce5dfed3906a1862a16a7d496010636cdbdb91341c0f","affectsGlobalScope":true,"impliedFormat":1},{"version":"f9501cc13ce624c72b61f12b3963e84fad210fbdf0ffbc4590e08460a3f04eba","affectsGlobalScope":true,"impliedFormat":1},{"version":"e7721c4f69f93c91360c26a0a84ee885997d748237ef78ef665b153e622b36c1","affectsGlobalScope":true,"impliedFormat":1},{"version":"df48adbf5b82b79ed989ec3bef2979d988b94978907fd86b4f30ba2b668e49de","impliedFormat":1},{"version":"7394959e5a741b185456e1ef5d64599c36c60a323207450991e7a42e08911419","impliedFormat":1},{"version":"2b06b93fd01bcd49d1a6bd1f9b65ddcae6480b9a86e9061634d6f8e354c1468f","impliedFormat":1},{"version":"7b988bc259155186e6b09dd8b32856d9e45c8d261e63c19abaf590bb6550f922","affectsGlobalScope":true,"impliedFormat":1},{"version":"fe7b52f993f9336b595190f3c1fcc259bb2cf6dcb4ac8fdb1e0454cc5df7301e","impliedFormat":1},{"version":"e9b97d69510658d2f4199b7d384326b7c4053b9e6645f5c19e1c2a54ede427fc","impliedFormat":1},{"version":"c2510f124c0293ab80b1777c44d80f812b75612f297b9857406468c0f4dafe29","affectsGlobalScope":true,"impliedFormat":1},{"version":"5524481e56c48ff486f42926778c0a3cce1cc85dc46683b92b1271865bcf015a","impliedFormat":1},{"version":"81711af669f63d43ccb4c08e15beda796656dd46673d0def001c7055db53852d","affectsGlobalScope":true,"impliedFormat":1},{"version":"19d5f8d3930e9f99aa2c36258bf95abbe5adf7e889e6181872d1cdba7c9a7dd5","impliedFormat":1},{"version":"9855e02d837744303391e5623a531734443a5f8e6e8755e018c41d63ad797db2","impliedFormat":1},{"version":"bdba81959361810be44bcfdd283f4d601e406ab5ad1d2bdff0ed480cf983c9d7","impliedFormat":1},{"version":"836a356aae992ff3c28a0212e3eabcb76dd4b0cc06bcb9607aeef560661b860d","impliedFormat":1},{"version":"1e0d1f8b0adfa0b0330e028c7941b5a98c08b600efe7f14d2d2a00854fb2f393","impliedFormat":1},{"version":"5f91ae201f65c3b4a97d3c040f764747198363c74ca09c121af44aecf46bc7c4","affectsGlobalScope":true,"impliedFormat":1},{"version":"c8420c7c2b778b334587a4c0311833b5212ff2f684ea37b2f0e2b117f1d7210d","impliedFormat":1},{"version":"b6b08215821c9833b0e8e30ea1ed178009f2f3ff5d7fae3865ee42f97cc87784","impliedFormat":1},{"version":"3f735210f444dc3fd2d4d2f020d195fe827dad5e30a6d743807c5d1de3a2be73","impliedFormat":1},{"version":"73cf6cc19f16c0191e4e9d497ab0c11c7b38f1ca3f01ad0f09a3a5a971aac4b8","impliedFormat":1},{"version":"3e81d8b837057db6f9c82263e0ef7e5b9a55437342e7028eb8003199ccc69604","impliedFormat":1},{"version":"ed58b9974bb3114f39806c9c2c6258c4ffa6a255921976a7c53dfa94bf178f42","impliedFormat":1},{"version":"e6fa9ad47c5f71ff733744a029d1dc472c618de53804eae08ffc243b936f87ff","affectsGlobalScope":true,"impliedFormat":1},{"version":"f72bc8fe16da67e4e3268599295797b202b95e54bd215a03f97e925dd1502a36","impliedFormat":1},{"version":"b1b6ee0d012aeebe11d776a155d8979730440082797695fc8e2a5c326285678f","impliedFormat":1},{"version":"45875bcae57270aeb3ebc73a5e3fb4c7b9d91d6b045f107c1d8513c28ece71c0","impliedFormat":1},{"version":"915e18c559321c0afaa8d34674d3eb77e1ded12c3e85bf2a9891ec48b07a1ca5","affectsGlobalScope":true,"impliedFormat":1},{"version":"e9727a118ce60808e62457c89762fe5a4e2be8e9fd0112d12432d1bafdba942f","affectsGlobalScope":true,"impliedFormat":1},{"version":"3f16a7e4deafa527ed9995a772bb380eb7d3c2c0fd4ae178c5263ed18394db2c","impliedFormat":1},{"version":"933921f0bb0ec12ef45d1062a1fc0f27635318f4d294e4d99de9a5493e618ca2","impliedFormat":1},{"version":"71a0f3ad612c123b57239a7749770017ecfe6b66411488000aba83e4546fde25","impliedFormat":1},{"version":"70b57b5529051497e9f6482b76d91c0dcbb103d9ead8a0549f5bab8f65e5d031","impliedFormat":1},{"version":"4f9d8ca0c417b67b69eeb54c7ca1bedd7b56034bb9bfd27c5d4f3bc4692daca7","impliedFormat":1},{"version":"814118df420c4e38fe5ae1b9a3bafb6e9c2aa40838e528cde908381867be6466","impliedFormat":1},{"version":"3a90b9beac4c2bfdf6517faae0940a042b81652badf747df0a7c7593456f6ebe","impliedFormat":1},{"version":"8302157cd431b3943eed09ad439b4441826c673d9f870dcb0e1f48e891a4211e","impliedFormat":1},{"version":"37ba7b45141a45ce6e80e66f2a96c8a5ab1bcef0fc2d0f56bb58df96ec67e972","impliedFormat":1},{"version":"125d792ec6c0c0f657d758055c494301cc5fdb327d9d9d5960b3f129aff76093","impliedFormat":1},{"version":"dba28a419aec76ed864ef43e5f577a5c99a010c32e5949fe4e17a4d57c58dd11","affectsGlobalScope":true,"impliedFormat":1},{"version":"2754d8221d77c7b382096651925eb476f1066b3348da4b73fe71ced7801edada","impliedFormat":1},{"version":"c959a391a75be9789b43c8468f71e3fa06488b4d691d5729dde1416dcd38225b","impliedFormat":1},{"version":"f0be1b8078cd549d91f37c30c222c2a187ac1cf981d994fb476a1adc61387b14","affectsGlobalScope":true,"impliedFormat":1},{"version":"0aaed1d72199b01234152f7a60046bc947f1f37d78d182e9ae09c4289e06a592","impliedFormat":1},{"version":"98ffdf93dfdd206516971d28e3e473f417a5cfd41172e46b4ce45008f640588e","impliedFormat":1},{"version":"66ba1b2c3e3a3644a1011cd530fb444a96b1b2dfe2f5e837a002d41a1a799e60","impliedFormat":1},{"version":"7e514f5b852fdbc166b539fdd1f4e9114f29911592a5eb10a94bb3a13ccac3c4","impliedFormat":1},{"version":"cee74f5970ffc01041e5bffc3f324c20450534af4054d2c043cb49dbbd4ec8f7","affectsGlobalScope":true,"impliedFormat":1},{"version":"1a654e0d950353614ba4637a8de4f9d367903a0692b748e11fccf8c880c99735","affectsGlobalScope":true,"impliedFormat":1},{"version":"42da246c46ca3fd421b6fd88bb4466cda7137cf33e87ba5ceeded30219c428bd","impliedFormat":1},{"version":"3a051941721a7f905544732b0eb819c8d88333a96576b13af08b82c4f17581e4","impliedFormat":1},{"version":"ac5ed35e649cdd8143131964336ab9076937fa91802ec760b3ea63b59175c10a","impliedFormat":1},{"version":"71122b94871f11a2be216426470523b679a318b08b34dab23e5e4ba9bdf54c23","affectsGlobalScope":true,"impliedFormat":1},{"version":"db3d77167a7da6c5ba0c51c5b654820e3464093f21724ccd774c0b9bc3f81bc0","impliedFormat":1},{"version":"bdf1feb266c87edbee61f12ceaaef60ab0e2e5dba70ca19360b6448911c53d52","impliedFormat":1},{"version":"865a2612f5ec073dd48d454307ccabb04c48f8b96fda9940c5ebfe6b4b451f51","impliedFormat":1},{"version":"022f47e3d8599ca736e2e07fb950a2519e5f8ad571a96f4542ecdfd27daf0883","impliedFormat":1},{"version":"be1cc4d94ea60cbe567bc29ed479d42587bf1e6cba490f123d329976b0fe4ee5","impliedFormat":1},{"version":"87d6e906e327041fa871dc05e77bd195f014ebe74ff76d0bc9442e7327cde4cb","impliedFormat":1},{"version":"ee4630965cc6a24ae679e5720b8930f872860ab34d64cb1fb8e570319f59bc07","impliedFormat":1},{"version":"413df52d4ea14472c2fa5bee62f7a40abd1eb49be0b9722ee01ee4e52e63beb2","impliedFormat":1},{"version":"db6d2d9daad8a6d83f281af12ce4355a20b9a3e71b82b9f57cddcca0a8964a96","impliedFormat":1},{"version":"829b9e6028b29e6a8b1c01ddb713efe59da04d857089298fa79acbdb3cfcfdef","impliedFormat":1},{"version":"24f8562308dd8ba6013120557fa7b44950b619610b2c6cb8784c79f11e3c4f90","impliedFormat":1},{"version":"c696aa0753345ae6bdaab0e2d4b2053ee76be5140470860eef7e6cadc9f725a1","impliedFormat":1},{"version":"a86f82d646a739041d6702101afa82dcb935c416dd93cbca7fd754fd0282ce1f","impliedFormat":1},{"version":"57d6ac03382e30e9213641ff4f18cf9402bb246b77c13c8e848c0b1ca2b7ef92","impliedFormat":1},{"version":"ce75b1aebb33d510ff28af960a9221410a3eaf7f18fc5f21f9404075fba77256","impliedFormat":1},{"version":"e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855","impliedFormat":1},{"version":"496bbf339f3838c41f164238543e9fe5f1f10659cb30b68903851618464b98ba","impliedFormat":1},{"version":"5178eb4415a172c287c711dc60a619e110c3fd0b7de01ed0627e51a5336aa09c","impliedFormat":1},{"version":"ca6e5264278b53345bc1ce95f42fb0a8b733a09e3d6479c6ccfca55cdc45038c","impliedFormat":1},{"version":"9e2739b32f741859263fdba0244c194ca8e96da49b430377930b8f721d77c000","impliedFormat":1},{"version":"fb1d8e814a3eeb5101ca13515e0548e112bd1ff3fb358ece535b93e94adf5a3a","impliedFormat":1},{"version":"ffa495b17a5ef1d0399586b590bd281056cee6ce3583e34f39926f8dcc6ecdb5","impliedFormat":1},{"version":"98b18458acb46072947aabeeeab1e410f047e0cacc972943059ca5500b0a5e95","impliedFormat":1},{"version":"361e2b13c6765d7f85bb7600b48fde782b90c7c41105b7dab1f6e7871071ba20","impliedFormat":1},{"version":"c86fe861cf1b4c46a0fb7d74dffe596cf679a2e5e8b1456881313170f092e3fa","impliedFormat":1},{"version":"b6db56e4903e9c32e533b78ac85522de734b3d3a8541bf24d256058d464bf04b","impliedFormat":1},{"version":"24daa0366f837d22c94a5c0bad5bf1fd0f6b29e1fae92dc47c3072c3fdb2fbd5","impliedFormat":1},{"version":"570bb5a00836ffad3e4127f6adf581bfc4535737d8ff763a4d6f4cc877e60d98","impliedFormat":1},{"version":"889c00f3d32091841268f0b994beba4dceaa5df7573be12c2c829d7c5fbc232c","impliedFormat":1},{"version":"65f43099ded6073336e697512d9b80f2d4fec3182b7b2316abf712e84104db00","impliedFormat":1},{"version":"e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855","impliedFormat":1},{"version":"e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855","impliedFormat":1},{"version":"8e609bb71c20b858c77f0e9f90bb1319db8477b13f9f965f1a1e18524bf50881","impliedFormat":1},{"version":"acf5a2ac47b59ca07afa9abbd2b31d001bf7448b041927befae2ea5b1951d9f9","impliedFormat":1},{"version":"8e609bb71c20b858c77f0e9f90bb1319db8477b13f9f965f1a1e18524bf50881","impliedFormat":1},{"version":"d71291eff1e19d8762a908ba947e891af44749f3a2cbc5bd2ec4b72f72ea795f","impliedFormat":1},{"version":"c0480e03db4b816dff2682b347c95f2177699525c54e7e6f6aa8ded890b76be7","impliedFormat":1},{"version":"27ab780875bcbb65e09da7496f2ca36288b0c541abaa75c311450a077d54ec15","impliedFormat":1},{"version":"b620391fe8060cf9bedc176a4d01366e6574d7a71e0ac0ab344a4e76576fcbb8","impliedFormat":1},{"version":"380647d8f3b7f852cca6d154a376dbf8ac620a2f12b936594504a8a852e71d2f","impliedFormat":1},{"version":"208c9af9429dd3c76f5927b971263174aaa4bc7621ddec63f163640cbd3c473c","impliedFormat":1},{"version":"6459054aabb306821a043e02b89d54da508e3a6966601a41e71c166e4ea1474f","impliedFormat":1},{"version":"a23185bc5ef590c287c28a91baf280367b50ae4ea40327366ad01f6f4a8edbc5","impliedFormat":1},{"version":"bb37588926aba35c9283fe8d46ebf4e79ffe976343105f5c6d45f282793352b2","impliedFormat":1},{"version":"002eae065e6960458bda3cf695e578b0d1e2785523476f8a9170b103c709cd4f","impliedFormat":1},{"version":"c83bb0c9c5645a46c68356c2f73fdc9de339ce77f7f45a954f560c7e0b8d5ebb","impliedFormat":1},{"version":"05c97cddbaf99978f83d96de2d8af86aded9332592f08ce4a284d72d0952c391","impliedFormat":1},{"version":"72179f9dd22a86deaad4cc3490eb0fe69ee084d503b686985965654013f1391b","impliedFormat":1},{"version":"2e6114a7dd6feeef85b2c80120fdbfb59a5529c0dcc5bfa8447b6996c97a69f5","impliedFormat":1},{"version":"7b6ff760c8a240b40dab6e4419b989f06a5b782f4710d2967e67c695ef3e93c4","impliedFormat":1},{"version":"c8f004e6036aa1c764ad4ec543cf89a5c1893a9535c80ef3f2b653e370de45e6","impliedFormat":1},{"version":"dd80b1e600d00f5c6a6ba23f455b84a7db121219e68f89f10552c54ba46e4dc9","impliedFormat":1},{"version":"b064c36f35de7387d71c599bfcf28875849a1dbc733e82bd26cae3d1cd060521","impliedFormat":1},{"version":"6a148329edecbda07c21098639ef4254ef7869fb25a69f58e5d6a8b7b69d4236","impliedFormat":1},{"version":"8de9fe97fa9e00ec00666fa77ab6e91b35d25af8ca75dabcb01e14ad3299b150","impliedFormat":1},{"version":"f63ab283a1c8f5c79fabe7ca4ef85f9633339c4f0e822fce6a767f9d59282af2","impliedFormat":1},{"version":"dba114fb6a32b355a9cfc26ca2276834d72fe0e94cd2c3494005547025015369","impliedFormat":1},{"version":"a54c996c8870ef1728a2c1fa9b8eaec0bf4a8001cd2583c02dd5869289465b10","impliedFormat":1},{"version":"3e7efde639c6a6c3edb9847b3f61e308bf7a69685b92f665048c45132f51c218","impliedFormat":1},{"version":"df45ca1176e6ac211eae7ddf51336dc075c5314bc5c253651bae639defd5eec5","impliedFormat":1},{"version":"3754982006a3b32c502cff0867ca83584f7a43b1035989ca73603f400de13c96","impliedFormat":1},{"version":"a30ae9bb8a8fa7b90f24b8a0496702063ae4fe75deb27da731ed4a03b2eb6631","impliedFormat":1},{"version":"f974e4a06953682a2c15d5bd5114c0284d5abf8bc0fe4da25cb9159427b70072","impliedFormat":1},{"version":"50256e9c31318487f3752b7ac12ff365c8949953e04568009c8705db802776fb","impliedFormat":1},{"version":"7d73b24e7bf31dfb8a931ca6c4245f6bb0814dfae17e4b60c9e194a631fe5f7b","impliedFormat":1},{"version":"413586add0cfe7369b64979d4ec2ed56c3f771c0667fbde1bf1f10063ede0b08","impliedFormat":1},{"version":"06472528e998d152375ad3bd8ebcb69ff4694fd8d2effaf60a9d9f25a37a097a","impliedFormat":1},{"version":"50b5bc34ce6b12eccb76214b51aadfa56572aa6cc79c2b9455cdbb3d6c76af1d","impliedFormat":1},{"version":"b7e16ef7f646a50991119b205794ebfd3a4d8f8e0f314981ebbe991639023d0e","impliedFormat":1},{"version":"42c169fb8c2d42f4f668c624a9a11e719d5d07dacbebb63cbcf7ef365b0a75b3","impliedFormat":1},{"version":"a401617604fa1f6ce437b81689563dfdc377069e4c58465dbd8d16069aede0a5","impliedFormat":1},{"version":"e9dd71cf12123419c60dab867d44fbee5c358169f99529121eaef277f5c83531","impliedFormat":1},{"version":"5b6a189ba3a0befa1f5d9cb028eb9eec2af2089c32f04ff50e2411f63d70f25d","impliedFormat":1},{"version":"d6e73f8010935b7b4c7487b6fb13ea197cc610f0965b759bec03a561ccf8423a","impliedFormat":1},{"version":"174f3864e398f3f33f9a446a4f403d55a892aa55328cf6686135dfaf9e171657","impliedFormat":1},{"version":"824c76aec8d8c7e65769688cbee102238c0ef421ed6686f41b2a7d8e7e78a931","impliedFormat":1},{"version":"75b868be3463d5a8cfc0d9396f0a3d973b8c297401d00bfb008a42ab16643f13","impliedFormat":1},{"version":"15a234e5031b19c48a69ccc1607522d6e4b50f57d308ecb7fe863d44cd9f9eb3","impliedFormat":1},{"version":"d682336018141807fb602709e2d95a192828fcb8d5ba06dda3833a8ea98f69e3","impliedFormat":1},{"version":"6124e973eab8c52cabf3c07575204efc1784aca6b0a30c79eb85fe240a857efa","impliedFormat":1},{"version":"0d891735a21edc75df51f3eb995e18149e119d1ce22fd40db2b260c5960b914e","impliedFormat":1},{"version":"3b414b99a73171e1c4b7b7714e26b87d6c5cb03d200352da5342ab4088a54c85","impliedFormat":1},{"version":"4fbd3116e00ed3a6410499924b6403cc9367fdca303e34838129b328058ede40","impliedFormat":1},{"version":"b01bd582a6e41457bc56e6f0f9de4cb17f33f5f3843a7cf8210ac9c18472fb0f","impliedFormat":1},{"version":"0a437ae178f999b46b6153d79095b60c42c996bc0458c04955f1c996dc68b971","impliedFormat":1},{"version":"74b2a5e5197bd0f2e0077a1ea7c07455bbea67b87b0869d9786d55104006784f","impliedFormat":1},{"version":"4a7baeb6325920044f66c0f8e5e6f1f52e06e6d87588d837bdf44feb6f35c664","impliedFormat":1},{"version":"6dcf60530c25194a9ee0962230e874ff29d34c59605d8e069a49928759a17e0a","impliedFormat":1},{"version":"7274fbffbd7c9589d8d0ffba68157237afd5cecff1e99881ea3399127e60572f","impliedFormat":1},{"version":"1a42d2ec31a1fe62fdc51591768695ed4a2dc64c01be113e7ff22890bebb5e3f","impliedFormat":1},{"version":"1a82deef4c1d39f6882f28d275cad4c01f907b9b39be9cbc472fcf2cf051e05b","impliedFormat":1},{"version":"c5426dbfc1cf90532f66965a7aa8c1136a78d4d0f96d8180ecbfc11d7722f1a5","impliedFormat":1},{"version":"65a15fc47900787c0bd18b603afb98d33ede930bed1798fc984d5ebb78b26cf9","impliedFormat":1},{"version":"9d202701f6e0744adb6314d03d2eb8fc994798fc83d91b691b75b07626a69801","impliedFormat":1},{"version":"de9d2df7663e64e3a91bf495f315a7577e23ba088f2949d5ce9ec96f44fba37d","impliedFormat":1},{"version":"c7af78a2ea7cb1cd009cfb5bdb48cd0b03dad3b54f6da7aab615c2e9e9d570c5","impliedFormat":1},{"version":"1ee45496b5f8bdee6f7abc233355898e5bf9bd51255db65f5ff7ede617ca0027","impliedFormat":1},{"version":"0c7c947ff881c4274c0800deaa0086971e0bfe51f89a33bd3048eaa3792d4876","affectsGlobalScope":true,"impliedFormat":1},{"version":"db01d18853469bcb5601b9fc9826931cc84cc1a1944b33cad76fd6f1e3d8c544","affectsGlobalScope":true,"impliedFormat":1},{"version":"a8f8e6ab2fa07b45251f403548b78eaf2022f3c2254df3dc186cb2671fe4996d","affectsGlobalScope":true,"impliedFormat":1},{"version":"fa6c12a7c0f6b84d512f200690bfc74819e99efae69e4c95c4cd30f6884c526e","impliedFormat":1},{"version":"f1c32f9ce9c497da4dc215c3bc84b722ea02497d35f9134db3bb40a8d918b92b","impliedFormat":1},{"version":"b73c319af2cc3ef8f6421308a250f328836531ea3761823b4cabbd133047aefa","affectsGlobalScope":true,"impliedFormat":1},{"version":"e433b0337b8106909e7953015e8fa3f2d30797cea27141d1c5b135365bb975a6","impliedFormat":1},{"version":"15b36126e0089bfef173ab61329e8286ce74af5e809d8a72edcafd0cc049057f","impliedFormat":1},{"version":"ddff7fc6edbdc5163a09e22bf8df7bef75f75369ebd7ecea95ba55c4386e2441","impliedFormat":1},{"version":"106c6025f1d99fd468fd8bf6e5bda724e11e5905a4076c5d29790b6c3745e50c","impliedFormat":1},{"version":"a57b1802794433adec9ff3fed12aa79d671faed86c49b09e02e1ac41b4f1d33a","impliedFormat":1},{"version":"ad10d4f0517599cdeca7755b930f148804e3e0e5b5a3847adce0f1f71bbccd74","impliedFormat":1},{"version":"1042064ece5bb47d6aba91648fbe0635c17c600ebdf567588b4ca715602f0a9d","impliedFormat":1},{"version":"c49469a5349b3cc1965710b5b0f98ed6c028686aa8450bcb3796728873eb923e","impliedFormat":1},{"version":"4a889f2c763edb4d55cb624257272ac10d04a1cad2ed2948b10ed4a7fda2a428","impliedFormat":1},{"version":"7bb79aa2fead87d9d56294ef71e056487e848d7b550c9a367523ee5416c44cfa","impliedFormat":1},{"version":"72d63643a657c02d3e51cd99a08b47c9b020a565c55f246907050d3c8a5e77fb","impliedFormat":1},{"version":"1d415445ea58f8033ba199703e55ff7483c52ac6742075b803bd3e7bbe9f5d61","impliedFormat":1},{"version":"d6406c629bb3efc31aedb2de809bef471e475c86c7e67f3ef9b676b5d7e0d6b2","impliedFormat":1},{"version":"27ff4196654e6373c9af16b6165120e2dd2169f9ad6abb5c935af5abd8c7938c","impliedFormat":1},{"version":"24428762d0c97b44c4784d28eee9556547167c4592d20d542a79243f7ca6a73f","impliedFormat":1},{"version":"8c030e515014c10a2b98f9f48408e3ba18023dfd3f56e3312c6c2f3ae1f55a16","impliedFormat":1},{"version":"dafc31e9e8751f437122eb8582b93d477e002839864410ff782504a12f2a550c","impliedFormat":1},{"version":"754498c5208ce3c5134f6eabd49b25cf5e1a042373515718953581636491f3c3","impliedFormat":1},{"version":"9c82171d836c47486074e4ca8e059735bf97b205e70b196535b5efd40cbe1bc5","impliedFormat":1},{"version":"f56bdc6884648806d34bc66d31cdb787c4718d04105ce2cd88535db214631f82","impliedFormat":1},{"version":"633d58a237f4bb25ec7d565e4ffa32cecdcee8660ac12189c4351c52557cee9e","impliedFormat":1},{"version":"2e4f37ffe8862b14d8e24ae8763daaa8340c0df0b859d9a9733def0eee7562d9","impliedFormat":1},{"version":"13283350547389802aa35d9f2188effaeac805499169a06ef5cd77ce2a0bd63f","impliedFormat":1},{"version":"ce791f6ea807560f08065d1af6014581eeb54a05abd73294777a281b6dfd73c2","impliedFormat":1},{"version":"6ac6715916fa75a1f7ebdfeacac09513b4d904b667d827b7535e84ff59679aff","impliedFormat":1},{"version":"49f95e989b4632c6c2a578cc0078ee19a5831832d79cc59abecf5160ea71abad","impliedFormat":1},{"version":"9666533332f26e8995e4d6fe472bdeec9f15d405693723e6497bf94120c566c8","impliedFormat":1},{"version":"ce0df82a9ae6f914ba08409d4d883983cc08e6d59eb2df02d8e4d68309e7848b","impliedFormat":1},{"version":"796273b2edc72e78a04e86d7c58ae94d370ab93a0ddf40b1aa85a37a1c29ecd7","impliedFormat":1},{"version":"5df15a69187d737d6d8d066e189ae4f97e41f4d53712a46b2710ff9f8563ec9f","impliedFormat":1},{"version":"e17cd049a1448de4944800399daa4a64c5db8657cc9be7ef46be66e2a2cd0e7c","impliedFormat":1},{"version":"43fa6ea8714e18adc312b30450b13562949ba2f205a1972a459180fa54471018","impliedFormat":1},{"version":"6e89c2c177347d90916bad67714d0fb473f7e37fb3ce912f4ed521fe2892cd0d","impliedFormat":1},{"version":"43ba4f2fa8c698f5c304d21a3ef596741e8e85a810b7c1f9b692653791d8d97a","impliedFormat":1},{"version":"4d4927cbee21750904af7acf940c5e3c491b4d5ebc676530211e389dd375607a","impliedFormat":1},{"version":"72105519d0390262cf0abe84cf41c926ade0ff475d35eb21307b2f94de985778","impliedFormat":1},{"version":"8a97e578a9bc40eb4f1b0ca78f476f2e9154ecbbfd5567ee72943bab37fc156a","impliedFormat":1},{"version":"c857e0aae3f5f444abd791ec81206020fbcc1223e187316677e026d1c1d6fe08","impliedFormat":1},{"version":"ccf6dd45b708fb74ba9ed0f2478d4eb9195c9dfef0ff83a6092fa3cf2ff53b4f","impliedFormat":1},{"version":"2d7db1d73456e8c5075387d4240c29a2a900847f9c1bff106a2e490da8fbd457","impliedFormat":1},{"version":"2b15c805f48e4e970f8ec0b1915f22d13ca6212375e8987663e2ef5f0205e832","impliedFormat":1},{"version":"f22d05663d873ee7a600faf78abb67f3f719d32266803440cf11d5db7ac0cab2","impliedFormat":1},{"version":"d93c544ad20197b3976b0716c6d5cd5994e71165985d31dcab6e1f77feb4b8f2","impliedFormat":1},{"version":"35069c2c417bd7443ae7c7cafd1de02f665bf015479fec998985ffbbf500628c","impliedFormat":1},{"version":"a8b1c79a833ee148251e88a2553d02ce1641d71d2921cce28e79678f3d8b96aa","impliedFormat":1},{"version":"126d4f950d2bba0bd45b3a86c76554d4126c16339e257e6d2fabf8b6bf1ce00c","impliedFormat":1},{"version":"7e0b7f91c5ab6e33f511efc640d36e6f933510b11be24f98836a20a2dc914c2d","impliedFormat":1},{"version":"045b752f44bf9bbdcaffd882424ab0e15cb8d11fa94e1448942e338c8ef19fba","impliedFormat":1},{"version":"2894c56cad581928bb37607810af011764a2f511f575d28c9f4af0f2ef02d1ab","impliedFormat":1},{"version":"0a72186f94215d020cb386f7dca81d7495ab6c17066eb07d0f44a5bf33c1b21a","impliedFormat":1},{"version":"2d3cc2211f352f46ea6b7cf2c751c141ffcdf514d6e7ae7ee20b7b6742da313f","impliedFormat":1},{"version":"c75445151ff8b77d9923191efed7203985b1a9e09eccf4b054e7be864e27923d","impliedFormat":1},{"version":"0aedb02516baf3e66b2c1db9fef50666d6ed257edac0f866ea32f1aa05aa474f","impliedFormat":1},{"version":"fa8a8fbf91ee2a4779496225f0312aac6635b0f21aa09cdafa4283fe32d519c5","affectsGlobalScope":true,"impliedFormat":1},{"version":"0e8aef93d79b000deb6ec336b5645c87de167168e184e84521886f9ecc69a4b5","impliedFormat":1},{"version":"56ccb49443bfb72e5952f7012f0de1a8679f9f75fc93a5c1ac0bafb28725fc5f","impliedFormat":1},{"version":"20fa37b636fdcc1746ea0738f733d0aed17890d1cd7cb1b2f37010222c23f13e","impliedFormat":1},{"version":"d90b9f1520366d713a73bd30c5a9eb0040d0fb6076aff370796bc776fd705943","impliedFormat":1},{"version":"88e9caa9c5d2ba629240b5913842e7c57c5c0315383b8dc9d436ef2b60f1c391","impliedFormat":1},{"version":"19df3488557c2fc9b4d8f0bac0fd20fb59aa19dec67c81f93813951a81a867f8","affectsGlobalScope":true,"impliedFormat":1},{"version":"a15cf91ab29d3667801562a95730c5f0d96e1d87dffa00a8a91da0002e89fd2d","affectsGlobalScope":true,"impliedFormat":1},{"version":"bef86adb77316505c6b471da1d9b8c9e428867c2566270e8894d4d773a1c4dc2","impliedFormat":1},{"version":"de7052bfee2981443498239a90c04ea5cc07065d5b9bb61b12cb6c84313ad4ef","impliedFormat":1},{"version":"a3e7d932dc9c09daa99141a8e4800fc6c58c625af0d4bbb017773dc36da75426","impliedFormat":1},{"version":"43e96a3d5d1411ab40ba2f61d6a3192e58177bcf3b133a80ad2a16591611726d","impliedFormat":1},{"version":"4a2edd238d9104eac35b60d727f1123de5062f452b70ed8e0366cb36387dfdfd","impliedFormat":1},{"version":"ca921bf56756cb6fe957f6af693a35251b134fb932dc13f3dfff0bb7106f80b4","impliedFormat":1},{"version":"fee92c97f1aa59eb7098a0cc34ff4df7e6b11bae71526aca84359a2575f313d8","impliedFormat":1},{"version":"0bd0297484aacea217d0b76e55452862da3c5d9e33b24430e0719d1161657225","impliedFormat":1},{"version":"2ab6d334bcbf2aff3acfc4fd8c73ecd82b981d3c3aa47b3f3b89281772286904","impliedFormat":1},{"version":"d07cbc787a997d83f7bde3877fec5fb5b12ce8c1b7047eb792996ed9726b4dde","impliedFormat":1},{"version":"6ac6715916fa75a1f7ebdfeacac09513b4d904b667d827b7535e84ff59679aff","impliedFormat":1},{"version":"4805f6161c2c8cefb8d3b8bd96a080c0fe8dbc9315f6ad2e53238f9a79e528a6","impliedFormat":1},{"version":"b83cb14474fa60c5f3ec660146b97d122f0735627f80d82dd03e8caa39b4388c","impliedFormat":1},{"version":"f374cb24e93e7798c4d9e83ff872fa52d2cdb36306392b840a6ddf46cb925cb6","impliedFormat":1},{"version":"49179c6a23701c642bd99abe30d996919748014848b738d8e85181fc159685ff","impliedFormat":1},{"version":"b73cbf0a72c8800cf8f96a9acfe94f3ad32ca71342a8908b8ae484d61113f647","impliedFormat":1},{"version":"bae6dd176832f6423966647382c0d7ba9e63f8c167522f09a982f086cd4e8b23","impliedFormat":1},{"version":"20865ac316b8893c1a0cc383ccfc1801443fbcc2a7255be166cf90d03fac88c9","impliedFormat":1},{"version":"c9958eb32126a3843deedda8c22fb97024aa5d6dd588b90af2d7f2bfac540f23","impliedFormat":1},{"version":"461d0ad8ae5f2ff981778af912ba71b37a8426a33301daa00f21c6ccb27f8156","impliedFormat":1},{"version":"e927c2c13c4eaf0a7f17e6022eee8519eb29ef42c4c13a31e81a611ab8c95577","impliedFormat":1},{"version":"fcafff163ca5e66d3b87126e756e1b6dfa8c526aa9cd2a2b0a9da837d81bbd72","impliedFormat":1},{"version":"70246ad95ad8a22bdfe806cb5d383a26c0c6e58e7207ab9c431f1cb175aca657","impliedFormat":1},{"version":"f00f3aa5d64ff46e600648b55a79dcd1333458f7a10da2ed594d9f0a44b76d0b","impliedFormat":1},{"version":"772d8d5eb158b6c92412c03228bd9902ccb1457d7a705b8129814a5d1a6308fc","impliedFormat":1},{"version":"45490817629431853543adcb91c0673c25af52a456479588b6486daba34f68bb","impliedFormat":1},{"version":"802e797bcab5663b2c9f63f51bdf67eff7c41bc64c0fd65e6da3e7941359e2f7","impliedFormat":1},{"version":"8b4327413e5af38cd8cb97c59f48c3c866015d5d642f28518e3a891c469f240e","impliedFormat":1},{"version":"8514c62ce38e58457d967e9e73f128eedc1378115f712b9eef7127f7c88f82ae","impliedFormat":1},{"version":"f1289e05358c546a5b664fbb35a27738954ec2cc6eb4137350353099d154fc62","impliedFormat":1},{"version":"4b20fcf10a5413680e39f5666464859fc56b1003e7dfe2405ced82371ebd49b6","impliedFormat":1},{"version":"1d17ba45cfbe77a9c7e0df92f7d95f3eefd49ee23d1104d0548b215be56945ad","impliedFormat":1},{"version":"f7d628893c9fa52ba3ab01bcb5e79191636c4331ee5667ecc6373cbccff8ae12","impliedFormat":1},{"version":"5b2323ca2d1bd97e1f32f09452908e015b012e0e4f958f649cbe0c8989a3fb4f","impliedFormat":1},{"version":"9f5a0f3ed33e363b7393223ba4f4af15c13ce94fe3dbdaa476afd2437553a7dd","impliedFormat":1},{"version":"46273e8c29816125d0d0b56ce9a849cc77f60f9a5ba627447501d214466f0ff3","impliedFormat":1},{"version":"d663134457d8d669ae0df34eabd57028bddc04fc444c4bc04bc5215afc91e1f4","impliedFormat":1},{"version":"985153f0deb9b4391110331a2f0c114019dbea90cba5ca68a4107700796e0d75","impliedFormat":1},{"version":"3af3584f79c57853028ef9421ec172539e1fe01853296dc05a9d615ade4ffaf6","impliedFormat":1},{"version":"f82579d87701d639ff4e3930a9b24f4ee13ca74221a9a3a792feb47f01881a9c","impliedFormat":1},{"version":"d7e5d5245a8ba34a274717d085174b2c9827722778129b0081fefd341cca8f55","impliedFormat":1},{"version":"d9d32f94056181c31f553b32ce41d0ef75004912e27450738d57efcd2409c324","impliedFormat":1},{"version":"752513f35f6cff294ffe02d6027c41373adf7bfa35e593dbfd53d95c203635ee","impliedFormat":1},{"version":"6c800b281b9e89e69165fd11536195488de3ff53004e55905e6c0059a2d8591e","impliedFormat":1},{"version":"7d4254b4c6c67a29d5e7f65e67d72540480ac2cfb041ca484847f5ae70480b62","impliedFormat":1},{"version":"1a7e2ea171726446850ec72f4d1525d547ff7e86724cc9e7eec509725752a758","impliedFormat":1},{"version":"8c901126d73f09ecdea4785e9a187d1ac4e793e07da308009db04a7283ec2f37","impliedFormat":1},{"version":"db97922b767bd2675fdfa71e08b49c38b7d2c847a1cc4a7274cb77be23b026f1","impliedFormat":1},{"version":"aab290b8e4b7c399f2c09b957666fc95335eb4522b2dd9ead1bf0cb64da6d6ee","impliedFormat":1},{"version":"94fe3281392e1015b22f39535878610b4fa6f1388dc8d78746be3bc4e4bb8950","impliedFormat":1},{"version":"2652448ac55a2010a1f71dd141f828b682298d39728f9871e1cdf8696ef443fd","impliedFormat":1},{"version":"06c25ddfc2242bd06c19f66c9eae4c46d937349a267810f89783680a1d7b5259","impliedFormat":1},{"version":"120599fd965257b1f4d0ff794bc696162832d9d8467224f4665f713a3119078b","impliedFormat":1},{"version":"5433f33b0a20300cca35d2f229a7fc20b0e8477c44be2affeb21cb464af60c76","impliedFormat":1},{"version":"db036c56f79186da50af66511d37d9fe77fa6793381927292d17f81f787bb195","impliedFormat":1},{"version":"bd4131091b773973ca5d2326c60b789ab1f5e02d8843b3587effe6e1ea7c9d86","impliedFormat":1},{"version":"c7f6485931085bf010fbaf46880a9b9ec1a285ad9dc8c695a9e936f5a48f34b4","impliedFormat":1},{"version":"14f6b927888a1112d662877a5966b05ac1bf7ed25d6c84386db4c23c95a5363b","impliedFormat":1},{"version":"6ac6715916fa75a1f7ebdfeacac09513b4d904b667d827b7535e84ff59679aff","impliedFormat":1},{"version":"0427df5c06fafc5fe126d14b9becd24160a288deff40e838bfbd92a35f8d0d00","impliedFormat":1},{"version":"90c54a02432d04e4246c87736e53a6a83084357acfeeba7a489c5422b22f5c7a","impliedFormat":1},{"version":"49c346823ba6d4b12278c12c977fb3a31c06b9ca719015978cb145eb86da1c61","impliedFormat":1},{"version":"bfac6e50eaa7e73bb66b7e052c38fdc8ccfc8dbde2777648642af33cf349f7f1","impliedFormat":1},{"version":"92f7c1a4da7fbfd67a2228d1687d5c2e1faa0ba865a94d3550a3941d7527a45d","impliedFormat":1},{"version":"f53b120213a9289d9a26f5af90c4c686dd71d91487a0aa5451a38366c70dc64b","impliedFormat":1},{"version":"83fe880c090afe485a5c02262c0b7cdd76a299a50c48d9bde02be8e908fb4ae6","impliedFormat":1},{"version":"0a372c2d12a259da78e21b25974d2878502f14d89c6d16b97bd9c5017ab1bc12","impliedFormat":1},{"version":"57d67b72e06059adc5e9454de26bbfe567d412b962a501d263c75c2db430f40e","impliedFormat":1},{"version":"6511e4503cf74c469c60aafd6589e4d14d5eb0a25f9bf043dcbecdf65f261972","impliedFormat":1},{"version":"ec1ca97598eda26b7a5e6c8053623acbd88e43be7c4d29c77ccd57abc4c43999","impliedFormat":1},{"version":"6e2261cd9836b2c25eecb13940d92c024ebed7f8efe23c4b084145cd3a13b8a6","impliedFormat":1},{"version":"a67b87d0281c97dfc1197ef28dfe397fc2c865ccd41f7e32b53f647184cc7307","impliedFormat":1},{"version":"771ffb773f1ddd562492a6b9aaca648192ac3f056f0e1d997678ff97dbb6bf9b","impliedFormat":1},{"version":"232f70c0cf2b432f3a6e56a8dc3417103eb162292a9fd376d51a3a9ea5fbbf6f","impliedFormat":1},{"version":"a47e6d954d22dd9ebb802e7e431b560ed7c581e79fb885e44dc92ed4f60d4c07","impliedFormat":1},{"version":"f019e57d2491c159d47a107fd90219a1734bdd2e25cd8d1db3c8fae5c6b414c4","impliedFormat":1},{"version":"8a0e762ceb20c7e72504feef83d709468a70af4abccb304f32d6b9bac1129b2c","impliedFormat":1},{"version":"d1c9bf292a54312888a77bb19dba5e2503ad803f5393beafd45d78d2f4fe9b48","impliedFormat":1},{"version":"9252d498a77517aab5d8d4b5eb9d71e4b225bbc7123df9713e08181de63180f6","impliedFormat":1},{"version":"552bfa10434c2a8f6415899c51dd816dd6845ef7ec01e15cdf053aa46d002e57","impliedFormat":1},{"version":"35e6379c3f7cb27b111ad4c1aa69538fd8e788ab737b8ff7596a1b40e96f4f90","impliedFormat":1},{"version":"1fffe726740f9787f15b532e1dc870af3cd964dbe29e191e76121aa3dd8693f2","impliedFormat":1},{"version":"3be035da7bee86b4c3abf392e0edaa44fc6e45092995eefe36b39118c8a84068","affectsGlobalScope":true,"impliedFormat":1},{"version":"8f828825d077c2fa0ea606649faeb122749273a353daab23924fe674e98ba44c","impliedFormat":1},{"version":"2896c2e673a5d3bd9b4246811f79486a073cbb03950c3d252fba10003c57411a","impliedFormat":1},{"version":"616775f16134fa9d01fc677ad3f76e68c051a056c22ab552c64cc281a9686790","impliedFormat":1},{"version":"65c24a8baa2cca1de069a0ba9fba82a173690f52d7e2d0f1f7542d59d5eb4db0","impliedFormat":1},{"version":"f9fe6af238339a0e5f7563acee3178f51db37f32a2e7c09f85273098cee7ec49","impliedFormat":1},{"version":"407a06ba04eede4074eec470ecba2784cbb3bf4e7de56833b097dd90a2aa0651","impliedFormat":1},{"version":"77e71242e71ebf8528c5802993697878f0533db8f2299b4d36aa015bae08a79c","impliedFormat":1},{"version":"98a787be42bd92f8c2a37d7df5f13e5992da0d967fab794adbb7ee18370f9849","impliedFormat":1},{"version":"5c96bad5f78466785cdad664c056e9e2802d5482ca5f862ed19ba34ffbb7b3a4","impliedFormat":1},{"version":"b7fff2d004c5879cae335db8f954eb1d61242d9f2d28515e67902032723caeab","impliedFormat":1},{"version":"5f3dc10ae646f375776b4e028d2bed039a93eebbba105694d8b910feebbe8b9c","impliedFormat":1},{"version":"bb0cd7862b72f5eba39909c9889d566e198fcaddf7207c16737d0c2246112678","impliedFormat":1},{"version":"4545c1a1ceca170d5d83452dd7c4994644c35cf676a671412601689d9a62da35","impliedFormat":1},{"version":"320f4091e33548b554d2214ce5fc31c96631b513dffa806e2e3a60766c8c49d9","impliedFormat":1},{"version":"a2d648d333cf67b9aeac5d81a1a379d563a8ffa91ddd61c6179f68de724260ff","impliedFormat":1},{"version":"d90d5f524de38889d1e1dbc2aeef00060d779f8688c02766ddb9ca195e4a713d","impliedFormat":1},{"version":"a3f41ed1b4f2fc3049394b945a68ae4fdefd49fa1739c32f149d32c0545d67f5","impliedFormat":1},{"version":"bad68fd0401eb90fe7da408565c8aee9c7a7021c2577aec92fa1382e8876071a","impliedFormat":1},{"version":"47699512e6d8bebf7be488182427189f999affe3addc1c87c882d36b7f2d0b0e","impliedFormat":1},{"version":"fec01479923e169fb52bd4f668dbeef1d7a7ea6e6d491e15617b46f2cacfa37d","impliedFormat":1},{"version":"8a8fb3097ba52f0ae6530ec6ab34e43e316506eb1d9aa29420a4b1e92a81442d","impliedFormat":1},{"version":"44e09c831fefb6fe59b8e65ad8f68a7ecc0e708d152cfcbe7ba6d6080c31c61e","impliedFormat":1},{"version":"1c0a98de1323051010ce5b958ad47bc1c007f7921973123c999300e2b7b0ecc0","impliedFormat":1},{"version":"4655709c9cb3fd6db2b866cab7c418c40ed9533ce8ea4b66b5f17ec2feea46a9","impliedFormat":1},{"version":"87affad8e2243635d3a191fa72ef896842748d812e973b7510a55c6200b3c2a4","impliedFormat":1},{"version":"ad036a85efcd9e5b4f7dd5c1a7362c8478f9a3b6c3554654ca24a29aa850a9c5","impliedFormat":1},{"version":"fedebeae32c5cdd1a85b4e0504a01996e4a8adf3dfa72876920d3dd6e42978e7","impliedFormat":1},{"version":"3eecb25bb467a948c04874d70452b14ae7edb707660aac17dc053e42f2088b00","impliedFormat":1},{"version":"cdf21eee8007e339b1b9945abf4a7b44930b1d695cc528459e68a3adc39a622e","impliedFormat":1},{"version":"330896c1a2b9693edd617be24fbf9e5895d6e18c7955d6c08f028f272b37314d","impliedFormat":1},{"version":"1d9c0a9a6df4e8f29dc84c25c5aa0bb1da5456ebede7a03e03df08bb8b27bae6","impliedFormat":1},{"version":"84380af21da938a567c65ef95aefb5354f676368ee1a1cbb4cae81604a4c7d17","impliedFormat":1},{"version":"1af3e1f2a5d1332e136f8b0b95c0e6c0a02aaabd5092b36b64f3042a03debf28","impliedFormat":1},{"version":"30d8da250766efa99490fc02801047c2c6d72dd0da1bba6581c7e80d1d8842a4","impliedFormat":1},{"version":"03566202f5553bd2d9de22dfab0c61aa163cabb64f0223c08431fb3fc8f70280","impliedFormat":1},{"version":"5f0292a40df210ab94b9fb44c8b775c51e96777e14e073900e392b295ca1061b","impliedFormat":1},{"version":"bc9ee0192f056b3d5527bcd78dc3f9e527a9ba2bdc0a2c296fbc9027147df4b2","impliedFormat":1},{"version":"8627ad129bcf56e82adff0ab5951627c993937aa99f5949c33240d690088b803","impliedFormat":1},{"version":"1de80059b8078ea5749941c9f863aa970b4735bdbb003be4925c853a8b6b4450","impliedFormat":1},{"version":"1d079c37fa53e3c21ed3fa214a27507bda9991f2a41458705b19ed8c2b61173d","impliedFormat":1},{"version":"5bf5c7a44e779790d1eb54c234b668b15e34affa95e78eada73e5757f61ed76a","impliedFormat":1},{"version":"5835a6e0d7cd2738e56b671af0e561e7c1b4fb77751383672f4b009f4e161d70","impliedFormat":1},{"version":"5c634644d45a1b6bc7b05e71e05e52ec04f3d73d9ac85d5927f647a5f965181a","impliedFormat":1},{"version":"4b7f74b772140395e7af67c4841be1ab867c11b3b82a51b1aeb692822b76c872","impliedFormat":1},{"version":"27be6622e2922a1b412eb057faa854831b95db9db5035c3f6d4b677b902ab3b7","impliedFormat":1},{"version":"a68d4b3182e8d776cdede7ac9630c209a7bfbb59191f99a52479151816ef9f9e","impliedFormat":99},{"version":"39644b343e4e3d748344af8182111e3bbc594930fff0170256567e13bbdbebb0","impliedFormat":99},{"version":"ed7fd5160b47b0de3b1571c5c5578e8e7e3314e33ae0b8ea85a895774ee64749","impliedFormat":99},{"version":"63a7595a5015e65262557f883463f934904959da563b4f788306f699411e9bac","impliedFormat":1},{"version":"ecbaf0da125974be39c0aac869e403f72f033a4e7fd0d8cd821a8349b4159628","impliedFormat":1},{"version":"4ba137d6553965703b6b55fd2000b4e07ba365f8caeb0359162ad7247f9707a6","impliedFormat":1},{"version":"ceec3c81b2d81f5e3b855d9367c1d4c664ab5046dff8fd56552df015b7ccbe8f","affectsGlobalScope":true,"impliedFormat":1},{"version":"8fac4a15690b27612d8474fb2fc7cc00388df52d169791b78d1a3645d60b4c8b","affectsGlobalScope":true,"impliedFormat":1},{"version":"064ac1c2ac4b2867c2ceaa74bbdce0cb6a4c16e7c31a6497097159c18f74aa7c","impliedFormat":1},{"version":"3dc14e1ab45e497e5d5e4295271d54ff689aeae00b4277979fdd10fa563540ae","impliedFormat":1},{"version":"1d63055b690a582006435ddd3aa9c03aac16a696fac77ce2ed808f3e5a06efab","impliedFormat":1},{"version":"b789bf89eb19c777ed1e956dbad0925ca795701552d22e68fd130a032008b9f9","impliedFormat":1},"85ae5aee75f011967cf2d25cbc342f62d69314e9d925f7f4aa3456fc2cffcca6",{"version":"514e2854e7e140da8049b4974b833fba09dfa8b993233d150ce1f012a77e5b29","signature":"8e609bb71c20b858c77f0e9f90bb1319db8477b13f9f965f1a1e18524bf50881"},{"version":"fb93fb0fedaf2f6c82d2358cbb4f6ef26740aff3e2e0e1d6c5736b109ab365ae","signature":"d87ebdf762f26f88836e35cb5979b5cb68eea01f77d422fa1b8e505d336477e1"},{"version":"ec5539ce01ccd8d645f760226543a8a437296adaeab8aa6d3d0257ab5e741b8d","signature":"791e430d569117bdc239ccd371365831cbf9d4ce593da31aa6a55da72ebb1fcb"},{"version":"672518959bfde8a27970c6cf475c0156067fe37f81ced7c54229ca7ebca99113","signature":"a9a5ba49fc3a8dd45cd30ee7a3ef9778dc951a0f2c6dd21bb0a9274076595665"},{"version":"36db6770bb053306b428c9fc9ab70f67c199a081e158ffcd094e90eee3f02bd0","signature":"c55851e553e762f49f2697ebe253cc87cf392cd5248a816221a380b661e8af77"},{"version":"0582a55da456aaee25ddd5c422700194707e16e2c0b0ef8d05cebeff9affa59f","signature":"655a502cb6eb9afc11960fce75fa4c695f237f537d8b331132e99bada2fd13d5"},{"version":"7ba8ff671f106b530f3e9a4807addc381a1e076245ceb3c6c0f11598708324c6","signature":"8e52f14e588ecad50d140b7a423e102d099d94fa06dbc72b4d0f98932c56ddb6"},{"version":"d3cfde44f8089768ebb08098c96d01ca260b88bccf238d55eee93f1c620ff5a5","impliedFormat":1},{"version":"293eadad9dead44c6fd1db6de552663c33f215c55a1bfa2802a1bceed88ff0ec","impliedFormat":1},{"version":"833e92c058d033cde3f29a6c7603f517001d1ddd8020bc94d2067a3bc69b2a8e","impliedFormat":1},{"version":"08b2fae7b0f553ad9f79faec864b179fc58bc172e295a70943e8585dd85f600c","impliedFormat":1},{"version":"f12edf1672a94c578eca32216839604f1e1c16b40a1896198deabf99c882b340","impliedFormat":1},{"version":"e3498cf5e428e6c6b9e97bd88736f26d6cf147dedbfa5a8ad3ed8e05e059af8a","impliedFormat":1},{"version":"dba3f34531fd9b1b6e072928b6f885aa4d28dd6789cbd0e93563d43f4b62da53","impliedFormat":1},{"version":"f672c876c1a04a223cf2023b3d91e8a52bb1544c576b81bf64a8fec82be9969c","impliedFormat":1},{"version":"e4b03ddcf8563b1c0aee782a185286ed85a255ce8a30df8453aade2188bbc904","impliedFormat":1},{"version":"2329d90062487e1eaca87b5e06abcbbeeecf80a82f65f949fd332cfcf824b87b","impliedFormat":1},{"version":"25b3f581e12ede11e5739f57a86e8668fbc0124f6649506def306cad2c59d262","impliedFormat":1},{"version":"4fdb529707247a1a917a4626bfb6a293d52cd8ee57ccf03830ec91d39d606d6d","impliedFormat":1},{"version":"a9ebb67d6bbead6044b43714b50dcb77b8f7541ffe803046fdec1714c1eba206","impliedFormat":1},{"version":"5780b706cece027f0d4444fbb4e1af62dc51e19da7c3d3719f67b22b033859b9","impliedFormat":1},{"version":"f3d8c757e148ad968f0d98697987db363070abada5f503da3c06aefd9d4248c1","impliedFormat":1},{"version":"314b44ab4fc733c4283364f3e31d00627d68da4bf2cafdf772d2f5e8f3e3284f","impliedFormat":1},{"version":"e2d2693c8dcdbe0454d6cac650af7527399cdf0d0c7992e1a269bd6910a9976a","impliedFormat":1},{"version":"3511fa6eae523772f389aec859979dce5818b8d585bc8112fa967b952fddf3d0","impliedFormat":1},{"version":"84bcc7c6b06f4d643a55dc63b56be0c81d990f8d549b66ea615c553268774dc3","impliedFormat":1},{"version":"2d225e7bda2871c066a7079c88174340950fb604f624f2586d3ea27bb9e5f4ff","impliedFormat":1},{"version":"6a785f84e63234035e511817dd48ada756d984dd8f9344e56eb8b2bdcd8fd001","impliedFormat":1},{"version":"c1422d016f7df2ccd3594c06f2923199acd09898f2c42f50ea8159f1f856f618","impliedFormat":1},{"version":"2973b1b7857ca144251375b97f98474e9847a890331e27132d5a8b3aea9350a8","impliedFormat":1},{"version":"0eb6152d37c84d6119295493dfcc20c331c6fda1304a513d159cdaa599dcb78b","impliedFormat":1},{"version":"237df26f8c326ca00cd9d2deb40214a079749062156386b6d75bdcecc6988a6b","impliedFormat":1},{"version":"cd44995ee13d5d23df17a10213fed7b483fabfd5ea08f267ab52c07ce0b6b4da","impliedFormat":1},{"version":"58ce1486f851942bd2d3056b399079bc9cb978ec933fe9833ea417e33eab676e","impliedFormat":1},{"version":"7557d4d7f19f94341f4413575a3453ba7f6039c9591015bcf4282a8e75414043","impliedFormat":1},{"version":"a3b2cc16f3ce2d882eca44e1066f57a24751545f2a5e4a153d4de31b4cac9bb5","impliedFormat":1},{"version":"ac2b3b377d3068bfb6e1cb8889c99098f2c875955e2325315991882a74d92cc8","impliedFormat":1},{"version":"8deb39d89095469957f73bd194d11f01d9894b8c1f1e27fbf3f6e8122576b336","impliedFormat":1},{"version":"a38a9c41f433b608a0d37e645a31eecf7233ef3d3fffeb626988d3219f80e32f","impliedFormat":1},{"version":"8e1428dcba6a984489863935049893631170a37f9584c0479f06e1a5b1f04332","impliedFormat":1},{"version":"1fce9ecb87a2d3898941c60df617e52e50fb0c03c9b7b2ba8381972448327285","impliedFormat":1},{"version":"5ef0597b8238443908b2c4bf69149ed3894ac0ddd0515ac583d38c7595b151f1","impliedFormat":1},{"version":"ac52b775a80badff5f4ac329c5725a26bd5aaadd57afa7ad9e98b4844767312a","impliedFormat":1},{"version":"6ae5b4a63010c82bf2522b4ecfc29ffe6a8b0c5eea6b2b35120077e9ac54d7a1","impliedFormat":1},{"version":"dd7109c49f416f218915921d44f0f28975df78e04e437c62e1e1eb3be5e18a35","impliedFormat":1},{"version":"eee181112e420b345fc78422a6cc32385ede3d27e2eaf8b8c4ad8b2c29e3e52e","impliedFormat":1},{"version":"25fbe57c8ee3079e2201fe580578fab4f3a78881c98865b7c96233af00bf9624","impliedFormat":1},{"version":"62cc8477858487b4c4de7d7ae5e745a8ce0015c1592f398b63ee05d6e64ca295","impliedFormat":1},{"version":"cc2a9ec3cb10e4c0b8738b02c31798fad312d21ef20b6a2f5be1d077e9f5409d","impliedFormat":1},{"version":"4b4fadcda7d34034737598c07e2dca5d7e1e633cb3ba8dd4d2e6a7782b30b296","impliedFormat":1},{"version":"360fdc8829a51c5428636f1f83e7db36fef6c5a15ed4411b582d00a1c2bd6e97","impliedFormat":1},{"version":"1cf0d15e6ab1ecabbf329b906ae8543e6b8955133b7f6655f04d433e3a0597ab","impliedFormat":1},{"version":"7c9f98fe812643141502b30fb2b5ec56d16aaf94f98580276ae37b7924dd44a4","impliedFormat":1},{"version":"b3547893f24f59d0a644c52f55901b15a3fa1a115bc5ea9a582911469b9348b7","impliedFormat":1},{"version":"596e5b88b6ca8399076afcc22af6e6e0c4700c7cd1f420a78d637c3fb44a885e","impliedFormat":1},{"version":"adddf736e08132c7059ee572b128fdacb1c2650ace80d0f582e93d097ed4fbaf","impliedFormat":1},{"version":"d4cad9dc13e9c5348637170ddd5d95f7ed5fdfc856ddca40234fa55518bc99a6","impliedFormat":1},{"version":"d70675ba7ba7d02e52b7070a369957a70827e4b2bca2c1680c38a832e87b61fd","impliedFormat":1},{"version":"3be71f4ce8988a01e2f5368bdd58e1d60236baf511e4510ee9291c7b3729a27e","impliedFormat":1},{"version":"423d2ccc38e369a7527988d682fafc40267bcd6688a7473e59c5eea20a29b64f","impliedFormat":1},{"version":"2f9fde0868ed030277c678b435f63fcf03d27c04301299580a4017963cc04ce6","impliedFormat":1},{"version":"feeb73d48cc41c6dd23d17473521b0af877751504c30c18dc84267c8eeea429a","impliedFormat":1},{"version":"25f1159094dc0bf3a71313a74e0885426af21c5d6564a254004f2cadf9c5b052","impliedFormat":1},{"version":"cde493e09daad4bb29922fe633f760be9f0e8e2f39cdca999cce3b8690b5e13a","impliedFormat":1},{"version":"3d7f9eb12aface876f7b535cc89dcd416daf77f0b3573333f16ec0a70bcf902a","impliedFormat":1},{"version":"b83139ae818dd20f365118f9999335ca4cd84ae518348619adc5728e7e0372d5","impliedFormat":1},{"version":"e0205f04611bea8b5b82168065b8ef1476a8e96236201494eb8c785331c43118","impliedFormat":1},{"version":"62d26d8ba4fa15ab425c1b57a050ed76c5b0ecbffaa53f182110aa3a02405a07","impliedFormat":1},{"version":"9941cbf7ca695e95d588f5f1692ab040b078d44a95d231fa9a8f828186b7b77d","impliedFormat":1},{"version":"41b8775befd7ded7245a627e9f4de6110236688ce4c124d2d40c37bc1a3bfe05","impliedFormat":1},{"version":"d514a80424cdfff835a97a8839fd84a15aa60eaba5e2363d4c1dbb16602bf4a7","impliedFormat":1},{"version":"1ef2431c0d0b8e649c93acb2cd52ee9577d49e2c0259dc741ab4c4022dba2c23","impliedFormat":1},{"version":"7449c741d9b79f34cd33150fa7d392564134a77fe2fa192d3b972cc91dd99817","impliedFormat":1},{"version":"e758621d2d514dd3a877aeb161438a1c3e65f40323a9bc7e038dbcab9b533670","impliedFormat":1},{"version":"a4e9e0d92dcad2cb387a5f1bdffe621569052f2d80186e11973aa7080260d296","impliedFormat":1},{"version":"f6380cc36fc3efc70084d288d0a05d0a2e09da012ee3853f9d62431e7216f129","impliedFormat":1},{"version":"497c3e541b4acf6c5d5ba75b03569cfe5fe25c8a87e6c87f1af98da6a3e7b918","impliedFormat":1},{"version":"d9429b81edf2fb2abf1e81e9c2e92615f596ed3166673d9b69b84c369b15fdc0","impliedFormat":1},{"version":"7e22943ae4e474854ca0695ab750a8026f55bb94278331fda02a4fb42efce063","impliedFormat":1},{"version":"7da9ff3d9a7e62ddca6393a23e67296ab88f2fcb94ee5f7fb977fa8e478852ac","impliedFormat":1},{"version":"e1b45cc21ea200308cbc8abae2fb0cfd014cb5b0e1d1643bcc50afa5959b6d83","impliedFormat":1},{"version":"c9740b0ce7533ce6ba21a7d424e38d2736acdddeab2b1a814c00396e62cc2f10","impliedFormat":1},{"version":"b3c1f6a3fdbb04c6b244de6d5772ffdd9e962a2faea1440e410049c13e874b87","impliedFormat":1},{"version":"dcaa872d9b52b9409979170734bdfd38f846c32114d05b70640fd05140b171bb","impliedFormat":1},{"version":"6c434d20da381fcd2e8b924a3ec9b8653cf8bed8e0da648e91f4c984bd2a5a91","impliedFormat":1},{"version":"992419d044caf6b14946fa7b9463819ab2eeb7af7c04919cc2087ce354c92266","impliedFormat":1},{"version":"fa9815e9ce1330289a5c0192e2e91eb6178c0caa83c19fe0c6a9f67013fe795c","impliedFormat":1},{"version":"06384a1a73fcf4524952ecd0d6b63171c5d41dd23573907a91ef0a687ddb4a8c","impliedFormat":1},{"version":"34b1594ecf1c84bcc7a04d9f583afa6345a6fea27a52cf2685f802629219de45","impliedFormat":1},{"version":"d82c9ca830d7b94b7530a2c5819064d8255b93dfeddc5b2ebb8a09316f002c89","impliedFormat":1},{"version":"7e046b9634add57e512412a7881efbc14d44d1c65eadd35432412aa564537975","impliedFormat":1},{"version":"aac9079b9e2b5180036f27ab37cb3cf4fd19955be48ccc82eab3f092ee3d4026","impliedFormat":1},{"version":"3d9c38933bc69e0a885da20f019de441a3b5433ce041ba5b9d3a541db4b568cb","impliedFormat":1},{"version":"606aa2b74372221b0f79ca8ae3568629f444cc454aa59b032e4cb602308dec94","impliedFormat":1},{"version":"50474eaea72bfda85cc37ae6cd29f0556965c0849495d96c8c04c940ef3d2f44","impliedFormat":1},{"version":"b4874382f863cf7dc82b3d15aed1e1372ac3fede462065d5bfc8510c0d8f7b19","impliedFormat":1},{"version":"df10b4f781871afb72b2d648d497671190b16b679bf7533b744cc10b3c6bf7ea","impliedFormat":1},{"version":"1fdc28754c77e852c92087c789a1461aa6eed19c335dc92ce6b16a188e7ba305","impliedFormat":1},{"version":"a656dab1d502d4ddc845b66d8735c484bfebbf0b1eda5fb29729222675759884","impliedFormat":1},{"version":"465a79505258d251068dc0047a67a3605dd26e6b15e9ad2cec297442cbb58820","impliedFormat":1},{"version":"ddae22d9329db28ce3d80a2a53f99eaed66959c1c9cd719c9b744e5470579d2f","impliedFormat":1},{"version":"d0e25feadef054c6fc6a7f55ccc3b27b7216142106b9ff50f5e7b19d85c62ca7","impliedFormat":1},{"version":"111214009193320cacbae104e8281f6cb37788b52a6a84d259f9822c8c71f6ca","impliedFormat":1},{"version":"01c8e2c8984c96b9b48be20ee396bd3689a3a3e6add8d50fe8229a7d4e62ff45","impliedFormat":1},{"version":"a4a0800b592e533897b4967b00fb00f7cd48af9714d300767cc231271aa100af","impliedFormat":1},{"version":"20aa818c3e16e40586f2fa26327ea17242c8873fe3412a69ec68846017219314","impliedFormat":1},{"version":"f498532f53d54f831851990cb4bcd96063d73e302906fa07e2df24aa5935c7d1","impliedFormat":1},{"version":"5fd19dfde8de7a0b91df6a9bbdc44b648fd1f245cae9e8b8cf210d83ee06f106","impliedFormat":1},{"version":"3b8d6638c32e63ea0679eb26d1eb78534f4cc02c27b80f1c0a19f348774f5571","impliedFormat":1},{"version":"ce0da52e69bc3d82a7b5bc40da6baad08d3790de13ad35e89148a88055b46809","impliedFormat":1},{"version":"9e01233da81bfed887f8d9a70d1a26bf11b8ddff165806cc586c84980bf8fc24","impliedFormat":1},{"version":"214a6afbab8b285fc97eb3cece36cae65ea2fca3cbd0c017a96159b14050d202","impliedFormat":1},{"version":"14beeca2944b75b229c0549e0996dc4b7863e07257e0d359d63a7be49a6b86a4","impliedFormat":1},{"version":"f7bb9adb1daa749208b47d1313a46837e4d27687f85a3af7777fc1c9b3dc06b1","impliedFormat":1},{"version":"c549fe2f52101ffe47f58107c702af7cdcd42da8c80afd79f707d1c5d77d4b6e","impliedFormat":1},{"version":"3966ea9e1c1a5f6e636606785999734988e135541b79adc6b5d00abdc0f4bf05","impliedFormat":1},{"version":"0b60b69c957adb27f990fbc27ea4ac1064249400262d7c4c1b0a1687506b3406","impliedFormat":1},{"version":"12c26e5d1befc0ded725cee4c2316f276013e6f2eb545966562ae9a0c1931357","impliedFormat":1},{"version":"27b247363f1376c12310f73ebac6debcde009c0b95b65a8207e4fa90e132b30a","impliedFormat":1},{"version":"05bd302e2249da923048c09dc684d1d74cb205551a87f22fb8badc09ec532a08","impliedFormat":1},{"version":"fe930ec064571ab3b698b13bddf60a29abf9d2f36d51ab1ca0083b087b061f3a","impliedFormat":1},{"version":"6b85c4198e4b62b0056d55135ad95909adf1b95c9a86cdbed2c0f4cc1a902d53","impliedFormat":1},{"version":"dbfa8af0021ddb4ddebe1b279b46e5bccf05f473c178041b3b859b1d535dd1e5","impliedFormat":1},{"version":"7ab2721483b53d5551175e29a383283242704c217695378e2462c16de44aff1a","impliedFormat":1},{"version":"ebafa97de59db1a26c71b59fa4ee674c91d85a24a29d715e29e4db58b5ff267d","impliedFormat":1},{"version":"16ba4c64c1c5a52cc6f1b4e1fa084b82b273a5310ae7bc1206c877be7de45d03","impliedFormat":1},{"version":"1538a8a715f841d0a130b6542c72aea01d55d6aa515910dfef356185acf3b252","impliedFormat":1},{"version":"68eeb3d2d97a86a2c037e1268f059220899861172e426b656740effd93f63a45","impliedFormat":1},{"version":"d5689cb5d542c8e901195d8df6c2011a516d5f14c6a2283ffdaae381f5c38c01","impliedFormat":1},{"version":"9974861cff8cb8736b8784879fe44daca78bc2e621fc7828b0c2cf03b184a9e5","impliedFormat":1},{"version":"675e5ac3410a9a186dd746e7b2b5612fa77c49f534283876ffc0c58257da2be7","impliedFormat":1},{"version":"951a8f023da2905ae4d00418539ff190c01d8a34c8d8616b3982ff50c994bbb6","impliedFormat":1},{"version":"f2d7b9458a51b24d6a39dcdebb446111cdaf3ebcc3f265671f860b6650c722fe","impliedFormat":1},{"version":"955c80622de0580d047d9ccdb1590e589c666c9240f63d2c5159e0732ab0a02e","impliedFormat":1},{"version":"e4b31fc1a59b688d30ff95f5a511bfb05e340097981e0de3e03419cbefe36c0e","impliedFormat":1},{"version":"16a2ac3ba047eddda3a381e6dac30b2e14e84459967f86013c97b5d8959276f3","impliedFormat":1},{"version":"45f1c5dbeb6bbf16c32492ba182c17449ab18d2d448cc2751c779275be0713d8","impliedFormat":1},{"version":"23d9f0f07f316bc244ffaaec77ae8e75219fb8b6697d1455916bc2153a312916","impliedFormat":1},{"version":"eac028a74dba3e0c2aa785031b7df83586beab4efce9da4903b2f3abad293d3a","impliedFormat":1},{"version":"8d22beed3e8bbf57e0adbc986f3b96011eef317fd0adadccd401bcb45d6ee57e","impliedFormat":1},{"version":"3a1fc0aae490201663c926fde22e6203a8ac6aa4c01c7f5532d2dcdde5b512f5","impliedFormat":1},{"version":"cb7dc2db9e286cfc107b3d90513a0e24276a7f0474059c2694ec3b37a3093426","impliedFormat":1},{"version":"53f751014cc08afeae6c3199b89b0ab0718e4f97da8b7845c5b2333748277938","impliedFormat":1},{"version":"a7f590406204026bf49d737edb9d605bb181d0675e5894a6b80714bbc525f3df","impliedFormat":1},{"version":"533039607e507410c858c1fa607d473deacb25c8bf0c3f1bd74873af5210e9a0","impliedFormat":1},{"version":"b09561e71ae9feab2e4d2b06ceb7b89de7fad8d6e3dc556c33021f20b0fb88c4","impliedFormat":1},{"version":"dd79d768006bfd8dd46cf60f7470dca0c8fa25a56ac8778e40bd46f873bd5687","impliedFormat":1},{"version":"4daacd053dd57d50a8cdf110f5bc9bb18df43cd9bcc784a2a6979884e5f313de","impliedFormat":1},{"version":"d103fff68cd233722eea9e4e6adfb50c0c36cc4a2539c50601b0464e33e4f702","impliedFormat":1},{"version":"3c6d8041b0c8db6f74f1fd9816cd14104bcd9b7899b38653eb082e3bdcfe64d7","impliedFormat":1},{"version":"4207e6f2556e3e9f7daa5d1dd1fdaa294f7d766ebea653846518af48a41dd8e0","impliedFormat":1},{"version":"c94b3332d328b45216078155ba5228b4b4f500d6282ac1def812f70f0306ed1c","impliedFormat":1},{"version":"43497bdd2d9b53afad7eed81fb5656a36c3a6c735971c1eed576d18d3e1b8345","impliedFormat":1},{"version":"5db2d64cfcfbc8df01eda87ce5937cb8af952f8ba8bbc8fd2a8ef10783614ca7","impliedFormat":1},{"version":"b13319e9b7e8a9172330a364416d483c98f3672606695b40af167754c91fa4ec","impliedFormat":1},{"version":"7f8a5e8fc773c089c8ca1b27a6fea3b4b1abc8e80ca0dd5c17086bbed1df6eaa","impliedFormat":1},{"version":"0d54e6e53636877755ac3e2fab3e03e2843c8ca7d5f6f8a18bbf5702d3771323","impliedFormat":1},{"version":"124b96661046ec3f63b7590dc13579d4f69df5bb42fa6d3e257c437835a68b4d","impliedFormat":1},{"version":"55c757a58282956c14fcad649c4221f02c4455b401f5b1011f8b921cbc2da80e","impliedFormat":1},{"version":"724775a12f87fc7005c3805c77265374a28fb3bc93c394a96e2b4ffee9dde65d","impliedFormat":1},{"version":"30ae46aab3d5a05c1a4c7144bc357621c81939dd5c0b11090f69e2b1c43c6f01","impliedFormat":1},{"version":"20064a8528651a0718e3a486f09a0fd9f39aaca3286aea63ddeb89a4428eab2b","impliedFormat":1},{"version":"743da6529a5777d7b68d0c6c2b006800d66e078e3b8391832121981d61cd0abc","impliedFormat":1},{"version":"f87c199c9f52878c8a2f418af250ccfc80f2419d0bd9b8aebf4d4822595d654f","impliedFormat":1},{"version":"57397be192782bd8bedf04faa9eea2b59de3e0cfa1d69367f621065e7abd253b","impliedFormat":1},{"version":"df9e6f89f923a5e8acf9ce879ec70b4b2d8d744c3fb8a54993396b19660ac42a","impliedFormat":1},{"version":"175628176d1c2430092d82b06895e072176d92d6627b661c8ea85bee65232f6e","impliedFormat":1},{"version":"21625e9b1e7687f847a48347d9b77ce02b9631e8f14990cffb7689236e95f2bb","impliedFormat":1},{"version":"483fad2b4ebaabd01e983d596e2bb883121165660060f498f7f056fecd6fb56a","impliedFormat":1},{"version":"6a089039922bf00f81957eafd1da251adb0201a21dcb8124bcfed14be0e5b37d","impliedFormat":1},{"version":"6cd1c25b356e9f7100ca69219522a21768ae3ea9a0273a3cc8c4af0cbd0a3404","impliedFormat":1},{"version":"201497a1cbe0d7c5145acd9bf1b663737f1c3a03d4ecffd2d7e15da74da4aaf1","impliedFormat":1},{"version":"66e92a7b3d38c8fa4d007b734be3cdcd4ded6292753a0c86976ac92ae2551926","impliedFormat":1},{"version":"a8e88f5e01065a9ab3c99ff5e35a669fdb7ae878a03b53895af35e1130326c15","impliedFormat":1},{"version":"05a8dfa81435f82b89ecbcb8b0e81eb696fac0a3c3f657a2375a4630d4f94115","impliedFormat":1},{"version":"5773e4f6ac407d1eff8ef11ccaa17e4340a7da6b96b2e346821ebd5fff9f6e30","impliedFormat":1},{"version":"c736dd6013cac2c57dffb183f9064ddd6723be3dfc0da1845c9e8a9921fc53bb","impliedFormat":1},{"version":"7b43949c0c0a169c6e44dcdf5b146f5115b98fa9d1054e8a7b420d28f2e6358f","impliedFormat":1},{"version":"b46549d078955775366586a31e75028e24ad1f3c4bc1e75ad51447c717151c68","impliedFormat":1},{"version":"34dd068c2a955f4272db0f9fdafb6b0871db4ec8f1f044dfc5c956065902fe1c","impliedFormat":1},{"version":"e5854625da370345ba85c29208ae67c2ae17a8dbf49f24c8ed880c9af2fe95b2","impliedFormat":1},{"version":"cf1f7b8b712d5db28e180d907b3dd2ba7949efcfec81ec30feb229eee644bda4","impliedFormat":1},{"version":"2423fa71d467235a0abffb4169e4650714d37461a8b51dc4e523169e6caac9b8","impliedFormat":1},{"version":"4de5d28c3bc76943453df1a00435eb6f81d0b61aa08ff34ae9c64dd8e0800544","impliedFormat":1},{"version":"659875f9a0880fb4ae1ce4b35b970304d2337f98fe6f2e4671567d7292780bae","impliedFormat":1},{"version":"82edb64fbe335cd21f16bcf50248e107f201e3e09ebc73b28640c28c958067c9","impliedFormat":1},{"version":"9593de9c14310da95e677e83110b37f1407878352f9ebe1345f97fc69e4b627c","impliedFormat":1},{"version":"e009f9f511db1a215577f241b2dc6d3f9418f9bc1686b6950a1d3f1b433a37ff","impliedFormat":1},{"version":"caa48f3b98f9737d51fabce5ce2d126de47d8f9dffeb7ad17cd500f7fd5112e0","impliedFormat":1},{"version":"64d15723ce818bb7074679f5e8d4d19a6e753223f5965fd9f1a9a1f029f802f7","impliedFormat":1},{"version":"2900496cc3034767cd31dd8e628e046bc3e1e5f199afe7323ece090e8872cfa7","impliedFormat":1},{"version":"ba74ef369486b613146fa4a3bccb959f3e64cdc6a43f05cc7010338ba0eab9f7","impliedFormat":1},{"version":"a22bbe0aeceec1dc02236a03eee7736760ecd39de9c8789229ce9a70777629bb","impliedFormat":1},{"version":"a9afefcb7d0c9a89ec666cc7cccc7275f6a06b5114dd15aa2654e9e19c43b7c1","impliedFormat":1},{"version":"30ae46aab3d5a05c1a4c7144bc357621c81939dd5c0b11090f69e2b1c43c6f01","impliedFormat":1},{"version":"c477c9c6003e659d5aad681acd70694176d4f88fc16cc4c5bcfa5b8dcc01874b","impliedFormat":1},{"version":"ca2ebe3f3791275d3287eed417660b515eb4d171f0b7badcfa95f0f709b149f7","impliedFormat":1},{"version":"b4fa8bc7aeb4d1fc766f29e7f62e1054a01ac1eb115c05a7f07afa51e16668ff","impliedFormat":1},{"version":"e2a4983a141f4185996e1ab3230cb24754c786d68434f2e7659276c325f3c46c","impliedFormat":1},{"version":"b2216c0b4c7f32e7e9bba74d0223fc9ad3bec50b71663701d60578cecc323fb5","impliedFormat":1},{"version":"1cbbd9272af325d7189d845c75bbdb6d467ce1691afe12bcb9964e4bd1270e66","impliedFormat":1},{"version":"86eb11b1e540fe07b2ebfc9cca24c35b005f0d81edf7701eaf426db1f5702a07","impliedFormat":1},{"version":"1a12da23f2827e8b945787f8cc66a8f744eabf3d3d3d6ba7ad0d5dfeeb5dfbb4","impliedFormat":1},{"version":"67cbde477deac96c2b92ccb42d9cf21f2a7417f8df9330733643cc101aa1bca5","impliedFormat":1},{"version":"2cb440791f9d52fa2222c92654d42f510bf3f7d2f47727bf268f229feced15ba","impliedFormat":1},{"version":"5bb4355324ea86daf55ee8b0a4d0afdef1b8adadc950aab1324c49a3acd6d74e","impliedFormat":1},{"version":"64e07eac6076ccb2880461d483bae870604062746415393bfbfae3db162e460a","impliedFormat":1},{"version":"5b6707397f71e3e1c445a75a06abf882872d347c4530eef26c178215de1e6043","impliedFormat":1},{"version":"c74d9594bda9fe32ab2a99010db232d712f09686bbee66f2026bc17401fe7b7e","impliedFormat":1},{"version":"15bbb824c277395f8b91836a5e17fedc86f3bb17df19dcdc5173930fd50cc83e","impliedFormat":1},{"version":"30ae46aab3d5a05c1a4c7144bc357621c81939dd5c0b11090f69e2b1c43c6f01","impliedFormat":1},{"version":"1c94de96416c02405da00d8f7bde9d196064c3ce1464f0c4df1966202196b558","impliedFormat":1},{"version":"406cc85801b49efd5f75c84cc557e2bba9155c7f88c758c3fadd4e844ad6b19e","impliedFormat":1},{"version":"6d235f62eb41ac4010a0dab8ba186c20dec8565f42273a34f0fa3fc3ca9d0dbb","impliedFormat":1},{"version":"f7663954884610aeb38c78ffd22525749fab19ab5e86e4a53df664180efd1ff5","impliedFormat":1},{"version":"4ac0045aa4bc48b5f709da38c944d4fec2368eda6b67e4dd224147f3471b7eaf","impliedFormat":1},{"version":"1d2d7636e3c6906a5d368ab0bab53df39e2a6f99c284bae4625b6445c1d799e7","impliedFormat":1},{"version":"9555a2d83e46b47c5b72de5637b2afad68b28670deacdb3b514267d780b5423c","impliedFormat":1},{"version":"3e717eef40648a7d8895219063b1e5cb5bcc404bc1d41a22b91f3140b83bce1d","impliedFormat":1},{"version":"9b61c06ab1e365e5b32f50a56c0f3bb2491329bb3cd2a46e8caa30edcf0281cc","impliedFormat":1},{"version":"8f91df3614625daa000bffe84a5c1939b4da0254db9d7c62764f916ebb93dcdc","impliedFormat":1},{"version":"ee745db646de4c5cf019e495ff5d800ed6f4ee9d9b3aaa7b2c5ca836928bc80e","impliedFormat":1},{"version":"d8d808ab0c5c550fb715641e1f5813dededa9b657e7ed3c3a6665ce7f629273d","impliedFormat":1},{"version":"059a7dfc70b0e875ef87a961d1e9b69917a32a6eea1c3950a5aad8c62d8274aa","impliedFormat":1},{"version":"cf575b64fadf5f646c0f715730c490f317f856f5b3bbe06493638576bad711d9","impliedFormat":1},{"version":"d260a7eae2f0f643fe2de133cfa3e7d035e9e787cb88119f9628099d4039609c","impliedFormat":1},{"version":"6306621db4fbb1c1e79883599912c32da2c5974402531b47a2cf2c19ce61200e","impliedFormat":1},{"version":"a4f50263cd9ef27fcb0ab56c7214ffca3a0871f93ddd3dfb486bfa07aeed55ef","impliedFormat":1},{"version":"f263db23ce0b198ab373032126d83eb6bcd9a70c1f08048e7770dac32297d9b5","impliedFormat":1},{"version":"f6ff0d0ac0bf324dd366aadf72c5458da333fbd44aa1dae825507be3b3b6ccdc","impliedFormat":1},{"version":"aa8f659712fd02d08bdf17d3a93865d33bd1ee3b5bcf2120b2aa5e9374a74157","impliedFormat":1},{"version":"5a06765319ef887a78dd42ca5837e2e46723525b0eaa53dd31b36ba9b9d33b56","impliedFormat":1},{"version":"27bf29df603ae9c123ffd3d3cfd3b047b1fa9898bf04e6ab3b05db95beebb017","impliedFormat":1},{"version":"acd5aa42ea02c570be5f7fa35451cc9844b3b8c1d66d3e94aa4875ec868ac86e","impliedFormat":1},{"version":"4278526ea26849feb706bbc4cda029b6fd99dd8875fb58daeeca02b346bbdbb4","impliedFormat":1},{"version":"9d1c3fe1639a48bfd9b086b8ae333071f7da60759344916600b979b7ed6ffaa6","impliedFormat":1},{"version":"8b3d89d08a132d7a2549ac0a972af3773f10902908a96590b3fe702c325a80ec","impliedFormat":1},{"version":"450040775fe198d9bf87cf57ca398d1d2e74b4f84bca6e5dbf0b73217cf9004b","impliedFormat":1},{"version":"98ee8fe92810ad706b1bfb06441bee284b62c07175ae9ba875589043d0836086","impliedFormat":1},{"version":"49cfd2c983594c18fe36f64c82d5e1282fd5d42168e925937345ef927b07f073","impliedFormat":1},{"version":"30ae46aab3d5a05c1a4c7144bc357621c81939dd5c0b11090f69e2b1c43c6f01","impliedFormat":1},{"version":"07ea97f8e11cedfb35f22c5cab2f7aacd8721df7a9052fb577f9ba400932933b","impliedFormat":1},{"version":"66ab54a2a098a1f22918bd47dc7af1d1a8e8428aa9c3cb5ef5ed0fef45a13fa4","impliedFormat":1},{"version":"ad81f30f47f1ab2bb5528b97c1e6e4dab5e006413925052f4573a30bf4a632bd","impliedFormat":1},{"version":"ff3f1d258bd14ca6bbf7c7158580b486d199e317fc4c433f98f13b31e6bb5723","impliedFormat":1},{"version":"a3f1cac717a25f5b8b6df9deef8fc8d0a0726390fdaa83aed55be430cd532ebf","impliedFormat":1},{"version":"bf22ee38d4d989e1c72307ab701557022e074e66940cf3d03efa9beb72224723","impliedFormat":1},{"version":"68ce7df3ae5d096597107619d2507ef4e86a641c0371f88a4a6fa0adac6cb461","impliedFormat":1},{"version":"f1a1edb271da27e2d8925a68db1eb8b16d8190037eb44a324b826e54f97e315f","impliedFormat":1},{"version":"1553d16fb752521327f101465a3844fe73684503fdd10bed79bd886c6d72a1bc","impliedFormat":1},{"version":"271119c7cbd09036fd8bd555144ec0ea54d43b59bcb3d8733995c8ef94cb620b","impliedFormat":1},{"version":"5a51eff6f27604597e929b13ee67a39267df8f44bbd6a634417ed561a2fa05d6","impliedFormat":1},{"version":"1f93b377bb06ed9de4dc4eb664878edb8dcac61822f6e7633ca99a3d4a1d85da","impliedFormat":1},{"version":"53e77c7bf8f076340edde20bf00088543230ba19c198346112af35140a0cfac5","impliedFormat":1},{"version":"6e0f9298ff05cc206fe1ec45fd2b55a8d93d4136b0d75b395c73968814d7c5ba","impliedFormat":1},{"version":"53f751014cc08afeae6c3199b89b0ab0718e4f97da8b7845c5b2333748277938","impliedFormat":1},{"version":"68888ec4d4cff782a03aebc26ddc821e1f4dffb3a22940164eff67371997add6","impliedFormat":1},{"version":"c9018ca6314539bf92981ab4f6bc045d7caaff9f798ce7e89d60bb1bb70f579c","impliedFormat":1},{"version":"d74c5b76c1c964a2e80a54f759de4b35003b7f5969fb9f6958bd263dcc86d288","impliedFormat":1},{"version":"b83a3738f76980505205e6c88ca03823d01b1aa48b3700e8ba69f47d72ab8d0f","impliedFormat":1},{"version":"01b9f216ada543f5c9a37fbc24d80a0113bda8c7c2c057d0d1414cde801e5f9d","impliedFormat":1},{"version":"f1e9397225a760524141dc52b1ca670084bde5272e56db1bd0ad8c8bea8c1c30","impliedFormat":1},{"version":"08c43afe12ba92c1482fc4727aab5f788a83fd49339eb0b43ad01ed2b5ad6066","impliedFormat":1},{"version":"6066b918eb4475bfcce362999f7199ce5df84cea78bd55ed338da57c73043d45","impliedFormat":1},{"version":"5fd5d02d1ec7d48a180deaefcfec819c364ec4ffddd1371ec2c7ad9d36e8220f","impliedFormat":1},{"version":"e39514fc08fdedd95766643609b0ede54386156196d79a2d9d49247fb4406dcd","impliedFormat":1},{"version":"e4a4e40e8bc24425e03de8f002c62448dbaefe284278c0a1d93af2bfd2b528c2","impliedFormat":1},{"version":"4e6fc96724557945de42c1c5d64912ebd90d181358e1e58cce4bbf7b7b24d422","impliedFormat":1},{"version":"8fa21591f8689152157c9e3449ac95391fe5f31a9770a58bf9c0e4f5ee0d4af3","impliedFormat":1},{"version":"ac8582e453158a1e4cccfb683af8850b9d2a0420e7f6f9a260ab268fc715ab0d","impliedFormat":1},{"version":"c80aa3ff0661e065d700a72d8924dcec32bf30eb8f184c962da43f01a5edeb6f","impliedFormat":1},{"version":"837f5c12e3e94ee97aca37aa2a50ede521e5887fb7fa89330f5625b70597e116","impliedFormat":1},{"version":"617490cbb06af111a8aa439594dc4df493b20bbf72acc43a63ceade3d0d71e2a","impliedFormat":1},{"version":"eb34b5818c9f5a31e020a8a5a7ca3300249644466ef71adf74e9e96022b8b810","impliedFormat":1},{"version":"cdec09a633b816046d9496a59345ad81f5f97c642baf4fe1611554aa3fbf4a41","impliedFormat":1},{"version":"5b933c1b71bff2aa417038dabb527b8318d9ef6136f7bd612046e66a062f5dbf","impliedFormat":1},{"version":"b94a350c0e4d7d40b81c5873b42ae0e3629b0c45abf2a1eeb1a3c88f60a26e9a","impliedFormat":1},{"version":"231f407c0f697534facae9ca5d976f3432da43d5b68f0948b55063ca53831e7c","impliedFormat":1},{"version":"188857be1eebad5f4021f5f771f248cf04495e27ad467aa1cf9624e35346e647","impliedFormat":1},{"version":"d0a20f432f1f10dc5dbb04ae3bee7253f5c7cee5865a262f9aac007b84902276","impliedFormat":1},{"version":"40a2c0b501a4900e65a2e59f7f8ae782d74b6458c39a5dd512fafc4afea4b227","impliedFormat":1},{"version":"fe813b617b31f69f766540ac6ab54a32ed775693275bd3230521c7c851f44bef","impliedFormat":1},{"version":"653821fdae3a5ac749562b20cdc15ba9028dc8d27cf359ecd90899969f084759","impliedFormat":1},{"version":"7de84da9deb32a2975ae18d9d4edbd36165da8b7508f0d82b0bfa4724392055e","impliedFormat":1},{"version":"d1a53728962013cb51f1e5a0acc1d95c6153e8597ead3181fb8cc6eb9d2435a5","impliedFormat":1},{"version":"7fc420576828e99a6bd398322b67753e5c809f415fbc8cf55e00ccc7e0146ea9","impliedFormat":1},{"version":"c5aab552c2f24679117848b8d9a39e6856d048f01081e8d7aa2bf8d4209aae20","impliedFormat":1},{"version":"54b8049bfa8bba6510a5fcb7c2a87b0741be4dedb35e38c3e3b392c091e84c4d","impliedFormat":1},{"version":"af0a27a3fcb042fa142f86e3d5fefc3aa4628fc58ac8d4d3a20e4a8c9339d324","impliedFormat":1},{"version":"3b3ca35a8c94d62b1dbcab38c1d154dcdb59d76948aa5eb36ae24906a492288d","impliedFormat":1},{"version":"c0fab855b54d2c06bacaafb630485204e7488b8f6177ecb9a2cbdde78ab815d2","impliedFormat":1},{"version":"2e4335d1adacfbce6788090ca9a56530b901c52e418789c7b699bc4249342254","impliedFormat":1},{"version":"10078f8b92de0f513ec1dda91dd30cf35e439f28802233fc3b0d4edf56d783a2","impliedFormat":1},{"version":"4996eeeb90b04105f3c2aa7733cb25b35cda9b387fc44a410fb644a654586111","impliedFormat":1},{"version":"360eb0e78fd076137fa48c65c20843932a67f263d1ca9c7386d706bf0b3940f9","impliedFormat":1},{"version":"cb492bf056586803b078ba09154a2d4f5838a74cc4b2814f41c91638c8f86df0","impliedFormat":1},{"version":"a52b05ac900f73a904a24e41624c6045b105ba3a77adf2c31df0b73f5c4b5158","impliedFormat":1},{"version":"b0574f86377668014477ff252cd90f61054b03e855a096e57e215cbeb3461844","impliedFormat":1},{"version":"bd68109f2fe914602d6b60cf4d6604bbb893448092f030278aa1e4b8d37c42bf","impliedFormat":1},{"version":"916053308c0b4586aee1d6c7cf8bb5497c6d78bf058a6c79130392b40fbd80db","impliedFormat":1},{"version":"4f82a276637b41b2cc507aeeddfc151a05fb1c55ff46547914be8fb48144b595","impliedFormat":1},{"version":"3ae650d1d4cda07d78de5eb9667bb615dd702b6ea82ba9e6d62db3c84403987e","impliedFormat":1},{"version":"da4eb67fefd2e30b7a4beb9f30948b4b72c4861739100e460a9d781143234825","impliedFormat":1},{"version":"3af1371cb29bc2f01b4b9f673947030c04bd6f91499d80123245081f4135a442","impliedFormat":1},{"version":"8f9367ba51fd938012cd183f8abd7d5af17419a51edc20d03ea0b3de09756761","impliedFormat":1},{"version":"5087fcf4ad413f76e32625ff4bc283c73b16991c1065c8a6b90e5d970ebcb473","impliedFormat":1},{"version":"1d77b01b7122fe8a5ecf8af6dc90ed2df232768a661b0f8088acdf474655570c","impliedFormat":1},{"version":"7531b035f867426e761a0d34f4ee1e853341105013a82a48c1f46ebd4718b6fa","impliedFormat":1},{"version":"0c1e9317159a26d315ff9d6ae93df026f25c16114e8d89f2961bc1dd1fae229f","impliedFormat":1},{"version":"61d7503b64b8635cb385e2de4ea64cc84b6a6cd3022c47e825cfb0488a894213","impliedFormat":1},{"version":"479fa580c5d51e9f4a8e58ab85727f6767efbeeefdd9dcbffb29932c4d998334","impliedFormat":1},{"version":"878cca70d0472e4cd4d35298e5206f5f90f55a0ec4199da41ec6131d40faf155","impliedFormat":1},{"version":"dd1c7345fc36ab0856fdc372bc246a685610af53d4194d4b25b5f93f63137207","impliedFormat":1},{"version":"1d1071ffce1c75b353535b78900bb70a72cdce015f5fe9faa9e48a65b4d9cb25","impliedFormat":99},{"version":"799da4d0688b48c66bf70dff57fd0a2e1b6a2fd71d209456f509bb537fc09bdb","impliedFormat":99},{"version":"8e954146931f789d21e27c6605bdb4fff1e5fcfb4eb1f8b845a625271bc1ead0","impliedFormat":99},{"version":"ace45d80519aa5c40397acd584e2e1bbce9863bf386834d3466d39317bc024bd","impliedFormat":99},{"version":"bfa12ded15e724210a35f243ea7c30d9dba84b01f7429ddcacf45938fb6db09d","signature":"1ad27b837612079730473508daf2ac5296f05248b62800ad21c6d9642b8957dd"},{"version":"962e8efa1fdabc87ffa0d16475210582aca0673d0ee0993465feab6362b56117","signature":"64db8498dc4109c83ee3346da73fcfd517a15fbae9ef2ab0acf8f0d5d4acea32"},{"version":"8eeb4717aa21873eb23666bc30dcaf733de3c13abc642e7191b2e5ad94035ca5","impliedFormat":1},{"version":"56609313793d1d8b59d533cfd9efcf1aeb06d09d2a0a5b738938f0ec5899aebc","signature":"e88441fd40c73944a1c8f65e8b41cd7e30f0b5b24dcdd8b6ee1604eb909b6cc6"},{"version":"8ba828cd86547a5a30486b26758ffb70823a62fd34fe44e064e0cdb383d3481d","signature":"c76d4a36c2df0a9d137e7fb52d83bb95863ed6f5a2eab2cc0d00e44462595b3f"},{"version":"cac3264a079b44a3723f92e5f27da04933c64658ebd44ce0c0e515d10e7d309f","signature":"c3ed78240d37f6403f4a350178b532e076d35b68ce79aab371f096969c2a9a08"},{"version":"cdbd35458f506b843f280d695d192968af4b0f27db3d5c0707934d97e96dd88d","impliedFormat":1},{"version":"0d86e751cdf42541f9b0dc579f1fad78ba02c9b57104723187d942c53bd63092","impliedFormat":1},{"version":"dae32a2a0cc5be690082fc59bd4b16ab58fc400d8802dc3073657ff4e825c48a","impliedFormat":1},{"version":"654bbcc8726e2a7a684460eda9c7d25847716587b04a72e0b88e75d828aa3db1","impliedFormat":1},{"version":"5c252941b1299551ad4f3f44ef995ee7a79585aebe2c5318271297496f2611c6","impliedFormat":1},{"version":"ca862092adc2e7df5d8244e202db4a5479bee59299ed6620773040d5e843e780","impliedFormat":1},{"version":"84ab1b8202996d370d7580cd15c85fe5981c9fd8ce4e20019de7203c8e9b594e","impliedFormat":1},{"version":"b7b58b11be801068222c596659957f4defdeec281974feb02a28d9c9ea38cd51","impliedFormat":1},{"version":"27a8d35a2910e71c796d71fb6d570a36dfcaef8cc69bd02e0b14fd143b908e04","impliedFormat":1},{"version":"d488bd13a9d714f30014a5f8a8df1be6b11ae3411efa63ba6643af44749bc153","impliedFormat":1},{"version":"973d9c7b2064204601c4361d2ea007cfd7e0f767cb7138979f79a38cf4125964","impliedFormat":1},{"version":"7656a4096d1d60bdd81b8b1909afdf0aedb36a1d97b05edf71887d023dd59ea9","impliedFormat":1},{"version":"f8b64967b271227fa155101e54e55d485194005626d6471d67952138493c113e","signature":"d46cc25c8f9023483e0048090136f5070ab742d39587bfcefda3872dfdf12803"},{"version":"309ebd217636d68cf8784cbc3272c16fb94fb8e969e18b6fe88c35200340aef1","impliedFormat":1},{"version":"f987c74a4b4baf361afbf22a16d230ee490d662f9aa2066853bb7ebbb8611355","impliedFormat":1},{"version":"1ff91526fcdd634148c655ef86e912a273ce6a0239e2505701561f086678262b","impliedFormat":1},{"version":"bd93f6fc4da70275db4def32903eed2be03547a41857142df63ddfebb9a67bdf","impliedFormat":1},{"version":"8d67b13da77316a8a2fabc21d340866ddf8a4b99e76a6c951cc45189142df652","impliedFormat":1},{"version":"7952419455ca298776db0005b9b5b75571d484d526a29bfbdf041652213bce6f","impliedFormat":1},{"version":"21360500b20e0ec570f26f1cbb388c155ede043698970f316969840da4f16465","impliedFormat":1},{"version":"3a819c2928ee06bbcc84e2797fd3558ae2ebb7e0ed8d87f71732fb2e2acc87b4","impliedFormat":1},{"version":"1765e61249cb44bf5064d42bfa06956455bbc74dc05f074d5727e8962592c920","impliedFormat":1},{"version":"e0bfe601a9fdf6defe94ed62dc60ac71597566001a1f86e705c95e431a9c816d","impliedFormat":1},{"version":"e0bfe601a9fdf6defe94ed62dc60ac71597566001a1f86e705c95e431a9c816d","impliedFormat":1},{"version":"e0bfe601a9fdf6defe94ed62dc60ac71597566001a1f86e705c95e431a9c816d","impliedFormat":1},{"version":"e0bfe601a9fdf6defe94ed62dc60ac71597566001a1f86e705c95e431a9c816d","impliedFormat":1},{"version":"e0bfe601a9fdf6defe94ed62dc60ac71597566001a1f86e705c95e431a9c816d","impliedFormat":1},{"version":"e0bfe601a9fdf6defe94ed62dc60ac71597566001a1f86e705c95e431a9c816d","impliedFormat":1},{"version":"e0bfe601a9fdf6defe94ed62dc60ac71597566001a1f86e705c95e431a9c816d","impliedFormat":1},{"version":"26384fb401f582cae1234213c3dc75fdc80e3d728a0a1c55b405be8a0c6dddbe","impliedFormat":1},{"version":"26384fb401f582cae1234213c3dc75fdc80e3d728a0a1c55b405be8a0c6dddbe","impliedFormat":1},{"version":"e0bfe601a9fdf6defe94ed62dc60ac71597566001a1f86e705c95e431a9c816d","impliedFormat":1},{"version":"e0bfe601a9fdf6defe94ed62dc60ac71597566001a1f86e705c95e431a9c816d","impliedFormat":1},{"version":"e0bfe601a9fdf6defe94ed62dc60ac71597566001a1f86e705c95e431a9c816d","impliedFormat":1},{"version":"e0bfe601a9fdf6defe94ed62dc60ac71597566001a1f86e705c95e431a9c816d","impliedFormat":1},{"version":"e0bfe601a9fdf6defe94ed62dc60ac71597566001a1f86e705c95e431a9c816d","impliedFormat":1},{"version":"e0bfe601a9fdf6defe94ed62dc60ac71597566001a1f86e705c95e431a9c816d","impliedFormat":1},{"version":"e0bfe601a9fdf6defe94ed62dc60ac71597566001a1f86e705c95e431a9c816d","impliedFormat":1},{"version":"e0bfe601a9fdf6defe94ed62dc60ac71597566001a1f86e705c95e431a9c816d","impliedFormat":1},{"version":"26384fb401f582cae1234213c3dc75fdc80e3d728a0a1c55b405be8a0c6dddbe","impliedFormat":1},{"version":"e0bfe601a9fdf6defe94ed62dc60ac71597566001a1f86e705c95e431a9c816d","impliedFormat":1},{"version":"e0bfe601a9fdf6defe94ed62dc60ac71597566001a1f86e705c95e431a9c816d","impliedFormat":1},{"version":"26384fb401f582cae1234213c3dc75fdc80e3d728a0a1c55b405be8a0c6dddbe","impliedFormat":1},{"version":"e0bfe601a9fdf6defe94ed62dc60ac71597566001a1f86e705c95e431a9c816d","impliedFormat":1},{"version":"e0bfe601a9fdf6defe94ed62dc60ac71597566001a1f86e705c95e431a9c816d","impliedFormat":1},{"version":"e0bfe601a9fdf6defe94ed62dc60ac71597566001a1f86e705c95e431a9c816d","impliedFormat":1},{"version":"26384fb401f582cae1234213c3dc75fdc80e3d728a0a1c55b405be8a0c6dddbe","impliedFormat":1},{"version":"e0bfe601a9fdf6defe94ed62dc60ac71597566001a1f86e705c95e431a9c816d","impliedFormat":1},{"version":"e0bfe601a9fdf6defe94ed62dc60ac71597566001a1f86e705c95e431a9c816d","impliedFormat":1},{"version":"e0bfe601a9fdf6defe94ed62dc60ac71597566001a1f86e705c95e431a9c816d","impliedFormat":1},{"version":"e0bfe601a9fdf6defe94ed62dc60ac71597566001a1f86e705c95e431a9c816d","impliedFormat":1},{"version":"e0bfe601a9fdf6defe94ed62dc60ac71597566001a1f86e705c95e431a9c816d","impliedFormat":1},{"version":"e0bfe601a9fdf6defe94ed62dc60ac71597566001a1f86e705c95e431a9c816d","impliedFormat":1},{"version":"e0bfe601a9fdf6defe94ed62dc60ac71597566001a1f86e705c95e431a9c816d","impliedFormat":1},{"version":"e0bfe601a9fdf6defe94ed62dc60ac71597566001a1f86e705c95e431a9c816d","impliedFormat":1},{"version":"e0bfe601a9fdf6defe94ed62dc60ac71597566001a1f86e705c95e431a9c816d","impliedFormat":1},{"version":"e0bfe601a9fdf6defe94ed62dc60ac71597566001a1f86e705c95e431a9c816d","impliedFormat":1},{"version":"e0bfe601a9fdf6defe94ed62dc60ac71597566001a1f86e705c95e431a9c816d","impliedFormat":1},{"version":"e0bfe601a9fdf6defe94ed62dc60ac71597566001a1f86e705c95e431a9c816d","impliedFormat":1},{"version":"e0bfe601a9fdf6defe94ed62dc60ac71597566001a1f86e705c95e431a9c816d","impliedFormat":1},{"version":"26384fb401f582cae1234213c3dc75fdc80e3d728a0a1c55b405be8a0c6dddbe","impliedFormat":1},{"version":"e0bfe601a9fdf6defe94ed62dc60ac71597566001a1f86e705c95e431a9c816d","impliedFormat":1},{"version":"e0bfe601a9fdf6defe94ed62dc60ac71597566001a1f86e705c95e431a9c816d","impliedFormat":1},{"version":"e0bfe601a9fdf6defe94ed62dc60ac71597566001a1f86e705c95e431a9c816d","impliedFormat":1},{"version":"e0bfe601a9fdf6defe94ed62dc60ac71597566001a1f86e705c95e431a9c816d","impliedFormat":1},{"version":"e0bfe601a9fdf6defe94ed62dc60ac71597566001a1f86e705c95e431a9c816d","impliedFormat":1},{"version":"e0bfe601a9fdf6defe94ed62dc60ac71597566001a1f86e705c95e431a9c816d","impliedFormat":1},{"version":"e0bfe601a9fdf6defe94ed62dc60ac71597566001a1f86e705c95e431a9c816d","impliedFormat":1},{"version":"7b9e6b3c726d47935bdc9ebc78fe5398e28e751ba7d70e9e011f01fbd5b618be","impliedFormat":1},{"version":"6e5857f38aa297a859cab4ec891408659218a5a2610cd317b6dcbef9979459cc","impliedFormat":1},{"version":"add0ce7b77ba5b308492fa68f77f24d1ed1d9148534bdf05ac17c30763fc1a79","impliedFormat":1},{"version":"56ccc6238510b913f5e6c21afdc447632873f76748d0b30a87cb313b42f1c196","impliedFormat":1},{"version":"c1a2e05eb6d7ca8d7e4a7f4c93ccf0c2857e842a64c98eaee4d85841ee9855e6","impliedFormat":1},{"version":"85021a58f728318a9c83977a8a3a09196dcfc61345e0b8bbbb39422c1594f36b","impliedFormat":1},{"version":"d91805544905a40fbd639ba1b85f65dc13d6996a07034848d634aa9edb63479e","impliedFormat":1},{"version":"6042774c61ece4ba77b3bf375f15942eb054675b7957882a00c22c0e4fe5865c","impliedFormat":1},{"version":"5a3bd57ed7a9d9afef74c75f77fce79ba3c786401af9810cdf45907c4e93f30e","impliedFormat":1},{"version":"8610f5dc475d74c4b095aafa0c191548bfd43f65802e6da54b5e526202b8cfe0","impliedFormat":1},{"version":"7b9496d2e1664155c3c293e1fbbe2aba288614163c88cb81ed6061905924b8f9","impliedFormat":1},{"version":"e27451b24234dfed45f6cf22112a04955183a99c42a2691fb4936d63cfe42761","impliedFormat":1},{"version":"58d65a2803c3b6629b0e18c8bf1bc883a686fcf0333230dd0151ab6e85b74307","impliedFormat":1},{"version":"e818471014c77c103330aee11f00a7a00b37b35500b53ea6f337aefacd6174c9","impliedFormat":1},{"version":"2fbc91ba70096f93f57e22d1f0af22b707dbb3f9f5692cc4f1200861d3b75d88","impliedFormat":1},{"version":"29f823cbe0166e10e7176a94afe609a24b9e5af3858628c541ff8ce1727023cd","impliedFormat":1},{"version":"e390e9a52faef103c177cd1df8d3c5dd03419e3477ab0f9798655905d0a2e01f","signature":"1ff5079d92ece1bea49f5b7b7b2a1bf35a62924b1a5fc19bc5804d519b477ef9"},{"version":"2f10636f1ed10fa3ea69a6c2f61e65b622d10bfcee2d22c7747983a916c0e6a4","signature":"d4f6fcc3646906244c13ee03d466de330fd8946a32d1d476939bfef117afa464"},{"version":"f17fdf6d52b643dba9ee990ce99a388f193b30a72e882cb70385d2f4052451fe","signature":"f8e5f629661b39916fed264a8da1a8bb3b1a90c5051c52a8f6b42074ab8e9861"},{"version":"1829cb36e5e1243a31f828b0611c1d749263ae557459c2c956ea74ff79a0c771","signature":"852d8d477c8f479f0d61b6bc5de31d7c0e9e51f3348cf55b96a35ff17a7bbbfe"},{"version":"b64289737972eaf879fd9a9c925071bfa53d5e9c30b3b3f7bb67176816a64316","signature":"5411cffeb133b3c557f7a05bb5b24d8e63716618882cd4241765d7a030842133"},{"version":"2076bcae902abedb39cb237404b13063dc73264cd6b4a2ef0cc6d225c2dd42c2","signature":"b5b2a83c6622f10de9fa24e93bbaaeb5ef81bab11397070befdde7f5c820135a"},{"version":"00e39935cbcccd73b666b248cf406dfacaca88546f51475e166b7ed0a709d77c","signature":"42d16d873dc50f4d9f78a5141bfa25f9348d515502076a896bff0bb964350988"},{"version":"f78ac2efd862b53bb9fa7a5713b6d33f62631c1908b42ecd37e37ad711fee13a","signature":"4f4ce6860737e466b42104e1015956360232357b65932e5d329d43ecac02d1ff"},{"version":"56aeafcc74e71dc31622596afdaa42ab3bc2e2b977d5d454e5fda0515a8ef36e","signature":"87431251c33c5bad28cad86fddf1fbeb177e1db4eae7f64c953cf14e0916328f"},{"version":"39b98da7acc7f9e7f9107c721c7281a4081ca4219717342e3f2e945187574a67","signature":"5a1ef9a17fa71533c8ea1987010a92b16cf3c2e984c0c7be44e66f20e77a8589"},{"version":"01a01fcf0c37d7cac28a4d1c5784e83e03d8685a4d5a6e5e257437e6344045c7","signature":"c872f81af4351d7a94969439c35ba6ee92dd8ba714ce2afa258f87c35daee5d7"},{"version":"4a3d23bdf0b34bda64f0f7b9184e4fcc5cae0ab6a02a5a9f949b2fa14c957522","signature":"a4c0603b58846147036ecc9db5394283f4a9a06ddb3178ed267f3b1ff416f345"},{"version":"197b0c6108826437eccaf595db1f8862e5de4baec441c38ecdc8f6a251bc4470","signature":"84ae3c93d7f5860cd16a221170e9e10b6cedf6867ebf9cf408d437b6e2b66d4e"},{"version":"6564e90ccbe67a1a11a8e9364ac944b44bbdbb50a709c08d351aa6391a0ee98a","signature":"f32410bf8f50be172e01c5b3f99d15cd4a25cec0f38da2a1a69287a2982bc6eb"},{"version":"1f9bfc325ba92ad7c84675f113568491a220091f38faa7ee291ae75bcf494ae1","signature":"aee839c7dcfb87371077d62726c6a5667f0672123668f75c345d2db9aef0f988"},{"version":"e3eaf6d8949129f401827a931213270ccdb270b5965e179ed8ee41a3d2134416","signature":"934cf172d5de553ccacdac5ab28fec047d4cf389de552973f61a14fd849dc3fb"},{"version":"f0eb7a1d9367de5096342f6575362a7cf216f3efdcb9ca6f95cdaeedcce5a62c","signature":"5013457c93c362e453dbf26e8679220fd9828ba92e34f945e3bfdbdc3648bd44"},{"version":"73d5a0f2df578ec1dc473fc391f97fa7b94daad4c2ddff66d6f49ad1abf8784f","signature":"ca010d5ac71ea1cd998c547b3bfe1ede780ba92d97ed127e34ac576fbfa2c9c9"},{"version":"db0e5d0de6656631df84a71d4aaed12a794c20caa000b7a27c368975a7c36dee","signature":"da72862e73047703deee853bb0898c6fd24beae5e41322db20e800adbadcbf40"},{"version":"4a25c610f0692b0f9cec8c0823c4901ab5190de67e49a78fdc6bdb6dc7438a76","signature":"8c4fc76f6ef6bfdb38a69196a9a3e9d48e53986f67a473460e964c169f10238d"},{"version":"04926f33cc42ac3731b0a4b45586d00562cc14c75a09f149572a53d6b58cb87a","signature":"e5c7c57ced63c2259a740bdd20117c929298c80ebfe46a6586b94907323a1f75"},{"version":"b448721f567b143e55e245a8117062082d9a021a69057fa47ff83583aa6b9019","signature":"44ddbb606aaefc4fe323f4a2cadb3e0f8c5b783bbeca9842e9f43cd34f8b7aa3"},{"version":"e3a94cdaff57a5b21232a9cea6b260708d8e4742794ea1ece7f2af597a647940","signature":"da8e8efba7a4d194fa26b7ea3ebeb65d95b588f6dc14de2290a3ccf7f6eec9fd"},{"version":"9dd05291b0832ba831caa93af4c2f0896510a23148831c7204b8f3c1b82b9c26","signature":"943096eed5a149f19da16052a4741341f3944b58123d7d6d96bef8ab01ee7a06"},{"version":"df9dcacbab73098a3c4983af79e7414e00ee7fa080fce111187768805126ec90","signature":"1733fee691335161fa9316526d40830d72882791f0aeca82650126d4f41b061b"},{"version":"8748d97fe10f8276131d55fe2c21c7da9da3835a2489c57c3d844c6190afd1e0","signature":"de86aa99af299660e53651dc7a1bacc669005fe9dca5ad62d337ee23e6bf2cd4"},{"version":"b737291cdde1430899a9095066c8240d1944a114bb027cea2024bcd28a4c6efd","signature":"14e113c04a5c1945185228e74cb799ef8c37cf5313285eab078ba5bba2f30a86"},{"version":"d04f947114fa00a20ee3c3182bb2863c30869df93293cc673f200defadbd69d9","impliedFormat":1},{"version":"4c629a21fb1b4f2428660f662d5fef6282e359d369f9e5ec5fd6ac197c1906ee","impliedFormat":1},{"version":"785926dee839d0b3f5e479615d5653d77f6a9ef8aa4eea5bbdce2703c860b254","impliedFormat":1},{"version":"66d5c68894bb2975727cd550b53cd6f9d99f7cb77cb0cbecdd4af1c9332b01dd","impliedFormat":1},{"version":"6e2669a02572bf29c6f5cea36a411c406fff3688318aee48d18cc837f4a4f19c","impliedFormat":1},{"version":"1b6f811b1a20e0fec92e1ca2b8a9b80ae753f095bee8c1d809b623865c015487","impliedFormat":1},{"version":"44a428c56fdd6ed110e4106220fe32af26ca5b968c52fe4ba1f4bc99177cd3b3","impliedFormat":1},{"version":"ec97defc12e9daf1607c50b4916bba1cfa5c6fe116c3f602a05e792aa5ebb82c","signature":"d38d39706379e6d1da5de9125b67791219351afe596cdd1a77bce279cbd3b0a7"},{"version":"bbb712665e237989ad2ba84a8260ac180f3add0c4cb9cf6da37907e974e4e246","signature":"9cbcbbf59524456049114abd208d91609fb5856e08cb27b33ec78fcd84bbc41c"},{"version":"1ef4525f2e82540b9a4b5534fd4b9fa465128dd8875f6bbec266dfe7996c2cd9","signature":"029da39673ec03948898b013aaa67b59497f0d8979d0f6b229b75f2326cd01f9"},{"version":"3515102d216c9971e9f1800b3de1b628c0ff9567daf5620fb18db09df604e135","impliedFormat":1},{"version":"d075b1a61a77f5a87d718c75a94ad384528266624d8059c06f5a2c54da30f524","signature":"8c2adb9d16fe6c57bcf7efc6529dce6653b8b4294fa2841ad5e293a2247292e0"},{"version":"aa9a7c0da189d4c38c8fabcc9fe6b8b282e3ff31d79301d69a302cb472bfc830","signature":"ca1f8fe091105c0a15fd67bb90000e0bb18d5d6059f404243011f3c850da9641"},{"version":"2986d8fb501ebf2f213aea460018d7fee604f3ac0643dc62639abd88f23221d9","signature":"37e0b7cd1d6ea12e534928a1d9a1a3896eb302027a46c2bc30866add67c6853d"},{"version":"f96d5757759e2e4e98a231ee0bdaea12ebe2e55c59a802492c0676bca4555cb4","signature":"c1223cbb9a4eb6363567c23aa1a41f22a35b6f95c2840841de6d65a56d91fb92"},{"version":"83312a124e8c515b2770446f8f815922ec476e652b47076239afe1e2694786f7","signature":"50ba5ea689f3b2424c56328d42ab5630241b3aed9e5552069cf64ef242cf3305"},{"version":"bffd718074b4d1684e8f0dbc389442ea932af7c45af983ffc85a29711bc8cbc0","signature":"1535448c889ca9bd0af16449bff503ea72d6b648b989a61d137e487f49c9b371"},{"version":"f4a06f6e1f57bc9a3e66961cbf2459855ca243273aad4de35c890dd5f64a038d","signature":"9e80ac5cc712eda673c6147df710839cc1f91f673f48d9d5b249635239058606"},{"version":"1338dbccce56873615a20fa791531013e218525b92b6765082d83ec9c3d4579a","signature":"641645270ff6f9bc9e0d8572fc5dbdb80f7e803a83ab5bddb517e5aa6afd96a0"},{"version":"5a26d441c4c308ccd113fc28f1636ad604ae4bcfb1e38542d89c874a125de0ec","signature":"66ed0e056ed80b6706ee97e730c80b70f2cc88b1158ef362ec4e1348b4a65978"},{"version":"db822370edf08fd1575beddfa67f3c151fdb44fa325316525035a7646639555e","signature":"a72e7317c9ebb6110ca22ca919bb2d3996295f6076d63a7c1214f8112d1b270a"},{"version":"c04415871490753b3980c4b4c7683e0cda8d7a2d8e61a65caaa60115e56d9814","signature":"13e347e844eba507d50ebdbcd41f4c591a58bcff624be016426c68689a8ae60f"},{"version":"3e87523632da4c8b530b203957a64676ac97819e59c8d6b95b5c4af9475b5528","signature":"d2007d47ee79524e708807e02408945ae7e7f497b2f8c67ff77d1bd4af02e1e3"},{"version":"2856fc997eb2257f61f3ca6ae501070d696404753695ccb5e6c92d29879f1609","signature":"bd7a68055a08bfb2201f5e9fd463ba714d1a9a6e44d007b65409d3aa06d9e532"},{"version":"cc8d77ab64825da99a7b5a11961db8f6c650c0b8baaca61b10317238eaa4ca35","signature":"4cd7223bb811e89bd3e4319dcec0fd5c0d02d4f014b2400897af3d911b3e35ae"},{"version":"04a8e80a7cb272d86dd944344a166dff9000bb0d68a70a2c1af0450ebeb91c4e","signature":"fc10bfbd7ac85986d9eaac6f6e3b3c1753e8208b6bc1713688723930ab22fda9"},{"version":"bdbf23f3358b269c00d7de377db98b985b67498f0f16c24db884de558cdba8d7","signature":"6fab77d0acc0f56f6c5cc68a439f387dba46f055868be70d3ead07fcfbb16032"},{"version":"466369e21eb7da7b496ade7cbabfcc002c9d507775f613b3d030f03086c3e36a","signature":"080aa17e8d2323cc65e6cc012a9de7ca42710bb9a95c90bab6fdc1146d6b82c5"},{"version":"c2e01286665445c3c1b43571ad18073244aa086990b1e7ee52062749613c7183","signature":"94d2d9acffa3e412c01d79c5f57a8b1ca382ffdac191db683de57afecd74f69f"},{"version":"3a009743a58bd6fbf106f41326a1efb045d6b12d321d992eb94c3e280a5c8283","signature":"e8345e85f50bb61eb2d5ac4fd6d6e757280182eb0cd79c22b8a268300fbad0f2"},{"version":"04c17160e2d71cf052e86c2e4e8795e23c652de9dea5fb24f24b6dcf46c69755","signature":"dcbf591cab21fd13231f5513972251b60561c2db085a3195a3235e6eb6c141b9"},{"version":"7c8e38f52b2fd82b4d05e76a3e0dbae2f94f11de015aa319cbf0a84a3cf2318b","signature":"665b8f8b53adedeb2c61d12308f8f66b5149439dc5ca1934af699ba98bba08f6"},"2a5609336ac0af96caa79aa9184e233900ea74d8fe9628f178e0c1bcb2015fc3",{"version":"a0110cde3724a62c3fed553a8fea0dac15ccc470f6cb0d626f361d4ceb35efc5","signature":"be09306bbdc506a08ecfebe2c2a34598467f24ac9f1da5b6c168fce9115b176c"},"4b36f21c4905dcc95884adef13a6b329d40b2ac37a08e723b9c6e7c3a62c7a14",{"version":"ea71cd6352d81d566ef9dd22a2179a714500eca7b34c1bdc26b37a62a0c7e9dd","signature":"f630f328af65c778e90ef2948a989b0cdb29ee891887a9c043ab1bdc8d7a94c5"},{"version":"dbd8fccc1e90ecffd99ec56792ef5e00fa7505bb06f6c95d90f66afd3b15bacb","signature":"9ab4f6a2fc43befd5d05cc574744e7dcf44bb202e3472eb25a96bd1e9430fca8"},{"version":"80ab92023b662f87588b7eccdda548ded5f81f6a8c013a40a06b43c7b3d04af3","signature":"65e30ea8992f2ba9e9086c47af8ec6634fcc99c869185c0c141ecaf1ff824ac3"},{"version":"37354d35ab5dc21bbd71632f755c8010e830c7ddfe3659effb85654005f7577d","signature":"81a5158e9a58347a75c110f5101b41b1b35e357d1f81424c5ac95282f350f57d"},{"version":"b823d811a0dabfb5a70f414b9e17caa1666ea1ee2ba6e8244375a9917cb66b39","signature":"8e609bb71c20b858c77f0e9f90bb1319db8477b13f9f965f1a1e18524bf50881"},{"version":"bdc1824d433df07efbd9a0ccf543d9358e250676fb755b27a9937176ff3a31e1","impliedFormat":1},{"version":"41c514d6896dd73d171bfa8ee88fb56cecda181e1811493ea4d330683eef7df5","impliedFormat":1},{"version":"5679ebf3dd8652ac0df974d8946d3e6e69fa65cbf1e22804b1f6ea8174f79e16","affectsGlobalScope":true},"db09acb0c9cefa301d8dd8d85e759459c8ea133e619e4f89ff8e840641f742f9",{"version":"78ef0198c323d0f7b16f993ada3459f0e7e20567e7f56fe0c5ee78f31cb0840c","impliedFormat":1},{"version":"88533ff507514078998ea6e02390b4a7934bcff52fe9b8389e06037af8619cb2","impliedFormat":1},{"version":"6d1675231de1aa366144f91852cddb2eb3cad8d9f2e7e48f4e5e0031e7046ddc","impliedFormat":1},{"version":"b788ef070e70003842cbd03c3e04f87d46b67a47b71e9e7d8713fd8c58c5f5ec","impliedFormat":1},{"version":"583d365dc19f813f1e2767771e844c7c4ea9ab1a01e85e0119f2e083488379c2","impliedFormat":1},{"version":"16ab5b20dbc2b0860c3c59941570e616f8a6fc31a689fdc8c1b984b96dcd11af","impliedFormat":1},{"version":"591e8b31c7c740e1635c246e08b54fd3e66f20de99188f7b3f0c03e72ac9204e","impliedFormat":1},{"version":"58c7f7820dc027a539b0437be7e1f8bdf663f91fbc9e861d80bb9368a38d4a94","impliedFormat":1},{"version":"f8e6a8fa14ad7cfab128f9922505b57fb4fbd82828047c46d7137c066c9bff21","impliedFormat":1},{"version":"57ab70cf1fcc245d66577501f0846fae49a953c92f004e7927e5ea7bb57c6a68","impliedFormat":1},{"version":"bbc49fd9dc6ee162ba3d270c834398e0c1d44e657ac4edfa55ac837902b7e0da","impliedFormat":1},{"version":"6993f360de4984b6743764fad3b88246d5dc6cfa45567783fc23833ad4e50c13","impliedFormat":1},{"version":"715682cddbefe50e27e5e7896acf4af0ffc48f9e18f64b0a0c2f8041e3ea869b","impliedFormat":1},{"version":"6d2f5a67bfe2034aa77b38f10977a57e762fd64e53c14372bcc5f1d3175ca322","impliedFormat":1},{"version":"4ff4add7b8cf26df217f2c883292778205847aefb0fd2aee64f5a229d0ffd399","impliedFormat":1},{"version":"33859aa36b264dd91bef77c279a5a0d259c6b63684d0c6ad538e515c69a489ec","impliedFormat":1},{"version":"33fa69f400b34c83e541dd5f4474f1c6fb2788614a1790c6c7b346b5c7eaa7dd","impliedFormat":1},{"version":"be213d7cbc3e5982b22df412cf223c2ac9d841c75014eae4c263761cd9d5e4c0","impliedFormat":1},{"version":"66451f9540fdf68a5fd93898257ccd7428cf7e49029f2e71b8ce70c8d927b87a","impliedFormat":1},{"version":"8a051690018330af516fd9ea42b460d603f0839f44d3946ebb4b551fe3bc7703","impliedFormat":1},{"version":"301fb04ef91ae1340bec1ebc3acdd223861c887a4a1127303d8eef7638b2d893","impliedFormat":1},{"version":"06236dfec90a14b0c3db8249831069ea3f90b004d73d496a559a4466e5a344a4","impliedFormat":1},{"version":"fc26991e51514bfc82e0f20c25132268b1d41e8928552dbaed7cc6f3d08fc3ac","impliedFormat":1},{"version":"5d82bb58dec5014c02aaeb3da465d34f4b7d5c724afea07559e3dfca6d8da5bc","impliedFormat":1},{"version":"44448f58f4d731dc28a02b5987ab6f20b9f77ad407dcf57b68c853fe52195cd7","impliedFormat":1},{"version":"b2818e8d05d6e6ad0f1899abf90a70309240a15153ea4b8d5e0c151e117b7338","impliedFormat":1},{"version":"1c708c15bb96473ce8ec2a946bd024ecded341169a0b84846931f979172244ba","impliedFormat":1},{"version":"ba1b8e276abe5519e0ba134fd0afba6668ba26d8d5a1fb359d88aff6357457c2","impliedFormat":1},{"version":"dc187f457333356ddc1ab8ec7833cd836f85e0bbcade61290dc55116244867cb","impliedFormat":1},{"version":"25525e173de74143042e824eaa786fa18c6b19e9dafb64da71a5faacc5bd2a5c","impliedFormat":1},{"version":"7a3d649f2de01db4b316cf4a0ce5d96832ee83641f1dc84d3e9981accf29c3a1","impliedFormat":1},{"version":"26e4260ee185d4af23484d8c11ef422807fb8f51d33aa68d83fab72eb568f228","impliedFormat":1},{"version":"c4d52d78e3fb4f66735d81663e351cf56037270ed7d00a9b787e35c1fc7183ce","impliedFormat":1},{"version":"b6c29a4a451678dee9f8682301a6064138a2a592a8ce39d6d86ca350b55ae24e","impliedFormat":1},{"version":"54bcb32ab0c7c72b61becd622499a0ae1c309af381801a30878667e21cba85bb","impliedFormat":1},{"version":"5d5f0cd1779e9c268860400922a943c305c7c094d88dc2b426e520500a2623e0","impliedFormat":1},{"version":"28439c9ebd31185ae3353dd8524115eaf595375cd94ca157eefcf1280920436a","impliedFormat":1},{"version":"13fbfe7b7c149df1280ca6abb06ad98a63aae3f80fc5f7dab60344071c9af398","impliedFormat":1},{"version":"66738976a7aa2d5fb2770a1b689f8bc643af958f836b7bc08e412d4092de3ab9","impliedFormat":1},{"version":"f6c226d8222108b3485eb0745e8b0ee48b0b901952660db20e983741e8852654","impliedFormat":1},{"version":"0f5e35d119da74f6591b902d34dff887589666746ac80cc3909d8b613f54073c","impliedFormat":1},{"version":"0146912d3cad82e53f779a0b7663f181824bba60e32715adb0e9bd02c560b8c6","impliedFormat":1},{"version":"b515457bebb2ad795d748d1c30d9d093a1364946379baf1fbb6f83fd17523ed5","impliedFormat":1},{"version":"220783c7ca903c6ce296b210fae5d7e5c5cc1942c5a469b23d537f0fbd37eb18","impliedFormat":1},{"version":"0974c67cf3e2d539d0046c84a5e816e235b81c8516b242ece2ed1bdbb5dbd3d6","impliedFormat":1},{"version":"b4186237e7787a397b6c5ae64e155e70ac2a43fdd13ff24dfb6c1e3d2f930570","impliedFormat":1},{"version":"2647784fffa95a08af418c179b7b75cf1d20c3d32ed71418f0a13259bf505c54","impliedFormat":1},{"version":"0480102d1a385b96c05316b10de45c3958512bb9e834dbecbbde9cc9c0b22db3","impliedFormat":1},{"version":"eea44cfed69c9b38cc6366bd149a5cfa186776ca2a9fb87a3746e33b7e4f5e74","impliedFormat":1},{"version":"7f375e5ef1deb2c2357cba319b51a8872063d093cab750675ac2eb1cef77bee9","impliedFormat":1},{"version":"b7f06aec971823244f909996a30ef2bbeae69a31c40b0b208d0dfd86a8c16d4f","impliedFormat":1},{"version":"0421510c9570dfae34b3911e1691f606811818df00354df7abd028cee454979f","impliedFormat":1},{"version":"3edc716bccdc88ed1ed8f05d92640698299565de4f9422109bc328fc233abfc8","impliedFormat":1},{"version":"f4889d8aeb1604d17b067ca2c3d1be751961452ea5e1cc46cc89a338ef3029b6","impliedFormat":1},{"version":"f9d42875a91472253f10659ab6124fb94511e5faa8b6d95bc450712db20a420a","impliedFormat":1},{"version":"2174e20517788d2a1379fc0aaacd87899a70f9e0197b4295edabfe75c4db03d8","impliedFormat":1},{"version":"82819f9ecc249a6a3e284003540d02ea1b1f56f410c23231797b9e1e4b9622df","impliedFormat":1},{"version":"0e60e0cbf2283adfd5a15430ae548cd2f662d581b5da6ecd98220203e7067c70","impliedFormat":1},{"version":"8ea84a2aeaa6e3f0ee7536f290f21aa0516b1beeb8afd9a345746c202d4fecd5","impliedFormat":1},{"version":"96c20da97c904138c80c9838a00f48f0b6b4f610b676d31e1a11becb79d75e60","impliedFormat":1},{"version":"f60e3e3060207ac982da13363181fd7ee4beecc19a7c569f0d6bb034331066c2","impliedFormat":1},{"version":"17230b34bb564a3a2e36f9d3985372ccab4ad1722df2c43f7c5c2b553f68e5db","impliedFormat":1},{"version":"6e5c9272f6b3783be7bdddaf207cccdb8e033be3d14c5beacc03ae9d27d50929","impliedFormat":1},{"version":"9b4f7ff9681448c72abe38ea8eefd7ffe0c3aefe495137f02012a08801373f71","impliedFormat":1},{"version":"0dfe35191a04e8f9dc7caeb9f52f2ee07402736563d12cbccd15fb5f31ac877f","impliedFormat":1},{"version":"fd29886b17d20dc9a8145d3476309ac313de0ee3fe57db4ad88de91de1882fd8","impliedFormat":1},{"version":"798367363a3274220cbed839b883fe2f52ba7197b25e8cb2ac59c1e1fd8af6b7","impliedFormat":1},{"version":"fe62b82c98a4d5bca3f8de616b606d20211b18c14e881bb6856807d9ab58131b","impliedFormat":1},{"version":"5aea76ab98173f2c230b1f78dc010da403da622c105c468ace9fe24e3b77883c","impliedFormat":99},{"version":"8d9d40cbfd510ac16d39ab40eadca2c63a240b5ab38b0c6de2df6bf507a3194d","impliedFormat":1},{"version":"e91ad231af87f864b3f07cd0e39b1cf6c133988156f087c1c3ccb0a5491c9115","impliedFormat":1},{"version":"03c258e060b7da220973f84b89615e4e9850e9b5d30b3a8e4840b3e3268ae8eb","impliedFormat":1},{"version":"319c37263037e8d9481a3dc7eadf6afa6a5f5c002189ebe28776ac1a62a38e15","impliedFormat":1},{"version":"c130f9616a960edc892aa0eb7a8a59f33e662c561474ed092c43a955cdb91dab","impliedFormat":1},{"version":"908217c4f2244ec402b73533ebfcc46d6dcd34fc1c807ff403d7f98702abb3bc","impliedFormat":1}],"root":[81,[498,505],816,817,[819,821],834,[906,932],[940,942],[944,972],975,976],"options":{"allowJs":true,"downlevelIteration":true,"esModuleInterop":true,"jsx":1,"module":99,"skipLibCheck":true,"strict":true,"target":4},"referencedMap":[[975,1],[81,2],[976,3],[928,4],[944,5],[945,6],[932,4],[930,7],[931,8],[929,7],[942,6],[941,6],[946,9],[817,10],[819,11],[949,4],[948,12],[950,13],[947,14],[952,15],[953,16],[954,17],[955,18],[918,19],[919,18],[920,20],[921,21],[923,22],[924,14],[925,23],[926,24],[956,25],[917,26],[500,27],[927,28],[957,29],[961,4],[962,4],[959,4],[958,30],[963,31],[965,32],[960,33],[964,34],[821,35],[820,2],[967,36],[501,27],[970,37],[971,38],[969,39],[968,40],[505,41],[972,2],[915,42],[914,43],[913,44],[951,4],[966,4],[916,4],[816,45],[907,45],[940,46],[503,47],[908,48],[909,2],[910,48],[922,47],[504,47],[911,2],[912,48],[834,49],[502,2],[906,50],[498,51],[830,52],[826,53],[825,54],[823,55],[822,56],[824,57],[832,58],[829,59],[828,2],[827,2],[803,60],[787,61],[788,61],[805,62],[789,61],[794,63],[797,64],[791,65],[793,66],[801,67],[792,65],[795,68],[790,69],[806,70],[798,62],[796,61],[799,62],[802,71],[804,71],[800,69],[569,72],[570,2],[521,2],[571,73],[785,74],[572,73],[786,73],[522,75],[783,76],[784,2],[519,77],[509,78],[511,79],[518,80],[513,2],[514,2],[512,81],[515,82],[506,2],[507,2],[508,77],[510,83],[516,2],[517,84],[812,85],[813,86],[815,87],[814,86],[810,2],[245,2],[689,88],[690,89],[691,89],[692,90],[684,91],[685,92],[686,93],[687,91],[688,94],[581,95],[584,96],[590,97],[593,98],[614,99],[592,100],[573,2],[574,101],[575,102],[578,2],[576,2],[577,2],[615,103],[580,95],[579,2],[616,104],[583,96],[582,2],[620,105],[617,106],[587,107],[589,108],[586,109],[588,110],[585,107],[618,111],[591,95],[619,112],[604,113],[606,114],[608,115],[607,116],[601,117],[594,118],[613,119],[610,120],[612,121],[597,122],[599,123],[596,120],[600,2],[611,124],[598,2],[609,2],[595,2],[602,125],[603,2],[605,126],[769,127],[779,128],[771,129],[776,130],[777,130],[775,131],[774,132],[772,133],[773,134],[767,135],[768,129],[778,130],[661,136],[663,137],[660,136],[681,138],[676,139],[678,139],[677,139],[679,139],[680,140],[675,141],[667,139],[668,142],[669,139],[670,142],[671,139],[672,139],[673,142],[674,143],[682,144],[666,145],[664,2],[665,146],[662,147],[696,148],[697,149],[698,150],[704,151],[701,152],[703,152],[700,153],[699,154],[694,155],[702,156],[708,157],[695,158],[707,159],[705,160],[706,161],[683,162],[693,163],[727,164],[737,165],[717,166],[721,167],[718,166],[722,166],[723,166],[719,2],[720,2],[724,168],[716,169],[729,170],[714,2],[736,171],[735,172],[728,173],[730,174],[731,175],[733,176],[734,177],[738,178],[732,91],[715,179],[725,180],[710,91],[712,181],[713,182],[711,2],[726,183],[709,163],[782,184],[781,185],[780,186],[629,2],[621,91],[630,91],[622,2],[623,91],[625,187],[628,2],[626,188],[627,91],[624,91],[659,163],[658,189],[641,190],[636,191],[632,192],[633,2],[634,2],[640,193],[637,194],[638,2],[639,195],[642,91],[635,2],[650,91],[643,91],[644,91],[645,91],[646,91],[647,91],[648,91],[649,91],[656,2],[631,91],[651,2],[652,2],[653,2],[654,2],[655,188],[657,2],[746,196],[740,2],[741,91],[747,197],[748,198],[743,91],[749,199],[750,200],[755,201],[756,201],[758,202],[744,203],[757,204],[745,205],[763,206],[754,207],[752,208],[751,209],[753,210],[759,211],[760,211],[761,212],[762,211],[742,213],[739,163],[765,214],[764,215],[766,216],[977,2],[978,2],[979,2],[1030,217],[980,218],[1020,219],[982,220],[981,221],[983,218],[984,218],[986,222],[985,218],[987,223],[988,223],[990,224],[991,218],[992,224],[993,218],[995,218],[996,218],[997,218],[998,225],[994,218],[999,2],[1000,226],[1001,226],[1002,226],[1003,226],[1004,226],[1012,227],[1005,226],[1006,226],[1007,226],[1008,226],[1009,226],[1010,226],[1011,226],[1013,218],[1014,218],[989,218],[1015,218],[1016,218],[1017,218],[1019,218],[1018,218],[1021,218],[1023,218],[1024,228],[1022,218],[1025,218],[1026,218],[1027,218],[1028,218],[1029,218],[1031,229],[1032,2],[1033,230],[520,2],[1034,2],[1035,229],[1036,231],[143,232],[144,232],[145,233],[98,234],[146,235],[147,236],[148,237],[93,2],[96,238],[94,2],[95,2],[149,239],[150,240],[151,241],[152,242],[153,243],[154,244],[155,244],[156,245],[157,246],[158,247],[159,248],[99,2],[97,2],[160,249],[161,250],[162,251],[195,252],[163,253],[164,254],[165,255],[166,256],[167,134],[168,257],[169,258],[170,259],[171,260],[172,261],[173,261],[174,262],[175,2],[176,2],[177,263],[179,264],[178,265],[180,266],[181,267],[182,268],[183,269],[184,270],[185,271],[186,272],[187,273],[188,274],[189,275],[190,276],[191,277],[192,278],[100,2],[101,2],[102,2],[140,279],[141,2],[142,2],[193,280],[194,281],[1046,282],[1045,283],[1044,284],[1043,283],[1042,285],[199,286],[355,4],[200,287],[198,288],[357,289],[356,290],[196,291],[353,2],[197,292],[82,2],[84,293],[352,4],[263,4],[1049,294],[770,2],[1050,295],[1048,2],[1051,2],[568,296],[525,2],[527,297],[526,298],[531,299],[566,300],[563,301],[565,302],[528,301],[529,303],[533,303],[532,304],[530,305],[564,306],[562,301],[567,307],[560,2],[561,2],[534,308],[539,301],[541,301],[536,301],[537,308],[543,301],[544,309],[535,301],[540,301],[542,301],[538,301],[558,310],[557,301],[559,311],[553,301],[555,301],[554,301],[550,301],[556,312],[551,301],[552,313],[545,301],[546,301],[547,301],[548,301],[549,301],[818,314],[83,2],[523,2],[524,2],[831,315],[833,316],[1047,317],[807,318],[808,319],[811,320],[809,319],[943,4],[91,321],[444,322],[449,323],[451,324],[221,325],[249,326],[427,327],[244,328],[232,2],[213,2],[219,2],[417,329],[280,330],[220,2],[386,331],[254,332],[255,333],[351,334],[414,335],[369,336],[421,337],[422,338],[420,339],[419,2],[418,340],[251,341],[222,342],[301,2],[302,343],[217,2],[233,344],[223,345],[285,344],[282,344],[206,344],[247,346],[246,2],[426,347],[436,2],[212,2],[327,348],[328,349],[322,4],[472,2],[330,2],[331,350],[323,351],[478,352],[476,353],[471,2],[413,354],[412,2],[470,355],[324,4],[365,356],[363,357],[473,2],[477,2],[475,358],[474,2],[364,359],[973,4],[974,360],[465,361],[468,362],[292,363],[291,364],[290,365],[481,4],[289,366],[274,2],[484,2],[487,2],[486,4],[488,367],[202,2],[423,368],[424,369],[425,370],[235,2],[211,371],[201,2],[343,4],[204,372],[342,373],[341,374],[332,2],[333,2],[340,2],[335,2],[338,375],[334,2],[336,376],[339,377],[337,376],[218,2],[209,2],[210,344],[264,378],[265,379],[262,380],[260,381],[261,382],[257,2],[349,350],[371,350],[443,383],[452,384],[456,385],[430,386],[429,2],[277,2],[489,387],[439,388],[325,389],[326,390],[317,391],[307,2],[348,392],[308,393],[350,394],[345,395],[344,2],[346,2],[362,396],[431,397],[432,398],[310,399],[314,400],[305,401],[409,402],[438,403],[284,404],[387,405],[207,406],[437,407],[203,328],[258,2],[266,408],[398,409],[256,2],[397,410],[92,2],[392,411],[234,2],[303,412],[388,2],[208,2],[267,2],[396,413],[216,2],[272,414],[313,415],[428,416],[312,2],[395,2],[259,2],[400,417],[401,418],[214,2],[403,419],[405,420],[404,421],[237,2],[394,406],[407,422],[393,423],[399,424],[225,2],[228,2],[226,2],[230,2],[227,2],[229,2],[231,425],[224,2],[379,426],[378,2],[384,427],[380,428],[383,429],[382,429],[385,427],[381,428],[271,430],[372,431],[435,432],[491,2],[460,433],[462,434],[309,2],[461,435],[433,397],[490,436],[329,397],[215,2],[311,437],[268,438],[269,439],[270,440],[300,441],[408,441],[286,441],[373,442],[287,442],[253,443],[252,2],[377,444],[376,445],[375,446],[374,447],[434,448],[321,449],[359,450],[320,451],[354,452],[358,453],[416,454],[415,455],[411,456],[368,457],[370,458],[367,459],[406,460],[361,2],[448,2],[360,461],[410,2],[273,462],[306,368],[304,463],[275,464],[278,465],[485,2],[276,466],[279,466],[446,2],[445,2],[447,2],[483,2],[281,467],[319,4],[90,2],[366,468],[250,2],[239,469],[315,2],[454,4],[464,470],[299,4],[458,350],[298,471],[441,472],[297,470],[205,2],[466,473],[295,4],[296,4],[288,2],[238,2],[294,474],[293,475],[236,476],[316,260],[283,260],[402,2],[390,477],[389,2],[450,2],[347,478],[318,4],[442,479],[85,4],[88,480],[89,481],[86,4],[87,2],[248,482],[243,483],[242,2],[241,484],[240,2],[440,485],[453,486],[455,487],[457,488],[459,489],[463,490],[497,491],[467,491],[496,492],[469,493],[479,494],[480,495],[482,496],[492,497],[495,371],[494,2],[493,195],[1041,498],[1038,195],[1040,499],[1039,2],[1037,2],[937,500],[934,4],[935,4],[933,2],[936,501],[939,500],[938,500],[391,502],[79,2],[80,2],[13,2],[14,2],[16,2],[15,2],[2,2],[17,2],[18,2],[19,2],[20,2],[21,2],[22,2],[23,2],[24,2],[3,2],[25,2],[26,2],[4,2],[27,2],[31,2],[28,2],[29,2],[30,2],[32,2],[33,2],[34,2],[5,2],[35,2],[36,2],[37,2],[38,2],[6,2],[42,2],[39,2],[40,2],[41,2],[43,2],[7,2],[44,2],[49,2],[50,2],[45,2],[46,2],[47,2],[48,2],[8,2],[54,2],[51,2],[52,2],[53,2],[55,2],[9,2],[56,2],[57,2],[58,2],[60,2],[59,2],[61,2],[62,2],[10,2],[63,2],[64,2],[65,2],[11,2],[66,2],[67,2],[68,2],[69,2],[70,2],[1,2],[71,2],[72,2],[12,2],[76,2],[74,2],[78,2],[73,2],[77,2],[75,2],[118,503],[128,504],[117,503],[138,505],[109,506],[108,507],[137,195],[131,508],[136,509],[111,510],[125,511],[110,512],[134,513],[106,514],[105,195],[135,515],[107,516],[112,517],[113,2],[116,517],[103,2],[139,518],[129,519],[120,520],[121,521],[123,522],[119,523],[122,524],[132,195],[114,525],[115,526],[124,527],[104,314],[127,519],[126,517],[130,2],[133,528],[905,529],[900,530],[903,531],[901,531],[897,530],[904,532],[902,531],[898,533],[899,534],[893,535],[839,536],[841,537],[892,2],[840,538],[896,539],[894,2],[842,536],[843,2],[891,540],[838,541],[835,2],[895,542],[836,543],[837,2],[844,544],[845,544],[846,544],[847,544],[848,544],[849,544],[850,544],[851,544],[852,544],[853,544],[854,544],[855,544],[857,544],[856,544],[858,544],[859,544],[860,544],[890,545],[861,544],[862,544],[863,544],[864,544],[865,544],[866,544],[867,544],[868,544],[869,544],[870,544],[871,544],[872,544],[873,544],[875,544],[874,544],[876,544],[877,544],[878,544],[879,544],[880,544],[881,544],[882,544],[883,544],[884,544],[885,544],[886,544],[889,544],[887,544],[888,544],[499,2]],"affectedFilesPendingEmit":[976,928,944,945,932,930,931,929,942,941,946,817,819,949,948,950,947,952,953,954,955,918,919,920,921,923,924,925,926,956,917,500,927,957,961,962,959,958,963,965,960,964,821,820,967,501,970,971,969,968,505,972,915,914,913,951,966,916,816,907,940,503,908,909,910,922,504,911,912,834,502,906,499],"version":"5.8.3"}
```

## File: types.ts
```typescript
// This file is obsolete. Please use /lib/types.ts instead.
export {};
```
