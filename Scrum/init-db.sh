until pg_isready -h db -p 5432; do
  echo "Waiting for PostgreSQL..."
  sleep 2
done

# Restore the database
psql -U $DB_USER -d $DB_DATABASE -f /deimos.dump

echo "Database restored from dump."