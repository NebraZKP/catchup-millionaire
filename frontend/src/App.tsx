import { useState, useEffect } from "react";
import { Balance } from "./components/Balance";
import { BankProof } from "./components/BankProof";
import { ClaimButton } from "./components/ClaimButton";

export default function App() {

  const getBalance = async () => {
    // TODO: get balance from on chain
    return 1000;
  }

  const getClaimableAmount = () => {
    return 1000000;
  }

  const mint = async () => {
    // TODO: mint token on chain to user
    setBalance(balance + 1);
  }

  const boost = async (proof: any) => {
    // TODO: mint multiple tokens on chain to user
    // ignore proof for now
    const claimData = JSON.parse(proof.claimData.parameters);
    const amount = parseInt(claimData.paramValues.amount);
    console.log("Boosting!!!" , amount);
    // user.tokens += bankBalance  on chain
    setBalance(balance + amount);

  }

  const [balance, setBalance] = useState(0);

  useEffect(() => {
    getBalance().then(setBalance);
  }, []);
  


  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 gap-y-3">
      <Balance currentBalance={balance} claimableAmount={getClaimableAmount() - balance} />
      <BankProof onProof={(proof) => {
        boost(proof)}
       } />
      <ClaimButton onPress={() => mint()} />
    </main>
  );
}
