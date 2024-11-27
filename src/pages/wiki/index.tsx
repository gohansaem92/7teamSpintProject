import { GetServerSideProps } from "next";

export default function WikiPage() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async () => ({
  redirect: {
    destination: "/wikilist",
    permanent: true, // If true, HTTP 308; if false, HTTP 307
  },
});
