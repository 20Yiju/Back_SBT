import { NFTStorage, File } from "nft.storage";
import fs from "fs";

const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEE5OTBiNzIyQzBjNDUwMWU2ODkzRDNiZWFkNUU5RDU4MzQzNWQxOEUiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY3MzQyNTQ0NzUyNiwibmFtZSI6InRlc3QifQ.ix1siwq6omSU9gqLePV1AYq5HOWXEXzZ95EBP8_lWSM";
const client = new NFTStorage({ token: apiKey });

const a = "Homework";
const b = "100";
const c = "80";
const d = "-2: test case error * 5, -5: 00000, -5: XXXXX";

const metadata = await client.store({
    name: "Homework",
    description: "컴퓨터 네트워크 03분반 Homework1",
    image: new File([fs.readFileSync("./Eat.png")], "Eat.png", { type: "image/png" }),
    attributes: [

        {
            trait_type: "type",
            value: a,
        },

        {
            trait_type: "Total Score",
            value: b,
        },

        {
            trait_type: "Your Score",
            value: c,
        },

        {
            trait_type: "Comment",
            value: d,
        },
    ]
});
console.log(metadata.url);
