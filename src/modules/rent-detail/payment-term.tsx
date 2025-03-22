// Payment Term Item
export const PaymentTermItem: React.FC<{ number: number; text: string }> = ({
  number,
  text,
}) => {
  return (
    <div className='flex gap-3 items-center'>
      <div className='bg-tertiary h-6 w-6 rounded-full flex items-center justify-center'>
        <span className='text-primary font-bold text-sm'>{number}</span>
      </div>
      <span className='text-sm text-primary font-semibold'>{text}</span>
    </div>
  );
};
