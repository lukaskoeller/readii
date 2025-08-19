// This file is required for Expo/React Native SQLite migrations - https://orm.drizzle.team/quick-sqlite/expo

import journal from './meta/_journal.json';
import m0000 from './0000_low_red_skull.sql';
import m0001 from './0001_neat_korg.sql';
import m0002 from './0002_clever_rafael_vega.sql';
import m0003 from './0003_petite_ricochet.sql';
import m0004 from './0004_shallow_dormammu.sql';

  export default {
    journal,
    migrations: {
      m0000,
m0001,
m0002,
m0003,
m0004
    }
  }
  