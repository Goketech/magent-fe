import {
  Connection,
  PublicKey,
  clusterApiUrl,
  Keypair,
  LAMPORTS_PER_SOL,
  Transaction,
  sendAndConfirmTransaction,
  TransactionConfirmationStrategy,
} from "@solana/web3.js";
import {
  createMint,
  getOrCreateAssociatedTokenAccount,
  mintTo,
  createTransferInstruction,
} from "@solana/spl-token";
import { WalletContextState } from "@solana/wallet-adapter-react";

console.log(process.env.NEXT_PUBLIC_USDC_TOKEN_PUBLIC_KEY);
console.log(process.env.NEXT_PUBLIC_DEVELOPER_PUBLIC_KEY);

const publicKey = process.env.NEXT_PUBLIC_USDC_TOKEN_PUBLIC_KEY!;
const devPublicKey = process.env.NEXT_PUBLIC_DEVELOPER_PUBLIC_KEY!;

const usdcTokenPublicKey = new PublicKey(publicKey);
export const developerPublicKey = new PublicKey(devPublicKey);

async function getTokenAccount(
  connection: Connection,
  ownerPublicKey: PublicKey
) {
  const tokenAccounts = await connection.getTokenAccountsByOwner(
    ownerPublicKey,
    { mint: usdcTokenPublicKey }
  );
  console.log(tokenAccounts);
  return tokenAccounts.value[0].pubkey;
}

export async function transferCoin(
  connection: Connection,
  from: PublicKey,
  to: PublicKey,
  amount: number,
  sendTransaction: WalletContextState["sendTransaction"]
) {

  console.log("from", from);
  console.log("to", to);
  console.log("amount", amount);
  const fromTokenAccount = await getTokenAccount(connection, from);
  console.log("fromTokenAccount", fromTokenAccount);
  if (!fromTokenAccount) {
    throw new Error("Your account does not have a token account");
  }
  const toTokenAccount = await getTokenAccount(connection, to);
  console.log("toTokenAccount", toTokenAccount);
  const instruction = createTransferInstruction(
    fromTokenAccount,
    toTokenAccount,
    from,
    amount
  );
  console.log("instruction", instruction);

  if (!instruction) {
    throw new Error("Wallet not connected");
  }

  const transaction = new Transaction().add(instruction);
  console.log("transaction", transaction);

  if (!transaction) {
    throw new Error("Transaction not created. Please try again");
  }
  return sendTransaction(transaction, connection);
}

export async function confirmTransaction(
  connection: Connection,
  transaction: TransactionConfirmationStrategy
) {
  return await connection.confirmTransaction(transaction);
}
