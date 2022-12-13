const marker = (input: string, term: string) => {
  input.replace(new RegExp(term, "gi"), (match) => `<mark>${match}</mark>`);
};

export default marker;
