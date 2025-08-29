interface AdBannerProps {
  size: 'large' | 'medium' | 'small';
  position: 'top' | 'middle' | 'bottom' | 'sidebar';
}

export const AdBanner = ({ size, position }: AdBannerProps) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'large':
        return 'h-32 md:h-40';
      case 'medium':
        return 'h-24 md:h-32';
      case 'small':
        return 'h-16 md:h-20';
      default:
        return 'h-24 md:h-32';
    }
  };

  return (
    <div className={`w-full ${getSizeClasses()} bg-muted border border-dashed border-muted-foreground/30 rounded-lg flex items-center justify-center mb-6`}>
      <div className="text-center text-muted-foreground">
        <div className="text-sm font-medium">Advertisement</div>
        <div className="text-xs mt-1">
          {/* {size.charAt(0).toUpperCase() + size.slice(1)} Banner - {position.charAt(0).toUpperCase() + position.slice(1)} */}
        </div>
        <div className="text-xs mt-1 opacity-60">
          {/* Google AdSense / Your Ad Network */}
        </div>
      </div>
    </div>
  );
};