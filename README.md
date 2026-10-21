# Locale Guard demo: Husky

A small Next.js shop in English, Arabic, French and German, translated with
[next-intl](https://next-intl.dev). [Husky](https://typicode.github.io/husky/)
runs [locale-guard-cli](https://www.npmjs.com/package/locale-guard-cli) before
each commit and push, and the
[Locale Guard](https://github.com/Mohamed-Almarag/locale-guard) Action checks
each pull request. Both read the same settings file.

## Setup

| | |
|---|---|
| Framework | Next.js 16, App Router |
| Translation library | `next-intl` (ICU messages) |
| Locale files | `messages/{locale}.json`, one file per language |
| Base locale | `en` |
| Git hooks | Husky 9 |

The settings, in [.localeguard.yml](.localeguard.yml):

```yaml
files: messages/{locale}.json
format: next-intl
```

The hooks, in [.husky/pre-commit](.husky/pre-commit) and
[.husky/pre-push](.husky/pre-push):

```bash
# .husky/pre-commit
npx locale-guard-cli --staged
```

```bash
# .husky/pre-push
npx locale-guard-cli --base origin/main
```

`husky` and `locale-guard-cli` are dev dependencies, and `"prepare": "husky"`
in `package.json` sets up the hooks when you run `npm install`.

The pull request check, in
[.github/workflows/translations.yml](.github/workflows/translations.yml):

```yaml
- uses: Mohamed-Almarag/locale-guard@v1
```

## Try the hooks

```bash
git clone https://github.com/Mohamed-Almarag/locale-guard-demo-husky.git
cd locale-guard-demo-husky
npm install
```

Add `"deals": "Deals"` under `Nav` in `messages/en.json` only, then commit it:

```bash
git add messages/en.json
git commit -m "Add a deals link"
```

The commit stops, because the other languages do not have the key:

```text
messages/ar.json
  2:3  error    Missing key Nav.deals  missing-keys

messages/de.json
  2:3  error    Missing key Nav.deals  missing-keys

messages/fr.json
  2:3  error    Missing key Nav.deals  missing-keys

✖ 3 new issues (3 errors) since the last commit
  2 existing issues are not shown. --all lists every issue.
husky - pre-commit script failed (code 1)
```

Add the key to `ar.json`, `de.json` and `fr.json`, stage the four files, and
commit again. This time it goes through:

```text
✔ No new translation issues since the last commit.
  2 existing issues are not shown. --all lists every issue.
```

## Pull requests to look at

| Pull request | What it shows | Result |
|---|---|---|
| [#1 Add the cart](https://github.com/Mohamed-Almarag/locale-guard-demo-husky/pull/1) | A plural without the `other` form, Arabic plural forms that are missing, a renamed `select` argument, a missing rich text tag, a message that does not compile, a missing key, untranslated text and an extra key | ❌ Fails |
| [#2 Add order tracking](https://github.com/Mohamed-Almarag/locale-guard-demo-husky/pull/2) | The first commit forgets French and German, the second one adds them, and the same comment turns green | ✅ Passes |
| [#3 Lay out products in a grid](https://github.com/Mohamed-Almarag/locale-guard-demo-husky/pull/3) | A change that touches no translation file, so the check finishes in seconds | ✅ Passes |

The hooks would have stopped the mistakes in #1 and in the first commit of #2.
Those commits were made with `git commit --no-verify`, which skips the hooks,
to show that the Action still catches them on the pull request.

The `main` branch already has two old issues: a key German never got, and an
Arabic plural with three of its six forms. Locale Guard lists them apart from the
issues each change adds, and they do not fail the hooks or the check.

## Run the shop

```bash
npm install
npm run dev
```
