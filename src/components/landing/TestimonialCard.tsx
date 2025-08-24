type TestimonialCardProps = {
  testimonial: {
    name: string;
    role: string;
    quote: string;
  };
};

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const { quote, name, role } = testimonial;

  return (
    <div
      className="bg-[#0f1014] border border-gray-700/60 
        rounded-xl p-5 sm:p-6 shadow-md 
        hover:shadow-xl hover:scale-[1.02] hover:border-green-400/50
        transition-all duration-300 flex flex-col justify-between h-full"
    >
      <p className="text-gray-300 text-base sm:text-lg italic leading-relaxed">
        “{quote}”
      </p>
      <div className="mt-5 sm:mt-6">
        <h4 className="text-white font-semibold text-sm sm:text-base">
          {name}
        </h4>
        <p className="text-green-400 text-xs sm:text-sm">{role}</p>
      </div>
    </div>
  );
}
