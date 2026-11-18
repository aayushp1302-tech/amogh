/**
 * Wix CMS Headless Integration Library for Amogh Minerals
 * 
 * Provides seamless integration with Wix CMS (Content Collections) and Wix Data APIs.
 * Automatically resolves Wix Media URLs (wix:image://) to high-speed Wix CDN URLs,
 * and falls back gracefully to default assets when Wix credentials are not configured.
 */

export interface ClientLogo {
  id: string;
  name: string;
  category: string;
  lightLogo: string;
  darkLogo: string;
  imageClass: string;
  isActive?: boolean;
  order?: number;
}

export const DEFAULT_CLIENTS: ClientLogo[] = [
  {
    id: "ariane",
    name: "Ariane Fine Porcelain",
    category: "Fine Tableware & Chinaware",
    lightLogo: "/images/clients/ariane.png",
    darkLogo: "/images/clients/ariane-dark-clean.png",
    imageClass: "h-13 sm:h-15 w-auto object-contain transition-all duration-300 group-hover:scale-105",
  },
  {
    id: "motto",
    name: "Motto Group",
    category: "Vitrified Tiles & Slabs",
    lightLogo: "/images/clients/motto-dark-text.png",
    darkLogo: "/images/clients/motto-transparent.png",
    imageClass: "h-8 sm:h-9 w-auto object-contain transition-all duration-300 group-hover:scale-105",
  },
  {
    id: "safayar",
    name: "Safayar Quartz Stone",
    category: "Engineered Surfaces",
    lightLogo: "/images/clients/safayar-transparent.png",
    darkLogo: "/images/clients/safayar-dark.png",
    imageClass: "h-9 sm:h-10 w-auto object-contain transition-all duration-300 group-hover:scale-105",
  },
  {
    id: "astron",
    name: "Astron Group",
    category: "Paper & Packaging",
    lightLogo: "/images/clients/astron.png",
    darkLogo: "/images/clients/astron-dark.png",
    imageClass: "h-8 sm:h-9 w-auto object-contain transition-all duration-300 group-hover:scale-105",
  },
  {
    id: "shivam",
    name: "Shivam Minerals",
    category: "Mineral Beneficiation",
    lightLogo: "/images/clients/shivam.svg",
    darkLogo: "/images/clients/shivam-dark.svg",
    imageClass: "h-7.5 sm:h-8.5 w-auto object-contain transition-all duration-300 group-hover:scale-105",
  },
];

/**
 * Converts a Wix Media URI (wix:image://v1/...) or standard image path into a public URL.
 * Example Wix URI: wix:image://v1/4b901a_1234567890abcdef.png/file.png#originWidth=180&originHeight=60
 * Output URL: https://static.wixstatic.com/media/4b901a_1234567890abcdef.png
 */
export function resolveWixMediaUrl(url: string | null | undefined): string {
  if (!url) return "";
  const trimmed = url.trim();

  // If already an absolute HTTP(S) URL or standard relative path, return as is
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://") || trimmed.startsWith("/")) {
    return trimmed;
  }

  // Handle Wix internal media scheme: wix:image://v1/<file_id>/...
  if (trimmed.startsWith("wix:image://")) {
    const match = trimmed.match(/wix:image:\/\/v1\/([^/#?]+)/);
    if (match && match[1]) {
      return `https://static.wixstatic.com/media/${match[1]}`;
    }
  }

  // Handle bare Wix media file IDs (e.g. 110595_...)
  if (/^[a-zA-Z0-9_-]+\.[a-zA-Z0-9]+$/.test(trimmed)) {
    return `https://static.wixstatic.com/media/${trimmed}`;
  }

  return trimmed;
}

/**
 * Check whether Wix CMS API credentials have been configured in environment variables.
 */
export function isWixConfigured(): boolean {
  const apiKey = process.env.WIX_API_KEY;
  const siteId = process.env.WIX_SITE_ID;
  return Boolean(apiKey && siteId);
}

/**
 * Wix CMS Collection Client Fetcher.
 * Queries the Wix Data v2 REST API to retrieve items from the configured collection.
 */
export async function fetchWixClients(): Promise<{
  clients: ClientLogo[];
  isWixConnected: boolean;
  totalCount: number;
  error?: string;
}> {
  const apiKey = process.env.WIX_API_KEY;
  const siteId = process.env.WIX_SITE_ID;
  const accountId = process.env.WIX_ACCOUNT_ID;
  const collectionId = process.env.WIX_CLIENTS_COLLECTION_ID || "Clients";

  if (!apiKey || !siteId) {
    return {
      clients: DEFAULT_CLIENTS,
      isWixConnected: false,
      totalCount: DEFAULT_CLIENTS.length,
    };
  }

  try {
    const headers: Record<string, string> = {
      "Authorization": apiKey,
      "wix-site-id": siteId,
      "Content-Type": "application/json",
    };
    if (accountId) {
      headers["wix-account-id"] = accountId;
    }

    const payload = {
      dataCollectionId: collectionId,
      query: {
        filter: {
          // Only fetch items where isActive is not explicitly false
          isActive: { $ne: false },
        },
        sort: [
          { fieldName: "order", order: "ASC" },
        ],
        paging: {
          limit: 50,
        },
      },
    };

    const res = await fetch("https://www.wixapis.com/wix-data/v2/items/query", {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });

    if (!res.ok) {
      const errText = await res.text();
      console.warn(`[Wix CMS] API returned HTTP ${res.status}: ${errText}`);
      return {
        clients: DEFAULT_CLIENTS,
        isWixConnected: false,
        totalCount: DEFAULT_CLIENTS.length,
        error: `Wix API HTTP ${res.status}`,
      };
    }

    const json = await res.json();
    const dataItems = json.dataItems || json.items || [];

    if (!Array.isArray(dataItems) || dataItems.length === 0) {
      return {
        clients: DEFAULT_CLIENTS,
        isWixConnected: true,
        totalCount: 0,
      };
    }

    interface WixDataItem {
      id?: string;
      _id?: string;
      data?: Record<string, unknown>;
      [key: string]: unknown;
    }

    const parsedClients: ClientLogo[] = dataItems
      .map((item: WixDataItem, idx: number) => {
        // Wix v2 items nest custom fields under `data`, or at root in some webhook payloads
        const d: Record<string, unknown> = (item.data && typeof item.data === "object") ? item.data : item;

        const id = String(d.id || d.slug || d._id || item.id || item._id || `wix-client-${idx}`);
        const name = String(d.name || d.title || "Partner Brand");
        const category = String(d.category || d.industry || "Industrial Minerals");

        const rawLightLogo = (d.lightLogo || d.light_logo || d.logo || d.image || "") as string;
        const rawDarkLogo = (d.darkLogo || d.dark_logo || d.lightLogo || d.logo || "") as string;

        const lightLogo = resolveWixMediaUrl(rawLightLogo) || "/images/clients/shivam.svg";
        const darkLogo = resolveWixMediaUrl(rawDarkLogo) || lightLogo;

        const imageClass = String(
          d.imageClass ||
          d.image_class ||
          "h-7.5 sm:h-8.5 w-auto object-contain transition-all duration-300 group-hover:scale-105"
        );

        const isActive = d.isActive !== false && d.is_active !== false;
        const order = typeof d.order === "number" ? d.order : idx;

        return {
          id,
          name,
          category,
          lightLogo,
          darkLogo,
          imageClass,
          isActive,
          order,
        };
      })
      .filter((c: ClientLogo) => c.isActive !== false);

    return {
      clients: parsedClients.length > 0 ? parsedClients : DEFAULT_CLIENTS,
      isWixConnected: true,
      totalCount: parsedClients.length,
    };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.warn(`[Wix CMS] Failed to query items: ${errorMsg}`);
    return {
      clients: DEFAULT_CLIENTS,
      isWixConnected: false,
      totalCount: DEFAULT_CLIENTS.length,
      error: errorMsg,
    };
  }
}

/**
 * Submits an inquiry record into Wix CMS collection (e.g., 'Inquiries').
 * Allows the client to view incoming RFQs and inquiries directly in their Wix Dashboard.
 */
export async function submitWixInquiry(inquiryData: {
  referenceId: string;
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  mineralType: string;
  volume: string;
  deliveryLocation: string;
  specifications?: string;
}): Promise<{ success: boolean; id?: string; error?: string }> {
  const apiKey = process.env.WIX_API_KEY;
  const siteId = process.env.WIX_SITE_ID;
  const accountId = process.env.WIX_ACCOUNT_ID;
  const collectionId = process.env.WIX_INQUIRIES_COLLECTION_ID || "Inquiries";

  if (!apiKey || !siteId) {
    return { success: false, error: "Wix CMS credentials not configured" };
  }

  try {
    const headers: Record<string, string> = {
      "Authorization": apiKey,
      "wix-site-id": siteId,
      "Content-Type": "application/json",
    };
    if (accountId) {
      headers["wix-account-id"] = accountId;
    }

    const payload = {
      dataCollectionId: collectionId,
      dataItem: {
        data: {
          title: `${inquiryData.companyName} (${inquiryData.referenceId})`,
          ...inquiryData,
          submissionDate: new Date().toISOString(),
          status: "New Inquiry",
        },
      },
    };

    const res = await fetch("https://www.wixapis.com/wix-data/v2/items", {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errText = await res.text();
      return { success: false, error: `Wix API HTTP ${res.status}: ${errText}` };
    }

    const json = await res.json();
    return { success: true, id: json.dataItem?.id || json.id };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    return { success: false, error: errorMsg };
  }
}
