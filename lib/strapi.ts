const STRAPI_URL =
  process.env.STRAPI_URL ||
  process.env.NEXT_PUBLIC_STRAPI_URL ||
  "http://localhost:1337";

const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

/**
 * Fetches data from the Strapi API (server-side only).
 * Uses the STRAPI_URL and STRAPI_API_TOKEN environment variables.
 */
export async function fetchStrapi(
  endpoint: string,
  params: Record<string, string> = {},
  options: { revalidate?: number } = {},
) {
  const url = new URL(`${STRAPI_URL}/api/${endpoint}`);

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });

  try {
    const res = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${STRAPI_TOKEN}`,
        "Content-Type": "application/json",
      },
      next:
        options.revalidate !== undefined
          ? { revalidate: options.revalidate }
          : { revalidate: 60 },
    });

    if (!res.ok) {
      console.error(
        `Strapi fetch error [${endpoint}]: ${res.status} ${res.statusText}`,
      );
      return null;
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`Strapi fetch error [${endpoint}]:`, error);
    return null;
  }
}

/**
 * Resolves a Strapi media URL to an absolute URL.
 * Cloudinary URLs are returned as-is; relative paths are prefixed with STRAPI_URL.
 */
export function getStrapiMediaUrl(
  url: string | null | undefined,
): string | null {
  if (!url) return null;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `${STRAPI_URL}${url}`;
}
