# Icon Generation Instructions

This folder contains the SVG source files for the pizza icon in various formats. To use these icons properly for all platforms, you'll need to convert them to PNG formats at various sizes.

## Required PNG Icons

The following PNG files need to be generated from the SVG source files:

### From icon-filled.svg:
- favicon-16x16.png (16×16)
- favicon-32x32.png (32×32)
- android-chrome-192x192.png (192×192)
- android-chrome-512x512.png (512×512)

### From apple-touch-icon.svg:
- apple-touch-icon.png (180×180)

### From mstile-150x150.svg:
- mstile-70x70.png (70×70)
- mstile-150x150.png (150×150)
- mstile-310x310.png (310×310)
- mstile-310x150.png (310×150)

## Conversion Tools

You can convert SVG to PNG using:

1. **Online tools**:
   - [Convertio](https://convertio.co/svg-png/)
   - [CloudConvert](https://cloudconvert.com/svg-to-png)
   - [SVGOMG](https://jakearchibald.github.io/svgomg/) (for SVG optimization)

2. **Command line tools**:
   - **Inkscape**: `inkscape input.svg -w WIDTH -h HEIGHT -o output.png`
   - **ImageMagick**: `convert -density 300 -background none input.svg -resize WIDTHxHEIGHT output.png`
   - **librsvg** (rsvg-convert): `rsvg-convert -w WIDTH -h HEIGHT input.svg > output.png`

3. **GUI applications**:
   - Adobe Illustrator
   - Sketch
   - Figma (export feature)
   - Affinity Designer

## Favicon.ico Generation

For optimal compatibility with all browsers, you may want to generate a favicon.ico file that includes multiple sizes:

```
convert favicon-16x16.png favicon-32x32.png favicon.ico
```

Or use an online favicon generator service.

## After Generation

After generating all PNG files, place them in this folder and update the manifest.json and layout.tsx files if necessary. 