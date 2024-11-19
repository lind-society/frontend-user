import { AiFillExclamationCircle } from 'react-icons/ai';
import { IoClose } from 'react-icons/io5';
interface FormErrorProps {
  message?: string;
  open?: boolean;
  setOpen?: (open: boolean) => void;
}

const FormError = ({ message, open, setOpen }: FormErrorProps) => {
  if (!message) return <></>;

  return open ? (
    <div className='bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-4 justify-between'>
      <div className='gap-x-2 flex items-center'>
        <AiFillExclamationCircle className='min-w-6 min-h-6' />
        <p className='font-medium'>{message}</p>
      </div>
      <button
        onClick={() => setOpen?.(false)}
        className='text-destructive align-topg'
      >
        <IoClose className='min-w-4 min-h-4' />
      </button>
    </div>
  ) : (
    <></>
  );
};

export default FormError;
