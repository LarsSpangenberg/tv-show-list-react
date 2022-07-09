import { ChangeEvent, FC, MutableRefObject, useState } from 'react';
import {
  Autocomplete,
  AutocompleteChangeReason,
  AutocompleteInputChangeReason,
  TextField,
} from '@mui/material';
import { Tag } from 'store/models/Tag';
import { useAppSelector } from 'store/hooks';
import { getTagOptions } from 'store/app-data/ShowDetailsSlice';
// import CustomTagAutocomplete from 'components/ui/CustomTagAutocomplete';

interface NewOption {
  label: string;
  inputValue: string;
}

type TagOption = Tag | NewOption;

interface TagInputProps {
  allTags: Tag[];
  handleChange: (tags: string[]) => void;
  createNewTag: (tag: string) => void;
  inputRef: MutableRefObject<HTMLInputElement | undefined>;
}

const TagInput: FC<TagInputProps> = ({
  allTags,
  handleChange: handleTagChange,
  createNewTag,
  inputRef,
}) => {

  const [inputValue, setInputValue] = useState('');
  const { showTags, remainingTags } = useAppSelector((state) =>
    getTagOptions(state)
  );

  // TODO: maybe use tag names instead
  function updateShowTags(updatedTags: TagOption[]) {
    const newTagIds = (updatedTags as Tag[]).map((tag) => tag.id);
    handleTagChange(newTagIds);
  }

  function resetInput() {
    setInputValue('');
  }

  function handleInputChange(
    _: ChangeEvent<{}>,
    value: string,
    reason: AutocompleteInputChangeReason
  ) {
    if (reason === 'input') {
      setInputValue(value);
    } else if (reason === 'clear') {
      resetInput();
    }
  }

  /*
    value is array when multiple prop is true, otherwise it's a string.

    When multiple, the value array will be the already updated array.
  */
  function handleChange(
    _: ChangeEvent<{}>,
    value: (TagOption | string)[],
    reason: AutocompleteChangeReason
  ) {
    let addNewOptionValue = '';

    if (value.length > 0) {
      const lastItem = value[value.length - 1] as TagOption;

      if ('inputValue' in lastItem) {
        addNewOptionValue = lastItem.inputValue;
      } else if ('name' in lastItem) {
        addNewOptionValue = lastItem.name;
      }
    }

    const isCreateNewOption =
      addNewOptionValue === inputValue && inputValue !== '';

    if (reason === 'selectOption') {
      if (isCreateNewOption) {
        createNewTag(inputValue);
      } else {
        updateShowTags(value as TagOption[]);
      }
      resetInput();
    } else if (reason === 'removeOption') {
      updateShowTags(value as TagOption[]);
    }
  }

  /* 
    When the 'value' prop is set on Autocomplete, thus making it controlled, the inputValue prop on 
    filterOption's 'state' param always returns an empty string. Once the value prop is removed it works 
    fine. The value is set in the Sidebar component because the options are managed in a seperate component and
    the value doesn't really match with the input.

    Quick fix was to add the input value to the state manually so the filter gets the right values to work with.

  */
  function filterOptions() {
    const newOptions = [...remainingTags] as TagOption[];
    const inputValueRegExp = new RegExp(`^${inputValue.trim()}$`, 'i');
    const inputValueAlreadyExists = allTags.some((tag) =>
      inputValueRegExp.test(tag.name)
    );

    if (inputValue !== '' && !inputValueAlreadyExists) {
      newOptions.push({
        label: `Add "${inputValue}"`,
        inputValue,
      } as TagOption);
    }

    return newOptions;
  }

  function getOptionLabel(option: TagOption | string) {
    if (typeof option !== 'string') {
      if ('name' in option) {
        return option.name;
      } else if ('label' in option) {
        return option.label;
      }
    }
    // TODO: throw error if this happens
    return "ERROR: option doesn't have correct properties: 'label' or 'name'";
  }

  return (
    <Autocomplete
      multiple
      options={allTags}
      inputValue={inputValue}
      value={showTags}
      onChange={handleChange}
      onInputChange={handleInputChange}
      filterOptions={filterOptions}
      getOptionLabel={getOptionLabel}
      disableClearable={inputValue === ''}
      filterSelectedOptions
      autoSelect
      autoHighlight
      freeSolo
      renderInput={(params) => (
        <TextField
          {...params}
          label='Tags'
          variant='outlined'
          inputRef={inputRef}
        />
      )}
    />
  );
};

export default TagInput;
