export interface Action {
    _type?: string;
    label: string;
    url?: string;
    ariaLabel?: string;
}

export interface ActionButton extends Action {
    theme?: 'primary' | 'secondary' | 'accent' | 'neutral';
}

export interface ActionLink extends Action { }

export interface BackgroundImage {
    image?: CustomImage;
    opacity?: number;
}

export interface Badge {
    label: string;
    theme?: 'primary' | 'secondary' | 'accent' | 'neutral';
}

export interface Card {
    badge?: Badge;
    heading?: string;
    body?: string;
    cta?: Array<ActionButton | ActionLink>;
    image?: CustomImage;
    theme?: 'light' | 'dark' | 'transparent';
    textAlign?: 'left' | 'center';
    hasBorder?: boolean;
}

export interface CardsSection extends Section {
    heading?: string;
    body?: string;
    items?: Array<Card>;
    columns?: 'one' | 'two' | 'three';
}

export interface Company {
    _id: string;
    name: string;
    logo?: CustomImage;
}

export interface CustomImage {
    _id?: string;
    src: string;
    alt?: string;
    dimensions?: { height: number; width: number };
    asset?: any;
}

export interface CtaSection extends Section {
    heading?: string;
    body?: string;
    cta?: Array<ActionButton | ActionLink>;
}

export interface Footer {
    text?: string;
}

export interface Header {
    title?: string;
    logo?: CustomImage;
    navLinks?: Array<ActionButton | ActionLink>;
}

export interface HeroSection extends Section {
    heading?: string;
    body?: string;
    cta?: Array<ActionButton | ActionLink>;
}

export interface LogosSection extends Section {
    heading?: string;
    body?: string;
    items?: Array<CustomImage>;
    motion?: 'static' | 'moveToLeft' | 'moveToRight';
}

export interface Page {
    _id: string;
    slug: Slug;
    title: string;
    sections: Array<CardsSection | CtaSection | HeroSection | LogosSection | TestimonialsSection>;
    metaTitle?: string;
    addTitleSuffix?: boolean;
    metaDescription?: string;
    socialImage?: CustomImage;
}

export interface Person {
    _id: string;
    name: string;
    title?: string;
    image?: CustomImage;
    company?: Company;
}

export interface Section {
    _type?: string;
    theme?: 'light' | 'dark';
    backgroundImage?: BackgroundImage;
    width?: 'full' | 'inset';
}

export interface SiteConfig {
    _id?: string;
    favicon?: CustomImage;
    header?: Header;
    footer?: Footer;
    titleSuffix?: string;
    seoDescription?: string;
    seoImage?: CustomImage;
    seoKeywords?: string[];
    globalZoomLevel?: number;
}

export interface Slug {
    current: string;
}

export interface Testimonial {
    quote?: string;
    author?: Person;
    theme?: 'light' | 'dark' | 'transparent';
    hasBorder?: boolean;
}

export interface TestimonialsSection extends Section {
    heading?: string;
    body?: string;
    items?: Array<Testimonial>;
    columns?: 'one' | 'two';
}

export interface Project {
    _id: string;
    title: string;
    slug: Slug;
    mainImage: CustomImage;
    description: string;
    // Gallery (now mixed media)
    gallery?: Array<{
        _type: 'image' | 'video' | 'youtube';
        asset?: any;
        alt?: string;
        url?: string; // YouTube URL
        videoUrl?: string; // File URL
        caption?: string;
    }>;
    galleryColumns?: number;

    // Featured Video
    youtubeEmbed?: string;

    // Content
    details?: any; // Portable Text
    order: number;
    seoTitle?: string;
    seoDescription?: string;
    seoImage?: CustomImage;
}

export interface Service {
    title: string;
    icon: string;
    description: string;
}

export interface SiteSettings {
    title: string;
    contactEmail?: string;
    mainMenu?: Array<Sheet>;
}

export interface Sheet {
    title: string;
    slug: Slug;
    modules?: Array<any>; // Polymorphic modules
}
