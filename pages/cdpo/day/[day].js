import fs from 'fs';
import path from 'path';
import CdpoCourse from '../../../components/CdpoCourse';
import index from '../../../data/cdpo/index.json';

export default function CdpoDay({ lesson }) {
  return <CdpoCourse index={index} lesson={lesson} />;
}

export async function getStaticPaths() {
  return { paths: index.slice(1).map(({ day }) => ({ params: { day: String(day) } })), fallback: false };
}

export async function getStaticProps({ params }) {
  const day = Number(params.day);
  if (!Number.isInteger(day) || day < 2 || day > 30) return { notFound: true };
  const file = path.join(process.cwd(), 'data', 'cdpo', `${day}.json`);
  return { props: { lesson: JSON.parse(fs.readFileSync(file, 'utf8')) } };
}
