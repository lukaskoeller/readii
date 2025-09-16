# @readii/web

## Troubleshooting

**Changes in the editor are not immediately reflected in the browser (HMR not working)**
This can be caused by a missing `.env` containing the DB path:

```sh
PUBLIC_DATABASE_URL='idb://readiidb'
```
