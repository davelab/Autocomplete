import { useState, FormEvent, useRef } from "react";
import debounce from "../utils/debounce";

interface configProps {
  callback: Function;
  minLengthSearch?: number;
}

const useAutocomplete = ({ callback, minLengthSearch = 3 }: configProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const debouncedSearch = useRef(
    debounce(async (criteria: any) => {
      setLoading(true);
      try {
        setOptions(await callback(criteria));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }, 300)
  ).current;

  const handleSearchChange = async (e: FormEvent<HTMLElement>) => {
    e.preventDefault();

    const value = (e.target as HTMLInputElement).value;

    setSearchTerm(value);

    if (!value.length && options.length) {
      setOptions([]);
    }

    if (value.length >= minLengthSearch) {
      debouncedSearch(value);
    }
  };

  return {
    selectedItem,
    setSelectedItem,
    searchTerm,
    setSearchTerm,
    options,
    setOptions,
    loading,
    handleSearchChange,
  };
};

export default useAutocomplete;
