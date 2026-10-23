import { afterEach, describe, expect, it, vi } from 'vitest';

// lib/site-config reads NEXT_PUBLIC_* at import time, so each case re-imports the routes with fresh env.
async function loadRoutes(env: Record<string, string | undefined>) {
  vi.resetModules();
  for (const [key, value] of Object.entries(env)) vi.stubEnv(key, value);
  const robots = (await import('@/app/robots')).default;
  const sitemap = (await import('@/app/sitemap')).default;
  return { robots: robots(), sitemap: sitemap() };
}

afterEach(() => {
  vi.unstubAllEnvs();
});

describe('robots and sitemap', () => {
  it('disallow everything and list nothing by default', async () => {
    const { robots, sitemap } = await loadRoutes({ NEXT_PUBLIC_SITE_URL: undefined, NEXT_PUBLIC_SITE_INDEXABLE: undefined });
    expect(robots).toEqual({ rules: { userAgent: '*', disallow: '/' } });
    expect(sitemap).toEqual([]);
  });

  it('stay closed with a public URL but no explicit indexing flag', async () => {
    const { robots, sitemap } = await loadRoutes({ NEXT_PUBLIC_SITE_URL: 'https://example.com', NEXT_PUBLIC_SITE_INDEXABLE: undefined });
    expect(robots).toEqual({ rules: { userAgent: '*', disallow: '/' } });
    expect(sitemap).toEqual([]);
  });

  it('allow crawling and list the three trailing-slash routes only when indexing is approved', async () => {
    const { robots, sitemap } = await loadRoutes({ NEXT_PUBLIC_SITE_URL: 'https://example.com', NEXT_PUBLIC_SITE_INDEXABLE: 'true' });
    expect(robots).toEqual({ rules: { userAgent: '*', allow: '/' }, sitemap: 'https://example.com/sitemap.xml' });
    expect(sitemap.map((entry) => entry.url)).toEqual([
      'https://example.com/',
      'https://example.com/services/',
      expect.stringMatching(/^https:\/\/example\.com\/services\/[a-z0-9-]+\/$/),
    ]);
  });
});
