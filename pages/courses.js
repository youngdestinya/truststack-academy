export async function getServerSideProps() {
  return {
    redirect: {
      destination: '/courses-tracks.html',
      permanent: false,
    },
  };
}

export default function CoursesRedirect() {
  return null;
}
