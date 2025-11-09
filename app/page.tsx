import Navbar from "@/components/Navbar";
import TransactionsPanel from "@/components/Panel";

export default function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  return (
    <section>
      <Navbar />
      <TransactionsPanel searchParams={searchParams} />
    </section>
  );
}
