import { NextResponse } from "next/server";
import { fetchWixClients, isWixConfigured } from "@/lib/wix-cms";

export async function GET() {
  try {
    const isConfigured = isWixConfigured();
    const result = await fetchWixClients();

    return NextResponse.json({
      success: true,
      clients: result.clients,
      isWixConnected: result.isWixConnected,
      isConfigured,
      totalCount: result.totalCount,
      error: result.error || null,
      source: result.isWixConnected ? "wix-cms" : "default-fallback",
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      {
        success: false,
        error: errorMsg,
        clients: [],
      },
      { status: 500 }
    );
  }
}
