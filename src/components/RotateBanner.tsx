type Props = {
  disabled?: boolean;
};

export default function RotateBanner({ disabled }: Props) {
  if (disabled) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-md flex items-center justify-center px-8 text-center">
      <div className="flex items-center flex-col justify-center">
        <img src="/rotate.gif" width={200} height={200} alt="rotate-banner" />

        <p className="text-gray-400 mt-2 max-w-60">
          Landscape orientation gives a wider view of the visualizer.
        </p>
      </div>
    </div>
  );
}
