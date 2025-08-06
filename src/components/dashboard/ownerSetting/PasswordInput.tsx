import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react'; 
import SuppleInput from '@/components/Forms/SuppleInput';

const PasswordInput = ({ name, label }: { name: string; label: string }) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible((prev) => !prev);

  return (
    <div className="relative">
      <SuppleInput
        name={name}
        label={label}
        type={isVisible ? 'text' : 'password'}
        placeholder={label}
        className='h-[45px]'
      />
      <button
        type="button"
        onClick={toggleVisibility}
        className="absolute inset-y-12 right-3 flex items-center"
        aria-label={isVisible ? 'Hide password' : 'Show password'}
      >
        {isVisible ? <Eye size={20}  className='text-[#ACB5BB]'/> : <EyeOff size={20} className='text-[#ACB5BB]' /> }
      </button>
    </div>
  );
};

export default PasswordInput;
