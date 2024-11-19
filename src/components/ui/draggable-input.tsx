/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import Image from 'next/image';
import { ReactElement, useCallback, useEffect, useRef, useState } from 'react';
import { Accept, useDropzone } from 'react-dropzone';
import { FieldValues, useController } from 'react-hook-form';
import { AiOutlineCloseCircle, AiOutlineCloudUpload } from 'react-icons/ai';
import { FaExpand, FaEye, FaRotateLeft, FaRotateRight } from 'react-icons/fa6';
import { toast } from 'sonner';

import { TDraggableImageInputProps } from '@/types/components/drag-input';

export const UploadDraggableField = <T extends FieldValues>({
  multiple = false,
  className,
  label,
  accepted = '',
  setTab,
  isLoading,
  fileInfo,
  setFileInfo,
  ...props
}: TDraggableImageInputProps<T>): ReactElement => {
  const { field } = useController(props);

  const [isFullscreen, setIsFullscreen] = useState(false); // State for fullscreen
  const previewRef = useRef<HTMLDivElement>(null); // Ref for fullscreen
  const inputRef = useRef<HTMLInputElement>(null); // Ref for file input

  const [previewUrl, setPreviewUrl] = useState<string>('');

  // Handle fullscreen state changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Manage preview URL
  useEffect(() => {
    if (field.value instanceof Blob) {
      // Type guard
      const url = URL.createObjectURL(field.value);
      setPreviewUrl(url);
      return () => {
        URL.revokeObjectURL(url);
        setPreviewUrl('');
      };
    }
  }, [field.value]);

  // Function to rotate image using Canvas
  const rotateImage = (file: File, degrees: number): Promise<File> => {
    return new Promise((resolve, reject) => {
      const img = document.createElement('img');
      const url = URL.createObjectURL(file);

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Canvas context not available'));
          return;
        }

        const radians = (degrees * Math.PI) / 180;

        // Calculate new canvas size
        const sin = Math.abs(Math.sin(radians));
        const cos = Math.abs(Math.cos(radians));
        const width = img.width;
        const height = img.height;
        const newWidth = width * cos + height * sin;
        const newHeight = width * sin + height * cos;

        canvas.width = newWidth;
        canvas.height = newHeight;

        // Translate to center of canvas
        ctx.translate(newWidth / 2, newHeight / 2);
        ctx.rotate(radians);
        ctx.drawImage(img, -width / 2, -height / 2);

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Canvas is empty'));
              return;
            }

            // Create a new file
            const rotatedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now(),
            });

            resolve(rotatedFile);
          },
          file.type,
          1 // quality
        );
      };

      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };

      img.src = url;
    });
  };

  const onDrop = useCallback(
    (acceptedFiles: Array<File>) => {
      if (setTab && !isLoading) {
        setTab('idle');
      }

      const file = acceptedFiles[0];
      if (file) {
        field.onChange(file);
        setFileInfo({
          type: file.type,
          name: file.name,
        });
      }
    },
    [field]
  );

  // Convert accepted string to Accept type
  const acceptedTypes: Accept = accepted
    ? accepted.split(',').reduce((acc: Accept, type: string) => {
        acc[type.trim()] = [];
        return acc;
      }, {} as Accept)
    : {};

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple,
    accept: acceptedTypes,
  });

  const handleRemoveFile = (e: React.MouseEvent) => {
    if (setTab) {
      setTab('idle');
    }
    e.stopPropagation();
    setFileInfo({ type: '', name: '' });
    field.onChange(null);
  };

  // Rotate left by -90 degrees
  const rotateLeft = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (field.value) {
      try {
        const rotatedFile = await rotateImage(field.value, -90);
        field.onChange(rotatedFile);
        setFileInfo({
          type: rotatedFile.type,
          name: rotatedFile.name,
        });
      } catch (error) {
        console.error(error);
        toast.error('Failed to rotate image.');
      }
    }
  };

  // Rotate right by +90 degrees
  const rotateRight = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (field.value) {
      try {
        const rotatedFile = await rotateImage(field.value, 90);
        field.onChange(rotatedFile);
        setFileInfo({
          type: rotatedFile.type,
          name: rotatedFile.name,
        });
      } catch (error) {
        console.error(error);
        toast.error('Failed to rotate image.');
      }
    }
  };

  // Toggle fullscreen mode
  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (previewRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        previewRef.current.requestFullscreen().catch((err) => {
          console.error(
            `Error attempting to enable fullscreen mode: ${err.message}`
          );
        });
      }
    }
  };

  const handleChangeFile = () => {
    if (!isFullscreen && inputRef.current) {
      inputRef.current.click();
    }
  };

  // Render the preview based on file type
  const renderPreview = () => {
    const { type } = fileInfo;
    if (!field.value) return null;

    const commonStyle = {
      transition: 'transform 0.3s ease',
      maxWidth: '100%',
      maxHeight: isFullscreen ? '100vh' : '400px', // Adjust height based on fullscreen
    };

    if (['image/jpeg', 'image/jpg', 'image/webp', 'image/png'].includes(type)) {
      return (
        <div className='w-full'>
          {/* Conditionally render the warning */}
          {previewUrl.length > 0 && (
            <div
              ref={previewRef}
              className='relative w-full flex justify-center mt-4'
            >
              <Image
                width={0}
                height={0}
                sizes=''
                className='w-full h-full object-contain rounded-lg'
                src={previewUrl}
                alt='Uploaded'
                style={commonStyle}
              />
              {/* Rotate and Fullscreen Buttons */}
              <div className='absolute top-2 right-2 flex space-x-2'>
                <button
                  type='button'
                  onClick={rotateLeft}
                  className='bg-white bg-opacity-75 hover:bg-opacity-100 p-1 rounded-full shadow'
                  title='Rotate Left'
                >
                  <FaRotateLeft size={20} />
                </button>
                <button
                  type='button'
                  onClick={rotateRight}
                  className='bg-white bg-opacity-75 hover:bg-opacity-100 p-1 rounded-full shadow'
                  title='Rotate Right'
                >
                  <FaRotateRight size={20} />
                </button>
                <button
                  type='button'
                  onClick={toggleFullscreen}
                  className='bg-white bg-opacity-75 hover:bg-opacity-100 p-1 rounded-full shadow'
                  title='Fullscreen'
                >
                  <FaExpand size={20} />
                </button>
              </div>
            </div>
          )}
        </div>
      );
    }

    if (['video/ogg', 'video/webm', 'video/mp4'].includes(type)) {
      return (
        <div
          ref={previewRef}
          className='relative w-full flex justify-center mt-4'
        >
          <video
            controls
            src={previewUrl}
            className='object-contain max-w-full max-h-[400px] transition-transform duration-300'
          />
          {/* Fullscreen Button for Video */}
          <div className='absolute top-2 right-2 flex space-x-2'>
            <button
              type='button'
              onClick={toggleFullscreen}
              className='bg-white bg-opacity-75 hover:bg-opacity-100 p-1 rounded-full shadow'
              title='Fullscreen'
            >
              <FaExpand size={20} />
            </button>
          </div>
        </div>
      );
    }

    if (['audio/mpeg', 'audio/ogg', 'audio/wav'].includes(type)) {
      return (
        <audio controls src={previewUrl} className='w-full mt-4'>
          Your browser does not support the audio tag.
        </audio>
      );
    }

    if (type === 'application/pdf' || type.includes('document')) {
      return (
        <div className='text-black break-all mt-4'>
          <a
            href={previewUrl}
            target='_blank'
            rel='noopener noreferrer'
            className='underline'
          >
            {fileInfo.name}
          </a>
        </div>
      );
    }

    return <span className='text-black mt-4'>Unsupported file type</span>;
  };

  const handleEyeClick = (e: React.MouseEvent) => {
    // Prevent re-triggering the file input
    e.stopPropagation();
  };

  return (
    <div className={className}>
      <div
        {...getRootProps()}
        className='flex flex-col items-center bg-neutral-50 justify-center relative w-full p-2 border rounded-lg border-neutral-300'
      >
        {field.value && !isLoading && (
          <div
            onClick={handleRemoveFile}
            className='absolute right-4 top-4 shadow-md rounded-full bg-white cursor-pointer'
          >
            <AiOutlineCloseCircle color='#e63a3a' size={30} />
          </div>
        )}
        {/* Drag and Drop Area */}
        <button
          type='button'
          onClick={handleChangeFile}
          className='flex flex-col items-center w-full px-4 py-3 bg-neutral-50 dark:bg-transparent rounded-lg cursor-pointer'
        >
          <div className='flex flex-col items-center'>
            <AiOutlineCloudUpload className='text-4xl text-gray-400 mb-2' />
          </div>
          <span className='mt-2 text-xs md:text-sm lg:text-sm text-center text-black font-semibold dark:text-white'>
            Drag, drop or <span className='text-blue-base'>select file</span> to
            upload your {label}
          </span>
          <span className='flex justify-center items-center text-xs md:text-sm lg:text-sm mt-2 rounded-lg border overflow-hidden max-w-[250px] sm:max-w-[300px] md:max-w-[400px] lg:max-w-[500px]'>
            <p className='bg-gray-500 hover:bg-primary-700 cursor-pointer w-fit text-white h-full transition-colors ease-in-out duration-300 px-4 rounded-l-lg flex items-center text-xs py-2 whitespace-nowrap'>
              Select File
            </p>
            <p className='px-4 text-xs text-nowrap overflow-hidden overflow-ellipsis whitespace-nowrap'>
              {fileInfo.name ? fileInfo.name : 'No file selected'}
            </p>
            {field.value && (
              <a
                href={previewUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='ml-auto text-gray-500 text-xs underline mr-2'
                onClick={handleEyeClick} // Prevent re-input on click
              >
                <FaEye />
              </a>
            )}
          </span>
          <input {...getInputProps()} ref={inputRef} className='hidden' />
        </button>

        {/* Conditionally show the file preview */}
        {renderPreview()}

        {/* Optional Status Message */}
      </div>
    </div>
  );
};
