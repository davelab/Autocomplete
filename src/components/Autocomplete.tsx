import { useState, MouseEvent, KeyboardEvent, FormEvent, useRef } from "react";
import cx from "classnames";
import styles from "./Autocomplete.module.scss";
import cross from "../assets/cross.svg";
import spinner from "../assets/tail-spin.svg";
import useKeyboardFocus from "../hooks/useKeyboardFocus";
import useAutocomplete from "../hooks/useAutocomplete";
import Marker from "./Marker";

interface AutocompleteProps {
  src: Function;
  srcName?: string;
}

interface OptionItemProps {
  option: string;
  index: number;
  isFocused: boolean;
}

const Autocomplete = ({ src, srcName }: AutocompleteProps) => {
  if (!src) {
    throw new Error(
      "you should set a API resource in order to use Autocomplete"
    );
  }

  const {
    options,
    handleSearchChange,
    searchTerm,
    setSearchTerm,
    selectedItem,
    setSelectedItem,
    loading,
  } = useAutocomplete({
    callback: src,
  });
  const [inputError, setInputError] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);
  const { currentFocus } = useKeyboardFocus(options.length);

  const autocompleteRef = useRef<HTMLInputElement>(null);

  const onFocus = () => {
    setInputFocused(true);
  };

  const onBlur = () => {
    setInputFocused(false);
  };

  const onInput = (e: FormEvent<HTMLInputElement>) => {
    if (inputError) {
      setInputError(false);
    }

    handleSearchChange(e);
  };

  const onOptionClick = (option: string | null) => {
    if (option) {
      setSelectedItem(option);
    }

    onBlur();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter" && searchTerm?.length <= 2) {
      setInputError(true);
    }

    if (e.key === "Enter" && typeof currentFocus === "number") {
      const elementHighlighted = document.getElementById(
        `option-${currentFocus}`
      );

      if (elementHighlighted)
        onOptionClick(elementHighlighted?.getAttribute("data-value"));
    }
  };

  const onMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    // prevent input blur when clicking one of the options
    e.preventDefault();
  };

  const clearSelectedItem = () => {
    setSelectedItem(null);
    setTimeout(() => {
      autocompleteRef.current?.focus();
    }, 0);
  };

  const OptionItem = ({ option, index, isFocused }: OptionItemProps) => {
    const optionRef = useRef<HTMLDivElement>(null);

    const handleOnClick = (
      e: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>
    ) => {
      onOptionClick((e.target as HTMLDivElement).getAttribute("data-value"));
    };

    return (
      <div
        role="button"
        ref={optionRef}
        id={`option-${index}`}
        tabIndex={isFocused ? 0 : -1}
        data-value={option}
        onKeyDown={handleOnClick}
        className={cx(styles.autocompleteOption, {
          [styles.selected]: isFocused,
        })}
        onClick={handleOnClick}
        onMouseDown={onMouseDown}
      >
        <Marker input={option} term={searchTerm} />
      </div>
    );
  };

  const Dropdown = () => {
    const optionsList = options.map((option, index) => (
      <OptionItem
        key={`options-${option}`}
        option={option}
        index={index}
        isFocused={currentFocus === index}
      />
    ));

    const dropdownContent =
      searchTerm && searchTerm?.length >= 3 ? (
        <>
          <div className={cx(styles.dropdownTitle, styles.dropdownTitleLight)}>
            Looking for <strong>{searchTerm}</strong>{" "}
            {srcName ? `in ${srcName}` : null}
          </div>
          {loading && (
            <div className={styles.spinnerContainer}>
              <img src={spinner} alt="loading" />
            </div>
          )}
          <div className={styles.dropdownListWrapper}>{optionsList}</div>
        </>
      ) : (
        <div
          className={cx(styles.dropdownTitle, {
            [styles.error]: inputError,
          })}
        >
          Please write at least 3 characters.
        </div>
      );

    return <div className={styles.autocompleteDropdown}>{dropdownContent}</div>;
  };

  const onCrossClick = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    return selectedItem?.length ? clearSelectedItem() : setSearchTerm("");
  };

  const showClear = selectedItem?.length || searchTerm.length >= 3;

  return (
    <div
      className={cx(styles.autocompleteContainer, {
        [styles.error]: inputError,
      })}
    >
      <div className={styles.autocompleteWrapper}>
        {selectedItem?.length ? (
          <div
            role="button"
            tabIndex={0}
            className={styles.autocompleteInput}
            onKeyDown={clearSelectedItem}
            onClick={clearSelectedItem}
          >
            <span className={styles.selectedItem}>{selectedItem}</span>
          </div>
        ) : (
          <input
            ref={autocompleteRef}
            value={searchTerm}
            className={styles.autocompleteInput}
            type="text"
            onFocus={onFocus}
            onBlur={onBlur}
            onInput={onInput}
            onKeyDown={onKeyDown}
            placeholder={"Search film, series and actors"}
          />
        )}
      </div>

      <div
        tabIndex={-1}
        onClick={onCrossClick}
        className={cx(styles.clearIcon, { [styles.show]: showClear })}
      >
        <img src={cross} alt="clear" />
      </div>

      {inputFocused && <Dropdown />}
    </div>
  );
};

export default Autocomplete;
