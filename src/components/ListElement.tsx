import React, { useCallback, useMemo, useState } from 'react';
import { Location } from '../types';
import { ImageCarousel } from './ImageCarousel';
import ReactPaginate from 'react-paginate';

type Props = {
  locations: Location[];
  mouseLeave: () =>  void
  mouseEnter: (id:number) => void 
};

const numberPerPage = 10;

export const ListElement: React.FC<Props> = ({ locations, mouseLeave, mouseEnter }) => {
  const [pageNumber, setPageNumber] = useState(0);
  const pageCount = locations.length / numberPerPage;
  const handlePageClick = useCallback(({ selected }: { selected: number }) => {
    setPageNumber(selected);
  }, []);

  const locationsToPresent = useMemo(
    () =>
      locations.slice(
        pageNumber * numberPerPage,
        (pageNumber + 1) * numberPerPage
      ),
    [locations, pageNumber]
  );

  return (
    <div className="flex flex-col divide-y divide-gray-300 ml-6">
      {locationsToPresent.map((el) => {
        return (
          <div className="flex flex-row p-5 hover:bg-blue-50" key={el.ID} onMouseEnter={() => mouseEnter(el.ID)} onMouseLeave={() => mouseLeave()}>
            <div
              style={{
                width: 300,
              }}
            >
              <ImageCarousel
                name={el.DescriptionMobileWeb}
                photos={el.photos}
                className="max-h-44"
              />
            </div>
            <div className="w-1/2 ml-4">
              <h3 className="font-bold text-center text-sm">{el.NameMobileWeb}</h3>
              <div className="text-xs text-gray-900">
                <p className="py-1">
                  <span className="font-bold">BOATING:</span>
                  {el.BOATING}
                </p>
                <p className="py-1">
                  <span className="font-bold">DUNES:</span>
                  {el.DUNES}
                </p>
                <p className="py-1">
                  <span className="font-bold">BIKE_PATH:</span>
                  {el.BIKE_PATH}
                </p>
                <p className="py-1">
                  <span className="font-bold">FISHING:</span>
                  {el.FISHING}
                </p>
                {el.DOG_FRIENDLY && (
                  <p className="py-1">
                    <span className="font-bold">Dogs friendly:</span>
                    {el.DOG_FRIENDLY}
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      })}
      <div className="py-4">
        <ReactPaginate
          previousLabel={'Previous'}
          pageClassName={'bg-gray-50 border rounded-md border-gray-400 px-4 py-1'}
          nextLabel={'Next'}
          breakLabel={'...'}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={'flex flex-row justify-around items-center'}
          activeClassName={'bg-blue-200'}
        />
      </div>
    </div>
  );
};
