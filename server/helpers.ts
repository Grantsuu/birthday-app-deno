export function buildPatchSqlQuery(
  table: string,
  values: object,
  conditions: object,
  returns: string[],
): string {
  // Start query with UPDATE table
  let query = `UPDATE ${table} SET`;

  // Add in columns to update
  Object.keys(values).map((key) => {
    query = query.concat(
      ` "${key}" = '${values[key as keyof typeof values]}',`,
    );
  });

  // Remove trailing commas
  if (query.endsWith(",")) {
    query = query.substring(0, query.length - 1);
  }

  // Add in conditions
  query = query.concat(" WHERE");
  Object.keys(conditions).map((key) => {
    query = query.concat(
      ` "${key}" = '${conditions[key as keyof typeof conditions]}' AND`,
    );
  });

  // Remove trailing AND
  if (query.endsWith("AND")) {
    query = query.substring(0, query.length - 3);
  }

  // Add return columns
  if (returns.length > 0) {
    query = query.concat(" RETURNING ");
    query = query.concat(returns.join(","));
  }

  // Add in semicolon at end of statement
  query = query.concat(";");
  // console.log(query);

  return query;
}
