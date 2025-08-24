import { useOrientation } from "../hooks/useOrientation";

type Props = {
  disabled?: boolean;
};

export default function RotateBanner({ disabled }: Props) {
  const { isPortrait, isMobile } = useOrientation();

  if (disabled || !isMobile || !isPortrait) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-md flex items-center justify-center px-8 text-center">
      <div>
        <h3 className="text-white text-xl font-semibold">
          Please rotate your device
        </h3>
        <p className="text-gray-400 mt-1">
          Landscape orientation gives a wider view of the visualizer.
        </p>
      </div>
    </div>
  );
}
