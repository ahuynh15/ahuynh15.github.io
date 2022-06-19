import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import {
  selectIsDarkMode,
  selectIsDarkModePreferred,
} from '@/slices/ThemeSlice';
import { animateDarkMode } from '@/lib/animationVariants';
import { getTimespan } from '@/lib/util';

const Experience = ({
  id,
  title,
  startDate,
  endDate,
  description,
  tags,
  onExpand,
}) => {
  const isDarkMode = useSelector((state) => selectIsDarkMode(state));
  const isDarkModePreferred = useSelector((state) =>
    selectIsDarkModePreferred(state)
  );

  return (
    <motion.div
      className="mb-8 overflow-hidden rounded-2xl"
      key={id}
      variants={{
        visible: { opacity: 2, height: 'auto', marginBottom: '32px' },
        hidden: { opacity: 0, height: 0, marginBottom: '0px' },
      }}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <motion.div
        className={`p-4 shadow-md`}
        layoutId={`experience-${id}`}
        variants={animateDarkMode(['container'])}
        initial={isDarkModePreferred ? 'dark' : 'light'}
        animate={isDarkMode ? 'dark' : 'light'}
      >
        <div className="flex gap-4">
          {/* Bullet Point */}
          <motion.div
            className="h-4 w-4 shrink-0 grow-0 self-center rounded-full bg-gray-300"
            layoutId={`experience-bullet-${id}`}
          ></motion.div>

          {/* Position */}
          <motion.div
            className="relative text-3xl"
            layoutId={`experience-title-${id}`}
          >
            {title}
          </motion.div>
        </div>

        <div className="flex h-full gap-4 pb-4">
          {/* Accent */}
          <div className="w-4 shrink-0 grow-0">
            <motion.div
              className="mx-auto h-1/2 w-1 bg-orange-500"
              layoutId={`experience-accent-${id}`}
            ></motion.div>
          </div>

          <div className="flex flex-col items-start">
            {/* Date */}
            <motion.div
              className="text-xl text-orange-500"
              layoutId={`experience-date-${id}`}
            >
              {new Date(startDate.year, startDate.month).toLocaleString(
                'default',
                {
                  month: 'short',
                  year: 'numeric',
                }
              )}
              &nbsp;-&nbsp;
              {new Date(endDate.year, endDate.month).toLocaleString('default', {
                month: 'short',
                year: 'numeric',
              })}
              &nbsp;&#8226;&nbsp;{getTimespan(startDate, endDate)}
            </motion.div>

            {/* Description */}
            <motion.div
              className="pt-4 text-xl"
              layoutId={`experience-description-${id}`}
            >
              {description}
            </motion.div>

            {/* More Info */}
            <button
              className="text-l pt-2 font-semibold tracking-wider"
              type="button"
              onClick={onExpand}
            >
              Read More
            </button>
          </div>
        </div>
        <div className="ml-8 flex gap-4">
          {/* Tags */}
          {tags.map((tag) => {
            return (
              <motion.div
                key={tag}
                className="items-center gap-2 rounded-full border-2 border-orange-500 px-4 py-1 text-base uppercase text-orange-500"
                layoutId={`experience-tag-${id}-${tag}`}
              >
                {tag}
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
};

Experience.propTypes = {
  title: PropTypes.string.isRequired,
  startDate: PropTypes.shape({
    year: PropTypes.number.isRequired,
    month: PropTypes.number.isRequired,
  }).isRequired,
  endDate: PropTypes.shape({
    year: PropTypes.number.isRequired,
    month: PropTypes.number.isRequired,
  }).isRequired,
  description: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
  onExpand: PropTypes.func.isRequired,
};

export default Experience;
