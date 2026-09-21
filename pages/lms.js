export async function getServerSideProps() {
  return {
    redirect: {
      destination: '/lms-full.html',
      permanent: false,
    },
  };
}

export default function LmsRedirect() {
  return null;
}
