import { useState } from 'react';
import Autocomplete, {
  createFilterOptions,
} from '@material-ui/lab/Autocomplete';

export default function CustomTagAutocomplete({
  options: userOptions,
  selectedOptions,
  value: userValue,
  inputValue: userInputValue,
  filterOptions: userFilterOptions,
  onChange,
  onOptionSelect,
  onCreateNewOptionSelect,
  onRemoveOption,
  onInputChange,
  onResetInputValue,
  ...attributes
}) {
  const [inputValue, setInputValue] = useState(userInputValue || '');
  const defaultValue = attributes.multiple ? [] : '';
  const autocompleteValue = userValue || defaultValue;

  const adjustedOptions = userOptions.concat(inputValue);
  const addInputAsOptionText = `Add "${inputValue}"`;
  const isInputEmpty = inputValue === '';

  const inputValueRegExp = new RegExp(`^${inputValue.trim()}$`, 'i');
  const inputValueAlreadyExists = userOptions.some((option) =>
    inputValueRegExp.test(option)
  );

  function handleResetInput() {
    setInputValue('');
    if (onResetInputValue) onResetInputValue();
  }

  function handleInputChange(event, value, reason) {
    console.log(reason, value);
    if (reason === 'input') {
      setInputValue(value);
      if (onInputChange) onInputChange(value, event);
    } else if (reason === 'clear') {
      handleResetInput();
    }
  }

  /*
    value is array when multiple prop is true, otherwise it's a string.

    When multiple, the value array will be the already updated array.
  */
  function handleChange(event, value, reason) {
    if (onChange) return onChange(event, value, reason);

    let addNewOptionValue = '';
    if (attributes.multiple && value.length > 0) {
      addNewOptionValue = value[value.length - 1].inputValue;
    } else {
      addNewOptionValue = value.inputValue;
    }

    const isCreateNewOption = addNewOptionValue === inputValue;

    if (reason === 'select-option') {
      if (onCreateNewOptionSelect && isCreateNewOption) {
        onCreateNewOptionSelect(inputValue);
      } else if (onOptionSelect) {
        onOptionSelect(value);
      }
      handleResetInput();
    } else if (onRemoveOption && reason === 'remove-option') {
      onRemoveOption(value);
    }
  }

  /* 
    When setting 'value' prop on Autocomplete, thus making it controlled, the inputValue prop on 
    filterOption's 'state' param always returns an empty string. Once the value prop is removed it works 
    fine, however this messes with the Autocomplete state and breaks the clear icon. 

    Quick fix was to add the input value to the state manually so the filter gets the right values to work with.
  */
  function filterOptions(options, state) {
    if (userFilterOptions) return userFilterOptions(options, state);

    let newOptions = createFilterOptions({
      matchFrom: 'start',
    })(userOptions, { ...state, inputValue });

    newOptions = newOptions.filter(
      (option) => !selectedOptions.includes(option)
    );

    if (
      onCreateNewOptionSelect &&
      inputValue !== '' &&
      !inputValueAlreadyExists
    ) {
      newOptions.push({ label: addInputAsOptionText, inputValue });
    }

    return newOptions;
  }

  function getOptionLabel(option) {
    if (typeof option === 'string') {
      return option;
    } else if (option && option.label) {
      return option.label;
    }
  }

  return (
    <Autocomplete
      {...attributes}
      options={adjustedOptions}
      value={autocompleteValue}
      inputValue={inputValue}
      onChange={handleChange}
      onInputChange={handleInputChange}
      filterOptions={filterOptions}
      getOptionLabel={getOptionLabel}
      disableClearable={isInputEmpty}
      autoSelect
      autoHighlight
    />
  );
}
