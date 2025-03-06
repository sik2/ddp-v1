interface PopularRestaurantProps {
  name: string;
  views: number;
  emoji: string;
}

export default function PopularRestaurant({
  name,
  views,
  emoji,
}: PopularRestaurantProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm p-4 border border-slate-200/80 hover:border-yellow-400 transition-colors duration-300">
      <div className="flex items-center">
        <div className="w-16 h-16 flex items-center justify-center mr-4 bg-slate-50/80 rounded-md">
          <span className="text-3xl">{emoji}</span>
        </div>
        <div>
          <h3 className="font-bold text-slate-700">{name}</h3>
          <p className="text-sm text-slate-500">
            조회수 {views.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
