# Rollback Instructions

If you need to revert to the backed-up state, follow these steps:

1. Remove the current `src` directory and replace it with the backup:
   ```
   rm -rf src && mv src_backup src
   ```

2. Restore the original `package.json`:
   ```
   mv package.json.backup package.json
   ```

3. Reinstall dependencies (if necessary):
   ```
   npm install
   ```

4. Rebuild and redeploy the application:
   ```
   npm run build
   ```
   Then use your deployment command to update the live site.

Remember to test the application locally before deploying after a rollback.