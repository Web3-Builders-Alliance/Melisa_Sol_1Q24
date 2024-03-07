import { createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { createBundlrUploader } from "@metaplex-foundation/umi-uploader-bundlr";
import wallet from "../wba-wallet.json";

// Create a devnet connection
const umi = createUmi('https://api.devnet.solana.com');
const bundlrUploader = createBundlrUploader(umi);

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(signerIdentity(signer));

(async () => {
    try {
        // Follow this JSON structure
        // https://docs.metaplex.com/prograconst image = ???

        const image = 'https://arweave.net/XFQDj5nvr9xeljIJ3SPQM0OwPWloJo1zNmEUj9Uy25o'
        const metadata = {
            name: "RugOfMelisa",
            symbol: "ROF",
            description: "creator : Melisa ts",
            image: image,
            attributes: [
                {trait_type: 'Color', value: 'purple'},
                {trait_type: 'Coins', value: '1000'},
                {trait_type: 'Claimable', value: 'Yes'}


            ],
            properties: {
                files: [
                    {
                        type: "image/png",
                        uri: "https://arweave.net/XFQDj5nvr9xeljIJ3SPQM0OwPWloJo1zNmEUj9Uy25o"
                    },
                ]
            },
            //creators: []
        };
        const myUri = await bundlrUploader.uploadJson(metadata);
        console.log("Your image URI: ", myUri);

    }
    catch(error) {
        console.log("Oops.. Something went wrong", error);
    }
})();