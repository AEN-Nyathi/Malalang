import type { VideoScriptProject, ScriptSegment } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
const getImage = (id: string) => PlaceHolderImages.find(p => p.id === id);
const initialSegments: ScriptSegment[] = [
  { id: 'seg1', text: "Are you a passionate business owner in Phalaborwa? You're great at what you do, but your current online presence is letting you down.", audioSrc: null, visualSrc: null, duration: 8, videoSearchQuery: 'busy small business owner preparing food' },
  { id: 'seg2', text: "You know you need a professional website, but you worry about two things: big, confusing upfront costs, and the risk of paying for a site you don't even like.", audioSrc: null, visualSrc: null, duration: 7, videoSearchQuery: 'frustrated person looking at phone' },
  { id: 'seg3', text: "It's time for a different approach. It's time to meet Malalang: Your trusted web development partner in Limpopo.", audioSrc: null, visualSrc: null, duration: 8, videoSearchQuery: 'professional laptop showing a modern website' },
  { id: 'seg4', text: 'We operate on a trust-first model. Our promise is simple: You do not pay a single cent until you are completely happy with your brand-new website. That’s our No-Risk Guarantee.', audioSrc: null, visualSrc: null, duration: 7, videoSearchQuery: 'handshake deal approval stamp' },
  { id: 'seg5', text: 'Our process is simple, fast, and transparent. From our initial face-to-face chat to watching your site being built live, we keep you informed every step of the way. And with simple, fixed-price packages designed for local budgets, there are never any hidden fees.', audioSrc: null, visualSrc: null, duration: 13, videoSearchQuery: 'simple animated steps infographic' },
  { id: 'seg6', text: "Stop leaving money on the table. It's time to elevate your presence and compete online, completely risk-free.", audioSrc: null, visualSrc: null, duration: 7, videoSearchQuery: 'happy business owner montage' },
  { id: 'seg7', text: 'Click the link or visit our website for your free consultation and quote. Let Malalang build a website that gets you results.', audioSrc: null, visualSrc: null, duration: 7, videoSearchQuery: 'company logo and website url' },
];
export const initialProject: VideoScriptProject = {
  id: 'proj1',
  name: 'Web Design in Phalaborwa',
  scriptSegments: initialSegments,
  mediaAssets: [
    { id: 'media1', name: 'Abstract BG', type: 'video', src: '...', thumbnail: getImage('media1')?.imageUrl ?? '', hint: getImage('media1')?.imageHint ?? '' },
    { id: 'media2', name: 'Laptop user', type: 'image', src: '...', thumbnail: getImage('media2')?.imageUrl ?? '', hint: getImage('media2')?.imageHint ?? '' },
  ],
};