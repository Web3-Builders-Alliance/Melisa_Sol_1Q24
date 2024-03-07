import { createNft, mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";
import { createSignerFromKeypair, generateSigner, percentAmount, signerIdentity } from "@metaplex-foundation/umi";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";

import base58 from "bs58";
import wallet from "../wba-wallet.json";

const RPC_ENDPOINT = "https://api.devnet.solana.com";
const umi = createUmi(RPC_ENDPOINT);

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const myKeypairSigner = createSignerFromKeypair(umi, keypair);
umi.use(signerIdentity(myKeypairSigner));
umi.use(mplTokenMetadata())

const mint = generateSigner(umi);

(async () => {
    // const prop : CreateV1InstructionDataArgs = {
    //     name: "RugOfMelisa",
    //     symbol: "ROF",
    //     uri: "https://arweave.net/XFQDj5nvr9xeljIJ3SPQM0OwPWloJo1zNmEUj9Uy25o",
    //     sellerFeeBasisPoints : percentAmount(4),
    //     creators : null,
    //     tokenStandard : 0
    // }
    let tx = await createNft(umi,{
        mint,
        name: "RugOfMelisa",
        uri: "https://arweave.net/XFQDj5nvr9xeljIJ3SPQM0OwPWloJo1zNmEUj9Uy25o",
        sellerFeeBasisPoints : percentAmount(4),

    })
    let result = await tx.sendAndConfirm(umi);
    const signature = base58.encode(result.signature);
    
    console.log(`Succesfully Minted! Check out your TX here:\nhttps://explorer.solana.com/tx/${signature}?cluster=devnet`)

    console.log("Mint Address: ", mint.publicKey);
})();