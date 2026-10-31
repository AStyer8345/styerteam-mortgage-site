// Test safety: mocks may replace these; unmocked network never leaves the process.
const deny = () => { throw new Error('Unstubbed network blocked during verification'); };
globalThis.fetch = async () => deny();
for (const name of ['node:http','node:https']) { const mod=require(name); mod.request=deny; mod.get=deny; }
require('node:net').Socket.prototype.connect=deny;
