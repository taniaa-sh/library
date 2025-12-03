import SiteUrls from "@/utils/routs";
import { redirect } from "next/navigation";

export default function Logout() {
    redirect(SiteUrls.signIn);
}