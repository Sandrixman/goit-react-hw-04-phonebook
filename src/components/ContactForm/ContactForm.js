import { nanoid } from 'nanoid';
import { Formik, Field, ErrorMessage } from 'formik';
import { string, number, object } from 'yup';
import { FormStyled, ErrorText, Label, Button } from './ContactForm.styled';

const schema = object({
  name: string().required(),
  number: number().required().positive().integer(),
});

const FormError = ({ name }) => {
  return (
    <ErrorMessage
      name={name}
      render={message => <ErrorText>{message}</ErrorText>}
    />
  );
};

export const ContactForm = ({ onSubmit }) => {
  const initialValues = {
    name: '',
    number: '',
  };

  const id = nanoid();

  const handleSubmit = (values, { resetForm }) => {
    onSubmit(values);

    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={schema}
    >
      <FormStyled>
        <Label htmlFor={id}>Name</Label>
        <Field
          id={id}
          type="text"
          name="name"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
        <FormError name="name" />
        <Label htmlFor={id}>Number</Label>
        <Field
          id={id}
          type="tel"
          name="number"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
        <FormError name="number" />
        <Button type="submit">Add contact</Button>
      </FormStyled>
    </Formik>
  );
};
