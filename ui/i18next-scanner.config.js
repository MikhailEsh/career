
module.exports = {
  options: {
    debug: true,
    sort: true,
    removeUnusedKeys: false,
    func: {
      list: ['i18next.t', 'i18n.t', 't'],
      extensions: ['.js', '.jsx'],
    },
    trans: {
      component: 'Trans',
      i18nKey: 'i18nKey',
      extensions: ['.js', '.jsx'],
      fallbackKey: function(_ns, value) {
        // Returns a hash value as the fallback key
        return sha1(value);
      },
    },
    lngs: ['en'], //, 'ru', 'ch'],
    ns: ['common',],
    defaultNs: 'common',
    defaultValue: '__STRING_NOT_TRANSLATED__',
    resource: {
      loadPath: 'src/i18n/{{lng}}/{{ns}}.json',
      savePath: 'src/i18n/{{lng}}/{{ns}}.json',
      jsonIndent: 2,
      lineEnding: '\n',
    },
    nsSeparator: ':',
    keySeparator: '.',
    pluralSeparator: '_',
    contextSeparator: '_',
    interpolation: {
      prefix: '{{',
      suffix: '}}',
    },
  },
};
