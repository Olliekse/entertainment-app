import Image from "next/image";

export default function SearchBar() {
  return (
    <div className="flex items-center gap-4 my-6 xl:mt-[33px] xl:mb-[41px]">
      <Image
        className="w-6 h-6 md:h-8 md:w-8"
        height={24}
        width={24}
        alt="search icon"
        src="/images/icon-search.svg"
      />
      <input
        className="flex-1 bg-transparent font-light text-[16px] text-white placeholder:text-white placeholder:opacity-50 focus:outline-none md:text-2xl"
        placeholder="Search for movies or TV series"
      />
    </div>
  );
}
