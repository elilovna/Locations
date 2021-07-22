import React, { useCallback, useMemo, useState } from "react";
import ReactPaginate from "react-paginate";
import { Location } from "../types";
import { ImageCarousel } from "./ImageCarousel";

type Props = {
  locations: Location[];
  mouseLeave: () => void;
  mouseEnter: (id: number) => void;
};

const numberPerPage = 10;

export const ListElement: React.FC<Props> = ({
  locations,
  mouseLeave,
  mouseEnter,
}) => {
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

  const handleLocationClick = useCallback((id: number) => {
    window.open(window.location.href + `location/${id}`);
  }, []);

  return (
    <div className="flex flex-col divide-y divide-gray-300 ml-6">
      {locationsToPresent.map((el) => {
        return (
          <div
            className="flex flex-row p-5 hover:bg-blue-50"
            key={el.ID}
            onMouseEnter={() => mouseEnter(el.ID)}
            onMouseLeave={() => mouseLeave()}
          >
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
            <div
              className="w-1/2 ml-4 flex flex-col justify-between items-center"
              onClick={() => handleLocationClick(el.ID)}
            >
              <h3 className="font-bold text-center text-sm">
                {el.NameMobileWeb}
              </h3>

              <p className="text-xs text-gray-900 ">
                {" "}
                {el.DescriptionMobileWeb}
              </p>
              <div className="">
                <button
                  onClick={() => handleLocationClick(el.ID)}
                  className="bg-gray-50 text-sm text-gray-900 border border-gray-400 rounded-md px-2 py-1"
                >
                  See more
                </button>
              </div>
            </div>
          </div>
        );
      })}
      <div className="py-4">
        <ReactPaginate
          previousLabel={"Previous"}
          pageClassName={
            "bg-gray-50 border rounded-md border-gray-400 px-4 py-1"
          }
          nextLabel={"Next"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"flex flex-row justify-around items-center"}
          activeClassName={"bg-blue-200"}
        />
      </div>
    </div>
  );
};
