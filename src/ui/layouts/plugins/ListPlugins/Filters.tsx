import React, { useState } from 'react';
import {
  Box,
  CheckboxInput,
  FlexBox,
  GhostButton,
  H3,
  InputWithLabel,
  Paragraph,
  PrimaryButton,
  Tag,
  TextInput,
  icons,
} from '../../../components';
import { iconColors } from '../../../../constants';
import { useHubToken } from '../../../hooks/auth';
import { getTagOptions } from '../api';
import { debounce } from 'lodash';

export type FilterState = {
  onlyMine: boolean;
  onlyMyStarred: boolean;
  author: string;
  tag: string;
};

const debouncedGetTagOptions = debounce(getTagOptions, 300, {
  leading: true,
  trailing: true,
  maxWait: 1000,
});

export const Filters: React.FC<{
  currentFilters: FilterState;
  updateFilters: (f: FilterState) => void;
}> = ({ currentFilters, updateFilters }) => {
  const hubIsConnected = !!useHubToken();

  const [filters, setFilters] = useState({ ...currentFilters });
  const [show, setShow] = useState(false);

  const removeFilter = <X extends keyof FilterState>(
    filter: X,
    value: FilterState[X],
  ) => (e: any) => {
    e.stopPropagation();
    const newFilters = { ...filters, [filter]: value };
    setFilters(newFilters);

    // if removing a filter directly when the filter UI isn't open, apply filters immediately
    if (!show) updateFilters(newFilters);
  };

  return (
    <FlexBox
      fullWidth
      flexWrap
      alignItems="center"
      style={{
        border: '1px solid var(--lightGrey)',
        borderRadius: '4px',
        cursor: 'pointer',
        position: 'relative',
      }}
      onClick={() => setShow(true)}
    >
      {/* icon */}
      <Box marginHorizontal="sm">
        <icons.filter color={iconColors.primary} />
      </Box>

      {Object.values(filters).filter(Boolean).length === 0 ? (
        <Paragraph style={{ color: 'var(--grey)', cursor: 'pointer' }}>
          No filters applied
        </Paragraph>
      ) : (
        <>
          {filters.onlyMine && (
            <Tag text="Only mine" onRemove={removeFilter('onlyMine', false)} />
          )}
          {filters.onlyMyStarred && (
            <Tag
              text="Only starred"
              onRemove={removeFilter('onlyMyStarred', false)}
            />
          )}
          {filters.author && (
            <Tag
              text={`Author: ${filters.author}`}
              onRemove={removeFilter('author', '')}
            />
          )}
          {filters.tag && (
            <Tag
              text={`Tag: ${filters.tag}`}
              onRemove={removeFilter('tag', '')}
            />
          )}
        </>
      )}

      {show && (
        <Box
          padding="md"
          backgroundColor="white"
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            minWidth: '320px',
            maxWidth: '520px',
            boxShadow: 'var(--cardShadow)',
            zIndex: 5,
            cursor: 'default',
          }}
        >
          <H3>Filters</H3>
          {hubIsConnected && (
            <>
              <Box marginBottom="md">
                <CheckboxInput
                  label="Only show my plugins"
                  value={filters.onlyMine}
                  setValue={(b) => setFilters({ ...filters, onlyMine: b })}
                />
              </Box>
              <Box marginBottom="lg">
                <CheckboxInput
                  label="Only show plugins I've starred"
                  value={filters.onlyMyStarred}
                  setValue={(b) => setFilters({ ...filters, onlyMyStarred: b })}
                />
              </Box>
            </>
          )}
          <Box marginBottom="lg">
            <InputWithLabel
              label="Package author"
              InputComponent={
                <TextInput
                  value={filters.author}
                  onChangeText={(t) => setFilters({ ...filters, author: t })}
                />
              }
              helperText=""
            />
          </Box>
          <Box marginBottom="lg">
            <AutocompleteInput
              label="Tag"
              value={filters.tag}
              onChange={(t) => setFilters({ ...filters, tag: t })}
              getOptions={debouncedGetTagOptions}
            />
          </Box>

          <FlexBox flexDirection="row" justifyContent="space-between">
            <GhostButton
              onClick={(e: any) => {
                setShow(false);
                e.stopPropagation();
                setFilters({ ...currentFilters });
              }}
            >
              Cancel
            </GhostButton>
            <PrimaryButton
              onClick={(e: any) => {
                setShow(false);
                e.stopPropagation();
                updateFilters(filters);
              }}
              style={{ marginLeft: 12 }}
            >
              Save filters
            </PrimaryButton>
          </FlexBox>
        </Box>
      )}
    </FlexBox>
  );
};

function AutocompleteInput({
  label,
  value,
  onChange,
  getOptions,
}: {
  label: string;
  value: string;
  onChange: (s: string) => void;
  getOptions: (s: string) => Promise<string[]>;
}) {
  const [options, setOptions] = useState([] as string[]);

  return (
    <Box style={{ position: 'relative' }}>
      <InputWithLabel
        label={label}
        InputComponent={
          <TextInput
            value={value}
            onChangeText={(t) => {
              onChange(t);

              // exit immediately if input is blank
              if (!t) setOptions([]);
              else if (getOptions) {
                getOptions(t).then(
                  // only update if the input isn't blank (blank means reset so options aren't valid any more)
                  (os) => value && setOptions(os),
                );
              }
            }}
          />
        }
        helperText=""
      />

      {options.length > 0 && (
        <Box
          padding="md"
          backgroundColor="white"
          style={{
            position: 'absolute',
            top: '100%',
            minWidth: '200px',
            maxWidth: '400px',
            boxShadow: 'var(--cardShadow)',
            zIndex: 10,
          }}
        >
          {options.map((o) => (
            <Box
              key={o}
              onClick={() => {
                onChange(o);
                setOptions([]);
              }}
              marginVertical="sm"
              style={{ cursor: 'pointer' }}
            >
              <Paragraph>{o}</Paragraph>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
