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
  getMint,
  getOrCreateAssociatedTokenAccount,
  mintTo,
  createTransferInstruction,
} from "@solana/spl-token";
import { WalletContextState } from "@solana/wallet-adapter-react";

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

  return tokenAccounts.value[0]?.pubkey;
}

export async function transferCoin(
  connection: Connection,
  from: PublicKey,
  to: PublicKey,
  amount: number,
  sendTransaction: WalletContextState["sendTransaction"]
) {
  try {

    let mintAccount = await getMint(connection, usdcTokenPublicKey);

    const fromTokenAccount = await getTokenAccount(connection, from);

    if (!fromTokenAccount) {
      throw new Error("Your account does not have a token account");
    }

    const toTokenAccount = await getTokenAccount(connection, to);

    const instruction = createTransferInstruction(
      fromTokenAccount,
      toTokenAccount,
      from,
      amount * (10 ** mintAccount.decimals)
    );

    const balance = await connection.getTokenAccountBalance(fromTokenAccount);
    if (balance.value.uiAmount === null || balance.value.uiAmount < amount) {
      throw new Error("Insufficient USDC balance");
    }

    if (!instruction) {
      throw new Error("Wallet not connected");
    }

    const transaction = new Transaction().add(instruction);

    if (!transaction) {
      throw new Error("Transaction not created. Please try again");
    }
    return sendTransaction(transaction, connection);
  } catch (error) {
    console.log("Transaction Error:", error);
    throw new Error(`Transaction Error: ${error instanceof Error
      ? error.message : 'Unknown error'}`);
  }
}

export async function confirmTransaction(
  connection: Connection,
  transaction: TransactionConfirmationStrategy
) {
  return await connection.confirmTransaction(transaction);
}