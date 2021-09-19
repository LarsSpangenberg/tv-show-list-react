import { useState } from 'react';
import Autocomplete, {
  AutocompleteInputChangeReason,
  AutocompleteProps,
  createFilterOptions,
} from '@material-ui/lab/Autocomplete';
import { ChangeEvent } from 'react';
import {
  AutocompleteChangeReason,
  FilterOptionsState,
  Value,
} from '@material-ui/lab/useAutocomplete';

interface NewOption {
  label: string;
  inputValue: string;
}

type TagOption = string | NewOption;

interface CustomTagAutocompleteProps<
  T extends TagOption,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined
> extends AutocompleteProps<T, Multiple, DisableClearable, FreeSolo> {
  selectedOptions: string[];
  onTagSelect: (state: Value<T, Multiple, true, FreeSolo>) => void;
  onCreateNewTagSelect: (option: string) => void;
  onRemoveTag?: (
    state: Value<T, Multiple, DisableClearable, FreeSolo>
  ) => void;
}

function CustomTagAutocomplete<
  T extends TagOption,
  Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = undefined
>(
  props: CustomTagAutocompleteProps<T, Multiple, DisableClearable, FreeSolo>
): JSX.Element {
  const {
    options: userOptions,
    selectedOptions,
    inputValue: userInputValue,
    filterOptions: userFilterOptions,
    onChange,
    onTagSelect,
    onCreateNewTagSelect,
    onRemoveTag,
    onInputChange,
    ...attributes
  } = props;
  type AcValue = Value<T, Multiple, DisableClearable, FreeSolo>;

  const [inputValue, setInputValue] = useState(userInputValue || '');

  const adjustedOptions = [...userOptions, inputValue] as T[];
  const disableClearable = (inputValue === '') as DisableClearable;

  const inputValueRegExp = new RegExp(`^${inputValue.trim()}$`, 'i');
  const inputValueAlreadyExists = userOptions.some(
    (option) => typeof option === 'string' && inputValueRegExp.test(option)
  );

  function handleResetInput(event: ChangeEvent<{}>, reason?: AutocompleteInputChangeReason) {
    setInputValue('');
    if (onInputChange) onInputChange(event, '', reason || 'reset');
  }

  function handleInputChange(
    event: ChangeEvent<{}>,
    value: string,
    reason: AutocompleteInputChangeReason
  ) {
    if (reason === 'input') {
      setInputValue(value);
      if (onInputChange) onInputChange(event, value, reason);
    } else if (reason === 'clear') {
      handleResetInput(event, reason);
    }
  }

  /*
    value is array when multiple prop is true, otherwise it's a string.

    When multiple, the value array will be the already updated array.
  */
  function handleChange(
    event: ChangeEvent<{}>,
    value: AcValue,
    reason: AutocompleteChangeReason
  ) {
    if (onChange) {
      return onChange(event, value, reason);
    }

    let addNewOptionValue = '';

    if (Array.isArray(value) && value.length > 0) {
      const lastItem = value[value.length - 1];
      if (typeof lastItem !== 'string') {
        addNewOptionValue = lastItem.inputValue;
      }
    } else if (value && typeof value === 'object' && 'inputValue' in value) {
      addNewOptionValue = value.inputValue;
    }

    const isCreateNewOption =
      addNewOptionValue === inputValue && inputValue !== '';

    if (reason === 'select-option') {
      if (isCreateNewOption) {
        onCreateNewTagSelect(inputValue);
      } else {
        // value shouldn't return null, since this component disables clearable when input is empty
        type NonNullAcValue = Value<T, Multiple, true, FreeSolo>;
        onTagSelect(value as NonNullAcValue);
      }
      handleResetInput(event);
    } else if (onRemoveTag && reason === 'remove-option') {
      onRemoveTag(value);
    }
  }

  /* 
    When the 'value' prop is set on Autocomplete, thus making it controlled, the inputValue prop on 
    filterOption's 'state' param always returns an empty string. Once the value prop is removed it works 
    fine. The value is set in the Sidebar componenet because the options are managed in a seperate component and
    the value doesn't really match with the input.

    Quick fix was to add the input value to the state manually so the filter gets the right values to work with.

  */
  function filterOptions(options: T[], state: FilterOptionsState<T>) {
    if (userFilterOptions) {
      return userFilterOptions(options, state);
    }

    let newOptions = createFilterOptions<T>({
      matchFrom: 'start',
    })(userOptions, { ...state, inputValue });

    newOptions = newOptions.filter(
      (option) =>
        typeof option === 'string' && !selectedOptions.includes(option)
    );

    if (inputValue !== '' && !inputValueAlreadyExists) {
      newOptions.push({ label: `Add "${inputValue}"`, inputValue } as T);
    }

    return newOptions;
  }

  function getOptionLabel(option: T) {
    if (typeof option === 'string') {
      return option;
    }
    return option.label;
  }

  return (
    <Autocomplete
      {...attributes}
      options={adjustedOptions}
      inputValue={inputValue}
      onChange={handleChange}
      onInputChange={handleInputChange}
      filterOptions={filterOptions}
      getOptionLabel={getOptionLabel}
      disableClearable={disableClearable}
      autoSelect
      autoHighlight
    />
  );
}

export default CustomTagAutocomplete;
