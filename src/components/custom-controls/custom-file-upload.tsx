import React from 'react';
import { Button } from '@/components/ui/button';
import { FileIcon, UploadIcon, TrashIcon } from 'lucide-react';

interface ICustomFileUploadProps {
	onChange: (files: FileList | null) => void;
	value?: FileList | null;
	accept?: string;
	maxSize?: number;
	className?: string;
}

const CustomFileUpload = ({
	onChange,
	accept = '.pdf,.jpg,.jpeg,.png',
	maxSize = 5 * 1024 * 1024, // 5MB default
	className
}: ICustomFileUploadProps) => {
	const [file, setFile] = React.useState<File | null>(null);
	const fileInputRef = React.useRef<HTMLInputElement>(null);

	const handleFileChange = (files: FileList | null) => {
		const selectedFile = files?.[0] || null;
		setFile(selectedFile);
		onChange(files);
	};

	const handleRemove = () => {
		setFile(null);
		onChange(null);
	};

	const handleUploadClick = () => {
		fileInputRef.current?.click();
	};

	const formatFileSize = (bytes: number) => {
		if (bytes < 1024) return bytes + 'B';
		if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + 'kb';
		return (bytes / (1024 * 1024)).toFixed(1) + 'MB';
	};

	return (
		<div className={className}>
			{!file ? (
				<div className="border-muted-foreground/25 hover:border-muted-foreground/50 group relative cursor-pointer rounded-lg border-2 border-dashed p-6 transition-colors">
					<input
						ref={fileInputRef}
						type="file"
						className="absolute inset-0 z-50 h-full w-full cursor-pointer opacity-0"
						accept={accept}
						onChange={(e) => handleFileChange(e.target.files)}
					/>
					<div className="flex w-full flex-col items-center gap-4 sm:flex-row sm:justify-between">
						<div className="flex w-full items-center gap-4 sm:w-auto">
							<div className="flex h-10 w-10 shrink-0 items-center justify-center">
								<UploadIcon className="text-muted-foreground h-5 w-5" />
							</div>
							<div className="flex flex-col items-start justify-start">
								<span className="font-medium">Drag and drop file to upload</span>
								<p className="text-muted-foreground mt-2 text-xs">
									Max size {formatFileSize(maxSize)}: JPEG, PNG
								</p>
							</div>
						</div>
						<Button
							type="button"
							variant="outline"
							onClick={handleUploadClick}
							className="w-full sm:w-auto"
						>
							Upload
						</Button>
					</div>
				</div>
			) : (
				<div className="flex items-center justify-between rounded-lg border p-4">
					<div className="flex items-center gap-4">
						<div className="bg-background flex h-10 w-10 items-center justify-center rounded-lg">
							<FileIcon className="text-muted-foreground h-5 w-5" />
						</div>
						<div>
							<p className="text-sm font-medium">{file.name}</p>
							<p className="text-muted-foreground text-xs">{formatFileSize(file.size)}</p>
						</div>
					</div>
					<Button
						type="button"
						variant="ghost"
						size="icon"
						className="text-muted-foreground hover:text-foreground"
						onClick={handleRemove}
					>
						<TrashIcon className="h-4 w-4" />
						<span className="sr-only">Remove file</span>
					</Button>
				</div>
			)}
		</div>
	);
};

export default CustomFileUpload;
