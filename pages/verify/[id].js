export default function VerifyById() { return null; }

export function getServerSideProps({ params }) {
  const id = typeof params.id === 'string' ? params.id : '';
  return {
    redirect: {
      destination: `/verify?id=${encodeURIComponent(id)}`,
      permanent: false,
    },
  };
}
