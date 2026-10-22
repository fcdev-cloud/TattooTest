# Tattoo Test

## Backend setup

1. Install a new site using [WP Engine Studio](https://wpengine.com/studio/).
2. Run the site.
3. Import the database: `studio-backup-my-wordpress-website-*.sql`.
4. Copy the `plugins` and `themes/tattoo-test-theme` folders from `tattoo-test/wp-content/` into the new site's `wp-content/`, then activate Advanced Custom Fields PRO, WPGraphQL, and WPGraphQL for ACF in the WordPress admin.

## Frontend setup

```sh
cd tattoo-test-frontend
npm install
npm run build
npm run preview
```

Visit `http://localhost:4173/` to view the project. Pages:

- `/`
- `/gsd`
- `/bonus`

`.env` is included in the repo with `WPGRAPHQL_URL` already pointed at the local GraphQL endpoint.
