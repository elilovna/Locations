import React, { useCallback, useMemo, useState } from 'react';
import { Location } from '../types';
import { ImageCarousel } from './ImageCarousel';
import ReactPaginate from 'react-paginate';

type Props = {
  locations: Location[];
};

const numberPerPage = 10;

export const ListElement: React.FC<Props> = ({ locations }) => {
  const [pageNumber, setPageNumber] = useState(0);
  const pageCount = locations.length / numberPerPage;

  const handlePageClick = useCallback(({ selected }: { selected: number }) => {
    console.log(selected);
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
          <div className="flex flex-row p-5" key={el.ID}>
            <div
              style={{
                width: 300,
              }}
            >
              <ImageCarousel
                name={el.DescriptionMobileWeb}
                photos={el.photos}
              />
            </div>
            <div className="w-1/2">
              <h3>{el.NameMobileWeb}</h3>
              <p>
                {el.DISTRICT} {el.DescriptionMobileWeb} {el.BT_FACIL_TYPE}
              </p>
              <div>
                <p>
                  <span>BOATING:</span>
                  {el.BOATING}
                </p>
                <p>
                  <span>DUNES:</span>
                  {el.DUNES}
                </p>
                <p>
                  <span>BIKE_PATH:</span>
                  {el.BIKE_PATH}
                </p>
                <p>
                  <span>FISHING:</span>
                  {el.FISHING}
                </p>
                {el.DOG_FRIENDLY && (
                  <p>
                    <span>Dogs friendly:</span>
                    {el.DOG_FRIENDLY}
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      })}
      <ReactPaginate
        previousLabel={'previous'}
        pageClassName={'bg-gray-100 px-4 py-1'}
        nextLabel={'next'}
        breakLabel={'...'}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={'flex flex-row justify-around'}
        activeClassName={'bg-red-100'}
      />
    </div>
  );
};
