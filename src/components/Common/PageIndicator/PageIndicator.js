import PropTypes from 'prop-types';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
} from 'framer-motion';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  nextPage,
  prevPage,
  selectIsTransitioning,
  setPage,
} from '@/slices/PageSlice';
import { ChevronUpIcon, ChevronDownIcon } from '@/Common';
import { pages } from '@/constants/pages';
import classNames from 'classnames';

const PageIndicator = ({
  pageName,
  pageNumber,
  totalPages,
  dragOffset = 20,
  dragDistance = 30,
}) => {
  const dispatch = useDispatch();
  const isTransitioning = useSelector((state) => selectIsTransitioning(state));
  const [isExpanded, setIsExpanded] = useState(false);

  // Use motion values to animate the component while being dragged
  const y = useMotionValue(0);
  const upOpacity = useTransform(y, [-dragDistance, -dragOffset], [1, 0]);
  const downOpacity = useTransform(y, [dragOffset, dragDistance], [0, 1]);

  const onDragEnd = (event, info) => {
    if (info.offset.y > dragOffset) {
      dispatch(nextPage());
    }
    if (info.offset.y < -1 * dragOffset) {
      dispatch(prevPage());
    }
  };

  const onTap = () => {
    setIsExpanded(!isExpanded);
  };

  const onPageClick = (isActive, index) => {
    if (isActive) {
      setIsExpanded(!isExpanded);
    } else {
      goToPage(index);
    }
  };

  const goToPage = (index) => {
    dispatch(setPage({ index }));
  };

  const getOffsetY = (pageNumber, totalPages, height) => {
    const isEven = totalPages % 2 === 0;
    const midpoint = Math.round(totalPages / 2);
    const pagesFromMidpoint = midpoint - pageNumber;

    if (isEven) {
      return height * 1;
    } else {
      return height * pagesFromMidpoint;
    }
  };

  const renderPageLinks = (pages, currentPageNumber) => (
    <motion.div
      className="flex flex-col items-end gap-4"
      initial={{
        y: getOffsetY(currentPageNumber, pages.length, 36),
      }}
      animate={{
        y: getOffsetY(currentPageNumber, pages.length, 36),
      }}
    >
      {pages.map((page, index) => {
        const pageNumber = index + 1;
        const isActive = currentPageNumber === pageNumber;

        return (
          <motion.button
            className={classNames(
              'cursor-pointer text-xl capitalize leading-5 tracking-wide transition-colors duration-500',
              isActive
                ? 'text-zinc-900 dark:text-zinc-100'
                : 'text-zinc-400 dark:text-zinc-600'
            )}
            key={`page-indicator__name--${pageNumber}`}
            onClick={() => onPageClick(isActive, index)}
            disabled={isTransitioning}
            initial={{
              opacity: isActive ? 1 : 0,
            }}
            animate={{
              opacity: 1,
            }}
          >
            {page.name}
          </motion.button>
        );
      })}
    </motion.div>
  );

  return (
    <div className="flex items-center gap-4">
      {isExpanded ? (
        <>{renderPageLinks(pages, pageNumber)}</>
      ) : (
        <div className="relative flex flex-col justify-center">
          {/* Up Arrow */}
          <div className="flex flex-col items-center">
            <motion.div
              className="mb-2 text-zinc-900 transition-colors duration-500 dark:text-zinc-100"
              style={{
                opacity: upOpacity,
              }}
            >
              <ChevronUpIcon strokeWidth={1} />
            </motion.div>

            {/**
             * Rendering a static component when the page is transitioning.
             *
             * There is a bug in Framer Motion where drag constraints are lost
             * on rerender (https://github.com/framer/motion/issues/1454).
             * The workaround in the comments suggests updating the key.
             **/}
            <div
              style={{
                height: `${dragDistance * 2}px`,
              }}
              className="flex flex-col justify-center"
            >
              {/* Active Page */}
              <AnimatePresence
                exitBeforeEnter
                initial={false}
                key={`page-indicator__presence${isTransitioning && '--static'}`}
              >
                <motion.div
                  key={`page-indicator__name--${pageNumber}${
                    isTransitioning && '--static'
                  }`}
                  className="cursor-grab"
                  data-testid="page-indicator__name"
                  // Disable drag feature if the page is changing
                  drag={isTransitioning ? false : 'y'}
                  dragConstraints={{
                    top: pageNumber === 1 ? 0 : -dragDistance,
                    bottom: pageNumber === totalPages ? 0 : dragDistance,
                  }}
                  dragSnapToOrigin={true}
                  dragElastic={{
                    top: 0,
                    bottom: 0,
                  }}
                  dragMomentum={false}
                  onDragEnd={onDragEnd}
                  style={{
                    y: y,
                  }}
                  // Animations
                  variants={{
                    enter: {
                      opacity: 0,
                    },
                    visible: {
                      opacity: 1,
                    },
                    exit: {
                      opacity: 0,
                    },
                  }}
                  initial="enter"
                  animate="visible"
                  exit="exit"
                >
                  <motion.div
                    className="select-none text-xl capitalize leading-5 tracking-wide text-zinc-900 transition-colors duration-500 dark:text-zinc-100"
                    onTap={onTap}
                  >
                    {pageName}
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Down Arrow */}
            <motion.div
              className="mt-2 text-zinc-900 transition-colors duration-500 dark:text-zinc-100"
              style={{
                opacity: downOpacity,
              }}
            >
              <ChevronDownIcon strokeWidth={1} />
            </motion.div>
          </div>
        </div>
      )}

      {/* Page Counter */}
      <div className="flex flex-col items-center">
        <AnimatePresence exitBeforeEnter>
          <motion.div
            key={`page-indicator__number-${pageNumber}`}
            className="text-xl text-zinc-900 transition-colors duration-500 dark:text-zinc-100"
            data-testid="page-indicator__number"
            variants={{
              enter: {
                opacity: 0,
              },
              visible: {
                opacity: 1,
              },
              exit: {
                opacity: 0,
              },
            }}
            initial="enter"
            animate="visible"
            exit="exit"
          >
            {pageNumber}
          </motion.div>
        </AnimatePresence>
        <div className="my-2 h-[2px] w-4 rounded bg-zinc-900 transition-colors duration-500 dark:bg-white"></div>
        <div
          className="text-xl transition-colors duration-500 dark:text-zinc-100"
          data-testid="page-indicator__total"
        >
          {totalPages}
        </div>
      </div>
    </div>
  );
};

PageIndicator.propTypes = {
  pageName: PropTypes.string.isRequired,
  pageNumber: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
};

export default PageIndicator;