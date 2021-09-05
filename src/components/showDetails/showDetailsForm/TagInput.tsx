import { FC, MutableRefObject } from 'react';
import { TextField } from '@material-ui/core';
import CustomTagAutocomplete from 'components/ui/CustomTagAutocomplete';

interface TagInputProps {
  showTags: string[];
  allTags: string[];
  handleChange: (tags: string[]) => void;
  createNewTag: (tag: string) => void;
  inputRef: MutableRefObject<HTMLInputElement | undefined>;
}

const TagInput: FC<TagInputProps> = ({
  showTags,
  allTags,
  handleChange,
  createNewTag,
  inputRef,
}) => {
  function handleCreateNewTag(value: string) {
    createNewTag(value);
    handleChange(showTags.concat(value));
  }

  return (
    <CustomTagAutocomplete
      multiple
      options={allTags}
      selectedOptions={showTags}
      onTagSelect={handleChange}
      onRemoveTag={handleChange}
      onCreateNewTagSelect={handleCreateNewTag}
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
};

export default TagInput;
