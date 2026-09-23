export async function getServerSideProps() {
  return {
    redirect: {
      destination: '/lms.html',
      permanent: true,
    },
  };
}

export default function LmsRedirect() {
  return null;
}
