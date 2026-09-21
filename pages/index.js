export async function getServerSideProps() {
  return {
    redirect: {
      destination: '/student-lms.html',
      permanent: false,
    },
  };
}

export default function HomeRedirect() {
  return null;
}
