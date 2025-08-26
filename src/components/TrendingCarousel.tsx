import Image from "next/image";

export default function TrendingCarousel() {
  return (
    <div className="w-full">
      <h1 className="font-light text-xl text-white md:text-[32px]">Trending</h1>
      <div className="pt-4 overflow-hidden">
        <div className="relative w-[240px] h-[140px] md:w-[470px] md:h-[230px]">
          <Image
            priority
            className="rounded-lg object-cover w-[240px] h-[140px] md:w-[470px] md:h-[230px]"
            width={240}
            height={140}
            src="/images/thumbnails/beyond-earth/trending/small.jpg"
            alt="movie cover"
          />
          <div className="w-[32px] h-[32px] rounded-full bg-[#10141E] opacity-50 absolute top-2 right-2 flex items-center justify-center">
            <Image
              alt="bookmark button"
              src="/images/icon-bookmark-empty.svg"
              width={11}
              height={14}
            />
          </div>
          <div className="absolute bottom-[14px] left-4 flex flex-col gap-2">
            <div className="font-light text-[12px] md:text-[15px] text-white opacity-75 flex gap-2">
              <span>2019</span>•
              <Image
                className="object-contain"
                width={12}
                height={12}
                alt="movie icon"
                src="/images/icon-category-movie.svg"
              />
              <span>Movie</span>•<span>PG</span>
            </div>
            <p className="font-medium text-[15px] md:text-2xl text-white">
              Beyond Earth
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
