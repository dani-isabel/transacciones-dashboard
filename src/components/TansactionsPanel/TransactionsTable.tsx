import TableContent from "@/components/TansactionsPanel/TableContent";
import TransactionSidebar from "@/components/TansactionsPanel/TransactionSidebar";

export default function TransactionsTable() {
  return (
    <section>
      <TableContent />
      {/* <aside className="w-60 bg-white overflow-y-auto">
        <TransactionSidebar />
      </aside> */}
    </section>
  );
}
