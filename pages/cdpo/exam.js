import CdpoCourse from '../../components/CdpoCourse';
import index from '../../data/cdpo/index.json';
import lesson from '../../data/cdpo/exam.json';
import sources from '../../data/cdpo/sources.json';

export default function CdpoExam() {
  return <CdpoCourse index={index} lesson={lesson} sources={sources} isExam />;
}
