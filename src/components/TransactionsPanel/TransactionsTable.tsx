import TableContent from "@/components/TransactionsPanel/TableContent";
import TransactionSidebar from "@/components/TransactionsPanel/TransactionSidebar";

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
