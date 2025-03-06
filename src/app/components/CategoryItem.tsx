interface CategoryItemProps {
  name: string;
  count: number;
  emoji: string;
}

export default function CategoryItem({
  name,
  count,
  emoji,
}: CategoryItemProps) {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-200/80 hover:border-yellow-400 transition-colors duration-300">
      <div className="flex flex-col items-center">
        <div className="text-4xl mb-3">{emoji}</div>
        <span className="font-medium text-center text-slate-700">
          {name} <span className="text-slate-500">({count})</span>
        </span>
      </div>
    </div>
  );
}
