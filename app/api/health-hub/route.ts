import { NextResponse } from "next/server";

const STRAPI_URL = process.env.STRAPI_URL;
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

/**
 * GET /api/health-hub
 * Server-side proxy to Strapi health-hubs endpoint.
 * Accepts query params: locale, page, pageSize, search, specialty
 */
export async function GET(request: Request) {
  if (!STRAPI_URL) {
    console.error("STRAPI_URL environment variable is not set.");
    return NextResponse.json(
      { error: "Server configuration error: STRAPI_URL is not set." },
      { status: 500 },
    );
  }
  try {
    const { searchParams } = new URL(request.url);

    const locale = searchParams.get("locale") || "en";
    const page = searchParams.get("page") || "1";
    const pageSize = searchParams.get("pageSize") || "25";
    const search = searchParams.get("search") || "";
    const specialty = searchParams.get("specialty") || "";

    const strapiParams = new URLSearchParams();
    strapiParams.set("locale", locale);
    strapiParams.set("populate", "*");
    strapiParams.set("sort", "publishedAt:desc");
    strapiParams.set("pagination[page]", page);
    strapiParams.set("pagination[pageSize]", pageSize);

    if (search) {
      strapiParams.set("filters[$or][0][title][$containsi]", search);
    }

    if (specialty && specialty !== "all") {
      strapiParams.set("filters[specialties][$eq]", specialty);
    }

    const res = await fetch(
      `${STRAPI_URL}/api/health-hubs?${strapiParams.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${STRAPI_TOKEN}`,
          "Content-Type": "application/json",
        },
        next: { revalidate: 60 },
      },
    );

    if (!res.ok) {
      console.error(
        `Strapi health-hubs error: ${res.status} ${res.statusText}`,
      );
      return NextResponse.json(
        { error: "Failed to fetch health hub articles" },
        { status: res.status },
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Health hub API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
