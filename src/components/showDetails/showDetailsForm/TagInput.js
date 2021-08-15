import { TextField } from '@material-ui/core';
import CustomTagAutocomplete from 'components/ui/CustomTagAutocomplete';

export default function TagInput({
  showTags,
  allTags,
  handleChange,
  createNewTag,
  inputRef,
}) {
  function handleCreateNewTag(value) {
    createNewTag(value);
    handleChange(showTags.concat(value));
  }

  return (
    <CustomTagAutocomplete
      multiple
      options={allTags}
      selectedOptions={showTags}
      onOptionSelect={handleChange}
      onRemoveOption={handleChange}
      onCreateNewOptionSelect={handleCreateNewTag}
      value={showTags}
      filterSelectedOptions
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
}
