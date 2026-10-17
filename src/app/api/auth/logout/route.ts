import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    try {
        if (accessToken) {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/logout`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            if (!response.ok) {
                return NextResponse.json(
                    { message: "Logout failed" },
                    { status: response.status }
                );
            }
        }

        return NextResponse.json({
            success: true,
            message: "Logged out successfully",
        });
    } catch {
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    } finally {
        cookieStore.delete("accessToken");
    }
}