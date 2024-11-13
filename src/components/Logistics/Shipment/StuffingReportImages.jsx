import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { ImageOff } from 'lucide-react';
import API_URL from '../../../constants/Constants';

// Separate StuffingReportImages component
const StuffingReportImages = ({ stuffingReport }) => {
  const [imageErrors, setImageErrors] = useState({});

  const getImagePath = (fullPath) => {
    if (!fullPath) return null;
    const filename = fullPath.split('\\').pop();
    return `${API_URL || ''}/uploads/${filename}`;
  };

  const getImages = () => {
    const images = [];
    for (let i = 1; i <= 8; i++) {
      const imagePath = stuffingReport?.[`image${i}`];
      if (imagePath) {
        images.push({
          id: i,
          path: getImagePath(imagePath),
          name: imagePath.split('\\').pop()
        });
      }
    }
    return images;
  };

  const handleImageError = (imageId) => {
    setImageErrors(prev => ({
      ...prev,
      [imageId]: true
    }));
  };

  const images = getImages();

  return (
    <div className="mt-8">
      <h4 className="text-lg font-semibold mb-4">Attached Images:</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {images.map((image) => (
          <Card key={image.id} className="overflow-hidden">
            {!imageErrors[image.id] ? (
              <img
                src={image.path}
                alt={`Stuffing Report Image ${image.id}`}
                className="w-full h-48 object-cover"
                onError={() => handleImageError(image.id)}
              />
            ) : (
              <div className="w-full h-48 bg-gray-100 flex flex-col items-center justify-center">
                <ImageOff className="w-8 h-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500">Image failed to load</p>
              </div>
            )}
            <div className="p-2 bg-gray-50">
              <p className="text-sm text-gray-600 truncate">{image.name}</p>
            </div>
          </Card>
        ))}
        
        {images.length === 0 && (
          <div className="col-span-full flex items-center justify-center p-8 bg-gray-50 rounded-lg">
            <p className="text-gray-500 italic">No images attached to this report</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default StuffingReportImages;