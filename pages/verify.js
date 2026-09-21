export default function Verify() { return null; }

export function getServerSideProps({ query }) {
  const search = new URLSearchParams();
  if (typeof query.id === 'string') search.set('id', query.id);
  const suffix = search.toString();
  return {
    redirect: {
      destination: `/verify-certificate.html${suffix ? `?${suffix}` : ''}`,
      permanent: false,
    },
  };
}
