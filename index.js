const sharp = require('sharp')
    , p = require('path')
    , url = require('url')
;



module.exports = ({presets = [], ...options}) => (plugin) => {

  plugin.registerTemplateHelper('srcset', (metadata, src, preset, attributes) => {

    if (!presets[preset]) throw new Error('undefined srcset preset');

    const {sizes, srcset} = presets[preset];
    const from = '/' + metadata.filePath;
    const path = url.resolve(from, src);

    const resizedFiles = srcset.map((width) => {
      // add size to file name https://stackoverflow.com/a/10802339
      const outputPath = path.substring(0, path.lastIndexOf('.')) + '-' + width + path.substring(path.lastIndexOf('.'));
      plugin.enqueueFile(outputPath, async () => {
        return plugin.getFile(path).then((file) => sharp(file, options).resize({width}).toBuffer());
      });
      return `${outputPath} ${width}w`;
    });

    attributes.sizes = sizes;
    attributes.srcset = resizedFiles.join(',')

    const output = ['<img'];
    for (attribute in attributes) {
      output.push(` ${attribute}="${attributes[attribute]}"`);
    }
    output.push('>');
    return output.join('');

  });
}
