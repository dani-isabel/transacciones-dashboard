import { XMarkIcon } from "@heroicons/react/24/outline";

import { Transaction } from "@/types/transaction";

export default function TransactionSidebar() {
  return (
    <div className="w-full bg-white">
      <button>
        <XMarkIcon className="size-5 ml-1" />
      </button>
    </div>
  );
}
