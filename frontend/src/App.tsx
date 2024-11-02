import { Balance } from "./components/Balance";
import { BankProof } from "./components/BankProof";

export default function App() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 gap-y-3">
      <Balance currentBalance={1000} claimableAmount={500} />
      <BankProof />
    </main>
  );
}
