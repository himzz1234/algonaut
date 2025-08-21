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
            rounded-lg p-6 shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 hover:border-green-400/50
            flex flex-col justify-between w-full"
    >
      <p className="text-gray-300 text-lg italic">“{quote}”</p>
      <div className="mt-6">
        <h4 className="text-white font-medium">{name}</h4>
        <p className="text-green-400 text-sm">{role}</p>
      </div>
    </div>
  );
}
