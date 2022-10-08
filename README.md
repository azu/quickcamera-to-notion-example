# notion-upload-image

Upload clipboard image to Notion.

- Support: macOS

## Requirements

- Notion.app
- [Quick Camera](https://github.com/simonguest/quick-camera)

## Install

Install with [npm](https://www.npmjs.com/):

    npm ci

## Usage

Change config

```
const NOTION_API_KEY = "secret_ NotionのAPI Key"; // https://www.notion.so/my-integrations
const NOTION_DATABASE_ID = '追記したいNotionのDatabaseのID';
const NOTION_USER_ID = 'NotionのユーザーID'; // https://www.notion.so/<id>
```

- https://github.com/azu/quickcamera-to-notion-example/blob/431e9b5d5c2af7293e2ecfec882a3310c78ee57d/upload-image.mjs#L9-L11

    npm run upload

## Changelog

See [Releases page](https://github.com/azu/notion-upload-image/releases).

## Running tests

Install devDependencies and Run `npm test`:

    npm test

## Contributing

Pull requests and stars are always welcome.

For bugs and feature requests, [please create an issue](https://github.com/azu/notion-upload-image/issues).

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Author

- azu: [GitHub](https://github.com/azu), [Twitter](https://twitter.com/azu_re)

## License

MIT © azu
