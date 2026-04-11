import Image from "next/image";

interface ImageGalleryProps {
  images: string[];
  alt: string;
}

const ImageGallery = ({ images, alt }: ImageGalleryProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {images.map((image, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-lg shadow-md opacity-0 animate-scale-in"
          style={{ animationDelay: `${index * 150}ms` }}
        >
          <div className="relative w-full aspect-[4/3]">
            <Image
              src={image}
              alt={`${alt} ${index + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;
