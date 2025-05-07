import { initWormhole } from '../lib/wormhole/init';

initWormhole().catch((err) => {
  console.error("Error initializing Wormhole:", err);
});
