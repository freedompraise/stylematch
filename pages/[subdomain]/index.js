export async function getServerSideProps(context) {
  const { subdomain } = context.params;
  const vendor = await fetchVendorBySubdomain(subdomain);

  if (!vendor) {
    return { notFound: true };
  }

  return {
    props: { vendor },
  };
}

const VendorPage = ({ vendor }) => {
  return <div>{/* <VendorNavbar vendor={vendor} /> */}</div>;
};

export default VendorPage;
