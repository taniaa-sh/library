import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    try {
        if (accessToken) {
            await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/logout`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                    cache: "no-store",
                }
            );
        }

        const response = NextResponse.json({
            success: true,
            message: "Logged out successfully",
        });

        response.cookies.delete("accessToken");

        return response;
    } catch (error) {
        console.error("Backend logout error:", error);

        const response = NextResponse.json({
            success: true,
            message: "Logged out locally",
        });

        response.cookies.delete("accessToken");

        return response;
    }
}