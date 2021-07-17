import { useState, useEffect } from 'react';

import { Box, TextField, Chip } from '@material-ui/core';
import Autocomplete, {
  createFilterOptions,
} from '@material-ui/lab/Autocomplete';

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
  } = props;

  const [tagInputValue, setTagInputValue] = useState('');

  const tagOptions = tags.concat(tagInputValue);
  const addTagOptionText = `Add "${tagInputValue}"`;
  const tagsClearable = tagInputValue !== '';

  // reset autocomplete input when sidebar closes
  useEffect(() => {
    if (!isSidebarOpen) resetTagInputValue();
  }, [isSidebarOpen])

  function resetTagInputValue() {
    setTagInputValue('');
  }

  function handleTagInputChange(_, value, reason) {
    if (reason === 'input') {
      setTagInputValue(value);
    } else if (reason === 'clear') {
      resetTagInputValue();
    }
  }

  function handleTagFilterChange(_, value, reason) {
    if (reason === 'select-option') {
      if (value === addTagOptionText) {
        createNewTag(tagInputValue);
        addTagFilter(tagInputValue);
      } else {
        addTagFilter(value);
      }
      resetTagInputValue();
    }
  }

  /* 
    When setting 'value' prop on Autocomplete, thus making it controlled, the inputValue prop on 
    this function's 'state' param always returns an empty string. Once the value prop is removed it works 
    fine, however this messes with the Autocomplete state and breaks the clear icon. 

    Quick fix was to add the input value to the state manually so the filter gets the right values to work with.
  */
  function filterTagOptions(_, state) {
    let newTags = createFilterOptions({
      matchFrom: 'start',
    })(tags, { ...state, inputValue: tagInputValue });

    newTags = newTags.filter((tag) => !activeTagFilters.includes(tag));

    if (tagInputValue !== '') {
      newTags.push(addTagOptionText);
    }

    return newTags;
  }

  return (
    <>
      <Autocomplete
        className={classes.tagsTextfield}
        options={tagOptions}
        value={tagInputValue}
        inputValue={tagInputValue}
        onChange={handleTagFilterChange}
        onInputChange={handleTagInputChange}
        filterOptions={filterTagOptions}
        disableClearable={!tagsClearable}
        autoComplete
        autoSelect
        autoHighlight
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
