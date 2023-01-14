const fs = require('fs');

let javaArtifact = "ProotClient.jar";
let jsonArtifact = "ProotClient.json";
let versionFolder = "C:/Users/bwart/AppData/Roaming/.minecraft/versions/ProotClient";

try {
	fs.copyFileSync("./" + javaArtifact, versionFolder + "/" + javaArtifact);
	fs.copyFileSync("./" + jsonArtifact, versionFolder + "/" + jsonArtifact);
	console.log("Moved artifacts.");
} catch (err) {
	console.log("Couldn't move artifacts.");
}
