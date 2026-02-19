import { NextResponse } from "next/server";

const STRAPI_URL = process.env.STRAPI_URL;
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

function missingEnvResponse() {
  console.error("STRAPI_URL environment variable is not set.");
  return NextResponse.json(
    { error: "Server configuration error: STRAPI_URL is not set." },
    { status: 500 },
  );
}

/**
 * GET /api/find-a-doctor
 * Server-side proxy to Strapi doctors endpoint.
 *
 * Modes:
 *  - ?mode=specialties&locale=en  → returns { specialties: string[] }
 *  - ?locale=en&query=...&specialty=...  → returns full Strapi doctors response
 */
export async function GET(request: Request) {
  if (!STRAPI_URL) return missingEnvResponse();

  try {
    const { searchParams } = new URL(request.url);
    const mode = searchParams.get("mode");
    const locale = searchParams.get("locale") || "en";

    // ── MODE: specialties ──────────────────────────────────────────────────
    // Fetch all featured doctors (only the specialties field) and return a
    // deduplicated, sorted list so the search-bar dropdown can populate.
    if (mode === "specialties") {
      const strapiParams = new URLSearchParams();
      strapiParams.set("locale", locale);
      strapiParams.set("fields[0]", "specialties");
      strapiParams.set("filters[isFeatured][$eq]", "true");
      strapiParams.set("pagination[pageSize]", "200");

      const res = await fetch(
        `${STRAPI_URL}/api/doctors?${strapiParams.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${STRAPI_TOKEN}`,
            "Content-Type": "application/json",
          },
          next: { revalidate: 300 }, // cache specialties for 5 min
        },
      );

      if (!res.ok) {
        console.error(
          `Strapi specialties error: ${res.status} ${res.statusText}`,
        );
        return NextResponse.json(
          { error: "Failed to fetch specialties" },
          { status: res.status },
        );
      }

      const json = await res.json();
      const specialties: string[] = Array.from(
        new Set(
          (json.data || [])
            .map((d: any) => (d.specialties || "").trim())
            .filter(Boolean),
        ),
      ).sort() as string[];

      return NextResponse.json({ specialties });
    }

    // ── MODE: doctors (default) ────────────────────────────────────────────
    const query = searchParams.get("query") || "";
    const specialty = searchParams.get("specialty") || "";

    const strapiParams = new URLSearchParams();
    strapiParams.set("locale", locale);
    strapiParams.set("populate", "*");
    strapiParams.set("filters[isFeatured][$eq]", "true");
    strapiParams.set("sort", "fullName:asc");

    if (query) {
      strapiParams.set("filters[$or][0][fullName][$containsi]", query);
      strapiParams.set("filters[$or][1][bio][$containsi]", query);
      strapiParams.set("filters[$or][2][specialties][$containsi]", query);
    }

    if (specialty && specialty !== "all") {
      strapiParams.set("filters[specialties][$containsi]", specialty);
    }

    const res = await fetch(
      `${STRAPI_URL}/api/doctors?${strapiParams.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${STRAPI_TOKEN}`,
          "Content-Type": "application/json",
        },
        next: { revalidate: 60 },
      },
    );

    if (!res.ok) {
      console.error(`Strapi doctors error: ${res.status} ${res.statusText}`);
      return NextResponse.json(
        { error: "Failed to fetch doctors" },
        { status: res.status },
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Find a doctor API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
