import  { useDropzone } from 'react-dropzone';
import { useCallback, useState } from 'react';
import Image from 'next/image';

interface ImageUploadProps {
    onChange: (base64: string) => void;
    label: string;
    value?: string;
    disabled?: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
    onChange,
    label,
    value,
    disabled 
}) => 
{
    const [base64, setBase64] = useState(value);

    const handleChange = useCallback((base64: string) => {
        onChange(base64);
    }, [onChange]);

    const handleDrop = useCallback((files: any) => {
        const file = files[0];
        const reader = new FileReader();
        reader.onload = (event: any) => {
            setBase64(event.target.result);
            onChange(event.target.result);
        };
        reader.readAsDataURL(file);
    }, [onChange]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        maxFiles: 1,
        onDrop: handleDrop,
        accept: { 'image/jpeg': [], 
        'image/png' : [] }
    }); 
    return (
        <div
        {...getRootProps({
            className: "w-full p-4 text-white text-center border-2 border-dashed rounded-md  border-neutral-700"})}
            >
            <input {...getInputProps()} />
            {
                base64 ? (
                    <div className="flex items-center justify-center">
                        <Image 
                            src={base64}
                            width={200}
                            height={200}
                            className="rounded-md" alt="Uploaded Image"
                        />
                    </div>
                ) : (
                    <p className="text-white">{label}</p>
                )
            }           
        </div>
    );
}

export default ImageUpload;