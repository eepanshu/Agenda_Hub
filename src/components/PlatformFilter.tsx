
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

interface PlatformFilterProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlatforms: string[];
  onPlatformToggle: (platform: string) => void;
}

const PlatformFilter: React.FC<PlatformFilterProps> = ({
  isOpen,
  onClose,
  selectedPlatforms,
  onPlatformToggle,
}) => {
  const platforms = [
    { id: 'google', name: 'Google Calendar', color: 'bg-red-500' },
    { id: 'microsoft', name: 'Microsoft Calendar', color: 'bg-blue-500' },
    { id: 'zoom', name: 'Zoom', color: 'bg-purple-500' },
  ];

  if (!isOpen) return null;

  return (
    <div className="absolute top-16 right-6 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50 min-w-[250px]">
      <h3 className="font-semibold text-gray-900 mb-3">Filter by Platform</h3>
      
      <div className="space-y-2">
        {platforms.map((platform) => (
          <div
            key={platform.id}
            className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-50 cursor-pointer"
            onClick={() => onPlatformToggle(platform.id)}
          >
            <div className={`w-4 h-4 rounded-full ${platform.color}`} />
            <span className="flex-1 text-sm text-gray-700">{platform.name}</span>
            {selectedPlatforms.includes(platform.id) && (
              <Check className="h-4 w-4 text-green-600" />
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-3 border-t border-gray-200">
        <Button
          variant="outline"
          size="sm"
          onClick={onClose}
          className="w-full"
        >
          Done
        </Button>
      </div>
    </div>
  );
};

export default PlatformFilter;
