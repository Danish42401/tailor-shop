import fs from 'fs';
import path from 'path';

export interface BlogPost {
    slug: string;
    title_en: string;
    title_ar: string;
    cover_image?: string;
    date: string;
    published: boolean;
    body_en: string;
    body_ar: string;
}

const BLOG_DIR = path.join(process.cwd(), 'content/blog');

export function getBlogPosts(): BlogPost[] {
    if (!fs.existsSync(BLOG_DIR)) return [];

    const files = fs.readdirSync(BLOG_DIR).filter(file => file.endsWith('.json'));

    const posts = files.map(file => {
        const filePath = path.join(BLOG_DIR, file);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        try {
            const data = JSON.parse(fileContent) as BlogPost;
            return {
                ...data,
                slug: file.replace('.json', ''),
            };
        } catch (e) {
            console.error(`Error parsing blog post ${file}`, e);
            return null;
        }
    }).filter((post): post is BlogPost => post !== null && post.published)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return posts;
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
    const posts = getBlogPosts();
    return posts.find(p => p.slug === slug) || null;
}
