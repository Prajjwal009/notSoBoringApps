# App icons

To show your app’s icon on the website:

1. **Export the icon from your app**  
   - From Xcode: open the app’s Assets.xcassets → AppIcon, export as PNG.  
   - Or from the built `.app`: right‑click the app → Get Info, drag the icon to the desktop to get a PNG.

2. **Save it here**  
   - Use a clear filename, e.g. `tetro.png` for the Tetro app.  
   - Recommended size: **512×512** or **256×256** (the site will scale it).

3. **Point to it in `apps.json`**  
   - Set `"icon": "/icons/tetro.png"` (or whatever filename you used).  
   - Path is from the site root, so `/icons/yourfile.png`.

The icon inside the DMG is only used after the user installs the app; the website needs a separate image file (PNG) to display the icon.
