const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  pluginOptions: {
    vuetify: {
			buildModules: [
          '@nuxtjs/vuetify',
          [
            '@nuxtjs/vuetify',
            {}
          ]
        ]
		}
  }
})
