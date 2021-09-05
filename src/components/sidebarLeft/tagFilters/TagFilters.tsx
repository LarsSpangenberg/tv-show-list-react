import { FC, useState, useEffect, ChangeEvent } from 'react';

import { Box, TextField, Chip } from '@material-ui/core';
import CustomAutocomplete from 'components/ui/CustomTagAutocomplete';

import useStyles from './TagFiltersStyles';

interface TagFiltersProps {
  tags: string[];
  activeTagFilters: string[];
  inputSpacingClass: string;
  isSidebarOpen: boolean;
  createNewTag: (tag: string) => void;
  addTagFilter: (tag: string) => void;
  removeTagFilter: (tag: string) => void;
  setIgnoreSidebarClose: (isIgnored: boolean) => void;
}

const TagFilters: FC<TagFiltersProps> = ({
  tags,
  activeTagFilters,
  inputSpacingClass,
  isSidebarOpen,
  createNewTag,
  addTagFilter,
  removeTagFilter,
  setIgnoreSidebarClose,
}) => {
  const classes = useStyles();

  const [tagInputValue, setTagInputValue] = useState('');

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

  function resetTagInputValue() {
    setTagInputValue('');
  }

  function handleTagInputChange(_: ChangeEvent<{}>, value: string) {
    setTagInputValue(value);
  }

  function handleSelectOption(value: string) {
    if (value) addTagFilter(value);
  }

  function handleSelectCreateNewOption(value: string) {
    createNewTag(value);
    addTagFilter(value);
  }

  return (
    <>
      <CustomAutocomplete
        className={classes.tagsTextfield}
        options={tags}
        selectedOptions={activeTagFilters}
        value={tagInputValue}
        inputValue={tagInputValue}
        onTagSelect={handleSelectOption}
        onCreateNewTagSelect={handleSelectCreateNewOption}
        onInputChange={handleTagInputChange}
        // onResetInputValue={resetTagInputValue}
        onOpen={handleOptionsOpen}
        onClose={handleOptionsClose}
        openOnFocus
        renderInput={(params) => (
          <TextField
            {...params}
            label='Filter by Tags'
            fullWidth
            InputLabelProps={{
              ...params.InputLabelProps,
              className: inputSpacingClass,
            }}
            inputProps={{
              ...params.inputProps,
              className: inputSpacingClass,
            }}
          />
        )}
      />

      <Box component='ul' px={1}>
        {activeTagFilters &&
          activeTagFilters.map((tag, i) => (
            <Chip
              key={`ls-tag-chip-${i}-${tag}`}
              component='li'
              className={classes.filterChip}
              label={tag}
              onDelete={removeTagFilter.bind(this, tag)}
            />
          ))}
      </Box>
    </>
  );
};

export default TagFilters;
