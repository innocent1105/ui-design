import React from 'react';

interface IRequiredAsteriskProps {
	className?: string; // Optional className for additional styling
}

const RequiredAsterisk: React.FC<IRequiredAsteriskProps> = ({ className }) => {
	return <span className={`text-red-500 ${className}`}>*</span>;
};

export default RequiredAsterisk;
