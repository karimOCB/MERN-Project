import { useForm } from 'react-hook-form';
import { User } from '../models/user'
import { LoginCredentials } from '../network/notes_api';
import * as NotesApi from '../network/notes_api';
import { Button, Form, Modal } from "react-bootstrap";
import TextInputField from './form/TextInputField';

interface LoginModalProps {
  onDismiss: () => void,
  onLoginSuccessful: (user: User) => void
}

const LoginModal = ({ onDismiss, onLoginSuccessful }: LoginModalProps) => {

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginCredentials>({});

  async function onSubmit(credentials: LoginCredentials) {
    try {
      const user = await NotesApi.login(credentials);
      onLoginSuccessful(user);
    } catch (error) {
      alert(error);
      console.error(error);
    }
  }

  return (
    <Modal show onHide={onDismiss} style={{ color: "black" }}>
      <Modal.Header closeButton>
        <Modal.Title>Log In</Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <TextInputField
            name="username"
            label="Username"
            type="text"
            placeholder="Username"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.username}
          />
          <TextInputField
            name="password"
            label="Password"
            type="password"
            placeholder="Password"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.password}
          />
          <Button type="submit" disabled={isSubmitting} style={{ color: "black" }}>Log In</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default LoginModal