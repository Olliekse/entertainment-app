import Image from "next/image";
import Link from "next/link";
import "@/app/globals.css";

export default function Navbar() {
  return (
    <nav className="bg-[#161d2f] px-4 py-4.5 xl:pt-[33px] flex justify-between items-center xl:flex xl:flex-col xl:mb-8">
      <div className="xl:flex xl:flex-col xl:items-center gap-[97px]">
        <Link href="/" aria-label="Home">
          <Image
            className="w-[25px] h-[20px] md:w-8 md:h-[25px]"
            width={25}
            height={20}
            alt="site logo"
            src="/images/logo.svg"
          />
        </Link>

        <ul className="flex gap-6 xl:gap-10 xl:flex-col">
          <li>
            <Link href="/" aria-label="Home">
              <Image
                className="w-4 h-4 md:w-5 md:h-5"
                width={16}
                height={16}
                alt="home icon"
                src="/images/icon-nav-home.svg"
              />
            </Link>
          </li>
          <li>
            <Link href="/movies" aria-label="Movie">
              <Image
                className="w-4 h-4 md:w-5 md:h-5"
                height={16}
                width={16}
                alt="movies icon"
                src="/images/icon-nav-movies.svg"
              />
            </Link>
          </li>
          <li>
            <Link href="/tv-series" aria-label="TV-series">
              <Image
                className="w-4 h-4 md:w-5 md:h-5"
                width={16}
                height={16}
                alt="tv-series icon"
                src="/images/icon-nav-tv-series.svg"
              />
            </Link>
          </li>
          <li>
            <Link href="/bookmarks" aria-label="Bookmark">
              <Image
                className="w-4 h-4 md:w-[17px] md:h-5"
                width={13}
                height={16}
                alt="bookmark icon"
                src="/images/icon-nav-bookmark.svg"
              />
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <Link href="/" aria-label="Home">
          <Image
            className="w-6 h-6 md:w-8 md:h-8"
            width={24}
            height={24}
            alt="profile avatar"
            src="/images/image-avatar.png"
          />
        </Link>
      </div>
    </nav>
  );
}
