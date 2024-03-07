import {
    CreateMetadataAccountV3InstructionAccounts,
    CreateMetadataAccountV3InstructionArgs,
    DataV2Args,
    createMetadataAccountV3
} from "@metaplex-foundation/mpl-token-metadata";
import { createSignerFromKeypair, publicKey, signerIdentity } from "@metaplex-foundation/umi";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import * as anchor from "@project-serum/anchor";
import wallet from "../wba-wallet.json";

// Define our Mint address
const mint = publicKey("FM2k6zUr3xu6FMNx5RNyzxNQUUDg4wrEzB8ArcvKuwte");
const TOKEN_METADATA_PROGRAM_ID = new anchor.web3.PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s");

// Create a UMI connection
/*const metadata : PublicKey=  findProgramAddressSync(
    [
        Buffer.from("metadata"),
        TOKEN_METADATA_PROGRAM_ID.toBuffer(),
        Buffer.from(mint.toString())
    ],
    TOKEN_METADATA_PROGRAM_ID
)[0];*/
//const metadataSeeds = [Buffer.from("metadata"),"metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"];
const umi = createUmi('https://api.devnet.solana.com');
const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);
umi.use(signerIdentity(createSignerFromKeypair(umi, keypair)));


(async () => {
    try {
        // Start hereAdr
        let accounts: CreateMetadataAccountV3InstructionAccounts ={
            mint,
            mintAuthority:signer,

        }

        let data: DataV2Args = {
            name : "wba",
            symbol : "w",
            uri : "",
            sellerFeeBasisPoints : 0,
            creators : null,
            collection : null,
            uses : null

        
        }

        let args: CreateMetadataAccountV3InstructionArgs = {
            data : data,
            isMutable : true,
            collectionDetails : null
        
        }

        let tx = createMetadataAccountV3(
            umi,
            {
            ...accounts,
            ...args
            }
        )

        let result = await tx.sendAndConfirm(umi).then(r => r.signature.toString());
        console.log(result);
    } catch(e) {
        console.error(`Oops, something went wrong: ${e}`)
    }
})();