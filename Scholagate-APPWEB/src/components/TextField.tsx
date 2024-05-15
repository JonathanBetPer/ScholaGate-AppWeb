import { Label, TextInput } from "flowbite-react";
import { HiMail } from "react-icons/hi";

interface TextFieldProps {
  className?: string;
  placeholderText?: string;
  title?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function TextField({
  className,
  placeholderText = "example@example.example",
  title = "Your email",
  value,
  onChange,
}: TextFieldProps) {
  return (
    <div className={`max-w-md ${className}`}>
      <div className="mb-2 block">
        <Label htmlFor="email4" value={title} />
      </div>
      <TextInput
        id="email4"
        type="email"
        icon={HiMail}
        placeholder={placeholderText}
        required
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default TextField;
