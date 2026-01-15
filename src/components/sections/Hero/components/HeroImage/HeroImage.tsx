import { FloatingImage } from "./FloatingImage";
import { MorphingBlob } from "./MorphingBlob";

export function HeroImage() {
  return (
    <div className="relative shrink-0 mx-auto lg:mx-0">
      <div className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64">
        <MorphingBlob />
        <FloatingImage />
      </div>
    </div>
  );
}
