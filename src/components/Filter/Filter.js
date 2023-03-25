import { nanoid } from 'nanoid';
import { Section } from './Filter.styled';

const id = nanoid();

const Filter = ({ changeFilter, value }) => {
  return (
    <Section>
      <label htmlFor={id}>Find contacts by name</label>
      <input id={id} type="text" onChange={changeFilter} value={value} />
    </Section>
  );
};

export default Filter;
