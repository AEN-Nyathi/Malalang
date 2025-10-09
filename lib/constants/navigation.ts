interface linkType{
  name: string;
  href: '/'|'/about'|'/services'|'/pricing'|'/blog'|'/contact'|'/color-palette-generator'|'/questionnaire'|'/create-script' ;
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
  { name: 'Video script', href: '/create-script' },

];