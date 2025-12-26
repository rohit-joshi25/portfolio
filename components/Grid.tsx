import { gridItems } from "@/data";

const Grid = () => {
  return (
    <section className="w-full py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {gridItems.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl p-6 bg-[#0b0f2f] text-white border border-white/10"
          >
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            {item.description && (
              <p className="text-sm text-white/70">{item.description}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Grid;
