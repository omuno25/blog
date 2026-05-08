import type { NavLink } from '@ui-types';

function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

function stripHtml(input: string): string {
  return input.replace(/<[^>]*>/g, '').trim();
}

export interface TocResult {
  html: string;
  links: NavLink[];
}

// Builds an in-page table of contents from h2/h3 headings and injects stable anchor ids.
export function buildTocFromHtml(html: string): TocResult {
  const usedIds = new Map<string, number>();
  const links: NavLink[] = [];

  const updatedHtml = html.replace(/<h([23])([^>]*)>([\s\S]*?)<\/h\1>/gi, (_, level, attrs, inner) => {
    const text = stripHtml(inner);
    if (!text) return `<h${level}${attrs}>${inner}</h${level}>`;

    const explicitIdMatch = String(attrs).match(/\sid=["']([^"']+)["']/i);
    let id = explicitIdMatch?.[1] ?? slugify(text);
    if (!id) id = `section-${links.length + 1}`;

    const count = usedIds.get(id) ?? 0;
    usedIds.set(id, count + 1);
    if (count > 0) id = `${id}-${count + 1}`;

    links.push({
      label: text,
      href: `#${id}`,
      subtitle: level === '3' ? 'toc-child' : undefined,
    });

    if (explicitIdMatch) return `<h${level}${attrs}>${inner}</h${level}>`;
    return `<h${level}${attrs} id="${id}">${inner}</h${level}>`;
  });

  return { html: updatedHtml, links };
}
