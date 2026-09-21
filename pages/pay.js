export default function Pay() { return null; }

export function getServerSideProps({ query }) {
  const search = new URLSearchParams();
  if (typeof query.track === 'string') search.set('track', query.track);
  if (typeof query.reference === 'string') search.set('reference', query.reference);
  if (typeof query.trxref === 'string') search.set('trxref', query.trxref);
  const suffix = search.toString();
  return {
    redirect: {
      destination: `/pay-checkout.html${suffix ? `?${suffix}` : ''}`,
      permanent: false,
    },
  };
}
