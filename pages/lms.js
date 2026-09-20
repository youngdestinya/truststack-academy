export async function getServerSideProps() {
  return {
    redirect: {
      destination: '/lms.html',
      permanent: false,
    },
  };
}

export default function LmsRedirect() {
  return null;
}
