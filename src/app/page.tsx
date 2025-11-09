import SiteUrls from "@/utils/routs";
import { redirect } from "next/navigation";

export default function Home() {
  redirect(SiteUrls.signIn);
}