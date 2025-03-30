import React from 'react';

interface RequiredAsteriskProps {
	className?: string; // Optional className for additional styling
}

const RequiredAsterisk: React.FC<RequiredAsteriskProps> = ({ className }) => {
	return <span className={`text-red-500 ${className}`}>*</span>;
};

export default RequiredAsterisk;
