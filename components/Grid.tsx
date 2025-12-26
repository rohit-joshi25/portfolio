import { gridItems } from "@/data";
import { BentoGrid, BentoGridItem } from "./ui/BentoGrid";

const Grid = () => {
  return (
    <section id="about" className="w-full py-20">
      <BentoGrid>
        {gridItems.map((item) => (
          <BentoGridItem
            key={item.id}
            title={item.title}
            description={item.description}
            img={item.img}
            spareImg={item.spareImg}
            className={item.className}
            imgClassName={item.imgClassName}
            titleClassName={item.titleClassName}
          />
        ))}
      </BentoGrid>
    </section>
  );
};

export default Grid;
