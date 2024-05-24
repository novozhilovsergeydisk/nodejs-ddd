#!/usr/bin/env bash
/Applications/Postgres.app/Contents/Versions/14/bin/psql -f install.sql -U postgres
PGPASSWORD=marcus /Applications/Postgres.app/Contents/Versions/14/bin/psql -d example -f structure.sql -U marcus
PGPASSWORD=marcus /Applications/Postgres.app/Contents/Versions/14/bin/psql -d example -f data.sql -U marcus
