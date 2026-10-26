import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import https from "https";
import { hasSpecificValue } from "@/utils/utils";
import { Axios_Route } from "@/utils/axiosRoutes";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { apiRoute, data } = body;

    if (
      !apiRoute ||
      !hasSpecificValue(Axios_Route, apiRoute)
    ) {
      return NextResponse.json(
        { error: "The desired route does not exist." },
        { status: 404 }
      );
    }

    const token = req.cookies.get("accessToken")?.value;

    const authorization =
      req.headers.get("authorization") ||
      (token ? `Bearer ${token}` : "");

    const xForwardedIp = req.headers.get("x-forwarded-for");

    const headers: Record<string, string> = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    if (authorization) {
      headers.Authorization = authorization;
    }

    if (xForwardedIp) {
      headers["x-forwarded-for"] = xForwardedIp;
    }

    const agent = new https.Agent({
      rejectUnauthorized: false,
    });

    const { data: response } = await axios({
      method: "POST",
      url: apiRoute,
      baseURL: process.env.NEXT_PUBLIC_BASE_URL,
      headers,
      data,
      httpsAgent: agent,
    });

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
    console.error("POST API error:", error);

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

    return NextResponse.json({
      response,
      success: false,
    });
  }
}