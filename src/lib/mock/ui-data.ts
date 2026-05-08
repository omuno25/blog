import type { HeroData, NavLink, StatCardData } from '@ui-types';
import { mockPostRecords } from './post-data';

export const topNav: NavLink[] = [
  { label: 'Guides', href: '#' },
  { label: 'API', href: '#' },
  { label: 'Blog', href: '#' },
  { label: 'Changelog', href: '#' },
];

export const sideNav: NavLink[] = [
  {
    label: 'Introduction',
    subtitle: '',
    href: '#',
    icon: 'info',
    children: [
      { label: 'Overview', subtitle: 'Project goals', href: '#overview' },
      { label: 'Architecture', subtitle: 'System map', href: '#architecture' },
    ],
  },
  {
    label: 'AI Engineering',
    subtitle: '',
    href: '#',
    icon: 'smart_toy',
    defaultOpen: true,
    children: [
      {
        label: 'Prompt Engineering',
        subtitle: 'Patterns and guardrails',
        href: '#',
        active: true,
        children: [
          { label: 'Prompt Contracts', subtitle: 'Schema-first prompts', href: '#contracts', active: true },
          { label: 'Evaluation Loops', subtitle: 'Quality scoring', href: '#evaluation' },
        ],
      },
      {
        label: 'Model Routing',
        subtitle: 'Latency and cost',
        href: '#',
        children: [
          { label: 'Fallback Strategy', subtitle: 'Failover chain', href: '#fallback' },
          { label: 'Rate Limiting', subtitle: 'Burst control', href: '#ratelimit' },
        ],
      },
    ],
  },
  {
    label: 'Frontend',
    subtitle: 'UI & UX',
    href: '#',
    icon: 'layers',
    children: [
      { label: 'Components', subtitle: 'Reusable UI blocks', href: '#components' },
      { label: 'Accessibility', subtitle: 'A11y checklist', href: '#a11y' },
    ],
  },
  {
    label: 'Backend',
    subtitle: 'Data and APIs',
    href: '#',
    icon: 'dns',
    children: [
      { label: 'GraphQL', subtitle: 'Query conventions', href: '#graphql' },
      { label: 'Caching', subtitle: 'Redis strategy', href: '#cache' },
    ],
  },
  {
    label: 'Deployment',
    subtitle: 'Release flow',
    href: '#',
    icon: 'rocket_launch',
    children: [
      { label: 'CI/CD', subtitle: 'Build and release', href: '#cicd' },
      { label: 'Monitoring', subtitle: 'Runtime health', href: '#monitoring' },
    ],
  },
];

export const tocNav: NavLink[] = [
  { label: 'Overview', href: '#overview' },
  { label: 'Core Concepts', href: '#core-concepts' },
  { label: 'Implementation', href: '#implementation' },
  { label: 'Tradeoffs', href: '#tradeoffs' },
];

export const heroData: HeroData = {
  headline: 'Engineering lead focused on AI systems and distributed architecture.',
  subheadline: 'Build reliable developer systems that scale from startup traffic to enterprise workloads.',
  description:
    'Building at the intersection of large language models and high-concurrency architecture with a strong emphasis on observability, testing discipline, and maintainable design.',
  tags: ['ai-systems', 'distributed-architecture', 'observability', 'engineering-leadership'],
  actions: [
    { label: 'Subscribe', href: '#', variant: 'primary' },
    { label: 'View Resume', href: '#', variant: 'secondary' },
  ],
  profile: {
    name: 'Alex Rivera',
    email: 'alex_r@arivera.dev',
    readingTime: '8 min read',
  },
};

export const stats: StatCardData[] = [
  { label: 'Published Guides', value: '124', trend: '+12 this month' },
  { label: 'Avg. Response Time', value: '132ms', trend: '-18ms week-over-week' },
  { label: 'Reader Satisfaction', value: '98.2%', trend: '+0.9%' },
];

export const posts = mockPostRecords;
