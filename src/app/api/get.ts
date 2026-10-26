import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import https from "https";
import { hasSpecificValue } from "@/utils/utils";
import { Axios_Route } from "@/utils/axiosRoutes";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const requestData = Object.fromEntries(
      req.nextUrl.searchParams.entries()
    );

    const { apiRoute, ...params } = requestData;

    if (!apiRoute || !hasSpecificValue(Axios_Route, apiRoute)) {
      return NextResponse.json(
        { error: "The desired route does not exist." },
        { status: 404 }
      );
    }

    let constructedUrl = apiRoute;

    const queryParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, String(value));
      }
    });

    const queryString = queryParams.toString();

    if (queryString) {
      constructedUrl += `?${queryString}`;
    }

    const authorization =
      req.headers.get("authorization") ||
      `Bearer ${req.cookies.get("accessToken")?.value || ""}`;

    const xForwardedIp = req.headers.get("x-forwarded-for");

    const headers: Record<string, string> = {
      Authorization: authorization,
    };

    if (xForwardedIp) {
      headers["x-forwarded-for"] = xForwardedIp;
    }

    const agent = new https.Agent({
      rejectUnauthorized: false,
    });

    const config = {
      method: "get",
      url: constructedUrl,
      baseURL: process.env.BASE_URL,
      headers,
      httpsAgent: agent,
    };

    const { data: response } = await axios(config);

    if (response?.errorCode === "pl-500999") {
      return NextResponse.json({
        success: true,
        redirect: true,
        errorMessage: response?.detail?.split(",")[0],
      });
    }

    return NextResponse.json({
      response,
      success: response?.status === 200,
    });
  } catch (error: unknown) {
    console.error("API proxy error:", error);

    const response = axios.isAxiosError(error)
      ? error.response?.data ?? {
          message: error.message || "Request failed",
        }
      : {
          message:
            error instanceof Error
              ? error.message
              : "Internal Server Error",
        };

    // حفظ ساختار پاسخ قبلی
    return NextResponse.json({
      response,
      success: false,
    });
  }
}