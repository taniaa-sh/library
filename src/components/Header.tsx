"use client";

import imagesAddresses from "@/utils/imageAddresses";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathName = usePathname();

  return (
    <header className="w-full flex items-center justify-between gap-5 p-4 mx-auto">
      <Link href="/">
        <Image
          src={imagesAddresses.images.logo}
          alt="logo"
          width={120}
          height={120}
        />
      </Link>

      <ul className="flex flex-row items-center gap-8 cursor-pointer text-white">
        <li>
          <Link
            href="/"
            className={`${pathName === "/" ? "text-blue-500" : "text-white"}`}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/search"
            className={`${pathName === "/search" ? "text-blue-500" : "text-white"}`}
          >
            Search
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
