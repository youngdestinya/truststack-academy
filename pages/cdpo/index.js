import CdpoCourse from '../../components/CdpoCourse';
import index from '../../data/cdpo/index.json';
import lesson from '../../data/cdpo/1.json';
import intro from '../../data/cdpo/intro.json';

export default function CdpoHome() {
  return <CdpoCourse index={index} lesson={lesson} intro={intro} isHome />;
}
