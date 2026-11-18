import { NextResponse } from "next/server";
import { isWixConfigured, fetchWixClients } from "@/lib/wix-cms";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const apiKey = body.apiKey || process.env.WIX_API_KEY;
    const siteId = body.siteId || process.env.WIX_SITE_ID;
    const collectionId = body.collectionId || process.env.WIX_CLIENTS_COLLECTION_ID || "Clients";

    if (!apiKey || !siteId) {
      return NextResponse.json({
        connected: false,
        isConfigured: isWixConfigured(),
        message: "Wix API Key or Site ID missing. Please configure them in .env.local.",
      });
    }

    const headers: Record<string, string> = {
      "Authorization": apiKey,
      "wix-site-id": siteId,
      "Content-Type": "application/json",
    };

    const payload = {
      dataCollectionId: collectionId,
      query: {
        paging: { limit: 10 },
      },
    };

    const res = await fetch("https://www.wixapis.com/wix-data/v2/items/query", {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    if (!res.ok) {
      const errText = await res.text();
      return NextResponse.json({
        connected: false,
        status: res.status,
        error: `Wix Data API error (HTTP ${res.status}): ${errText}`,
        message: `Wix responded with HTTP ${res.status}. Check if WIX_API_KEY has 'Wix Data' permissions and WIX_SITE_ID matches your site.`,
      });
    }

    const data = await res.json();
    const items = data.dataItems || data.items || [];

    return NextResponse.json({
      connected: true,
      status: 200,
      collectionId,
      itemsFound: items.length,
      sampleItems: items.slice(0, 3),
      message: `Successfully connected to Wix CMS! Found ${items.length} item(s) in collection '${collectionId}'.`,
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({
      connected: false,
      error: errorMsg,
      message: `Network or runtime error testing Wix CMS: ${errorMsg}`,
    });
  }
}
