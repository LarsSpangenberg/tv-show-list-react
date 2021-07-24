import { useState, useEffect } from 'react';

import { Box, TextField, Chip } from '@material-ui/core';
import CustomAutocomplete from 'components/ui/CustomTagAutocomplete';

import useStyles from './TagFiltersStyles';

export default function TagFilters(props) {
  const classes = useStyles();

  const {
    tags,
    activeTagFilters,
    createNewTag,
    addTagFilter,
    removeTagFilter,
    inputSpacingClass,
    isSidebarOpen,
    setIgnoreSidebarClose,
  } = props;

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

  function handleTagInputChange(value) {
    setTagInputValue(value);
  }

  function handleSelectOption(value) {
    addTagFilter(value);
  }

  function handleSelectCreateNewOption(value) {
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
        onOptionSelect={handleSelectOption}
        onCreateNewOptionSelect={handleSelectCreateNewOption}
        onInputChange={handleTagInputChange}
        onResetInputValue={resetTagInputValue}
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

      <Box component='ul' className={classes.chipContainer} px={1}>
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
}
