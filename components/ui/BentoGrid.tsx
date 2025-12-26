"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  img,
  spareImg,
  imgClassName,
  titleClassName,
}: {
  className?: string;
  title?: string;
  description?: string;
  img?: string;
  spareImg?: string;
  imgClassName?: string;
  titleClassName?: string;
}) => {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl group/bento hover:shadow-xl transition duration-300 border border-white/10 bg-[#0b0f2f]",
        className
      )}
    >
      {/* background image */}
      {img && (
        <Image
          src={img}
          alt={title || "bento image"}
          fill
          className={cn(
            "object-cover opacity-20 group-hover/bento:opacity-30 transition",
            imgClassName
          )}
        />
      )}

      {/* spare image */}
      {spareImg && (
        <Image
          src={spareImg}
          alt="spare"
          width={300}
          height={300}
          className="absolute bottom-0 right-0 opacity-30"
        />
      )}

      <div className="relative z-10 p-6 flex flex-col justify-between h-full">
        <div>
          <h3
            className={cn(
              "text-xl font-semibold text-white mb-2",
              titleClassName
            )}
          >
            {title}
          </h3>
          {description && (
            <p className="text-sm text-white/70">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
};
