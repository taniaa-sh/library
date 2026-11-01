import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const token = request.cookies.get("accessToken")?.value;

        if (!token) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Access token not found in cookie",
                },
                { status: 401 }
            );
        }

        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

        if (!baseUrl) {
            throw new Error("NEXT_PUBLIC_BASE_URL is not configured");
        }

        const response = await fetch(
            `${baseUrl.replace(/\/+$/, "")}/api/auth/profile`,
            {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
                cache: "no-store",
            }
        );

        const result = await response.json();

        console.log("Profile Backend Status:", response.status);
        console.log("Profile Backend Response:", result);

        return NextResponse.json(result, {
            status: response.status,
        });

    } catch (error) {
        console.error("Profile API Error:", error);

        return NextResponse.json(
            {
                success: false,
                message:
                    error instanceof Error
                        ? error.message
                        : "Unknown error",
            },
            { status: 500 }
        );
    }
}