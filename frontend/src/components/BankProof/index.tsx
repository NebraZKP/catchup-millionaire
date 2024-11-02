import { useState } from 'react';
import QRCode from 'react-qr-code';
import { ReclaimProofRequest } from '@reclaimprotocol/js-sdk';
 
interface Props {
  onProof?: (proofs: any) => void;
}

function BankProof({ onProof }: Props) {

  // State to store the verification request URL
  const [requestUrl, setRequestUrl] = useState('');
  const [proofs, setProofs] = useState<any[]>([]);
 
  const getVerificationReq = async () => {

    // Your credentials from the Reclaim Developer Portal
    // Replace these with your actual credentials

    const APP_ID = '0x553cA4935d4B39c318d9348a1462Aa3B71Fc8b1C';
    const APP_SECRET = '0xf61dff5ba10fe9409c3de0589b5b226a748efd5a9c28b65f7e611c1b30afb026';
    const PROVIDER_ID = 'c8d91312-e683-4aae-a37e-d139d04bd8cc';
 
    // Initialize the Reclaim SDK with your credentials
    const reclaimProofRequest = await ReclaimProofRequest.init(APP_ID, APP_SECRET, PROVIDER_ID);
 
    // Generate the verification request URL
    const requestUrl = await reclaimProofRequest.getRequestUrl();

    console.log('Request URL:', requestUrl);

    setRequestUrl(requestUrl);
 
    // Start listening for proof submissions
    await reclaimProofRequest.startSession({

      // Called when the user successfully completes the verification
      onSuccess: (proofs) => {

        console.log('Verification success', proofs);
        setProofs(proofs ? [proofs] : []);
        onProof?.(proofs);

        // Add your success logic here, such as:
        // - Updating UI to show verification success
        // - Storing verification status
        // - Redirecting to another page
      },
      // Called if there's an error during verification
      onError: (error) => {

        console.error('Verification failed', error);
 
        // Add your error handling logic here, such as:
        // - Showing error message to user
        // - Resetting verification state
        // - Offering retry options
      },
    });
  };
 
  return (
    <>
      <button onClick={getVerificationReq}>Boost with Bank Balance</button>
      {requestUrl && (
        <div style={{ margin: '20px 0' }}>
          {/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? (
            <a href={requestUrl} target="_blank" rel="noopener noreferrer">Tap to prove bank balance</a>
          ) : (
            <a href={requestUrl} target="_blank" rel="noopener noreferrer"><QRCode value={requestUrl} /></a>
          )}
        </div>
      )}

    </>
  );
}

export { BankProof };
