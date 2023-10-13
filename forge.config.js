const notarize = process.env.CODESIGN
  ? {
      osxSign: {},
      osxNotarize: {
        tool: 'notarytool',
        appleId: process.env.APPLE_ID,
        appleIdPassword: process.env.APPLE_PASSWORD,
        teamId: process.env.APPLE_TEAM_ID
      }
    }
  : {};

module.exports = {
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        name: 'epam-cdisc-electron',
        setupIcon: './app-assets/icons/icon.ico'
      }
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin', 'win32']
    },
    {
      name: '@electron-forge/maker-dmg',
      platforms: ['darwin'],
      config: {
        name: 'epam-cdisc-electron',
        format: 'ULFO',
        icon: './app-assets/icons/icon.icns'
      }
    },
    {
      name: '@electron-forge/maker-deb',
      config: {}
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {}
    }
  ],
  packagerConfig: {
    ignore: [
      '^/[.]vscode$',
      '^/assets$',
      '^/app-assets$',
      '^/src$',
      '^/[.]babelrc$',
      '^/[.]env[.]development$',
      '^/[.]env[.]codesign$',
      '^/[.]eslintignore$',
      '^/[.]eslintrc[.]js$',
      '^/[.]gitignore$',
      '^/[.]prettierignore$',
      '^/[.]prettierrc$',
      '^/README[.]md$',
      '^/tsconfig[.]json$',
      '^/webpack[.]config[.]js$',
      '^/[.]husky$',
      '^/[.]stylelintrc$',
      '^/[.]nvmrc$',
      '^/venv$',
      '^/docs$'
    ],
    icon: './app-assets/icons/icon',
    overwrite: true,
    asar: false,
    ...notarize
  }
};
