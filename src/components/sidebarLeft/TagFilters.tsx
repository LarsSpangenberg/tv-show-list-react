import { FC, useState, useEffect, ChangeEvent } from 'react';

import {
  Box,
  TextField,
  Chip,
  Autocomplete,
  AutocompleteInputChangeReason,
  AutocompleteChangeReason,
} from '@mui/material';
import { Tag } from 'store/models/Tag';
import { useAppSelector } from 'store/hooks';
import { getTagFilters } from 'store/app-data/FiltersSlice';
import { RootState } from 'store/store';

interface NewOption {
  label: string;
  inputValue: string;
}

type TagOption = Tag | NewOption;

interface TagFiltersProps {
  tags: Tag[];
  inputSpacing: object;
  isSidebarOpen: boolean;
  createNewTag: (tag: string) => void;
  addTagFilter: (tag: string) => void;
  removeTagFilter: (tag: string) => void;
  setIgnoreSidebarClose: (isIgnored: boolean) => void;
}

const TagFilters: FC<TagFiltersProps> = ({
  tags,
  inputSpacing,
  isSidebarOpen,
  createNewTag,
  addTagFilter,
  removeTagFilter,
  setIgnoreSidebarClose,
}) => {
  const [tagInputValue, setTagInputValue] = useState('');
  const { active: activeTagFilters, inactive: inactiveTagFilters } =
    useAppSelector((state: RootState) => getTagFilters(state));

  //TODO: test if useCallback is needed
  function getAdjustedOptions() {
    const adjustedOptions = (inactiveTagFilters ? [...inactiveTagFilters] : []) as TagOption[];
    const inputValueRegExp = new RegExp(`^${tagInputValue.trim()}$`, 'i');
    const inputValueAlreadyExists = tags.some((tag: Tag) =>
      inputValueRegExp.test(tag.name)
    );

    if (tagInputValue !== '' && !inputValueAlreadyExists) {
      adjustedOptions.push({
        label: `Add "${tagInputValue}"`,
        inputValue: tagInputValue,
      });
    }

    return adjustedOptions;
  }

  function resetTagInputValue() {
    setTagInputValue('');
  }

  // reset autocomplete input when sidebar closes
  useEffect(() => {
    if (!isSidebarOpen) resetTagInputValue();
  }, [isSidebarOpen]);

  function handleOptionsOpen() {
    setIgnoreSidebarClose(true);
  }

  function handleOptionsClose() {
    setTimeout(() => {
      setIgnoreSidebarClose(false);
    }, 250);
  }

  function handleSelectOption(value: Tag) {
    if (value) addTagFilter(value.id);
  }

  function handleSelectCreateNewOption(value: string) {
    createNewTag(value);
  }

  function handleTagInputChange(
    _: ChangeEvent<{}>,
    value: string,
    reason: AutocompleteInputChangeReason
  ) {
    if (reason === 'input') {
      setTagInputValue(value);
    } else if (reason === 'clear') {
      resetTagInputValue();
    }
  }

  // Note: value might return null because the disableClearable attribute is dynamically modified
  function handleChange(
    _: ChangeEvent<{}>,
    value: TagOption | string | null,
    reason: AutocompleteChangeReason
  ) {
    if (reason === 'selectOption' && value && typeof value !== 'string') {
      if ('inputValue' in value && tagInputValue !== '') {
        handleSelectCreateNewOption(tagInputValue);
      } else if ('name' in value) {
        handleSelectOption(value);
      }
      resetTagInputValue();
    }
  }

  function getOptionLabel(option: TagOption | string) {
    if (typeof option !== 'string') {
      if ('name' in option) {
        return option.name;
      } else if ('label' in option) {
        return option.label;
      }
    }
    return "ERROR: option doesn't have correct properties: 'label' or 'name'";
  }

  return (
    <>
      <Autocomplete
        sx={{ mt: 2 }}
        options={getAdjustedOptions()}
        inputValue={tagInputValue}
        onChange={handleChange}
        onInputChange={handleTagInputChange}
        onOpen={handleOptionsOpen}
        onClose={handleOptionsClose}
        getOptionLabel={getOptionLabel}
        disableClearable={tagInputValue === ''}
        autoSelect
        autoHighlight
        openOnFocus
        freeSolo
        renderInput={(params) => (
          <TextField
            {...params}
            label='Filter by Tags'
            variant='standard'
            fullWidth
            InputLabelProps={{
              ...params.InputLabelProps,
              sx: inputSpacing,
            }}
            inputProps={{
              ...params.inputProps,
              sx: inputSpacing,
            }}
          />
        )}
      />

      <Box
        component='ul'
        flex={1}
        px={1}
        pb={1}
        my={0}
        sx={{ overflowY: 'auto' }}
      >
        {activeTagFilters &&
          activeTagFilters.map((tag) => (
            <Chip
              key={`ls-tag-chip-${tag.id}`}
              component='li'
              label={tag}
              onDelete={removeTagFilter.bind(this, tag.id)}
              sx={{
                mt: 1,
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            />
          ))}
      </Box>
    </>
  );
};

export default TagFilters;
