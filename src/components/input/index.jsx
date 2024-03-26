import { Form } from 'react-bootstrap';

const Input = ({ name, label, className = '12', ...rest }) => (
  <Form.Group className={className}>
    <Form.Label>{label}</Form.Label>
    <Form.Control name={name} {...rest} />
  </Form.Group>
);

export default Input;
