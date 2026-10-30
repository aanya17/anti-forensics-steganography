# StegoForge — Vercel Hybrid Triage Edition

A lightweight, responsive digital-evidence triage application designed for Vercel. It combines browser-side file inspection with small Node.js serverless API routes. It deliberately avoids heavyweight Python, native ML and media-processing dependencies that exceeded Vercel's serverless bundle limit.

## Features

- Drag/drop and file-picker workflow
- SHA-256 fingerprint calculated in the browser
- Common file-signature checks and extension mismatch flags
- Basic JPEG EXIF-segment and PNG metadata-chunk presence checks
- Image preview, dimensions, and heuristic RGB least-significant-bit distribution screening
- Small serverless rules-review endpoint (`/api/analyze`) and API health endpoint (`/api/health`)
- Exportable JSON triage report
- No evidence file upload: only a short summary of client-side findings is sent to `/api/analyze`

## Deploy to Vercel

1. Upload the **contents** of this folder to the root of a GitHub repository.
2. Import the repository into Vercel.
3. Framework Preset: **Other**.
4. Root Directory: `./`.
5. Build Command, Output Directory, and Install Command: leave blank.
6. Deploy. No package install or build step is required; Vercel runs the `api/*.js` files as Node.js serverless functions.

After deployment, `/api/health` should return JSON with `ok: true`.

## Important limitations

This is a lightweight, hybrid triage application—not the original full StegoForge ML pipeline. The API applies simple transparent rules; it does not run an AI model or a dedicated steganalysis/deepfake detector. LSB distribution is only a heuristic. No finding proves concealment, manipulation, or authenticity. Preserve originals, document hashes and validate results with appropriate forensic tools.

## License and attribution

This lightweight edition is adapted from the StegoForge project. See `LICENSE` for the retained license text. Preserve upstream attribution and review the original project's terms before redistributing modified versions.
