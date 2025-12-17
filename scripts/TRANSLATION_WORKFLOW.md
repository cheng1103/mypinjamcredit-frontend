# Translation Workflow (Offline)

The `pnpm translate:blog` command uses the open-source `facebook/m2m100_418M` model via `@xenova/transformers` to translate every markdown file from one locale to another locally. The first run downloads the model weights (~1.6 GB) and caches them under `~/.cache/huggingface`. No Google Cloud or paid API is required.

## Usage

From the `frontend` directory:

```bash
pnpm translate:blog             # translate all EN markdown files into ms/ (default)
pnpm translate:blog --slug=ctos-score-complete-guide-2025  # translate one slug
pnpm translate:blog --force     # overwrite existing translations
pnpm translate:blog --dry-run   # preview without writing files
```

Environment overrides:

- `TRANSLATE_SOURCE_LOCALE` (default `en`)
- `TRANSLATE_TARGET_LOCALE` (default `ms`)

For example, to prepare Indonesian stubs from Malay:

```bash
TRANSLATE_SOURCE_LOCALE=ms TRANSLATE_TARGET_LOCALE=id pnpm translate:blog
```

## Output

- Files are saved in `src/content/blog/<target-locale>/<slug>.md`.
- Front matter fields (`title`, `description`, `category`, `tags`) are automatically translated.
- `language` is updated to the target locale and all Markdown content is in Malay once the script completes.

## Tips

1. Expect the first run to download large model files—plan a stable connection.
2. Review the translated Malay text; machine translation speeds things up but human polishing is still recommended for tone and compliance.
3. Keep slugs identical between locales so routing and sitemap generation stay in sync.
