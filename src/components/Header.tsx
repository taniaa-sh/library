"use client";

import imagesAddresses from "@/utils/imageAddresses";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathName = usePathname();

  return (
    <header className="w-full flex items-center justify-between gap-5 p-8 mx-auto">
      <Link href="/">
        <Image
          src={imagesAddresses.images.logo}
          alt="logo"
          width={120}
          height={120}
        />
      </Link>

      <ul className="flex flex-row items-center text-lg gap-8 cursor-pointer text-white">
        <Link
          href="/"
          className={pathName === "/" ? "!text-light-200" : "text-white"}
        >
          Home
        </Link>

        <Link
          href="/search"
          className={pathName === "/search" ? "!text-light-200" : "text-white"}
        >
          Search
        </Link>

        <Link
          href="/profile"
          className={pathName === "/profile" ? "!text-light-200" : "text-white"}
        >
          Profile
        </Link>

      </ul>
    </header>
  );
};

export default Header;
