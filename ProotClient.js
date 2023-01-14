var rawArgs = process.argv.splice(2), flags = [], args = {};

for (var i = 0; i < rawArgs.length; i++) {
	if (/--[a-zA-Z]+/i.test(rawArgs[i])) {
		args[rawArgs[i].substr(2)] = rawArgs[i + 1];
		i++;
	} else if (/-[a-zA-Z]+/i.test(rawArgs[i])) {
		flags.push(rawArgs[i].substr(1));
	}
}

console.log("rawArgs:");	console.log(rawArgs);
console.log("flags:");		console.log(flags);
console.log("args:");		console.log(args);
