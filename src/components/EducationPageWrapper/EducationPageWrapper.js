import { Title } from '../Common/Title';
import { EducationList } from './EducationList';

const EducationPageWrapper = () => {
  return (
    <div className="flex h-full flex-col items-center p-8 xl:flex-row">
      <div className="xl:w-1/3">
        <Title>I have completed....</Title>
      </div>
      <div className="pt-8 xl:w-2/3 xl:pt-0">
        <EducationList />
      </div>
    </div>
  );
};

export default EducationPageWrapper;
