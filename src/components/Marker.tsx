interface MarkerProps {
  input: string;
  term: string;
}

const Marker = ({ input, term }: MarkerProps): JSX.Element => {
  const inputArr = input.split(new RegExp(`(${term})`, "gi"));

  return (
    <>
      {inputArr.map((partialInput) => {
        if (partialInput.toLowerCase() === term.toLowerCase()) {
          return <mark>{partialInput}</mark>;
        } else {
          return partialInput;
        }
      })}
    </>
  );
};

export default Marker;
