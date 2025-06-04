import { useEffect, useRef, useState } from 'react';

const images = [
  "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/gallery/slide1.png",
  "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/gallery/slide2.png",
  "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/gallery/slide3.png",
  "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/gallery/slide4.png",
  "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/gallery/slide5.png",
];

export default function ImageSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);
  const totalSlides = images.length;

  // Slide changing function
  const goToSlide = (index) => {
    const slideWidth = sliderRef.current.clientWidth;
    sliderRef.current.style.transform = `translateX(-${index * slideWidth}px)`;
    setCurrentSlide(index);
  };

  // Auto slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % totalSlides);
    }, 10000);
    return () => clearInterval(interval);
  }, [totalSlides]);

  // Sync slide transition on state change
  useEffect(() => {
    goToSlide(currentSlide);
  }, [currentSlide]);

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-3xl overflow-hidden relative">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          ref={sliderRef}
        >
          {images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Slide ${index + 1}`}
              className="w-full flex-shrink-0"
            />
          ))}
        </div>
      </div>
      <div className="flex items-center mt-5 space-x-2">
        {images.map((_, index) => (
          <span
            key={index}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              index === currentSlide ? 'bg-black' : 'bg-black/20'
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}
