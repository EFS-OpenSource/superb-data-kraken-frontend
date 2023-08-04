import { Form } from 'react-bootstrap';

export interface InputTextProps {
  onChange: (e: any) => void;
  placeholder: string;
  className?: string;
}

const InputText = ({ placeholder, onChange, className }: InputTextProps) => (
  <Form className={className} onSubmit={(e) => e.preventDefault()}>
    <Form.Control
      aria-label="searchBar"
      type="text"
      placeholder={placeholder}
      style={{ maxWidth: '440px' }}
      onChange={(e) => {
        onChange(e.target.value);
      }}
    />
  </Form>
);

export default InputText;
