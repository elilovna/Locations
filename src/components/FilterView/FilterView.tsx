import clsx from 'clsx';
import { memo, useCallback, useMemo } from 'react';
import { Filter } from './filters';

type Props = {
  title: string;
  onSelect: (s: boolean) => void;
  selected: boolean;
};

const CheckBox: React.FC<Props> = ({ title, onSelect, selected }) => {
  const handleOnClick = useCallback(() => {
    onSelect(!selected);
  }, [onSelect, selected]);

  return <button className={clsx("p-2 border-gray-400 border rounded-lg m-1 shadow-sm text-sm whitespace-nowrap", {'bg-blue-200': selected} )} onClick={handleOnClick}>{title}</button>;
};

type FilterViewProps = {
  filters: Filter[];
  changeFilters: (f: Filter[]) => void;
};

const FilterViewRaw: React.FC<FilterViewProps> = ({
  filters,
  changeFilters,
}) => {

  const filterCheckBoxes = useMemo(() => {
    return filters.map((f) => {
      return (
        <CheckBox
          title={f.title}
          onSelect={(s) => {
            const newFilters = [...filters];
            const idxToChange = newFilters.findIndex((nf) => nf.key === f.key);
            newFilters[idxToChange] = {
              ...newFilters[idxToChange],
              value: s,
            };
            changeFilters(newFilters);
          }}
          selected={f.value}
        />
      );
    });
  }, [changeFilters, filters]);

  return <div className="flex flex-row overflow-scroll py-3 bg-gray-50 shadow-md">{filterCheckBoxes}</div>;
};

export const FilterView = memo(FilterViewRaw);
