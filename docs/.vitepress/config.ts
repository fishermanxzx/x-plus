export default {
  title: 'X-Plus',
  description: 'X Plus',
  themeConfig: {
    lastUpdated: '最后更新时间',
    outlineTitle: 'CONTENTS',
    docsDir: 'docs',
    editLinks: true,
    editLinkText: '编辑此网站',
    repo: 'https://gitee.com/login',
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023-present X Plus'
    },
    nav: [
      { text: '指南', link: '/guide/installation', activeMatch: '/guide/' },
      { text: '组件', link: '/components/button', activeMatch: '/components/' }
    ],
    sidebar: {
      '/guide/': [
        {
          text: '指南',
          items: [
            { text: '安装', link: '/guide/installation' },
            { text: '快速开始', link: '/guide/quickstart' },
            { text: '单元测试', link: '/guide/unitTesting' },
            { text: '构建流程', link: '/guide/build' }
          ]
        }
      ],
      '/components/': [
        {
          text: '基础组件',
          items: [{ text: 'Button', link: '/components/button' }]
        }
      ]
    }
  }
}
